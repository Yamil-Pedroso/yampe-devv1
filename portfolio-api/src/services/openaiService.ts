import OpenAI from "openai";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), "src", "config", "config.env"),
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
