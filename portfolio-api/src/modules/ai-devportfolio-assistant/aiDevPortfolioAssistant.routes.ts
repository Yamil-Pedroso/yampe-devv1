import { Router } from "express";
import {
  portfolioAssistantChatbot,
  getMessages,
} from "./aiDevPortfolioAssistant.controller";

const router = Router();

router.get("/portfolio-assistant", getMessages);

router.post("/portfolio-assistant/chat", portfolioAssistantChatbot);

export default router;
