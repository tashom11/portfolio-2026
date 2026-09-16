import ArrowIcon from "@/components/ArrowIcon";
import styles from "./TechInterests.module.scss";
import { interests } from "@/data/profile";

export default function TechInterests() {
  return (
    <section className={`${styles.interests} section reveal`} aria-labelledby="interests-title">
      <div className="shell">
        <p>Hors du cadre</p>
        <h2 id="interests-title">Le web est mon métier.<br />La tech reste mon terrain d’exploration.</h2>
        <ul>{interests.map((item) => <li key={item}>{item}<ArrowIcon /></li>)}</ul>
        <small>Des sujets que j’explore par curiosité, projets personnels et apprentissage continu.</small>
      </div>
    </section>
  );
}
