import ArrowIcon from "@/components/ArrowIcon";
import { profile } from "@/data/profile";
import CopyEmail from "./CopyEmail";
import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section className={`${styles.contact} section shell reveal`} id="contact" aria-labelledby="contact-title">
      <div className={styles.topline}><span>Disponible pour la suite</span><span>{profile.location}</span></div>
      <h2 id="contact-title">Une opportunité ?<br /><em>Parlons-en.</em></h2>
      <p className={styles.intro}>Je suis actuellement à l’écoute de nouvelles opportunités dans le web et, plus largement, dans la tech.</p>
      <div className={styles.emailRow}>
        <a href={`mailto:${profile.email}`}>{profile.email}<ArrowIcon /></a>
        <CopyEmail email={profile.email} />
      </div>
      <nav className={styles.socials} aria-label="Réseaux sociaux">
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span><span className="sr-only">, nouvel onglet</span></a>
        <a href={profile.github} target="_blank" rel="noreferrer">{profile.githubLabel} <span aria-hidden="true">↗</span><span className="sr-only">, nouvel onglet</span></a>
        <a href={profile.repository} target="_blank" rel="noreferrer">Code source <span aria-hidden="true">↗</span><span className="sr-only">, nouvel onglet</span></a>
      </nav>
    </section>
  );
}
