import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "100ms" }}>
      <h1 className="font-semibold text-2xl mb-4 tracking-tighter">Blog</h1>
      <p>{`Coming Soon!`}</p>
      {/* <BlogPosts /> */}
    </section>
  );
}
