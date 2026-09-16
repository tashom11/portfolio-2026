import Image from "next/image";
import ArrowIcon from "@/components/ArrowIcon";
import type { Project } from "@/types/project";
import styles from "./Projects.module.scss";

const projectScreenshots: Record<string, { src: string; domain: string }> = {
  ennolys: { src: "/projects/ennolys.jpg", domain: "ennolys.fr" },
  "loca-service": { src: "/projects/loca-service.jpg", domain: "loca-service.com" },
  recoltia: { src: "/projects/recoltia.jpg", domain: "recoltia.fr" },
};

const agencyProjects = new Set(["ennolys", "loca-service"]);

export default function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const screenshot = projectScreenshots[project.slug];

  return (
    <article className={`${styles.project} ${project.featured ? styles.featured : ""} reveal`}>
      <div className={`${styles.visual} ${styles[project.visual]}`} aria-hidden="true">
        <span className={styles.visualIndex}>0{index + 1}</span>
        {screenshot ? (
          <div className={styles.browserMockup}>
            <div className={styles.browserBar}>
              <span /><span /><span />
              <small>{screenshot.domain}</small>
            </div>
            <div className={styles.browserScreen}>
              <Image
                className={styles.screenshot}
                src={screenshot.src}
                alt=""
                fill
                sizes={project.featured ? "(max-width: 768px) 82vw, 76vw" : "(max-width: 768px) 82vw, 36vw"}
              />
            </div>
          </div>
        ) : (
          <div className={styles.mockup}>
            <i /><i /><i />
            <strong>{project.title.replaceAll("[", "").replaceAll("]", "")}</strong>
          </div>
        )}
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
        <div>
          <span>{project.role}</span>
          {agencyProjects.has(project.slug) && <span>Projet réalisé chez Neoweb</span>}
          <span>{project.technologies.join(" · ")}</span>
        </div>
      </div>
    </article>
  );
}
