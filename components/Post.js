import Link from "next/link"
import Image from "next/image"
import CategoryLabel from "./CategoryLabel"

export default function Post({ post }) {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      <Image
        src={post.frontmatter.cover_image}
        alt=""
        width={420}
        height={210}
        className="mb-4 rounded"
      />

      <div className="flex items-center justify-between">
        <span className="font-light text-gray-600">
          {post.frontmatter.date}
        </span>
        <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
      </div>

      <div className="mt-2">
        <Link href={`/blog/${post.slug}`} legacyBehavior>
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {post.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{post.frontmatter.excerpt}</p>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Link href={`/blog/${post.slug}`} legacyBehavior>
          <a className="text-gray-900 hover:text-blue-600">Read More</a>
        </Link>
        <div className="flex items-center">
          <Image
            src={post.frontmatter.author_image}
            alt=""
            width={30}
            height={30}
            className="rounded-full hidden md:block"
          />
          <h3 className="ml-2 text-gray-700 font-bold">
            {post.frontmatter.author}
          </h3>
        </div>
      </div>
    </div>
  )
}
