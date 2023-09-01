import Link from "next/link";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { IoMdRestaurant } from "react-icons/io";
import { IoSettings } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="px-8 py-3 font-medium fixed bottom-0 text-[#F5F5F5] flex justify-between items-center w-full gap-10 text-sm rounded-t-lg bg-default ">
      <Link href={"/"} className="hover:bg-gray-500  border-gray-200">
        <AiFillHome className="w-8 h-6" />
      </Link>

      <Link href={"/main"} className="hover:bg-gray-700   border-gray-200 rounded-md">
        <IoMdRestaurant className="w-8 h-6" />
      </Link>

      <Link href={"/Tv"} className=" gap-1 hover:bg-gray-700   border-gray-200 rounded-md">
        <IoSettings className="w-8 h-6" />
      </Link>
    </div>
  );
};

export default Footer;
