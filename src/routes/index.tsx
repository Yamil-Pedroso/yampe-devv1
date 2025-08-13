import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Resume from "@/components/resume/Resume";
import Services from "@/components/services/Services";
import Skills from "@/components/skills/Skills";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="">
      <Hero />
      <About />
      <Resume />
      <Services />
      <Skills />
    </div>
  );
}
