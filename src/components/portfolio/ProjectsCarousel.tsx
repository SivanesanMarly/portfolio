"use client";

import { useEffect, useState } from "react";
import { projects } from "@/data/portfolio";

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
        >
          <div className="project-card-copy">
            <div className="project-topline">
              <span className="project-index">0{activeProject + 1}</span>
              <span className="project-category">{active.category}</span>
            </div>
            <h3 className="mt-4 font-display text-3xl text-[var(--heading)] sm:text-4xl">
              {active.title}
            </h3>
            <p className="mt-5 w-full text-base leading-8 text-[var(--text)] sm:text-lg">
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
