import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
  QueryClient,
} from "@tanstack/react-query";
import {
  getProjects,
  getProjectById,
  getProjectCategories,
  mapDTOtoCard,
  type GetProjectsParams,
  type GetProjectsResponse,
  type ProjectDTO,
  type ProjectCard,
} from "@/services/projectsService";
import { toAbs } from "../url";

// Cache keys
export const projectsKeys = {
  all: ["projects"] as const,
  list: (params?: GetProjectsParams) =>
    [...projectsKeys.all, "list", params] as const,
  detail: (id: string) => [...projectsKeys.all, "detail", id] as const,
};

// Categories
export const categoriesKeys = {
  all: ["projects", "categories"] as const,
};

export function useProjectCategories() {
  return useQuery({
    queryKey: categoriesKeys.all,
    queryFn: getProjectCategories,
    staleTime: 60 * 60 * 1000, // 1h
    gcTime: 2 * 60 * 60 * 1000,
  });
}

// List (paginated/filterable)
export function useProjects(params?: GetProjectsParams) {
  return useQuery({
    queryKey: projectsKeys.list(params),
    queryFn: () => getProjects(params),
    placeholderData: keepPreviousData,
    select: (data: GetProjectsResponse): ProjectDTO[] =>
      (data.projects ?? []).map((project) => ({
        ...project,
        image: toAbs(project.image),
        imageDetails: project.imageDetails?.map(toAbs),
      })),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

// Version that returns already mapped cards for the UI (optional)
export function useProjectCards(params?: GetProjectsParams) {
  return useQuery({
    queryKey: projectsKeys.list(params),
    queryFn: () => getProjects(params),
    placeholderData: keepPreviousData,
    select: (data: GetProjectsResponse): ProjectCard[] =>
      (data.projects ?? []).map(mapDTOtoCard),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

//ID for details
export function useProject(id?: string, opts?: { includeDrafts?: boolean }) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: id ? projectsKeys.detail(id) : projectsKeys.all,
    queryFn: () => getProjectById(id as string, opts),
    select: (resp) => resp.project as ProjectDTO,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

// Infinite pagination (optional; requires page/pages in the API)
export function useInfiniteProjects(
  baseParams?: Omit<GetProjectsParams, "page">
) {
  return useInfiniteQuery({
    queryKey: [...projectsKeys.all, "infinite", baseParams] as const,
    queryFn: ({ pageParam = 1 }) =>
      getProjects({ ...baseParams, page: Number(pageParam) }),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      const current = last.page ?? 1;
      const totalPages = last.pages ?? 1;
      return current < totalPages ? current + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

// Prefetch helpers (opcional)
export function prefetchProjects(qc: QueryClient, params?: GetProjectsParams) {
  return qc.prefetchQuery({
    queryKey: projectsKeys.list(params),
    queryFn: () => getProjects(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function prefetchProjectById(qc: QueryClient, id: string) {
  return qc.prefetchQuery({
    queryKey: projectsKeys.detail(id),
    queryFn: () => getProjectById(id),
    staleTime: 5 * 60 * 1000,
  });
}
