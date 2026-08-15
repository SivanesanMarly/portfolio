// src/components/ExperienceCards.tsx

import { experiences } from "@/data/portfolio";

export function ExperienceCards() {
  return (
    <div className="experience-timeline-premium stagger perspective-1000">
      {experiences.map((experience) => (
        <div key={experience.company} className="timeline-item-premium" data-animate>
          <div className="timeline-node-premium" aria-hidden="true">
            <span className={`timeline-node-glow bg-gradient-to-r ${experience.accent}`} />
          </div>

          <article className={`experience-card-premium tilt-3d h-full bg-gradient-to-r ${experience.accent}`}>
            <div className="card-accent-strip" />
            <div className="bg-[var(--surface)] rounded-b-[1.25rem] h-full">
              <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6">
                <div className="experience-sidebar-premium">
                  <div className="company-block-premium">
                    <p className="company-period">{experience.period}</p>
                    <h3 className="company-role">{experience.role}</h3>
                    <p className="company-name">{experience.company}</p>
                    <p className="company-location">{experience.location}</p>
                  </div>
                  <div className="stack-block-premium">
                    <p className="mini-label-premium">Tech Stack</p>
                    <div className="stack-tags-premium">
                      {experience.stack.map((item) => (
                        <span key={item} className="stack-tag-premium">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="experience-main-premium">
                  <div className="responsibilities-block-premium">
                    <p className="mini-label-premium">Responsibilities</p>
                    <ul className="points-list-premium">
                      {experience.points.map((point) => (
                        <li key={point} className="point-item-premium">
                          <span className="point-dot-premium" /><span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="projects-block-premium">
                    {experience.projects.map((project, index) => (
                      <div key={project.title} className="project-highlight-premium">
                        <div className="project-glow-corner" aria-hidden="true" />
                        <p className="project-label-premium">{index === 0 ? "Key Project" : "Project"}</p>
                        <h4 className="project-title-premium">{project.title}</h4>
                        <p className="project-summary-premium">{project.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}