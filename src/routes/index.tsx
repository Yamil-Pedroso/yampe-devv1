import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/hero/Hero";
import Resume from "@/components/resume/Resume";
import Services from "@/components/services/Services";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <Hero />
      <Resume />
      <Services />
    </div>
  );
}
