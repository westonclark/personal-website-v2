import Link from "next/link";
import { getAllPosts, type PostMeta } from "@/lib/writing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description: "Writing about software, audio, and the things I build.",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  const bySeries: Record<string, PostMeta[]> = {};
  const standalone: typeof posts = [];

  for (const post of posts) {
    if (post.series) {
      bySeries[post.series] = bySeries[post.series] ?? [];
      bySeries[post.series].push(post);
    } else {
      standalone.push(post);
    }
  }

  return (
    <section className="pt-8 md:pt-36">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-2xl font-medium dark:text-white">
            Writing
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-base">
            By{" "}
            <Link
              href="/"
              className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
            >
              Weston Clark
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {Object.entries(bySeries).map(([series, seriesPosts]) => (
            <div key={series} className="flex flex-col gap-3">
              <p className="text-[#b5420a] dark:text-[#d97757] text-base italic">
                {series}
              </p>
              <div className="flex flex-col gap-3">
                {seriesPosts
                  .sort((a, b) => (a.part ?? 0) - (b.part ?? 0))
                  .map((post) => (
                    <Link
                      key={post.slug}
                      href={`/writing/${post.slug}`}
                      className="flex items-baseline gap-2 group"
                    >
                      <span className="text-neutral-400 dark:text-neutral-500 select-none">
                        •
                      </span>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="group-hover:text-neutral-500 dark:group-hover:text-neutral-300 transition-colors">
                            {post.title}
                          </span>
                          <span className="text-neutral-400 dark:text-neutral-500 text-sm shrink-0">
                            {formatDate(post.date)}
                          </span>
                        </div>
                        {post.description && (
                          <p className="text-neutral-500 dark:text-neutral-400 text-base leading-snug">
                            {post.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}

          {standalone.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="flex items-baseline gap-2 group"
            >
              <span className="text-neutral-400 dark:text-neutral-500 select-none">
                •
              </span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="group-hover:text-neutral-500 dark:group-hover:text-neutral-300 transition-colors">
                    {post.title}
                  </span>
                  <span className="text-neutral-400 dark:text-neutral-500 text-sm shrink-0">
                    {formatDate(post.date)}
                  </span>
                </div>
                {post.description && (
                  <p className="text-neutral-500 dark:text-neutral-400 text-base leading-snug">
                    {post.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
