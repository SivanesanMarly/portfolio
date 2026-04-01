import { experiences } from "@/data/portfolio";

export function ExperienceCards() {
  return (
    <div className="experience-list space-y-6">
      {experiences.map((experience) => (
        <article
          key={experience.company}
          className="timeline-card experience-card overflow-hidden rounded-[2rem]"
        >
          <div className={`h-1.5 bg-gradient-to-r ${experience.accent}`} />
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
            <div className="experience-sidebar">
              <div className="experience-company-block">
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">
                  {experience.period}
                </p>
                <h3 className="mt-3 font-display text-3xl text-[var(--heading)]">
                  {experience.role}
                </h3>
                <p className="mt-2 text-lg text-[var(--text-strong)]">{experience.company}</p>
                <p className="mt-1 text-sm text-[var(--soft-text)]">{experience.location}</p>
              </div>
              <div className="experience-stack-wrap">
                <p className="experience-mini-title">Tech Stack</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {experience.stack.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="experience-main">
              <div className="experience-content-block">
                <p className="experience-mini-title">Responsibilities</p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--text)]">
                  {experience.points.map((point) => (
                    <li key={point} className="feature-row">
                      <span className="feature-dot" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                {experience.projects.map((project, index) => (
                  <div
                    key={project.title}
                    className="inner-panel experience-project-card rounded-[1.5rem] p-5 sm:p-6"
                  >
                    <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent-1)]">
                      {index === 0 ? "Key Project" : "Project"}
                    </p>
                    <h4 className="mt-2 font-display text-2xl text-[var(--heading)]">
                      {project.title}
                    </h4>
                    <p className="mt-3 text-base leading-7 text-[var(--text)]">
                      {project.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
