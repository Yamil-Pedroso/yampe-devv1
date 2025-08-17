import { Request, Response } from "express";
import AboutModel from "./about.model";

export const getAboutData = async (_req: Request, res: Response) => {
  try {
    const about = await AboutModel.findOne({ status: "published" })
      .select("header title description image features infoContact roleTags")
      .lean();

    if (!about) {
      return res
        .status(404)
        .json({ status: "error", message: "About not found" });
    }

    // cache corto para la home
    res.set("Cache-Control", "public, max-age=60, s-maxage=300");
    return res.json({ status: "success", data: about });
  } catch (error: any) {
    console.error("getAboutData error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
