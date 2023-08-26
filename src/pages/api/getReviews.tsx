import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const reviews = await prismadb.review.findMany({
      select: {
        id: true,
        video: true,
      },
    });

    return res.status(200).json(reviews);
  } else {
    return res.status(405).json({ message: "An Error Has Happened" });
  }
}
