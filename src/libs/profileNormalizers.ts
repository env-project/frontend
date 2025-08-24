import type { Position, ExperienceLevel } from "@/types/api-res-common";
import type { PositionAndLevel } from "@/types/api-res-profile";

export type Tag = { id: string; name: string };

export const normTags = (xs: unknown): Tag[] =>
  (Array.isArray(xs) ? xs : []).map((it: any) => {
    const id = it?.id ?? it?.region_id ?? it?.genre_id ?? it;
    const name = it?.name ?? it?.region_name ?? it?.genre_name ?? it;
    return { id: String(id), name: String(name) };
  });

type RawPositionLink = { position: Position; experience_level: ExperienceLevel };

export function toPositions(links: RawPositionLink[] | null | undefined): PositionAndLevel[] {
  if (!Array.isArray(links)) return [];
  return links.map(({ position, experience_level }) => ({ position, experience_level }));
}

export const hasProfile = (p: any) =>
  !!p &&
  Array.isArray(p.positions) &&
  p.positions.length > 0 &&
  Array.isArray(p.genres) &&
  p.genres.length > 0 &&
  Array.isArray(p.regions) &&
  p.regions.length > 0;
