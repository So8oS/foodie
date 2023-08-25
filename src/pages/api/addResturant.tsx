import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, address, cuisineType, openingHours, contactInfo, website } = req.body;

    const restaurant = await prismadb.restaurant.create({
      data: {
        name,
        image: "https://source.unsplash.com/600x400/?restaurant",
        address,
        cuisineType,
        openingHours,
        contactInfo,
        website,
        averageRating: 0,
        totalReviews: 0,
      },
    });

    return res.status(200).json(200);
  } else {
    return res.status(405).json({ message: "An Error Has Happened" });
  }
}
