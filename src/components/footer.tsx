import Link from "next/link";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="px-8 py-3 font-medium fixed bottom-0 text-[#F5F5F5] flex justify-between items-center w-full gap-10 text-sm  bg-[#F45867] ">
      <Link href={"/main"} className="">
        <AiFillHome className="w-8 h-6 " />
      </Link>
      <Link href={"/"} className="">
        <FaSearch className="w-8 h-6" />
      </Link>

      <Link href={"/explore"} className="">
        <IoFastFoodSharp className="w-8 h-6" />
      </Link>

      <Link href={"/Tv"} className="">
        <IoSettings className="w-8 h-6" />
      </Link>
    </div>
  );
};

export default Footer;
