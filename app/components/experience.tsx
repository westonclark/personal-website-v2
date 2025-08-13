import Link from "next/link";

export function Experience() {
  let experience = [
    {
      dates: "May 2024 - Present",
      title: "Software Engineer II",
      company: "Madwire",
      description:
        "Developing on critical infrastructure including the central apis that manage authentication and permissions for all accounts and user data.",
      technologies: [
        "TypeScript",
        "Go",
        "MySQL",
        "Docker",
        "Kubernetes",
        "Keycloak",
      ],
      link: "https://www.madwire.com/",
    },
    {
      dates: "Feb 2023 - May 2024",
      title: "Full Stack Engineer",
      company: "Watchdogs (OS Labs)",
      description:
        "Designed and developed all aspects of the open source observability platform for AWS Lambda function metrics",
      technologies: ["React.js", "Express.js", "AWS", "Redis", "MongoDB"],
      link: "https://github.com/oslabs-beta/Watchdogs",
    },
    {
      dates: "Jan 2019 - Feb 2023",
      title: "Audio Systems Engineer",
      company: "Octane AVL",
      description:
        "Designed, deployed, and operated professional audio systems for live events and concert venue installations.",
      technologies: [
        "DiGiCo",
        "Avid",
        "Meyer Sound",
        "D&B",
        "L-Acoustics",
        "SMAART",
      ],
      link: "https://www.octaneavl.com/",
    },
    {
      dates: "Jan 2018 - Jan 2019",
      title: "Technical Director",
      company: "Westside AJC",
      description:
        "Managed audio, video, and lighting systems for live productions and streaming broadcasts.",
      technologies: ["Q-SYS", "Dante", "Ableton Live", "Resolume"],
      link: "https://www.ajesuschurch.org/",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">Experience</h1>
        <div className="h-px w-16 bg-neutral-200 dark:bg-neutral-800"></div>
      </div>
      {experience.map((job) => (
        <Link
          key={job.company}
          className="flex flex-col space-y-2 mb-8"
          target="_blank"
          rel="noopener noreferrer"
          href={`${job.link}`}
        >
          <div className="flex flex-col space-y-2 group">
            <div className="flex items-baseline">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight font-medium">
                {job.title}
              </p>
              <span className="mx-2 text-neutral-400">•</span>
              <p className="text-neutral-700 dark:text-neutral-300">
                {job.company}
              </p>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-700 group-hover:dark:text-neutral-300 text-sm transition-colors">
              {job.dates}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {job.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech) => (
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
