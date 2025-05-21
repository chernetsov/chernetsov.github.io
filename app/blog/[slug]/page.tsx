import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>; 
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // Typed as Promise to match inferred PageProps
}

export async function generateStaticParams(): Promise<{ slug: string }[]> { 
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// searchParams is accepted to satisfy types but not used/awaited to allow static export.
export default async function BlogPostPage({ 
  params: paramsPromise, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchParams: _searchParamsPromise 
}: PageProps) {
  const params = await paramsPromise;

  // DO NOT await or use _searchParamsPromise here if you want static export to work.
  // It's typed as a Promise to satisfy the Next.js generated PageProps for an async page,
  // but using it dynamically would break static generation.

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