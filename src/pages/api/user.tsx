import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "./../../../lib/serverAuth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { currentUser } = await serverAuth(req);

  if (req.method === "GET") {
    try {
      return res.status(200).json(currentUser);
    } catch (error) {
      return res.status(401).end(error);
    }
  }
}
