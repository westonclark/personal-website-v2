export const metadata = {
  title: 'Contact',
  description: 'Get in touch with me.',
}

export default function Page() {
  return (
    <section className="flex flex-col gap-y-2">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Contact</h1>
      <p>{`Feel free to reach out with any inquiries or questions.`}</p>
      <a href="mailto:westonclark@gmail.com" className="text-neutral-600 dark:text-neutral-400 tabular-nums" >westoclark@gmail.com</a>
    </section>
  )
}
