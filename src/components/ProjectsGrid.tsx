// src/components/ProjectsGrid.tsx

"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
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
  surface:
    "color-mix(in srgb, var(--surface) 96%, transparent)",
  backgroundImage: "none",
  titleColor: "#142033",
  textColor: "rgba(20, 32, 51, 0.84)",
  chipText: "#12253d",
};

type ProjectTheme = typeof defaultTheme;

const projectThemeMap: Record<string, ProjectTheme> = {
  "Geospatial Web Application": { accentA: "#2d7fe8", accentB: "#3ac99d", accentC: "#1f4c8f", surface: "color-mix(in srgb, #f2f8ff 72%, var(--surface))", backgroundImage: "none", titleColor: "#113f73", textColor: "rgba(17, 63, 115, 0.86)", chipText: "#0f325f" },
  "Simulation & Training System": { accentA: "#7d5cff", accentB: "#ff8f5a", accentC: "#2d3fa6", surface: "color-mix(in srgb, #f5f2ff 72%, var(--surface))", backgroundImage: "none", titleColor: "#2f358f", textColor: "rgba(47, 53, 143, 0.86)", chipText: "#2d2f75" },
  "Mobile Mapping Application": { accentA: "#0f9ec7", accentB: "#53d8b0", accentC: "#2d6f92", surface: "color-mix(in srgb, #edfcff 70%, var(--surface))",backgroundImage: "none", titleColor: "#0d6282", textColor: "rgba(13, 98, 130, 0.84)", chipText: "#0d4f69" },
  "Ecommerce Web & Mobile App": { accentA: "#f25b79", accentB: "#f8a23e", accentC: "#9b3f65", surface: "color-mix(in srgb, #fff4f1 74%, var(--surface))", backgroundImage: "none", titleColor: "#8c3559", textColor: "rgba(114, 48, 82, 0.86)", chipText: "#6f2f4c" },
  "School Management ERP": { accentA: "#3b7cf6", accentB: "#f39b4a", accentC: "#5f4ec9", surface: "color-mix(in srgb, #f5f8ff 72%, var(--surface))", backgroundImage: "none", titleColor: "#3b57b4", textColor: "rgba(46, 71, 154, 0.86)", chipText: "#324a97" },
  "Doc Chat": { accentA: "#7367f0", accentB: "#41c7ad", accentC: "#4740a4", surface: "color-mix(in srgb, #f4f3ff 74%, var(--surface))", backgroundImage: "none", titleColor: "#443ba1", textColor: "rgba(50, 46, 117, 0.86)", chipText: "#373080" },
  "IoT Forest Fire Detection System": { accentA: "#f15a24", accentB: "#f9b037", accentC: "#a13c2f", surface: "color-mix(in srgb, #fff5ed 75%, var(--surface))", backgroundImage: "none", titleColor: "#9b3f27", textColor: "rgba(120, 52, 31, 0.86)", chipText: "#7c341f" },
  "Personal Website": { accentA: "#6d63ff", accentB: "#40b6ff", accentC: "#2b8579", surface: "color-mix(in srgb, #f3f4ff 72%, var(--surface))", backgroundImage: "none", titleColor: "#3f43b5", textColor: "rgba(42, 70, 140, 0.86)", chipText: "#204d68" },
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

export function ProjectsGrid() {
  const [selectedImage, setSelectedImage] = useState<Record<string, number>>({});

  return (
    <>
      <div className="projects-grid-layout stagger perspective-1000">
      {projects.map((project, index) => {
        const theme = getProjectThemeStyle(project.title);
        const isFeatured = project.images?.length;
        const selectedIndex = selectedImage[project.title] ?? 0;
        const activeImage = project.images?.[selectedIndex] ?? project.images?.[0];
        
        return (
          <div key={project.title} className={`project-timeline-item ${index % 2 === 0 ? "project-timeline-left" : "project-timeline-right"}`} style={theme}>
            <span className="project-timeline-node" aria-hidden="true"><span /></span>
            <article 
              className={`project-card project-showcase tilt-3d flex flex-col h-full ${isFeatured ? "project-card-with-media" : "p-6 sm:p-8"}`}
              data-animate
            >
            {project.images && activeImage ? (
              <div className="project-carousel" aria-label={`${project.title} image carousel`}>
                <Image src={activeImage.src} alt={activeImage.alt} fill sizes="(max-width: 767px) 100vw, 50vw" className="project-carousel-image" priority={index < 3} />
                <div className="project-carousel-shade" />
                <div className="project-carousel-copy">
                  <div className="project-topline"><span className="project-index">0{index + 1}</span><span className="project-category">{project.category}</span></div>
                  <h3 className="project-title font-display text-2xl sm:text-3xl">{project.title}</h3>
                  <p className="project-description mt-3 text-sm leading-7">{project.description}</p>
                  <div className="project-tags mt-5">{project.tags.map((tag) => <span key={tag} className="project-chip">{tag}</span>)}</div>
                </div>
                <div className="project-carousel-controls">
                  <button type="button" onClick={() => setSelectedImage((current) => ({ ...current, [project.title]: (selectedIndex - 1 + project.images!.length) % project.images!.length }))} aria-label="Previous image">←</button>
                  <span>{selectedIndex + 1} / {project.images.length}</span>
                  <button type="button" onClick={() => setSelectedImage((current) => ({ ...current, [project.title]: (selectedIndex + 1) % project.images!.length }))} aria-label="Next image">→</button>
                </div>
              </div>
            ) : <div className="project-card-copy relative z-10 flex h-full flex-col">
              <div className="project-topline mb-4">
                <span className="project-index">0{index + 1}</span>
                <span className="project-category">{project.category}</span>
              </div>
              
              <h3 className={`project-title font-display text-2xl sm:text-3xl ${isFeatured ? 'lg:text-4xl' : ''}`}>
                {project.title}
              </h3>
              
              <p className="project-description mt-4 text-base leading-8 flex-grow">
                {project.description}
              </p>
              
              <div className="project-meta-row mt-6">
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-chip">{tag}</span>
                  ))}
                </div>
              </div>
            </div>}
            </article>
          </div>
        );
      })}
      </div>
    </>
  );
}
