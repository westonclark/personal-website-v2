import { About } from "app/components/about";
import { Experience } from "./components/experience";
import { Projects } from "./components/projects";

export default function Page() {
  return (
    <section className="flex flex-col gap-y-8">
      <About />
      <Experience />
      <Projects />
    </section>
  );
}
