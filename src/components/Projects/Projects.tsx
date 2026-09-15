import { projects } from "@/data/projects";
import ProjectShowcase from "./ProjectShowcase";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import styles from "./Projects.module.scss";

export default function Projects() {
  return (
    <section className={`${styles.projects} section shell`} id="projets" aria-labelledby="projects-title">
      <div className="reveal"><SectionHeading id="projects-title" index="02" title="Quelques projets" note="Sélection · 2024 à 2026" /></div>
      <div className={styles.list}>{projects.map((project, index) => <ProjectShowcase key={project.slug} project={project} index={index} />)}</div>
    </section>
  );
}
