type ArrowDirection = "up" | "up-right" | "up-left" | "down-right" | "left";

const paths: Record<ArrowDirection, string> = {
  up: "M12 20V4M5 11l7-7 7 7",
  "up-right": "M5 19 19 5M8 5h11v11",
  "up-left": "M19 19 5 5M16 5H5v11",
  "down-right": "M5 5l14 14M19 8v11H8",
  left: "M20 12H4M11 5l-7 7 7 7",
};

export default function ArrowIcon({ direction = "up-right" }: { direction?: ArrowDirection }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
      <path
        d={paths[direction]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
