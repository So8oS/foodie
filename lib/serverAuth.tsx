import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "../lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("Not Signed");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      bio: true,
      reviews: true,
      dateOfBirth: true,
      userType: true,
      subscriptionLevel: true,
      lastLogin: true,
      followers: true,
      following: true,
    },
  });
  if (!currentUser) {
    throw new Error(`not signed in`);
  }

  return { currentUser };
};

export default serverAuth;
