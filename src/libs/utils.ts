import type { PostDetail } from "@/types/api-res-recruitment";
import type { TRecruitmentPostSchema } from "@/types/zod-schema/recruitment-post-schema";
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

export const mapDefaultDataToFormValues = (defaultData: PostDetail): TRecruitmentPostSchema => {
  const {
    title,
    band_name,
    band_composition,
    activity_time,
    practice_frequency_time,
    application_method,
    contact_info,
    other_conditions,
    recruitment_type,
    genres,
    orientation,
    positions,
    regions,
    content,
  } = defaultData;

  return {
    title,
    bandName: band_name || "",
    bandComposition: band_composition || "",
    activityTime: activity_time || "",
    practiceFrequencyTime: practice_frequency_time || "",
    applicationMethod: application_method || "",
    contactInfo: contact_info || "",
    otherConditions: other_conditions || "",
    content,

    recruitmentTypeId: recruitment_type?.id ?? "",
    orientationId: orientation?.id ?? "",

    genreIds: genres?.map((g) => g.id) ?? [],
    regionIds: regions?.map((r) => r.id) ?? [],

    positions:
      positions?.map((p) => ({
        position_id: p.position_id,
        experienced_level_id: p.experienced_level_id,
      })) ?? [],
  };
};
