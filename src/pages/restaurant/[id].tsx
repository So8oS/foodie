/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import TopArt from "@/components/topArt";

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  image: string;
  openingHours: string;
  averageRating: number;
  cuisineType: string;
}

const Resturant = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>(); // Initialize with null
  const router = useRouter();
  const restaurantId = router.query.id;

  const getRestaurant = async () => {
    try {
      const { data } = await axios.post(`/api/getRestaurant`, { restaurantId });
      setRestaurant(data.restaurant);
      console.log(data.restaurant);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      getRestaurant();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopArt />
      <div className="p-5 flex flex-col justify-center items-center ">
        {/* Componant */}
        <div className="flex flex-col justify-center ">
          <img className="w-full object-cover rounded-lg " src={restaurant?.image} alt={restaurant?.name} />
          <h1 className="text-3xl font-semibold mt-4 ">{restaurant?.name}</h1>
          <p className="fons-xs">{restaurant?.cuisineType}</p>
          <p className=" ">{restaurant?.address}</p>
          <p className="text-xs ">{restaurant?.openingHours}</p>
          <div className="flex items-center gap-1 ">
            <AiFillStar className="text-[#EAB308]" />
            <p className="">{restaurant?.averageRating}</p>
          </div>
          {/* Add more details here, like reviews, opening hours, etc. */}
        </div>
        <h1 className="text-3xl self-center font-bold mt-5">Reviews</h1>
        <div className="grid grid-cols-3 gap-2 ">
          <img className="w-32" src="https://www.wofox.com/napi/adsn/MTY2OTI=/166921574058436261.gif?20191223084827" alt="" />
          <img className="w-32" src="https://www.wofox.com/napi/adsn/MTY2MzQ=/166341574058211170.gif?20191223052746" alt="" />
          <img className="w-32" src="https://images.squarespace-cdn.com/content/v1/5d41a788c6622100014f6e24/1585677356510-1G1GYAIGN0ABLCVJJ3S9/faceup1.gif?format=500w" alt="" />
          <img className="w-32" src="https://www.wofox.com/napi/adsn/MTY2OTY=/166961574058463008.gif?20191223083721" alt="" />
          <img className="w-32" src="https://www.wofox.com/napi/adsn/MTY2ODk=/166891574058423195.gif?20191223084730" alt="" />
          <img className="w-32" src="https://www.wofox.com/napi/adsn/MTY2OTI=/166921574058436261.gif?20191223084827" alt="" />
          <img className="w-32" src="https://www.wofox.com/napi/adsn/MTY2MzQ=/166341574058211170.gif?20191223052746" alt="" />
        </div>
      </div>
    </>
  );
};

export default Resturant;
