import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { skillGroups } from "@/data/profile";
import styles from "./Skills.module.scss";

export default function Skills() {
  return (
    <section className={`${styles.skills} section shell reveal`} aria-labelledby="skills-title">
      <SectionHeading id="skills-title" index="04" title="Outils & savoir-faire" note="Mes compétences" />
      <div className={styles.grid}>
        {skillGroups.map((group, index) => (
          <article key={group.title}>
            <span>0{index + 1}</span><h3>{group.title}</h3>
            <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
