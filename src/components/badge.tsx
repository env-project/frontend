import React from "react";

interface BadgeProps {
  label: string;
}

export const Badge: React.FC<BadgeProps> = ({ label }) => {
  return (
    <span className="inline-block text-text-primary bg-primary-soft main-text px-3 py-1 rounded-2xl">
      {label}
    </span>
  );
};
