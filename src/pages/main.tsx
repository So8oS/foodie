/* eslint-disable @next/next/no-img-element */
import React from "react";
import { restaurants } from "./../components/resturants";
import Navbar from "@/components/navbar";
import { MdRateReview } from "react-icons/md";
import { signOut } from "next-auth/react";

const Main = () => {
  return (
    <div className="p-3 flex flex-col gap-3">
      <Navbar />
      <h1 className="self-start font-semibold text-2xl">Featured Resturants</h1>
      <div className="flex  items-center  gap-4  py-5 overflow-scroll">
        {restaurants.map((item) => {
          return (
            <div key={item.name} className=" shadow-lg flex flex-col items-center justify-center rounded-2xl overflow-scroll min-w-fit pb-2">
              <img className="w-[19rem] h-[10rem] object-cover" src={item.image} alt="" />
              <h1 className="self-start  font-semibold pl-3">{item.name}</h1>
              <h2>{item.address}</h2>
              <div className="self-start pl-3 flex gap-1 justify-center items-center">
                <MdRateReview className=" w-5 h-5 " />
                <p>3</p>
              </div>
            </div>
          );
        })}
      </div>
      <button className="p-2 w-52 rounded-lg shadow-2xl border border-slate-400 self-center text-[#F45867]" onClick={() => signOut({ callbackUrl: "/" })}>
        Sign out
      </button>
    </div>
  );
};

export default Main;
