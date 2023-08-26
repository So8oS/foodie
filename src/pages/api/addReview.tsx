import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { restaurantId, userId, rating, reviewText, image } = req.body;
    console.log(req.body);

    const review = await prismadb.review.create({
      data: {
        restaurantId,
        userId,
        rating: Number(rating),
        reviewText,
        video: image,
      },
    });

    return res.status(200).json(200);
  } else {
    return res.status(405).json({ message: "An Error Has Happened" });
  }
}
