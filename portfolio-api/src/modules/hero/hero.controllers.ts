import { Request, Response } from "express";

const data = [
  { id: 1, name: "Superman" },
  { id: 2, name: "Batman" },
  { id: 3, name: "Wonder Woman" },
];

export const getHeroData = (req: Request, res: Response) => {
  res.json(data);
};
