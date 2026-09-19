/**
 * POST /api/create-post
 * Body: { password, title, subtitle, date, tags, featured, slug, content }
 *
 * Verifies a shared password, then commits a new Markdown file into
 * /posts in your GitHub repo via the GitHub Contents API. That commit
 * triggers a normal Vercel deploy, which runs build.js and republishes
 * the blog — so "writing on the site" really does end in a live post.
 *
 * Required environment variables (set in Vercel → Project → Settings → Environment Variables):
 *   ADMIN_PASSWORD   - a password you choose, required to publish
 *   GITHUB_TOKEN     - a GitHub personal access token with repo contents write access
 *   GITHUB_OWNER     - your GitHub username or org, e.g. "abhishek"
 *   GITHUB_REPO      - the repo name, e.g. "portfolio-website"
 *   GITHUB_BRANCH    - optional, defaults to "main"
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

  const { password, title, subtitle, date, tags, featured, slug, content } = body;

  if (!process.env.ADMIN_PASSWORD) {
    res.status(500).json({ error: 'Server is missing ADMIN_PASSWORD. Set it in Vercel env vars.' });
    return;
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Incorrect password.' });
    return;
  }
  if (!title || !title.trim()) {
    res.status(400).json({ error: 'Title is required.' });
    return;
  }
  if (!content || !content.trim()) {
    res.status(400).json({ error: 'Content is required.' });
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

  const fileDate = (date && date.trim()) || new Date().toISOString().slice(0, 10);
  const safeSlug = (slug && slug.trim() ? slug : title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '') || 'post';
  const filename = `${fileDate}-${safeSlug}.md`;
  const path = `posts/${filename}`;

  const fm = [
    '---',
    `title: ${title.trim()}`,
    subtitle && subtitle.trim() ? `subtitle: ${subtitle.trim()}` : null,
    `date: ${fileDate}`,
    tags && tags.trim() ? `tags: ${tags.trim()}` : null,
    featured ? 'featured: true' : null,
    '---',
    '',
  ].filter(Boolean).join('\n');

  const fileText = fm + '\n' + content.trim() + '\n';
  const base64Content = Buffer.from(fileText, 'utf-8').toString('base64');

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
          message: `Add post: ${title.trim()}`,
          content: base64Content,
          branch,
        }),
      }
    );

    if (!ghRes.ok) {
      const detail = await ghRes.text();
      res.status(502).json({ error: 'GitHub API rejected the commit.', detail });
      return;
    }

    res.status(200).json({ ok: true, filename, path });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error.', detail: String(err) });
  }
};
