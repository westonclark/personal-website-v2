import { About } from "app/components/about";
import { Experience } from "./components/experience";
import { Projects } from "./components/projects";

export default function Page() {
  return (
    <section className="flex flex-col h-full">
      <div className="min-h-screen flex items-center justify-center animate-fade-in" style={{ animationDelay: "100ms" }}>
        <About />
      </div>
      <div className="min-h-screen flex items-center justify-center animate-fade-in" style={{ animationDelay: "200ms" }}>
        <Experience />
      </div>
      <div className="min-h-screen flex items-center justify-center animate-fade-in pb-32" style={{ animationDelay: "300ms" }}>
        <Projects />
      </div>
    </section>
  );
}
