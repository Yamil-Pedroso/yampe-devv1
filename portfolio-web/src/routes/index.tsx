import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Resume from "@/components/resume/Resume";
import Services from "@/components/services/Services";
import Skills from "@/components/skills/Skills";
import Works from "@/components/works/Works";
import Testimonials from "@/components/testimonials/Testimonials";
import GetInTouch from "@/components/get-in-touch/GetInTouch";
import NewsAndBlogs from "@/components/news-&-blogs/NewsAndBlogs";
import ClientsAndFirmas from "@/components/clients-&-firmas/ClientsAndFirmas";

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
      <GetInTouch />
      <NewsAndBlogs />
      <ClientsAndFirmas />
    </div>
  );
}
