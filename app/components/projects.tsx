import Link from "next/link";

export function Projects() {
  let experience = [
    {
      title: "www.faderkeys.com",
      description: "Homepage for purchasing and installing Fader Keys",
      technologies: ["Next.js", "PostgreSQL", "Stripe", "Clerk"],
      link: "https://www.faderkeys.com",
    },
    {
      title: "Fader Keys",
      description: "A virtual MIDI fader controller for ProTools / Logic Pro",
      technologies: ["C++", "Objective-C++", "MIDI HUI Protocol"],
      link: "https://github.com/westonclark/fader-keys",
    },
    {
      title: "Digital Hippo",
      description: "A full stack e-commerce store",
      technologies: ["TypeScript", "tRPC", "Stripe", "Payload CMS"],
      link: "https://github.com/westonclark/digital-hippo",
    },
    {
      title: "Convolution Reverb",
      description: "A convolution reverb plugin for sampling acoustic spaces",
      technologies: ["C++", "JUCE", "Xcode build tools"],
      link: "https://github.com/westonclark/convolution-processor",
    },
    {
      title: "Personal Website",
      description: "The website that you're looking at right now.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://github.com/westonclark/personal-website-v2",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">Projects</h1>
        <div className="h-px w-16 bg-neutral-200 dark:bg-neutral-800"></div>
      </div>
      {experience.map((project) => (
        <Link
          key={project.title}
          className="flex flex-col mb-8 group"
          target="_blank"
          rel="noopener noreferrer"
          href={`${project.link}`}
        >
          <div className="flex flex-col space-y-2">
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight font-medium">
              {project.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-700 group-hover:dark:text-neutral-300 text-sm transition-colors">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
