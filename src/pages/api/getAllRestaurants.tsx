import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const restaurants = await prismadb.restaurant.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      image: true,
      openingHours: true,
      averageRating: true,
    },
  });

  return res.status(200).json(restaurants);
}
