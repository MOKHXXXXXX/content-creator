import { Hero } from "@/app/sections/Hero";
import { About } from "@/app/sections/About";
import { Services } from "@/app/sections/Services";
import { Portfolio } from "@/app/sections/Portfolio";
import { Testimonials } from "@/app/sections/Testimonials";
import { Contact } from "@/app/sections/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
    </main>
  );
}
