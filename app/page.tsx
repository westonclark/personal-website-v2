import Link from "next/link";

export default function Page() {
  return (
    <section className="pt-8 md:pt-4 dark:text-neutral-300">
      <div className="flex flex-col gap-5">
        <h1 className="text-xl md:text-xl font-medium dark:text-white">
          Weston Clark
        </h1>

        <p className="leading-relaxed">
          I'm a software developer living in Portland, OR. I build backend
          services for the web and real-time audio processing software.
        </p>

        <p className="leading-relaxed">
          I currently work at Madwire where I develop internal services for the{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b5420a] hover:text-[#963708] dark:text-[#d97757] dark:hover:text-[#e08568] transition-colors"
            href="https://www.marketing360.com"
          >
            {" "}
            Marketing 360®{" "}
          </Link>
          fleet of software products.
        </p>

        <p className="leading-relaxed">
          In my free time, I've been building an audio mixing engine from
          scratch and{" "}
          <Link
            className="text-[#b5420a] hover:text-[#963708] dark:text-[#d97757] dark:hover:text-[#e08568] transition-colors"
            href="/writing"
          >
            documenting
          </Link>
          {" "}each step of the process . When I'm not writing code, I'm usually
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b5420a] hover:text-[#963708] dark:text-[#d97757] dark:hover:text-[#e08568] transition-colors"
            href="https://open.spotify.com/playlist/2TrlJn4BcZQ1PihCPDFEO3?si=11004ae8d8954ef4"
          >
            {" "}
            recording music{" "}
          </Link>
          or reading a
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b5420a] hover:text-[#963708] dark:text-[#d97757] dark:hover:text-[#e08568] transition-colors"
            href="https://www.goodreads.com/user/show/158954021-weston-clark"
          >
            {" "}
            fantasy novel
          </Link>
          .
        </p>

        <div className="flex space-x-4 text-neutral-600 dark:text-neutral-300 pt-2">
          <div className="flex items-center">
            <span className="mr-1">•</span>
            <Link
              href="/writing"
              className="flex items-center transition-colors duration-200 hover:text-black dark:hover:text-neutral-100"
            >
              Writing
            </Link>
          </div>

          <div className="flex items-center">
            <span className="mr-1">•</span>
            <Link
              href="https://github.com/westonclark"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-colors duration-200 hover:text-black dark:hover:text-neutral-100"
            >
              GitHub
            </Link>
          </div>

          <div className="flex items-center">
            <span className="mr-1">•</span>
            <Link
              href="https://www.linkedin.com/in/westoclark"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-colors duration-200 hover:text-black dark:hover:text-neutral-100"
            >
              LinkedIn
            </Link>
          </div>

          <div className="flex items-center">
            <span className="mr-1">•</span>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-colors duration-200 hover:text-black dark:hover:text-neutral-100"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
