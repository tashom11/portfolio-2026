import ArrowIcon from "@/components/ArrowIcon";
import type { Project } from "@/types/project";
import styles from "./Projects.module.scss";

export default function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`${styles.project} ${project.featured ? styles.featured : ""} reveal`}>
      <div className={`${styles.visual} ${styles[project.visual]}`} aria-hidden="true">
        <span className={styles.visualIndex}>0{index + 1}</span>
        <div className={styles.mockup}>
          <i /><i /><i />
          <strong>{project.title.replaceAll("[", "").replaceAll("]", "")}</strong>
        </div>
      </div>
      <div className={styles.meta}><span>{project.year}</span><span>{project.context}</span></div>
      {project.url ? (
        <a
          className={styles.titleRow}
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Voir le projet ${project.title}, nouvel onglet`}
        >
          <h3>{project.title}</h3><ArrowIcon />
        </a>
      ) : (
        <div className={styles.titleRow}><h3>{project.title}</h3><ArrowIcon /></div>
      )}
      <div className={styles.info}>
        <p>{project.description}</p>
        <div><span>{project.role}</span><span>{project.technologies.join(" · ")}</span></div>
      </div>
    </article>
  );
}
