import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { restaurantId, userId, rating, reviewText, image } = req.body;

      if (!restaurantId || !userId || !rating || !reviewText) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (!image) {
        return res.status(400).json({ message: "Upload A Video" });
      }

      const parsedRating = Number(rating);
      if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        return res.status(400).json({ message: "Invalid rating value" });
      }

      const review = await prismadb.review.create({
        data: {
          restaurantId,
          userId,
          rating: parsedRating,
          reviewText,
          video: image,
        },
      });

      return res.status(201).json({ message: "Review created successfully" });
    } catch (error) {
      console.error("Error creating review:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
