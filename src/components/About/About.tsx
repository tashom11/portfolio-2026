import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { profile } from "@/data/profile";
import styles from "./About.module.scss";

const facts = [[profile.yearsExperience, "années d’expérience"], [profile.locationCode, "localement ou à distance"], ["WEB", "terrain de jeu"], ["OPEN", "aux opportunités"]];

export default function About() {
  return (
    <section className={`${styles.about} section shell reveal`} id="a-propos" aria-labelledby="about-title">
      <SectionHeading id="about-title" index="01" title="À propos" note="Une approche concrète du web" />
      <div className={styles.copy}>
        <p className={styles.lead}>{profile.aboutLead}</p>
        <div className={styles.detail}>
          <p>{profile.aboutPrimary}</p>
          <p>{profile.aboutSecondary}</p>
        </div>
      </div>
      <dl className={styles.facts}>{facts.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}</dl>
    </section>
  );
}
