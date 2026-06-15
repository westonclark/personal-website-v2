import { getAllPosts, getPost } from "@/lib/writing";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}


export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <section>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Link
            href="/writing"
            className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            ← Writing
          </Link>
          <h1 className="text-xl md:text-2xl font-medium dark:text-white">
            {post.title}
          </h1>
        </div>

        <article
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </section>
  );
}
