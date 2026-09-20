/**
 * POST /api/delete-post
 * Body: { password, path }
 *   path is the repo path returned by /api/list-posts, e.g. "posts/2026-09-19-hello.md"
 *
 * Looks up the file's current sha (required by GitHub's delete API) and
 * deletes it, which commits the removal straight to your repo and
 * triggers a Vercel rebuild — the post drops off the live site shortly after.
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

  const { password, path } = body;

  if (!process.env.ADMIN_PASSWORD) {
    res.status(500).json({ error: 'Server is missing ADMIN_PASSWORD. Set it in Vercel env vars.' });
    return;
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Incorrect password.' });
    return;
  }
  if (!path || !path.startsWith('posts/') || !path.endsWith('.md')) {
    res.status(400).json({ error: 'A valid post path is required.' });
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

  const ghHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-admin',
  };

  try {
    // The delete endpoint requires the file's current sha.
    const fileRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`,
      { headers: ghHeaders }
    );
    if (!fileRes.ok) {
      const detail = await fileRes.text();
      res.status(404).json({ error: 'Could not find that post on GitHub.', detail });
      return;
    }
    const fileData = await fileRes.json();

    const delRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'DELETE',
        headers: { ...ghHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Delete post: ${path}`,
          sha: fileData.sha,
          branch,
        }),
      }
    );

    if (!delRes.ok) {
      const detail = await delRes.text();
      res.status(502).json({ error: 'GitHub API rejected the delete.', detail });
      return;
    }

    res.status(200).json({ ok: true, path });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error.', detail: String(err) });
  }
};
