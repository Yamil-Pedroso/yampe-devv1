import { Request, Response } from "express";

const aboutData = {
  header: "About Me",
  title: "Professional Problem Solver For Digital Products",
  description: `I am a Full Stack Developer with over 4 years of experience building scalable, responsive, and user-focused applications across the web. My technical expertise spans
frontend frameworks like React and backend technologies such as Node.js and Express,
with a strong foundation in modern architectures, REST APIs, and clean code practices.
In parallel, I am also a passionate digital and traditional artist. My background in
traditional and digital art brings a unique creative edge to my development work.
Whether I'm coding an interactive component or illustrating a concept, I strive to merge
functionality with aesthetic value.`,
};

export const getAboutData = (req: Request, res: Response) => {
  try {
    res.json({
      status: "success",
      header: aboutData.header,
      description: aboutData.description,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
