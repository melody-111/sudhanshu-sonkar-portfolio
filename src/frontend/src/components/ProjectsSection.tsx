import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Server, Layout, GitBranch } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  color: "cyan" | "purple" | "mixed";
  status: "in-progress" | "planned" | "wip";
}

const PROJECTS: Project[] = [
  {
    id: "cloud-deploy",
    title: "Cloud Deploy Dashboard",
    description:
      "A real-time AWS deployment monitoring dashboard built with React. Tracks EC2 instances, S3 buckets, Lambda functions, and ECS clusters with live status updates.",
    tags: ["React", "AWS", "TypeScript", "Node.js", "Docker"],
    icon: <Server size={22} />,
    color: "cyan",
    status: "in-progress",
  },
  {
    id: "portfolio",
    title: "3D React Portfolio",
    description:
      "This very portfolio — built with React Three Fiber, featuring interactive 3D scenes, glassmorphism UI, and deployed on ICP via Caffeine. Frontend + cloud in one.",
    tags: ["React", "Three.js", "ICP", "TypeScript", "Tailwind"],
    icon: <Layout size={22} />,
    color: "purple",
    status: "wip",
  },
  {
    id: "devops-pipeline",
    title: "DevOps Pipeline Automation",
    description:
      "End-to-end CI/CD pipeline using GitLab CI + Docker + Kubernetes. Automates build, test, containerization, and deployment to AWS ECS with rollback capabilities.",
    tags: ["GitLab CI", "Docker", "Kubernetes", "Python", "AWS ECS"],
    icon: <GitBranch size={22} />,
    color: "mixed",
    status: "planned",
  },
];

const STATUS_MAP = {
  "in-progress": { label: "In Progress", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" },
  wip: { label: "Live", color: "text-green-400 bg-green-400/10 border-green-400/30" },
  planned: { label: "Planned", color: "text-muted-foreground bg-muted/50 border-border/30" },
};

const COLOR_BORDER = {
  cyan: "border-neon-cyan/20 hover:border-neon-cyan/50 hover:shadow-neon-cyan",
  purple: "border-neon-purple/20 hover:border-neon-purple/50 hover:shadow-neon-purple",
  mixed: "border-border/30 hover:border-neon-cyan/30",
};

const COLOR_ICON = {
  cyan: "bg-neon-cyan/10 text-neon-cyan",
  purple: "bg-neon-purple/10 text-neon-purple",
  mixed: "bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 text-foreground",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const status = STATUS_MAP[project.status];

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? "transform 0.5s ease" : "transform 0.1s ease",
      }}
      className={`reveal reveal-delay-${index + 1} glass-strong rounded-2xl p-6 border transition-all duration-300 flex flex-col ${COLOR_BORDER[project.color]}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${COLOR_ICON[project.color]}`}>
          {project.icon}
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-mono border ${status.color}`}>
          {status.label}
        </span>
      </div>

      <h3 className="font-display font-semibold text-foreground text-lg mb-2">
        {project.title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-xs font-mono glass border border-border/30 text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <button
          type="button"
          disabled
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-semibold glass border border-border/30 text-muted-foreground cursor-not-allowed opacity-60"
        >
          <Github size={14} />
          Source
        </button>
        <button
          type="button"
          disabled
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-semibold glass border border-border/30 text-muted-foreground cursor-not-allowed opacity-60"
        >
          <ExternalLink size={14} />
          View Project
        </button>
      </div>
    </article>
  );
}

export function ProjectsSection() {
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
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden section-grid-bg"
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-neon-cyan/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-neon-purple/3 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 reveal">
          <span className="w-8 h-px bg-neon-cyan" />
          <span className="font-mono text-sm text-neon-cyan tracking-widest uppercase">
            Projects
          </span>
        </div>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4 reveal reveal-delay-1 leading-tight">
          What I&apos;ve{" "}
          <span className="gradient-text">Built</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12 reveal reveal-delay-2">
          A mix of frontend interfaces, cloud infrastructure, and DevOps tooling.
          Each project is a step toward full-stack mastery.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
