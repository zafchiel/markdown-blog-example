import fs from "fs"
import matter from "gray-matter"
import path from "path"

export default function handler(req, res) {
  let posts

  if (process.env.NODE_ENV === "production") {
    // @todo - cache files
  } else {
    const files = fs.readdirSync(path.join("posts"))

    posts = files.map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      )

      const { data: frontmatter } = matter(markdownWithMeta)

      return {
        frontmatter,
      }
    })
  }

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
