/* eslint-disable @next/next/no-img-element */
import React from "react";
import getReviews from "./../../lib/getReviews";
// @ts-ignore
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { BiHeart } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const Explore = () => {
  const reviews = getReviews();
  console.log(reviews.data);

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex flex-col justify-center items-center mb-12 ">
        {/* @ts-ignore */}
        {reviews &&
          //@ts-ignore
          reviews?.data?.map((review) => {
            return (
              <div key={review.id} className="flex flex-col  w-full ">
                <div className="flex justify-between items-center bg-white p-2  ">
                  <div className="flex  justify-center items-center gap-3">
                    <img className="w-8 rounded-full" src={review.user.image} alt="" />
                    <h1>{review.user.name}</h1>
                  </div>
                  <BsThreeDotsVertical className="h-6 w-6" />
                </div>

                <Video controls={["PlayPause", "Fullscreen"]}>
                  <source src={review.video} type="video/webm" />
                </Video>
                <div className="flex flex-col gap-3  bg-white p-2  border-slate-600 ">
                  <div className="flex justify-between items-center ">
                    <BiHeart className="h-7 w-7" />
                    {/* <BsThreeDotsVertical className="h-7 w-7" /> */}
                  </div>
                  <div className="flex justify-start items-center gap-3">
                    <h1 className="font-bold">{review.user.name}</h1>
                    <h1>{review.reviewText}</h1>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Explore;
