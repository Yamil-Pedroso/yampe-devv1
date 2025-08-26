// src/services/projectsService.ts
import apiClient from "../api/axiosConfig";
import type { AxiosError } from "axios";

export type ProjectCategory =
  | "Web Development"
  | "Mobile Apps"
  | "UI/UX Design"
  | "Mini Apps"
  | "Graphic Design";

export type ProjectTag =
  | "react"
  | "nextjs"
  | "typescript"
  | "tailwindcss"
  | "styled-components"
  | "framer-motion"
  | "threejs"
  | "r3f"
  | "gsap"
  | "node"
  | "express"
  | "mongodb"
  | "supabase"
  | "crud"
  | "animation"
  | "scroll";

export interface ProjectDTO {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageDetails?: string[];
  iconKey?: string;
  link?: string;
  tags?: ProjectTag[];
  category?: ProjectCategory;
  status: "draft" | "published";
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetProjectCategoriesResponse {
  success: boolean;
  categories: ProjectCategory[];
}

/* ---------- API Responses ---------- */

// My backend can return simple or paginated lists.
// We make the metas optional to cover both cases.
export type GetProjectsResponse = {
  success: boolean;
  projects: ProjectDTO[];
  status?: "success";
  page?: number;
  limit?: number;
  total?: number;
  pages?: number;
};

export interface GetProjectByIdResponse {
  success: boolean;
  project: ProjectDTO;
}

/* ---------- Query Parameters ---------- */

export type SortKey =
  | "order"
  | "-order"
  | "createdAt"
  | "-createdAt"
  | "updatedAt"
  | "-updatedAt";

export interface GetProjectsParams {
  status?: "draft" | "published";
  category?: ProjectCategory;
  /** CSV: "react,threejs" o deja que el helper acepte string[] */
  tags?: string | string[];
  q?: string;
  page?: number;
  limit?: number;
  sort?: SortKey;
}

/* ---------- Helpers ---------- */

function normalizeTagsParam(tags?: string | string[]) {
  if (!tags) return undefined;
  return Array.isArray(tags) ? tags.join(",") : tags;
}

function unwrapAxios(e: unknown): never {
  const err = e as AxiosError<{ message?: string }>;
  const msg = err?.response?.data?.message || err.message || "Network error";
  throw new Error(msg);
}

/* ---------- Service: requests ---------- */

export async function getProjects(
  params?: GetProjectsParams
): Promise<GetProjectsResponse> {
  try {
    const { data } = await apiClient.get<GetProjectsResponse>("/projects", {
      params: {
        ...params,
        tags: normalizeTagsParam(params?.tags),
      },
    });

    console.log("Fetched projects:", data);
    return data;
  } catch (e) {
    unwrapAxios(e);
  }
}

export async function getProjectById(
  id: string,
  options?: { includeDrafts?: boolean }
) {
  try {
    const { data } = await apiClient.get<GetProjectByIdResponse>(
      `/project/${id}`,
      {
        params: options?.includeDrafts ? { includeDrafts: true } : undefined,
      }
    );
    return data;
  } catch (e) {
    unwrapAxios(e);
  }
}

export async function getProjectCategories() {
  const { data } = await apiClient.get<GetProjectCategoriesResponse>(
    "/projects/categories"
  );
  return data;
}

export interface ProjectCard {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageDetails?: string[];
  link?: string;
  icon?: string; // Comes from iconKey
  tags?: ProjectTag[];
  category?: ProjectCategory;
}

export function mapDTOtoCard(p: ProjectDTO): ProjectCard {
  return {
    id: p._id,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    image: p.image,
    imageDetails: p.imageDetails ?? [],
    link: p.link,
    icon: p.iconKey,
    tags: p.tags ?? [],
    category: p.category,
  };
}

export async function getPublishedProjects(
  params?: Omit<GetProjectsParams, "status">
) {
  return getProjects({ status: "published", ...params });
}

export async function getProjectsByTag(
  tag: ProjectTag,
  params?: Omit<GetProjectsParams, "tags">
) {
  return getProjects({ ...params, tags: tag });
}

export async function getProjectsByCategory(
  category: ProjectCategory,
  params?: Omit<GetProjectsParams, "category">
) {
  return getProjects({ ...params, category });
}
