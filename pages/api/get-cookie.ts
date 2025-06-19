// /pages/api/get-cookie.ts
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Cookie name is required in query" });
  }

  const cookies = parse(req.headers.cookie || "");
  const value = cookies[name];

  if (!value) {
    return res.status(404).json({ message: `Cookie ${name} not found` });
  }

  return res.status(200).json({ name, value });
}
