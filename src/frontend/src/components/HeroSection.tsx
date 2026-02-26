import { Suspense, useEffect, useState } from "react";
import { Cloud, ChevronDown } from "lucide-react";
import { HeroScene } from "./HeroScene";

const TITLES = [
  "Frontend Developer",
  "DevOps Engineer",
  "Prompt Engineer",
  "Cloud Architect",
];

function TypewriterText() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    const speed = isDeleting ? 50 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayed.length < currentTitle.length) {
        setDisplayed(currentTitle.slice(0, displayed.length + 1));
      } else if (!isDeleting && displayed.length === currentTitle.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayed.length > 0) {
        setDisplayed(displayed.slice(0, -1));
      } else if (isDeleting && displayed.length === 0) {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIndex]);

  return (
    <span className="text-neon-cyan font-mono">
      {displayed}
      <span className="animate-pulse text-neon-cyan">|</span>
    </span>
  );
}

export function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep space background gradient */}
      <div className="absolute inset-0 bg-deep-space">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.12_0.04_265)] via-[oklch(0.08_0.02_280)] to-[oklch(0.1_0.03_250)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl" />
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 glass neon-border rounded-full px-4 py-2 text-sm font-mono text-neon-cyan mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          Available for AWS Deployments
          <Cloud size={14} className="text-neon-cyan" />
        </div>

        {/* Name */}
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-4 animate-slide-up leading-none tracking-tight">
          <span className="block">Sudhanshu</span>
          <span className="block gradient-text glow-cyan">Sonkar</span>
        </h1>

        {/* Typewriter */}
        <div className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-muted-foreground mb-8 h-10 animate-fade-in">
          <TypewriterText />
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in leading-relaxed">
          BTech CSE student bridging the gap between beautiful frontends and
          robust DevOps pipelines. From React to Kubernetes — I ship it all.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <button
            type="button"
            onClick={() => handleScroll("#projects")}
            className="group relative px-8 py-3.5 rounded-full font-display font-semibold text-sm bg-neon-cyan text-background hover:shadow-neon-cyan transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("#contact")}
            className="px-8 py-3.5 rounded-full font-display font-semibold text-sm glass neon-border text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 hover:scale-105"
          >
            Contact Me
          </button>
        </div>

        {/* Skill tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-10 animate-fade-in">
          {["React", "AWS", "Docker", "Kubernetes", "Prompt Engineering"].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono glass border border-border/30 text-muted-foreground"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => handleScroll("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted-foreground hover:text-neon-cyan transition-colors animate-float"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono">scroll</span>
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
