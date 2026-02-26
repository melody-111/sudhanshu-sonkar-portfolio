import { useEffect, useRef } from "react";
import { Monitor, Cloud, Sparkles } from "lucide-react";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiCss3,
  SiHtml5,
  SiLinux,
  SiGithub,
  SiGitlab,
  SiPython,
  SiAmazon,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";

interface Skill {
  name: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: "cyan" | "purple" | "green";
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: <Monitor size={20} />,
    color: "cyan",
    skills: [
      { name: "React", icon: <SiReact /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "CSS3", icon: <SiCss3 /> },
      { name: "HTML5", icon: <SiHtml5 /> },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: <Cloud size={20} />,
    color: "purple",
    skills: [
      { name: "Linux", icon: <SiLinux /> },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "GitLab", icon: <SiGitlab /> },
      { name: "Python", icon: <SiPython /> },
      { name: "AWS", icon: <SiAmazon />, highlight: true },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Kubernetes", icon: <SiKubernetes /> },
    ],
  },
  {
    title: "AI & Deployment",
    icon: <Sparkles size={20} />,
    color: "green",
    skills: [
      { name: "Prompt Engineering", icon: <Sparkles size={14} />, highlight: true },
      { name: "AWS Deployment", icon: <SiAmazon />, highlight: true },
      { name: "CI/CD Pipelines", icon: <SiGithub /> },
      { name: "Infrastructure as Code", icon: <SiAmazon /> },
    ],
  },
];

const COLOR_MAP = {
  cyan: {
    border: "neon-border",
    icon: "bg-neon-cyan/10 text-neon-cyan",
    title: "text-neon-cyan",
    pill: "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20",
    pillHighlight:
      "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 shadow-neon-cyan",
  },
  purple: {
    border: "neon-border-purple",
    icon: "bg-neon-purple/10 text-neon-purple",
    title: "text-neon-purple",
    pill: "bg-neon-purple/10 text-neon-purple border border-neon-purple/20",
    pillHighlight:
      "bg-neon-purple/20 text-neon-purple border border-neon-purple/40 shadow-neon-purple",
  },
  green: {
    border: "border border-[oklch(0.75_0.18_155/0.4)]",
    icon: "bg-[oklch(0.75_0.18_155/0.1)] text-[oklch(0.75_0.18_155)]",
    title: "text-[oklch(0.75_0.18_155)]",
    pill: "bg-[oklch(0.75_0.18_155/0.1)] text-[oklch(0.75_0.18_155)] border border-[oklch(0.75_0.18_155/0.2)]",
    pillHighlight:
      "bg-[oklch(0.75_0.18_155/0.25)] text-[oklch(0.75_0.18_155)] border border-[oklch(0.75_0.18_155/0.5)] font-semibold",
  },
};

function SkillCard({ category }: { category: SkillCategory }) {
  const colors = COLOR_MAP[category.color];

  return (
    <div
      className={`glass-strong rounded-2xl p-6 card-hover ${colors.border}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colors.icon}`}>
          {category.icon}
        </div>
        <h3 className={`font-display font-semibold text-base ${colors.title}`}>
          {category.title}
        </h3>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
              skill.highlight ? colors.pillHighlight : colors.pill
            }`}
          >
            <span className="text-[0.9rem] leading-none">{skill.icon}</span>
            {skill.name}
            {skill.highlight && (
              <span className="ml-1 text-[0.6rem] uppercase tracking-wider opacity-75">
                ★
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.09_0.02_280/0.5)] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-purple/3 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 reveal">
          <span className="w-8 h-px bg-neon-purple" />
          <span className="font-mono text-sm text-neon-purple tracking-widest uppercase">
            Skills & Tools
          </span>
        </div>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4 reveal reveal-delay-1 leading-tight">
          My{" "}
          <span className="gradient-text">Arsenal</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12 reveal reveal-delay-2">
          From pixel-perfect frontends to production-ready cloud infrastructure
          — the full stack.
        </p>

        {/* AWS highlight banner */}
        <div className="glass neon-border rounded-2xl p-4 flex items-center gap-4 mb-10 reveal reveal-delay-2 max-w-2xl">
          <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan shrink-0">
            <SiAmazon size={22} />
          </div>
          <div>
            <p className="font-display font-semibold text-foreground text-sm">
              AWS Deployment Specialist
            </p>
            <p className="text-muted-foreground text-xs font-mono">
              EC2 · S3 · Lambda · ECS · CloudFormation · IAM
            </p>
          </div>
          <span className="ml-auto px-3 py-1 rounded-full text-xs font-mono bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 shrink-0">
            ⭐ Expert
          </span>
        </div>

        {/* Skill cards grid */}
        <div className="grid md:grid-cols-3 gap-6 reveal reveal-delay-3">
          {SKILL_CATEGORIES.map((cat) => (
            <SkillCard key={cat.title} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
