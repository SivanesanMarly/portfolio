"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { projects } from "@/data/portfolio";

type ProjectThemeStyle = CSSProperties & {
  "--project-accent-a": string;
  "--project-accent-b": string;
  "--project-accent-c": string;
  "--project-surface": string;
  "--project-bg-image": string;
  "--project-title-color": string;
  "--project-text-color": string;
  "--project-chip-text": string;
};

const defaultTheme = {
  accentA: "#3f73f3",
  accentB: "#19a38f",
  accentC: "#e78e4f",
  surface: "color-mix(in srgb, var(--surface) 96%, transparent)",
  backgroundImage: "url('/project-backgrounds/personal-website.svg')",
  titleColor: "#142033",
  textColor: "rgba(20, 32, 51, 0.84)",
  chipText: "#12253d",
};

const projectThemeMap: Record<
  string,
  {
    accentA: string;
    accentB: string;
    accentC: string;
    surface: string;
    backgroundImage: string;
    titleColor: string;
    textColor: string;
    chipText: string;
  }
> = {
  "Geospatial Web Application": {
    accentA: "#2d7fe8",
    accentB: "#3ac99d",
    accentC: "#1f4c8f",
    surface: "color-mix(in srgb, #f2f8ff 72%, var(--surface))",
    backgroundImage: "url('/project-backgrounds/geospatial-web-application.svg')",
    titleColor: "#113f73",
    textColor: "rgba(17, 63, 115, 0.86)",
    chipText: "#0f325f",
  },
  "Simulation & Training System": {
    accentA: "#7d5cff",
    accentB: "#ff8f5a",
    accentC: "#2d3fa6",
    surface: "color-mix(in srgb, #f5f2ff 72%, var(--surface))",
    backgroundImage: "url('/project-backgrounds/simulation-training-system.svg')",
    titleColor: "#2f358f",
    textColor: "rgba(47, 53, 143, 0.86)",
    chipText: "#2d2f75",
  },
  "Mobile Mapping Application": {
    accentA: "#0f9ec7",
    accentB: "#53d8b0",
    accentC: "#2d6f92",
    surface: "color-mix(in srgb, #edfcff 70%, var(--surface))",
    backgroundImage: "url('/project-backgrounds/mobile-mapping-application.svg')",
    titleColor: "#0d6282",
    textColor: "rgba(13, 98, 130, 0.84)",
    chipText: "#0d4f69",
  },
  "Ecommerce Mobile App": {
    accentA: "#f25b79",
    accentB: "#f8a23e",
    accentC: "#9b3f65",
    surface: "color-mix(in srgb, #fff4f1 74%, var(--surface))",
    backgroundImage: "url('/project-backgrounds/ecommerce-mobile-app.svg')",
    titleColor: "#8c3559",
    textColor: "rgba(114, 48, 82, 0.86)",
    chipText: "#6f2f4c",
  },
  "School Management ERP": {
    accentA: "#3b7cf6",
    accentB: "#f39b4a",
    accentC: "#5f4ec9",
    surface: "color-mix(in srgb, #f5f8ff 72%, var(--surface))",
    backgroundImage: "url('/project-backgrounds/school-management-erp.svg')",
    titleColor: "#3b57b4",
    textColor: "rgba(46, 71, 154, 0.86)",
    chipText: "#324a97",
  },
  "IoT Forest Fire Detection System": {
    accentA: "#f15a24",
    accentB: "#f9b037",
    accentC: "#a13c2f",
    surface: "color-mix(in srgb, #fff5ed 75%, var(--surface))",
    backgroundImage: "url('/project-backgrounds/iot-forest-fire-detection-system.svg')",
    titleColor: "#9b3f27",
    textColor: "rgba(120, 52, 31, 0.86)",
    chipText: "#7c341f",
  },
  "Personal Website": {
    accentA: "#6d63ff",
    accentB: "#40b6ff",
    accentC: "#2b8579",
    surface: "color-mix(in srgb, #f3f4ff 72%, var(--surface))",
    backgroundImage: "url('/project-backgrounds/personal-website.svg')",
    titleColor: "#3f43b5",
    textColor: "rgba(42, 70, 140, 0.86)",
    chipText: "#204d68",
  },
};

const getProjectThemeStyle = (title: string): ProjectThemeStyle => {
  const theme = projectThemeMap[title] ?? defaultTheme;

  return {
    "--project-accent-a": theme.accentA,
    "--project-accent-b": theme.accentB,
    "--project-accent-c": theme.accentC,
    "--project-surface": theme.surface,
    "--project-bg-image": theme.backgroundImage,
    "--project-title-color": theme.titleColor,
    "--project-text-color": theme.textColor,
    "--project-chip-text": theme.chipText,
  };
};

export function ProjectsCarousel() {
  const [activeProject, setActiveProject] = useState(0);
  const [pauseProjectsAutoSlide, setPauseProjectsAutoSlide] = useState(false);

  useEffect(() => {
    if (pauseProjectsAutoSlide) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveProject((current) => (current === projects.length - 1 ? 0 : current + 1));
    }, 4000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [pauseProjectsAutoSlide]);

  const showPreviousProject = () => {
    setActiveProject((current) => (current === 0 ? projects.length - 1 : current - 1));
  };

  const showNextProject = () => {
    setActiveProject((current) => (current === projects.length - 1 ? 0 : current + 1));
  };

  const active = projects[activeProject];
  const activeTheme = getProjectThemeStyle(active.title);

  return (
    <>
      <div className="projects-status-row">
        <p className="projects-status-text">
          Project {activeProject + 1} of {projects.length}
        </p>
      </div>
      <div
        className="projects-carousel-shell"
        onMouseEnter={() => setPauseProjectsAutoSlide(true)}
        onMouseLeave={() => setPauseProjectsAutoSlide(false)}
      >
        <button
          type="button"
          className="carousel-button carousel-button-side carousel-button-left"
          onClick={showPreviousProject}
          aria-label="Show previous project"
        >
          <span className="carousel-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.5 5.5L8 12L14.5 18.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        <article
          key={`${activeProject}-${active.title}`}
          className="project-card project-card-layout project-showcase p-6 sm:p-8 lg:p-10"
          style={activeTheme}
        >
          <div className="project-card-copy">
            <div className="project-topline">
              <span className="project-index">0{activeProject + 1}</span>
              <span className="project-category">{active.category}</span>
            </div>
            <h3 className="project-title mt-4 font-display text-3xl sm:text-4xl">
              {active.title}
            </h3>
            <p className="project-description mt-5 w-full text-base leading-8 sm:text-lg">
              {active.description}
            </p>
            <div className="project-meta-row mt-6">
              <div className="project-tags">
                {active.tags.map((tag) => (
                  <span key={tag} className="project-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
        <button
          type="button"
          className="carousel-button carousel-button-side carousel-button-right"
          onClick={showNextProject}
          aria-label="Show next project"
        >
          <span className="carousel-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.5 5.5L16 12L9.5 18.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
}
