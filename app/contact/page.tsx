export const metadata = {
  title: "Contact",
  description: "Get in touch with me.",
};

export default function Page() {
  return (
    <section className="flex flex-col gap-y-2">
      <h1 className="font-semibold text-2xl mb-4 tracking-tighter">Contact</h1>
      <p>{`Feel free to reach out with any inquiries or questions.`}</p>
      <a
        href="mailto:westoclark@gmail.com"
        className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-100 transition tabular-nums"
      >
        westoclark@gmail.com
      </a>
    </section>
  );
}
