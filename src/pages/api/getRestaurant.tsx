import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const { restaurantId } = req.body;
    console.log("restaurantId", restaurantId);

    const restaurant = await prismadb.restaurant.findUnique({
      where: {
        id: restaurantId, // Parse the ID as an integer
      },
      select: {
        id: true,
        name: true,
        address: true,
        image: true,
        reviews: true,
        openingHours: true,
        averageRating: true,
        contactInfo: true,
        offers: true, // Fix typo here
        cuisineType: true,
      },
    });
    return res.status(200).json({ restaurant }); // Return 'restaurant' instead of 'resturant'
  } else {
    return res.status(405).json({ message: "An Error Has Happened" });
  }
}
