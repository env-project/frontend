interface BookmarkIconProps {
  size?: number;
  color?: string;
}

export default function BookmarkIcon({
  size = 14,
  color = "var(--color-text-primary)",
}: BookmarkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.74997 1.75H9.41664C9.88076 1.75 10.3259 1.93437 10.6541 2.26256C10.9823 2.59075 11.1666 3.03587 11.1666 3.5V12.25L7.0833 10.5L2.99997 12.25V3.5C2.99997 3.03587 3.18434 2.59075 3.51253 2.26256C3.84072 1.93437 4.28584 1.75 4.74997 1.75ZM4.74997 2.33333C4.44055 2.33333 4.1438 2.45625 3.92501 2.67504C3.70622 2.89383 3.5833 3.19058 3.5833 3.5V11.375L7.0833 9.88167L10.5833 11.375V3.5C10.5833 3.19058 10.4604 2.89383 10.2416 2.67504C10.0228 2.45625 9.72606 2.33333 9.41664 2.33333H4.74997Z"
        fill={color}
      />
    </svg>
  );
}
