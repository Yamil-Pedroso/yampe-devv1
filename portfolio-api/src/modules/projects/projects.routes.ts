import { Router } from "express";
import {
  getProjects,
  getProjectById,
  getProjectCategories,
} from "./projects.controller";
import { isValidObjectId } from "mongoose";

const router = Router();

// Valida ObjectId antes de llegar al handler
router.param("id", (req, res, next, id) => {
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid project id" });
  }
  next();
});

router.get("/projects", getProjects);

router.get("/project/:id", getProjectById);

router.get("/projects/categories", getProjectCategories);

export default router;
