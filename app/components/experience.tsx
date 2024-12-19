import Link from "next/link";

export function Experience() {
  let experience = [
    {
      dates: "May 2024 - Present",
      title: "Software Engineer II",
      company: "Madwire",
      link: "https://www.madwire.com/",
    },
    {
      dates: "Feb 2023 - May 2024",
      title: "Software Engineer",
      company: "Watchdogs",
      link: "https://www.watch-dogs.io/",
    },
    {
      dates: "Jan 2019 - Feb 2023",
      title: "Audio Software Engineer",
      company: "Octane AVL",
      link: "https://www.octaneavl.com/portfolio",
    },
    {
      dates: "Jan 2018 - Jan 2019",
      title: "Technical Director",
      company: "Westside AJC",
      link: "https://www.ajesuschurch.org/",
    },
    {
      dates: "Oct 2014 - Dec 2017",
      title: "Audio Engineer",
      company: "Bethel Church",
      link: "https://www.bethel.com/",
    },
  ];

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">
        Experience
      </h1>
      {experience.map((job) => (
        <Link
          key={job.company}
          className="flex flex-col space-y-1 mb-4"
          target="_blank"
          rel="noopener noreferrer"
          href={`${job.link}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 group md:items-center">
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {job.title} - {job.company}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 group-hover:dark:text-neutral-100 text-sm transition tabular-nums">
              {job.dates}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
