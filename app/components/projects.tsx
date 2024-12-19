import Link from "next/link";

export function Projects() {
  let experience = [
    {
      title: "Digital Hippo",
      description: "Full Stack E-Commerce Store",
      link: "https://github.com/westonclark/digital-hippo",
    },
    {
      title: "Fader Keys",
      description: "DAW Virtual MIDI Controller",
      link: "https://github.com/westonclark/fader-keys",
    },
    {
      title: "iPhone Studio Mic",
      description: "Mobile Recording iPhone App",
      link: "https://github.com/westonclark/iPhone-Studio-Mic",
    },
    {
      title: "Advent of Code",
      description: "Advent of Code Challenge Solutions",
      link: "https://github.com/westonclark/advent-of-code",
    },
    {
      title: "Portfolio Website",
      description: "This website you're looking at",
      link: "https://github.com/westonclark/personal-website-v2",
    },
  ];

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">Projects</h1>
      {experience.map((project) => (
        <Link
          key={project.title}
          className="flex flex-col space-y-1 mb-4"
          target="_blank"
          rel="noopener noreferrer"
          href={`${project.link}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 group md:items-center">
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {project.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 group-hover:dark:text-neutral-100 text-sm tabular-nums transition ">
              - {project.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
