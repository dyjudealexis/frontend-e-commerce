import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Cookie name is required" });
  }

  res.setHeader(
    "Set-Cookie",
    serialize(name, "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0), // Expire now
    })
  );

  return res.status(200).json({ message: `Cookie '${name}' removed` });
}
