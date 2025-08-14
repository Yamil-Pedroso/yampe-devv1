import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Resume from "@/components/resume/Resume";
import Services from "@/components/services/Services";
import Skills from "@/components/skills/Skills";
import Works from "@/components/works/Works";
import Testimonials from "@/components/testimonials/Testimonials";

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
      <Works />
      <Testimonials />
    </div>
  );
}
