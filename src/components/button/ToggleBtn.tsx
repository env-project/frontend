import { useState } from "react";

export default function ToggleBtn() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn((prev) => !prev)} className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="24"
        viewBox="0 0 64 24"
        fill="none"
      >
        <rect width="64" height="24" rx="12" fill={isOn ? "#191919" : "#b8b8b8"} />
        <circle
          cx={isOn ? "13" : "51"}
          cy="12"
          r="10"
          fill="white"
          style={{ transition: "cx 0.3s ease-in-out" }}
        />
      </svg>
    </button>
  );
}
