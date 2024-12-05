import Link from "next/link";

export function About() {
  return (
    <div className="mb-4">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">About Me</h1>
      <p className="mb-4">
        Hi! My name is Weston Clark and I'm a Backend Software Engineer and
        Audio Engineer based in Portland, OR.
      </p>
      <p>
        When I'm not coding &#128187; (which isn't often), you can find me
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-100 transition tabular-nums"
          href="https://open.spotify.com/playlist/2TrlJn4BcZQ1PihCPDFEO3?si=11004ae8d8954ef4"
        >
          {" "}
          recording music{" "}
        </Link>
        &#127899;, watching reruns of Survivor &#127796;, or buried deep in the
        latest{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-neutral-100 transition tabular-nums"
          href="https://www.goodreads.com/user/show/158954021-weston-clark"
        >
          {" "}
          fantasy novel{" "}
        </Link>
        &#128214;.
      </p>
    </div>
  );
}
