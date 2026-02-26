import { useEffect, useRef } from "react";
import { GraduationCap, Code2, Terminal, Cpu } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: GraduationCap,
    label: "BTech CSE",
    desc: "Computer Science Engineering student",
  },
  {
    icon: Code2,
    label: "Frontend Dev",
    desc: "React, TypeScript, modern CSS",
  },
  {
    icon: Terminal,
    label: "DevOps Engineer",
    desc: "Linux, Docker, Kubernetes, CI/CD",
  },
  {
    icon: Cpu,
    label: "Prompt Engineer",
    desc: "Advanced AI prompt design & optimization",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) => {
              el.classList.add("revealed");
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden section-grid-bg"
    >
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-neon-cyan/3 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-neon-purple/3 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4 reveal">
          <span className="w-8 h-px bg-neon-cyan" />
          <span className="font-mono text-sm text-neon-cyan tracking-widest uppercase">
            About Me
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-6 reveal reveal-delay-1 leading-tight">
              Dev + Ops{" "}
              <span className="gradient-text">Hybrid</span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed reveal reveal-delay-2">
              <p>
                I&apos;m a BTech CSE student passionate about building scalable
                frontends and robust DevOps pipelines. I bridge the gap between
                development and deployment — from writing clean React code to
                shipping on AWS.
              </p>
              <p>
                What sets me apart? I don&apos;t just write code — I{" "}
                <span className="text-neon-cyan font-medium">deploy it</span>,{" "}
                <span className="text-neon-purple font-medium">containerize it</span>, and{" "}
                <span className="text-neon-cyan font-medium">orchestrate it</span> at
                scale. From GitHub Actions pipelines to Kubernetes clusters, I
                handle the full lifecycle.
              </p>
              <p>
                I also practice{" "}
                <span className="text-neon-purple font-medium">Prompt Engineering</span>{" "}
                — designing advanced AI prompts and leveraging LLMs for
                automation, code generation, and workflow optimization.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8 reveal reveal-delay-3">
              <span className="px-3 py-1.5 rounded-full text-xs font-mono glass neon-border text-neon-cyan">
                ☁️ AWS Certified Skills
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-mono glass neon-border-purple text-neon-purple">
                🤖 Prompt Engineer
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-mono glass border border-border/30 text-muted-foreground">
                🐧 Linux Power User
              </span>
            </div>
          </div>

          {/* Right: Card grid */}
          <div className="grid grid-cols-2 gap-4 reveal reveal-delay-2">
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`glass-strong rounded-2xl p-5 card-hover ${
                    idx % 2 === 0 ? "neon-border" : "neon-border-purple"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                      idx % 2 === 0
                        ? "bg-neon-cyan/10 text-neon-cyan"
                        : "bg-neon-purple/10 text-neon-purple"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                    {item.label}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}

            {/* Avatar card */}
            <div className="col-span-2 glass-strong rounded-2xl p-4 flex items-center gap-4 neon-border animate-float-delayed">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-neon-cyan/30">
                <img
                  src="/assets/generated/avatar-dev-transparent.dim_400x400.png"
                  alt="Sudhanshu Sonkar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-sm">
                  Sudhanshu Sonkar
                </p>
                <p className="text-muted-foreground text-xs font-mono">
                  BTech CSE · Frontend + DevOps
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400 font-mono">
                    Open to opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
