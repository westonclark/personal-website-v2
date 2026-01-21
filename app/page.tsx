import Link from "next/link";

export default function Page() {
  return (
    <section>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl md:text-4xl font-medium dark:text-white">
          Weston Clark
        </h1>

        <p className="leading-relaxed">
          I am a software engineer and audio engineer and I specialize in
          backend web development and real-time audio processing software.
        </p>

        <p className="leading-relaxed">
          I currently work at
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-800 dark:text-[#d97757] dark:hover:text-[#e08568] transition-colors"
            href="https://www.madwire.com/"
          >
            {" "}
            Madwire{" "}
          </Link>
          where I develop shared services and infra for the{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-800 dark:text-[#d97757] dark:hover:text-[#e08568] transition-colors"
            href="https://www.marketing360.com"
          >
            {" "}
            Marketing 360®{" "}
          </Link>
          fleet of software products.
        </p>

        <p className="leading-relaxed">
          When I'm not writing code, I'm usually
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-800 dark:text-[#d97757] dark:hover:text-[#e08568] transition-colors"
            href="https://open.spotify.com/playlist/2TrlJn4BcZQ1PihCPDFEO3?si=11004ae8d8954ef4"
          >
            {" "}
            recording music
          </Link>
          , reading a good
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-800 dark:text-[#d97757] dark:hover:text-[#e08568] transition-colors"
            href="https://www.goodreads.com/user/show/158954021-weston-clark"
          >
            {" "}
            fantasy novel
          </Link>
          , or watching reruns of Survivor.
        </p>
        <div className="flex space-x-4 pt-2 text-neutral-600 dark:text-neutral-300">
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
        </div>
      </div>
    </section>
  );
}
