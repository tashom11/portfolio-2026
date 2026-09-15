import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { experience } from "@/data/profile";
import styles from "./Experience.module.scss";

export default function Experience() {
  return (
    <section className={`${styles.experience} section shell reveal`} id="experience" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" index="03" title="Expérience" note="Mon parcours" />
      <div className={styles.rows}>
        {experience.map((item, index) => (
          <article className={styles.row} key={item.period}>
            <span className={styles.period}>{item.period}</span>
            <div><h3>{item.role}</h3><p className={styles.company}>{item.company}</p></div>
            <div><p>{item.description}</p><span className={styles.focus}>{item.focus}</span></div>
            <span className={styles.index}>0{index + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
