import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, address, cuisineType, openingHours, contactInfo, website, image } = req.body;

      if (!name || !address || !cuisineType || !openingHours || !contactInfo) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (!image) {
        return res.status(400).json({ message: "Upload An Image" });
      }

      const restaurant = await prismadb.restaurant.create({
        data: {
          name,
          image,
          address,
          cuisineType,
          openingHours,
          contactInfo,
          website,
          averageRating: 0,
          totalReviews: 0,
        },
      });

      return res.status(201).json({ message: "Restaurant created successfully" });
    } catch (error) {
      console.error("Error creating restaurant:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
