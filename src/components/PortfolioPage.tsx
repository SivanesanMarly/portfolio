// src/components/PortfolioPage.tsx

"use client";

import { useEffect, useRef, useState } from "react";

import {
  certifications,
  education,
  highlights,
  skillGroups,
} from "@/data/portfolio";

import { ExperienceCards } from "./ExperienceCards";
import { ProjectsGrid } from "./ProjectsGrid";
import { Background3D } from "./Background3D";
import { LiveLocationMap } from "./LiveLocationMap";

export function PortfolioPage() {
  const [showHeader, setShowHeader] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerTypedText, setHeaderTypedText] = useState("Full Stack Engineer");
  const lastScrollY = useRef(0);

  // Scroll handler
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY.current;
        const nearTop = currentScrollY < 32;

        setShowHeader(nearTop || !scrollingDown || isMobileMenuOpen);
        setShowScrollTop(currentScrollY > 500);
        lastScrollY.current = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Typewriter effect
  useEffect(() => {
    const roles = [
      "Full Stack Engineer",
      "Mobile App Engineer",
    ];

    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;
    let timer: number;

    const runTypewriter = () => {
      const currentRole = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        setHeaderTypedText(currentRole.slice(0, charIndex));

        if (charIndex >= currentRole.length) {
          deleting = true;
          timer = window.setTimeout(runTypewriter, 1400);
          return;
        }

        timer = window.setTimeout(runTypewriter, 75);
        return;
      }

      charIndex--;
      setHeaderTypedText(currentRole.slice(0, charIndex));

      if (charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timer = window.setTimeout(runTypewriter, 350);
        return;
      }

      timer = window.setTimeout(runTypewriter, 40);
    };

    timer = window.setTimeout(runTypewriter, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  // Scroll reveal animation (fixed for mobile)
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-animate]");
    const isMobile = window.innerWidth < 768;

    // Show all elements on mobile immediately
    if (isMobile) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative text-[var(--foreground)]">
      {/* Background */}
      <div className="portfolio-background" aria-hidden="true">
        <Background3D />
        <div className="portfolio-background-grid" />
        <div className="portfolio-background-glow" />
      </div>

      {/* Main Content */}
      <div className="site-shell relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-24 pt-6 sm:px-8 lg:px-10">
        {/* Header */}
        <header
          className={`site-header glass-panel fixed left-1/2 top-4 z-30 flex -translate-x-1/2 items-center justify-between gap-3 rounded-full px-4 py-3.5 transition-opacity duration-300 sm:px-5 lg:px-6 ${
            showHeader ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="header-brand">
            <p className="font-display text-xs uppercase tracking-[0.35em] text-[var(--muted)] sm:text-sm">
              Sivanesan A
            </p>
            <p className="header-typewriter text-xs text-[var(--soft-text)] sm:text-sm">
              <span>{headerTypedText}</span>
              <span className="header-typewriter-caret" aria-hidden="true" />
            </p>
          </div>

          <div className="header-actions">
            <nav className="hidden items-center gap-1 text-sm text-[var(--soft-text)] md:flex">
              <a href="#experience" className="nav-link">Experience</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>

            <button
              type="button"
              className={`mobile-menu-toggle ${isMobileMenuOpen ? "is-open" : ""}`}
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <nav
            id="mobile-navigation"
            className={`mobile-navigation ${isMobileMenuOpen ? "is-open" : ""}`}
            aria-label="Mobile navigation"
          >
            <a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
            <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
            <a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="hero-section grid items-start gap-10 pb-20 pt-28 sm:gap-12 sm:pb-24 sm:pt-32 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:pt-36">
          <div className="hero-copy">
            <p className="hero-badge mb-5 inline-flex rounded-full border border-[var(--panel-border)] bg-[var(--soft-surface)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--accent-2)]">
              Product-minded engineering. Reliable delivery. Measurable impact.
            </p>
            <h1 className="font-display max-w-4xl text-4xl leading-[1] font-semibold tracking-tight text-[var(--heading)] sm:text-6xl lg:text-7xl">
              I build high-performance web and mobile products that solve real business problems.
            </h1>
            <p className="hero-description mt-6 max-w-2xl text-base leading-8 text-[var(--text)] sm:text-lg lg:text-xl">
              Full Stack Developer delivering scalable web applications, real-time mobile experiences, and production-grade ERP systems using Next.js, Flutter, Python, and PostgreSQL.
            </p>
            <div className="hero-actions mt-8 flex flex-wrap gap-3">
              <a className="button-primary" href="#contact">Let&apos;s Work Together</a>
              <a className="button-secondary" href="#experience">View Experience</a>
            </div>
            <div className="hero-highlights mt-12 grid gap-4 sm:grid-cols-3 stagger perspective-1000">
              {highlights.map((item) => (
                <article key={item} className="glass-card hero-highlight-card tilt-3d px-5 py-5" data-animate>
                  <p className="text-sm leading-6 text-[var(--text)]">{item}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="hero-aside perspective-1000">
            <div className="hero-card tilt-3d rounded-[2rem] p-6 sm:p-8" data-animate>
              <div className="flex items-center justify-between">
                <p className="font-display text-2xl text-[var(--heading)]">Profile Snapshot</p>
                <span className="status-pill">Available</span>
              </div>
              <div className="mt-8 space-y-5">
                <div className="stat-card"><span>Experience</span><strong>2+ Year</strong></div>
                <div className="stat-card"><span>Focus Areas</span><strong>Web Platforms, Mobile Apps, and Product UX</strong></div>
                <div className="stat-card"><span>Core Stack</span><strong>Next.js, Flutter, Python, PostgreSQL</strong></div>
              </div>
              <div className="inner-panel mt-8 rounded-[1.5rem] p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">Objective</p>
                <p className="mt-3 text-base leading-7 text-[var(--text)]">
                  Build software that is fast, reliable, and genuinely useful. I focus on clean architecture, intuitive interfaces, and backend systems that scale with confidence.
                </p>
              </div>
            </div>
          </aside>
        </section>

        {/* About Section */}
        <section className="section-shell about-section" data-animate>
          <div className="section-heading">
            <p>About</p>
            <h2>Engineering with ownership, clarity, and impact</h2>
          </div>
          <div className="about-bento-grid stagger perspective-1000">
            <article className="about-card about-card-narrative tilt-3d">
              <div className="about-quote-mark" aria-hidden="true">&ldquo;</div>
              <p className="about-narrative-text">
                I design and ship <span className="text-highlight">scalable web and mobile products</span> with strong attention to usability, performance, security, and long-term maintainability. My work spans <span className="text-highlight">geospatial systems, ecommerce, real-time mobile platforms, and ERP products</span> used in daily operations.
              </p>
              <div className="about-signature">— Sivanesan A</div>
            </article>
            <div className="about-info-chip about-chip-1 tilt-3d"><span className="chip-label">Based In</span><span className="chip-value">Edamalaipatti Pudur, Trichy</span></div>
            <div className="about-info-chip about-chip-2 tilt-3d"><span className="chip-label">Phone</span><span className="chip-value">+91 63793 75144</span></div>
            <div className="about-info-chip about-chip-3 tilt-3d"><span className="chip-label">Email</span><span className="chip-value">sivanesan8113@gmail.com</span></div>
            <div className="about-info-chip about-chip-4 tilt-3d"><span className="chip-label">Strength</span><span className="chip-value">UI-focused engineering with backend depth</span></div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section-shell" data-animate>
          <div className="section-heading">
            <p>Experience</p>
            <h2>Execution that delivers measurable product value</h2>
          </div>
          <ExperienceCards />
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-shell" data-animate>
          <div className="projects-header">
            <div className="section-heading mb-0">
              <p>Projects</p>
              <h2>Selected work across web, mobile, and real-time systems</h2>
            </div>
          </div>
          <ProjectsGrid />
        </section>

        {/* Skills Section */}
        <section id="skills" className="section-shell" data-animate>
          <div className="section-heading">
            <p>Skills</p>
            <h2>Capabilities that turn ideas into production-ready products</h2>
          </div>
          <div className="skills-grid stagger perspective-1000 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group) => (
              <article key={group.title} className="skill-card tilt-3d h-full p-6">
                <div className={`skill-card-glow bg-gradient-to-r ${group.accent}`} />
                <div className="skill-card-top">
                  <div className="skill-icon">
                    {group.title.split(" ").map((word) => word[0]).join("").slice(0, 2)}
                  </div>
                  <p className="skill-label">{group.label}</p>
                </div>
                <p className="mt-5 font-display text-2xl text-[var(--heading)]">{group.title}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text)]">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span key={item} className="skill-tag">{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="section-shell" data-animate>
          <div className="info-grid grid gap-5 lg:grid-cols-2">
            <article className="glass-card content-card p-6 sm:p-8 tilt-3d">
              <div className="section-heading mb-6"><p>Education</p><h2>Academic background</h2></div>
              <div className="space-y-4">
                {education.map((item) => (
                  <div key={item.title} className="info-row">
                    <div>
                      <p className="text-lg font-semibold text-[var(--heading)]">{item.title}</p>
                      <p className="mt-1 text-sm text-[var(--soft-text)]">{item.place}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[var(--soft-text)]">{item.meta}</p>
                      <p className="mt-1 text-base text-[var(--accent-2)]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <article className="glass-card content-card p-6 sm:p-8 tilt-3d">
              <div className="section-heading mb-6"><p>Recognition</p><h2>Professional Certifications</h2></div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Certifications</p>
                <ul className="mt-4 space-y-3">
                  {certifications.map((item) => (
                    <li key={item} className="feature-row text-[var(--text)]"><span className="feature-dot" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* Work Proposal */}
        <section id="proposal" className="section-shell" data-animate>
          <div className="proposal-panel tilt-3d rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent-2)]">Work Proposal</p>
                <h2 className="mt-3 font-display text-4xl leading-tight text-[var(--heading)] sm:text-5xl">If it matters to your business, I can turn it into a reliable product.</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text)] sm:text-lg">I bring strong confidence, fast learning, and disciplined execution. From discovery to deployment, I solve complex problems with clarity, communicate proactively, and deliver outcomes that are stable, scalable, and user-centered.</p>
              </div>
              <div className="proposal-points rounded-[1.5rem] p-5 sm:p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">What You Can Expect</p>
                <ul className="mt-4 space-y-3">
                  <li className="feature-row text-[var(--text)]"><span className="feature-dot" /><span>End-to-end ownership from planning to production release.</span></li>
                  <li className="feature-row text-[var(--text)]"><span className="feature-dot" /><span>Smart technical decisions aligned with business priorities.</span></li>
                  <li className="feature-row text-[var(--text)]"><span className="feature-dot" /><span>Consistent quality, speed, and accountability in delivery.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-shell pb-0" data-animate>
          <div className="section-heading">
            <p>Contact</p>
            <h2>Let&apos;s build your next product with speed, quality, and confidence.</h2>
          </div>

          <div className="contact-bento-layout perspective-1000">
            <article className="contact-card-pitch tilt-3d">
              <div className="contact-pitch-glow" aria-hidden="true" />
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent-2)] mb-4">Let&apos;s Connect</p>
              <h3 className="font-display text-3xl text-[var(--heading)] mb-4">Open to full stack and mobile opportunities.</h3>
              <p className="text-[var(--text)] mb-8 max-w-md">If product quality, secure architecture, and great user experience are non-negotiable, I&apos;d love to hear from you.</p>
              <div className="flex flex-wrap gap-3">
                <a className="button-primary" href="mailto:sivanesan8113@gmail.com">Email for Project Work</a>
                <a className="button-secondary" href="tel:+916379375144">Call: +91 63793 75144</a>
              </div>
            </article>

            <div className="contact-tile contact-tile-combined tilt-3d">
              <div className="contact-tile-inner">
                <div className="contact-section-block">
                  <span className="contact-tile-label">Live Location</span>
                  <p className="contact-tile-value">Edamalaipatti Pudur, Trichy.</p>
                  <a className="live-map-link mt-1" href="https://www.google.com/maps/search/?api=1&query=Edamalaipatti+Pudur" target="_blank" rel="noopener noreferrer">Get Directions →</a>
                </div>

                <div className="contact-divider" aria-hidden="true" />

                <div className="contact-section-block">
                  <span className="contact-tile-label">Profiles</span>
                  <div className="profile-icons-grid">
                    <a href="https://github.com/SivanesanMarly" target="_blank" rel="noopener noreferrer" className="profile-icon-btn is-github" aria-label="GitHub">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                    </a>

                    <a href="https://www.linkedin.com/in/sivanesan-a-224a0928a" target="_blank" rel="noopener noreferrer" className="profile-icon-btn is-linkedin" aria-label="LinkedIn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-map-wrapper tilt-3d">
              <LiveLocationMap />
            </div>
          </div>
        </section>
      </div>

      {/* Scroll to top button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`scroll-top-btn ${showScrollTop ? "is-visible" : ""}`}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </main>
  );
}
