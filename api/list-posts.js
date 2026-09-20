/**
 * POST /api/list-posts
 * Body: { password }
 *
 * Lists every post file in /posts (excluding files starting with "_"),
 * with just enough parsed frontmatter (title, date) to show a manage list.
 * Uses the same env vars as the other admin endpoints.
 */
function parseFrontmatterTitleDate(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { title: null, date: null, featured: false, sample: false };
  const fm = {};
  match[1].split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val === 'true') val = true;
    else if (val === 'false') val = false;
    fm[key] = val;
  });
  return {
    title: fm.title || null,
    date: fm.date || null,
    featured: fm.featured === true,
    sample: fm.sample === true,
  };
}

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

  if (!process.env.ADMIN_PASSWORD) {
    res.status(500).json({ error: 'Server is missing ADMIN_PASSWORD. Set it in Vercel env vars.' });
    return;
  }
  if (body.password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Incorrect password.' });
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
    const dirRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/posts?ref=${encodeURIComponent(branch)}`,
      { headers: ghHeaders }
    );

    if (dirRes.status === 404) {
      res.status(200).json({ ok: true, posts: [] });
      return;
    }
    if (!dirRes.ok) {
      const detail = await dirRes.text();
      res.status(502).json({ error: 'GitHub API error while listing posts.', detail });
      return;
    }

    const entries = await dirRes.json();
    const mdFiles = (Array.isArray(entries) ? entries : []).filter(
      (e) => e.type === 'file' && e.name.endsWith('.md') && !e.name.startsWith('_')
    );

    const posts = await Promise.all(
      mdFiles.map(async (entry) => {
        let title = null, date = null, featured = false, sample = false;
        try {
          const fileRes = await fetch(entry.download_url);
          if (fileRes.ok) {
            const raw = await fileRes.text();
            ({ title, date, featured, sample } = parseFrontmatterTitleDate(raw));
          }
        } catch {
          // fall through with nulls — filename still shown
        }
        return {
          path: entry.path,
          filename: entry.name,
          title: title || entry.name,
          date,
          featured,
          sample,
        };
      })
    );

    posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    res.status(200).json({ ok: true, posts });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error.', detail: String(err) });
  }
};
