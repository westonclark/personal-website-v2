import Link from "next/link";

export default function Page() {
  return (
    <section>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl md:text-2xl font-medium">Weston Clark</h1>

        <p className="leading-relaxed">
          Hello, I am software engineer and an audio engineer. I specialize in
          backend web development but also enjoy writing real time audio DSP
          software.
        </p>

        <p className="leading-relaxed">
          I currently work at Madwire where I develop shared services for the{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 dark:text-blue-400"
            href="https://www.marketing360.com"
          >
            {" "}
            Marketing 360®{" "}
          </Link>
          digital marketing platform.
        </p>

        <p className="leading-relaxed">
          When I'm not writing code, I'm usually
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 dark:text-blue-400"
            href="https://open.spotify.com/playlist/2TrlJn4BcZQ1PihCPDFEO3?si=11004ae8d8954ef4"
          >
            {" "}
            recording music 🎵
          </Link>
          , reading a good
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 dark:text-blue-400"
            href="https://www.goodreads.com/user/show/158954021-weston-clark"
          >
            {" "}
            fantasy novel 📚
          </Link>
          , or watching reruns of Survivor &#127965; .
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
