import { Router } from "express";
import { getAboutData } from "./about.controller";

const router = Router();

router.get("/about", getAboutData);

export default router;
