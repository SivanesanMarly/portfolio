import Link from "next/link";
import { ProjectsCarousel } from "@/components/portfolio/ProjectsCarousel";

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="site-shell mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="section-heading mb-0">
            <p>Projects</p>
            <h2>Dedicated projects showcase page</h2>
          </div>
          <Link href="/" className="button-secondary">
            Back Home
          </Link>
        </div>
        <ProjectsCarousel />
      </div>
    </main>
  );
}
