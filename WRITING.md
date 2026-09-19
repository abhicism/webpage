# Writing a new post

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
