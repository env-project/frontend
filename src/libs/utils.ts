import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getTimeDiff = (time: Date) => {
  const current = new Date();
  const diffMs = current.getTime() - time.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (diffMs < hour) {
    const minutes = Math.floor(diffMs / minute);
    return `${minutes}분 전`;
  } else if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours}시간 전`;
  } else if (diffMs < month) {
    const days = Math.floor(diffMs / day);
    return `${days}일 전`;
  } else if (diffMs < year) {
    const months = Math.floor(diffMs / month);
    return `${months}달 전`;
  } else {
    const years = Math.floor(diffMs / year);
    return `${years}년 전`;
  }
};
