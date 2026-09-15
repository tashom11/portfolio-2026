import styles from "./Philosophy.module.scss";

const principles = [
  ["Performance", "Un site rapide reste la meilleure animation."],
  ["Simplicité", "Une interface juste n’a pas besoin d’être expliquée."],
  ["Maintenabilité", "Le code doit rester clair six mois plus tard."],
  ["Curiosité", "La tech évolue. Moi aussi."],
];

export default function Philosophy() {
  return (
    <section className={`${styles.philosophy} section shell reveal`} aria-labelledby="principles-title">
      <p className={styles.kicker}>Manière de travailler</p>
      <h2 id="principles-title">Quelques convictions,<br /><em>tenues dans la durée.</em></h2>
      <ol>{principles.map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
    </section>
  );
}
