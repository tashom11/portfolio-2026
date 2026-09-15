import styles from "./SectionHeading.module.scss";

type Props = { id: string; index: string; title: string; note?: string };

export default function SectionHeading({ id, index, title, note }: Props) {
  return (
    <header className={styles.heading}>
      <span aria-hidden="true">{index}</span><h2 id={id}>{title}</h2>{note && <p>{note}</p>}
    </header>
  );
}
