import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                {post.title}
              </h2>
              <time className="text-sm text-gray-500">{post.date}</time>
              <p className="mt-2 text-gray-600">{post.description}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
} 