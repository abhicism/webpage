# Writing a new post

There are two ways to publish. Use whichever you prefer day to day.

## Option A — Write directly on the site (`/admin`)

1. Go to `https://<your-site>.vercel.app/admin.html`.
2. Enter your admin password, fill in the title/subtitle/tags/content, and click **Publish post**.
3. This commits a new Markdown file straight into `posts/` in your GitHub repo via the
   GitHub API. That commit triggers a normal Vercel deploy, so the post is live in
   well under a minute — no local editing, no manual `git push`.

**One-time setup required before this works** — add these in Vercel →
your project → Settings → Environment Variables, then redeploy:

| Variable | Value |
|---|---|
| `ADMIN_PASSWORD` | any password you choose — required to publish from `/admin.html` |
| `GITHUB_TOKEN` | a GitHub personal access token with **repo contents: write** access |
| `GITHUB_OWNER` | your GitHub username/org, e.g. `abhishek` |
| `GITHUB_REPO` | the repo name, e.g. `portfolio-website` |
| `GITHUB_BRANCH` | optional, defaults to `main` |

To create the token: GitHub → Settings → Developer settings → Personal access
tokens → Fine-grained tokens → New token → scope it to this one repo only,
with **Contents: Read and write** permission. Paste it into `GITHUB_TOKEN`.

`/admin.html` is unlisted (not linked from the nav, marked `noindex`) but it
is not truly private — anyone who finds the URL sees the form. The password
check on `/api/create-post` is what actually protects publishing; keep it
somewhere safe and don't reuse a real login password for it.

## Option B — Write a Markdown file locally

1. Copy `posts/_TEMPLATE.md` to a new file, e.g. `posts/2026-04-12-my-post.md`.
   The filename doesn't have to match the date, but it's a nice convention.
2. Fill in the frontmatter at the top:
   - `title` — required
   - `subtitle` — one line, shown under the title
   - `date` — YYYY-MM-DD, used for sorting
   - `tags` — comma-separated, e.g. `RAG, Python`
   - `featured` — set `true` on at most one post to pin it at the top of the blog
   - `excerpt` — optional; if you skip it, one is generated from your first paragraph
   - `readTime` — optional; if you skip it, it's estimated from word count
3. Write the post in plain Markdown below the `---`. Headings, **bold**, *italic*,
   `code`, fenced code blocks, links, and lists all render on the site.
4. Commit and push. Vercel runs `npm run build`, which compiles every file in
   `/posts` into the blog automatically — nothing else to configure.

To remove a post, delete its file. To edit one, edit the file and push again.

Files starting with `_` (like `_TEMPLATE.md`) are ignored by the build.

## Previewing locally before you push

```
npm run build
npx serve public
```

Then open the URL it prints. `npm run build` regenerates `public/` every time
you run it, so re-run it after any edit.

