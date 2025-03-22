import { About } from "app/components/about";
import { Experience } from "./components/experience";
import { Projects } from "./components/projects";

export default function Page() {
    return (
        <section className="flex flex-col gap-y-8">
            <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <About />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <Experience />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
                <Projects />
            </div>
        </section>
    );
}
