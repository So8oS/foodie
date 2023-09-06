/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { SiGooglemaps } from "react-icons/si";
import { UploadButton } from "@uploadthing/react";
import { useForm } from "react-hook-form";
import useCurrentUser from "../../../lib/useCurrentUser";
import { JellyTriangle } from "@uiball/loaders";
import ReviewForm from "../../components/reviewForm";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

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
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const router = useRouter();
  const restaurantId = router.query.id;
  const [make, setMake] = useState(false);
  const [image, setImage] = React.useState();
  const { register, handleSubmit } = useForm();
  const user = useCurrentUser();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const getRestaurant = async () => {
    try {
      const { data } = await axios.post(`/api/getRestaurant`, { restaurantId });
      setRestaurant(data.restaurant);
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
  // @ts-ignore
  const addReview = async (data) => {
    console.log(data);

    try {
      const review = await axios.post(`/api/addReview`, {
        restaurantId: restaurantId,
        userId: user.data.id,
        rating: data.rating,
        reviewText: data.reviewText,
        image,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!restaurant)
    return (
      <div className="flex justify-center items-center min-h-screen pb-16">
        <JellyTriangle size={50} speed={1} color="#F45867" />
      </div>
    );

  return (
    <>
      <div className="p-5 flex flex-col justify-center items-center ">
        {/* Componant */}
        <div className="flex flex-col justify-center ">
          <img className="w-full object-cover rounded-lg " src={restaurant?.image} alt={restaurant?.name} />
          <h1 className="text-3xl font-semibold mt-4 ">{restaurant?.name}</h1>
          <p className="text-sm">{restaurant?.cuisineType}</p>
          <div className="flex items-center gap-1">
            <p className="">{restaurant?.address}</p>
            <SiGooglemaps className="text-[#E94A35] w-4 h-4 " />
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-xs border border-black w-fit p-0.5 ">{restaurant?.openingHours}</p>
            <div className="flex items-center gap-1 ">
              <AiFillStar className="text-[#EAB308]" />
              <p className="">{restaurant?.averageRating}</p>
            </div>
          </div>
          {/* @ts-ignore */}
        </div>
        <button
          onClick={() => {
            setMake(true);
            setShowReviewForm(true);
          }}
          className="p-2 mt-4 rounded-lg shadow-2xl border border-slate-400 self-center text-[#F45867] text-xl font-semibold"
        >
          Make A Review
        </button>
        {showReviewForm && (
          <ReviewForm
            // @ts-ignore

            onSubmit={(data) => {
              // Handle form submission here
              console.log(data);
              setShowReviewForm(false);
            }}
            onCancel={() => {
              setShowReviewForm(false);
            }}
          />
        )}

        <h1 className="text-3xl self-center font-bold mt-5">Reviews</h1>
        <div className="grid grid-cols-3 gap-2 mt-5 ">
          {/* @ts-ignore */}
          {restaurant?.reviews ? (
            //@ts-ignore
            restaurant.reviews.map((review) => {
              return (
                <>
                  <video controls className="" src={review.video} />
                </>
              );
            })
          ) : (
            <h1 className="text-[#F45867]">No Reviews</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Resturant;
