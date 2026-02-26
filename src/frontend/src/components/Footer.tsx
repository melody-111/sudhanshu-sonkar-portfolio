import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-8 border-t border-border/20">
      <div className="absolute inset-0 section-grid-bg opacity-30" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
          <span className="gradient-text font-display font-semibold">SS</span>
          <span>·</span>
          <span>Sudhanshu Sonkar</span>
        </div>

        <p className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
          © 2026. Built with{" "}
          <Heart size={12} className="text-neon-purple fill-neon-purple" /> using{" "}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan hover:underline"
          >
            caffeine.ai
          </a>
        </p>

        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <span>BTech CSE</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>Frontend + DevOps</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-neon-cyan">Prompt Engineer</span>
        </div>
      </div>
    </footer>
  );
}
