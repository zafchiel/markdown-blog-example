import fs from "fs"
import path from "path"
import matter from "gray-matter"

export default function PostPage({
  frontmatter: {
    title,
    category,
    data,
    cover_image,
    author,
    date,
    read_time,
    excerpt,
    tags,
  },
  content,
}) {
  return <div>{title}</div>
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"))

  const paths = files.map((filename) => {
    const slug = filename.replace(".md", "")

    return {
      params: {
        slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  console.log(`${slug}.md`)
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      content,
    },
  }
}
