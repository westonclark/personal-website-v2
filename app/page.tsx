import { About } from "app/components/about";
import { Experience } from "./components/experience";
import { Projects } from "./components/projects";

export default function Page() {
  return (
    <section className="flex flex-col h-full">
      <div
        className="pt-24 mb-36 md:mb-0 md:min-h-screen md:pt-48 flex items-center justify-center animate-fade-in"
        style={{ animationDelay: "100ms" }}
      >
        <About />
      </div>
      <div
        className="mb-36 md:mb-0 md:min-h-screen flex items-center justify-center animate-fade-in"
        style={{ animationDelay: "200ms" }}
      >
        <Experience />
      </div>
      <div
        className="pb-24 md:pb-32 md:min-h-screen flex items-center justify-center animate-fade-in"
        style={{ animationDelay: "300ms" }}
      >
        <Projects />
      </div>
    </section>
  );
}
