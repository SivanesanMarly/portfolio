"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  achievements,
  certifications,
  education,
  highlights,
  skillGroups,
} from "@/data/portfolio";
import { ExperienceCards } from "./ExperienceCards";
import { ProjectsCarousel } from "./ProjectsCarousel";

const headerRoles = ["Full Stack Web Developer", "Mobile App Developer"];

export function PortfolioPage() {
  const [showHeader, setShowHeader] = useState(true);
  const [headerRoleIndex, setHeaderRoleIndex] = useState(0);
  const [headerTypedText, setHeaderTypedText] = useState("");
  const [headerDeleting, setHeaderDeleting] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : prefersDark
          ? "dark"
          : "light";
    document.documentElement.setAttribute("data-theme", initialTheme);

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const nearTop = currentScrollY < 32;

      setShowHeader(nearTop || scrollingDown);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const currentRole = headerRoles[headerRoleIndex];
    const completed = headerTypedText === currentRole;
    const cleared = headerTypedText === "";

    const timeoutId = window.setTimeout(
      () => {
        if (!headerDeleting) {
          const nextText = currentRole.slice(0, headerTypedText.length + 1);
          setHeaderTypedText(nextText);
          if (nextText === currentRole) {
            setHeaderDeleting(true);
          }
          return;
        }

        const nextText = currentRole.slice(0, Math.max(headerTypedText.length - 1, 0));
        setHeaderTypedText(nextText);

        if (cleared) {
          setHeaderDeleting(false);
          setHeaderRoleIndex((current) => (current + 1) % headerRoles.length);
        }
      },
      !headerDeleting ? (completed ? 1200 : 70) : 35,
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [headerDeleting, headerRoleIndex, headerTypedText]);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  return (
    <main className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="page-surface pointer-events-none" />
      <div className="pointer-events-none absolute inset-0">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="orb orb-three" />
        <div className="grid-overlay" />
      </div>

      <div className="site-shell relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-24 pt-6 sm:px-8 lg:px-10">
        <header
          className={`glass-panel fixed left-1/2 top-4 z-30 flex w-[calc(100%-2.5rem)] max-w-6xl -translate-x-1/2 items-center justify-between gap-4 rounded-full px-4 py-3.5 backdrop-blur-xl transition duration-300 sm:w-[calc(100%-4rem)] sm:px-5 lg:w-[calc(100%-5rem)] lg:px-6 ${
            showHeader ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
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
              <a href="#experience" className="nav-link">
                Experience
              </a>
              <a href="#projects" className="nav-link">
                Projects
              </a>
              <a href="#skills" className="nav-link">
                Skills
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </nav>
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle site theme"
            >
              <span className="theme-toggle-track">
                <span className="theme-toggle-thumb" />
              </span>
              <span className="hidden text-sm text-[var(--soft-text)] sm:inline">Theme</span>
            </button>
          </div>
        </header>

        <section className="hero-section grid items-start gap-10 pb-20 pt-28 sm:gap-12 sm:pb-24 sm:pt-32 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:pt-36">
          <div className="hero-copy animate-rise">
            <p className="hero-badge mb-5 inline-flex rounded-full border border-[var(--panel-border)] bg-[var(--soft-surface)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--accent-2)]">
              Full stack apps. Mobile experiences. Scalable products.
            </p>
            <h1 className="font-display max-w-4xl text-4xl leading-[1] font-semibold tracking-tight text-[var(--heading)] sm:text-6xl lg:text-7xl">
              Building full stack and mobile products that feel modern, fast,
              and user-focused.
            </h1>
            <p className="hero-description mt-6 max-w-2xl text-base leading-8 text-[var(--text)] sm:text-lg lg:text-xl">
              Full Stack Developer with experience delivering scalable web
              applications, real-time mobile products, product-focused interfaces,
              and ERP systems using Next.js, Flutter, Python, and PostgreSQL.
            </p>

            <div className="hero-actions mt-8 flex flex-wrap gap-3">
              <a className="button-primary" href="#contact">
                Let&apos;s Work Together
              </a>
              <a className="button-secondary" href="#experience">
                View Experience
              </a>
              <Link className="button-secondary" href="/projects">
                Projects Page
              </Link>
            </div>

            <div className="hero-highlights mt-12 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <article key={item} className="glass-card hero-highlight-card animate-float px-5 py-5">
                  <p className="text-sm leading-6 text-[var(--text)]">{item}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="hero-aside animate-rise-delayed">
            <div className="hero-card rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="font-display text-2xl text-[var(--heading)]">Profile Snapshot</p>
                <span className="status-pill">Available</span>
              </div>
              <div className="mt-8 space-y-5">
                <div className="stat-card">
                  <span>Experience</span>
                  <strong>1+ Year</strong>
                </div>
                <div className="stat-card">
                  <span>Focus Areas</span>
                  <strong>Web Development, Mobile Apps, Product UI</strong>
                </div>
                <div className="stat-card">
                  <span>Core Stack</span>
                  <strong>Next.js, Flutter, Python, PostgreSQL</strong>
                </div>
              </div>
              <div className="inner-panel mt-8 rounded-[1.5rem] p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
                  Objective
                </p>
                <p className="mt-3 text-base leading-7 text-[var(--text)]">
                  Passionate about creating attractive, user-friendly, and
                  high-performance digital products where clean interfaces,
                  reliable backend systems, and thoughtful user experience come
                  together.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="section-shell animate-rise-delayed">
          <div className="section-heading">
            <p>About</p>
            <h2>Experience-driven personal presentation</h2>
          </div>
          <div className="about-grid grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="glass-card content-card p-6 sm:p-8">
              <p className="text-base leading-8 text-[var(--text)] sm:text-lg">
                I design and develop scalable web and mobile products with a
                strong focus on usability, performance, secure access control,
                and real-time workflows. My recent work spans mapping
                solutions, mobile platforms, and school ERP products where
                both technical reliability and user clarity matter.
              </p>
            </article>
            <article className="glass-card content-card p-6 sm:p-8">
              <div className="grid gap-x-6 gap-y-5 text-sm text-[var(--text)] sm:grid-cols-2">
                <div>
                  <p className="label">Based In</p>
                  <p className="value">Trichy, Tamil Nadu</p>
                </div>
                <div>
                  <p className="label">Phone</p>
                  <p className="value">+91 63793 75144</p>
                </div>
                <div>
                  <p className="label">Email</p>
                  <p className="value break-all">sivanesan8113@gmail.com</p>
                </div>
                <div>
                  <p className="label">Strength</p>
                  <p className="value">UI-focused engineering with backend depth</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="experience" className="section-shell">
          <div className="section-heading">
            <p>Experience</p>
            <h2>Real work that shows ownership and impact</h2>
          </div>
          <ExperienceCards />
        </section>

        <section id="projects" className="section-shell">
          <div className="projects-header">
            <div className="section-heading mb-0">
              <p>Projects</p>
              <h2>Selected work across web, mobile, and real-time systems</h2>
            </div>
          </div>
          <ProjectsCarousel />
        </section>

        <section id="skills" className="section-shell">
          <div className="section-heading">
            <p>Skills</p>
            <h2>Showcasing the tools and strengths behind my development work</h2>
          </div>
          <div className="skills-grid grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group) => (
              <article key={group.title} className="skill-card p-6">
                <div className={`skill-card-glow bg-gradient-to-r ${group.accent}`} />
                <div className="skill-card-top">
                  <div className="skill-icon">
                    {group.title
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <p className="skill-label">{group.label}</p>
                </div>
                <p className="mt-5 font-display text-2xl text-[var(--heading)]">{group.title}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text)]">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span key={item} className="skill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell">
          <div className="info-grid grid gap-5 lg:grid-cols-2">
            <article className="glass-card content-card p-6 sm:p-8">
              <div className="section-heading mb-6">
                <p>Education</p>
                <h2>Academic background</h2>
              </div>
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

            <article className="glass-card content-card p-6 sm:p-8">
              <div className="section-heading mb-6">
                <p>Recognition</p>
                <h2>Achievements and certifications</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                    Achievements
                  </p>
                  <ul className="mt-4 space-y-3">
                    {achievements.map((item) => (
                      <li key={item} className="feature-row text-[var(--text)]">
                        <span className="feature-dot" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                    Certifications
                  </p>
                  <ul className="mt-4 space-y-3">
                    {certifications.map((item) => (
                      <li key={item} className="feature-row text-[var(--text)]">
                        <span className="feature-dot" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="section-shell pb-0">
          <div className="contact-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent-2)]">
                  Contact
                </p>
                <h2 className="mt-3 font-display text-4xl leading-tight text-[var(--heading)] sm:text-5xl">
                  Let&apos;s build something reliable, useful, and visually
                  strong.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text)] sm:text-lg">
                  Open to full stack and mobile development opportunities where
                  secure systems, product quality, and user experience matter.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a className="button-primary" href="mailto:sivanesan8113@gmail.com">
                  sivanesan8113@gmail.com
                </a>
                <a
                  className="button-secondary"
                  href="https://github.com/SivanesanMarly"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Profile
                </a>
                <a
                  className="button-secondary"
                  href="https://www.linkedin.com/in/sivanesan-a-224a0928a"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
