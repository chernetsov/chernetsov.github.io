import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-fg">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="bg-surface p-6 rounded-2xl border border-line">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold text-fg mb-2 hover:text-accent">
                {post.title}
              </h2>
              <time className="text-sm text-faint">{post.date}</time>
              <p className="mt-2 text-muted">{post.description}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
} 