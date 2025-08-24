import { Request, Response } from "express";
import { ProjectModel } from "./projects.model";
import { isValidObjectId } from "mongoose";

type SortKey =
  | "order"
  | "createdAt"
  | "updatedAt"
  | "-order"
  | "-createdAt"
  | "-updatedAt";

export const getProjects = async (req: Request, res: Response) => {
  try {
    // Query params
    const {
      status = "published",
      category,
      tags,
      q,
      page = "1",
      limit = "12",
      sort = "order", // order | -order | createdAt | -createdAt ...
    } = req.query as Record<string, string>;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 100);

    // Build filters
    const filter: Record<string, any> = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    if (tags) {
      const tagsArr = tags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      if (tagsArr.length) {
        // $all: debe contener TODOS los tags indicados (cámbialo por $in si quieres "cualquiera")
        filter.tags = { $all: tagsArr };
      }
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { subtitle: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    // Sort
    const allowedSort: SortKey[] = [
      "order",
      "-order",
      "createdAt",
      "-createdAt",
      "updatedAt",
      "-updatedAt",
    ];
    const sortKey = (
      allowedSort.includes(sort as SortKey) ? sort : "order"
    ) as SortKey;
    const sortSpec: Record<string, 1 | -1> = sortKey.startsWith("-")
      ? { [sortKey.slice(1)]: -1 }
      : { [sortKey]: 1 };

    // Query
    const [items, total] = await Promise.all([
      ProjectModel.find(filter)
        .sort(sortSpec)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean(), // rendimiento
      ProjectModel.countDocuments(filter),
    ]);

    // (Opcional) convertir rutas relativas de imágenes a absolutas:
    // const base = `${req.protocol}://${req.get("host")}`;
    // const withAbsImages = items.map(p => ({
    //   ...p,
    //   image: p.image?.startsWith("/") ? base + p.image : p.image,
    //   imageDetails: (p.imageDetails ?? []).map((u: string) => u?.startsWith("/") ? base + u : u),
    // }));

    return res.json({
      success: true,
      status: "success",
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
      projects: items, // o `withAbsImages` si activas lo de arriba
    });
  } catch (error) {
    console.error("getProjects error:", error);
    return res.status(500).json({ message: "Error fetching projects" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const includeDrafts = req.query.includeDrafts === "true";
    const filter: Record<string, any> = { _id: id };
    if (!includeDrafts) filter.status = "published";

    const project = await ProjectModel.findOne(filter).select("-__v").lean();

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Opcional: normalizar URLs de imágenes
    const base = `${req.protocol}://${req.get("host")}`;
    const abs = (u?: string) => (u && u.startsWith("/") ? base + u : u);

    const projectWithUrls = {
      ...project,
      image: abs(project.image as string),
      imageDetails: Array.isArray(project.imageDetails)
        ? project.imageDetails.map(abs)
        : project.imageDetails,
    };

    return res.json({ success: true, project: projectWithUrls });
  } catch (error) {
    console.error("getProjectById error:", error);
    return res.status(500).json({ message: "Error fetching project" });
  }
};

export const getProjectCategories = (_req: Request, res: Response) => {
  try {
    const catPath: any = ProjectModel.schema.path("category");
    const values: string[] =
      catPath?.options?.enum ?? catPath?.enumValues ?? [];
    return res.json({ success: true, categories: values });
  } catch (error) {
    console.error("getProjectCategories error:", error);
    return res.status(500).json({ message: "Error fetching categories" });
  }
};
