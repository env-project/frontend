import type { TRecruitmentPostSchema } from "@/types/zod-schema/recruitment-post-schema";

export interface RecruitmentRequestForm {
  title: string;
  content: string;

  band_name: string | null;
  band_composition: string | null;
  activity_time: string | null;
  contact_info: string | null;
  application_method: string | null;
  practice_frequency_time: string | null;
  other_conditions: string | null;
  orientation_id: string | null;
  recruitment_type_id: string | null;
  region_ids: string[] | null;
  genre_ids: string[] | null;
  positions: { position_id: string; experienced_level_id: string }[] | null;
}

export const changeRecruitmentFormToRequestData = (
  form: TRecruitmentPostSchema
): RecruitmentRequestForm => {
  return {
    title: form.title,
    content: form.content,

    band_name: form.bandName || null,
    band_composition: form.bandComposition || null,
    activity_time: form.activityTime || null,
    contact_info: form.contactInfo || null,
    application_method: form.applicationMethod || null,
    practice_frequency_time: form.practiceFrequencyTime || null,
    other_conditions: form.otherConditions || null,
    orientation_id: form.orientationId || null,
    recruitment_type_id: form.recruitmentTypeId || null,

    region_ids: form.regionIds && form.regionIds.length > 0 ? form.regionIds : null,
    genre_ids: form.genreIds && form.genreIds.length > 0 ? form.genreIds : null,
    positions: form.positions && form.positions.length > 0 ? form.positions : null,
  };
};
