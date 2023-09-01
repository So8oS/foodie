/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import Navbar from "@/components/navbar";
import { MdRateReview } from "react-icons/md";
import { signOut } from "next-auth/react";
import TopArt from "@/components/topArt";
import { useSession } from "next-auth/react";
import HorizontalScrollButton from "@/components/scroll";
import getAllrestaurants from "./../../lib/getAllRestaurants";
import Skeleton from "react-content-loader";
import Link from "next/link";

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  image: string;
  openingHours: string;
  averageRating: number;
}

const Main = () => {
  const { data: session } = useSession();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const restaurants = getAllrestaurants();
  console.log(restaurants.data);

  return (
    <>
      <div className="p-3 flex flex-col gap-3">
        <Navbar />
        <h1 className="self-start font-semibold text-2xl">Featured Restaurants</h1>
        <div className="flex items-center gap-1">
          <HorizontalScrollButton direction="left" scrollContainerRef={scrollContainerRef} />
          <div ref={scrollContainerRef} className="flex items-center gap-5 py-5 overflow-scroll">
            {/* Map over restaurants or show skeletons */}
            {restaurants?.data
              ? restaurants.data
                  .map((restaurant: Restaurant) => (
                    <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id} className="shadow-lg flex flex-col items-center justify-center rounded-2xl overflow-scroll min-w-fit pb-2">
                      <img className="w-[19rem] h-[10rem] object-cover" src={restaurant.image} alt="" />
                      <h1 className="self-start font-semibold pl-3">{restaurant.name}</h1>
                      <h2>{restaurant.address}</h2>
                      <div className="self-start pl-3 flex gap-1 justify-center items-center">
                        <MdRateReview className="w-5 h-5" />
                        <p>3</p>
                      </div>
                    </Link>
                  ))
                  .reverse()
              : // Show skeletons while loading data
                restaurants?.isLoading && (
                  <>
                    <Skeleton width={300} height={200} />
                    <Skeleton width={300} height={200} />
                    <Skeleton width={300} height={200} />
                    {/* Repeat the above for the number of items you want */}
                  </>
                )}
          </div>
          <HorizontalScrollButton direction="right" scrollContainerRef={scrollContainerRef} />
        </div>
        {session && (
          <button className="p-2 w-52 rounded-lg shadow-2xl border border-slate-400 self-center text-[#F45867] text-xl font-semibold" onClick={() => signOut({ callbackUrl: "/" })}>
            Sign out
          </button>
        )}
      </div>
    </>
  );
};

export default Main;
