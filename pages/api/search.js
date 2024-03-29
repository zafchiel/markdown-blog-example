import fs from "fs"
import matter from "gray-matter"
import path from "path"

export default function handler(req, res) {
  let files
  let posts

  if (process.env.NODE_ENV === "production") {
    // Fetch from cache
    files = fs.readdirSync(path.join(process.cwd(), "posts"))
  } else {
    files = fs.readdirSync(path.join("posts"))
  }

  posts = files.map((filename) => {
    const slug = filename.replace(".md", "")

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  const results = posts.filter(
    (post) =>
      post.frontmatter.title.toLowerCase().indexOf(req.query.q.toLowerCase()) !=
        -1 ||
      post.frontmatter.excerpt
        .toLowerCase()
        .indexOf(req.query.q.toLowerCase()) != -1 ||
      post.frontmatter.category
        .toLowerCase()
        .indexOf(req.query.q.toLowerCase()) != -1
  )

  res.status(200).json(results)
}
