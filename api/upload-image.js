/**
 * POST /api/upload-image
 * Body: { password, filename, dataUrl }
 *   dataUrl is a base64 data URL, e.g. "data:image/png;base64,AAAA..."
 *
 * Verifies the shared password, then commits the image into
 * /posts/images in your GitHub repo via the GitHub Contents API,
 * and returns the raw GitHub URL to use in a post's Markdown.
 *
 * Uses the same environment variables as /api/create-post:
 *   ADMIN_PASSWORD, GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const { password, filename, dataUrl } = body;

  if (!process.env.ADMIN_PASSWORD) {
    res.status(500).json({ error: 'Server is missing ADMIN_PASSWORD. Set it in Vercel env vars.' });
    return;
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Incorrect password.' });
    return;
  }
  if (!filename || !dataUrl) {
    res.status(400).json({ error: 'filename and dataUrl are required.' });
    return;
  }

  const match = /^data:(.+?);base64,(.+)$/.exec(dataUrl);
  if (!match) {
    res.status(400).json({ error: 'dataUrl must be a base64 data URL (e.g. from a file input).' });
    return;
  }
  const mimeType = match[1];
  const base64Content = match[2];

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml'];
  if (!allowedTypes.includes(mimeType)) {
    res.status(400).json({ error: `Unsupported image type: ${mimeType}` });
    return;
  }

  // Rough size guard — GitHub's Contents API rejects files over ~1MB (base64-encoded) via this endpoint.
  const approxBytes = (base64Content.length * 3) / 4;
  if (approxBytes > 1_000_000) {
    res.status(400).json({ error: 'Image is too large (max ~1MB). Please compress or resize it first.' });
    return;
  }

  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !token) {
    res.status(500).json({ error: 'Server is missing GITHUB_OWNER / GITHUB_REPO / GITHUB_TOKEN env vars.' });
    return;
  }

  const safeName = filename
    .toLowerCase()
    .replace(/[^a-z0-9.\-]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
  const uniqueName = `${Date.now()}-${safeName || 'image'}`;
  const path = `posts/images/${uniqueName}`;

  try {
    const ghRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github+json',
          'User-Agent': 'portfolio-admin',
        },
        body: JSON.stringify({
          message: `Add image: ${uniqueName}`,
          content: base64Content,
          branch,
        }),
      }
    );

    if (!ghRes.ok) {
      const detail = await ghRes.text();
      res.status(502).json({ error: 'GitHub API rejected the upload.', detail });
      return;
    }

    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    res.status(200).json({ ok: true, url: rawUrl, path });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error.', detail: String(err) });
  }
};
