export default function ArrowIcon({ direction = "up-right" }: { direction?: "up-right" | "up-left" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
      <path
        d={direction === "up-left" ? "M19 19 5 5M16 5H5v11" : "M5 19 19 5M8 5h11v11"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
