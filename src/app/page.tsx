import About from "@/components/About/About";
import BackToTop from "@/components/BackToTop/BackToTop";
import Contact from "@/components/Contact/Contact";
import Experience from "@/components/Experience/Experience";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Philosophy from "@/components/Philosophy/Philosophy";
import Projects from "@/components/Projects/Projects";
import RevealObserver from "@/components/RevealObserver/RevealObserver";
import Skills from "@/components/Skills/Skills";
import TechInterests from "@/components/TechInterests/TechInterests";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/utils/environment";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: getSiteUrl(),
    sameAs: [profile.github, profile.linkedin],
    address: { "@type": "PostalAddress", addressCountry: profile.countryCode },
  };

  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Header />
      <main id="contenu" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Philosophy />
        <TechInterests />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <RevealObserver />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
