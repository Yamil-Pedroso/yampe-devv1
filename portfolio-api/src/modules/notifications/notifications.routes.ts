import { Router } from "express";
import * as crtl from "./notifications.controller";

const router = Router();

router.get("/notifications", crtl.listNotifications);
router.post("/notifications", crtl.createNotification);
router.put("/notifications/:id", crtl.updateNotification);
router.delete("/notifications/:id", crtl.deleteNotification);

export default router;
