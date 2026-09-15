import styles from "./Hero.module.scss";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={`${styles.inner} shell`}>
        <div className={styles.eyebrow}><span>{profile.role}</span><span>{profile.location}</span></div>
        <h1 id="hero-title">
          <span>Je transforme des idées</span>
          <span>en expériences <em>utiles.</em></span>
        </h1>
        <div className={styles.bottom}>
          <p>{profile.yearsExperience} ans d’expérience avec une spécialisation dans {profile.specialty}.</p>
          <div className={styles.availability}><i aria-hidden="true" />{profile.availability}</div>
        </div>
        <div className={styles.orbit} aria-hidden="true"><span>{profile.yearsExperience}</span><small>années<br />d’expérience</small></div>
      </div>
    </section>
  );
}
