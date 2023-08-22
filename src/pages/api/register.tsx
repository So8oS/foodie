import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { name, email, password } = req.body;
    console.log(req.body.name, req.body.email, req.body.password);

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide name, email, and password" });
    }

    if (name.length < 3) {
      return res.status(400).json({ error: "Name must be at least 3 characters long" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Please provide a valid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
