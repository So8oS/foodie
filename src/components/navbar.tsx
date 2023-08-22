/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import useCurrentUser from "../../lib/useCurrentUser";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const { data: session } = useSession();
  const user = useCurrentUser();
  console.log(user.data);

  return (
    <div className="flex justify-between items-center  p-4 shadow-lg rounded-xl ">
      <h1 className="font-serif text-xl font-semibold text-[#F45867] font-pacifico ">Foodie</h1>
      <div className="flex gap-2 justify-center items-center">
        <h1 className="flex justify-center items-center gap-2 font-semibold">Ahmad</h1>
        <div className="border border-slate-300 rounded-lg overflow-hidden">
          {user?.data?.image ? <img className="w-8" src={user?.data?.image} alt="" /> : <AiOutlineUser className="w-7 h-7 shadow-2xl rounded-lg " />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
