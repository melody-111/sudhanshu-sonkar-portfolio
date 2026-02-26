import { useEffect, useRef, useState } from "react";
import { Send, Mail, MessageSquare, User } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactMessage } from "../hooks/useQueries";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { mutate: submitContact, isPending } = useSubmitContactMessage();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    submitContact(
      { name, email, message },
      {
        onSuccess: () => {
          toast.success("Message sent! I'll get back to you soon.");
          setName("");
          setEmail("");
          setMessage("");
        },
        onError: () => {
          toast.error("Failed to send message. Please try again.");
        },
      }
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.07_0.02_265)] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-neon-cyan/4 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 reveal">
          <span className="w-8 h-px bg-neon-cyan" />
          <span className="font-mono text-sm text-neon-cyan tracking-widest uppercase">
            Contact
          </span>
        </div>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4 reveal reveal-delay-1 leading-tight">
          Let&apos;s{" "}
          <span className="gradient-text">Connect</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12 reveal reveal-delay-2">
          Open to freelance projects, internships, and collaborations. Drop me a
          message!
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact info */}
          <div className="reveal reveal-delay-2 space-y-6">
            {/* Info card */}
            <div className="glass-strong neon-border rounded-2xl p-6">
              <h3 className="font-display font-semibold text-foreground text-lg mb-4">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 flex items-center justify-center text-neon-cyan shrink-0">
                    <Mail size={16} />
                  </div>
                  <span className="font-mono text-sm">
                    sudhanshu.sonkar@example.com
                  </span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-8 h-8 rounded-lg bg-neon-purple/10 flex items-center justify-center text-neon-purple shrink-0">
                    <MessageSquare size={16} />
                  </div>
                  <span className="font-mono text-sm">
                    Available for AWS deployments & projects
                  </span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="glass-strong neon-border-purple rounded-2xl p-6">
              <h3 className="font-display font-semibold text-foreground text-base mb-4">
                Find Me Online
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass neon-border text-foreground hover:text-neon-cyan transition-colors text-sm font-display font-medium"
                >
                  <SiGithub size={18} />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass neon-border-purple text-foreground hover:text-neon-purple transition-colors text-sm font-display font-medium"
                >
                  <SiLinkedin size={18} />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Status indicator */}
            <div className="glass rounded-2xl p-4 flex items-center gap-3 border border-green-400/20">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0" />
              <div>
                <p className="font-display text-sm font-medium text-foreground">
                  Available for Work
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  Typically responds within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <form
            onSubmit={handleSubmit}
            className="glass-strong neon-border rounded-2xl p-6 space-y-5 reveal reveal-delay-3"
          >
            <h3 className="font-display font-semibold text-foreground text-lg mb-2">
              Send a Message
            </h3>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-name"
                className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"
              >
                <User size={12} />
                Name
              </label>
              <Input
                id="contact-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-muted/30 border-border/30 focus:border-neon-cyan focus:ring-0 font-mono text-sm placeholder:text-muted-foreground/50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"
              >
                <Mail size={12} />
                Email
              </label>
              <Input
                id="contact-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/30 border-border/30 focus:border-neon-cyan focus:ring-0 font-mono text-sm placeholder:text-muted-foreground/50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-message"
                className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"
              >
                <MessageSquare size={12} />
                Message
              </label>
              <Textarea
                id="contact-message"
                placeholder="Tell me about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="bg-muted/30 border-border/30 focus:border-neon-cyan focus:ring-0 font-mono text-sm placeholder:text-muted-foreground/50 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-display font-semibold text-sm bg-neon-cyan text-background hover:shadow-neon-cyan transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              {isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
