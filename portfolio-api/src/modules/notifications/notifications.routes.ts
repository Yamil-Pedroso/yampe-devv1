import { Router } from "express";
import * as crtl from "./notifications.controller";

const router = Router();

router.get("/", crtl.listNotifications);
router.post("/", crtl.createNotification);
router.put("/:id", crtl.updateNotification);
router.delete("/:id", crtl.deleteNotification);

export default router;
