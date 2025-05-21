import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose prose-lg max-w-none">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <time className="text-gray-500">{post.date}</time>
      </header>
      <MDXRemote source={post.content} />
    </article>
  )
} 