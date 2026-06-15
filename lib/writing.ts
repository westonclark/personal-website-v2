import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

const postsDir = path.join(process.cwd(), "content/writing");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  series?: string;
  part?: number;
};

export type Post = PostMeta & {
  content: string;
};

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        series: data.series,
        part: data.part,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    series: data.series,
    part: data.part,
    content: marked(content) as string,
  };
}
