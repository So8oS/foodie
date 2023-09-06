import React from "react";
import getReviews from "./../../lib/getReviews";
// @ts-ignore
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";

const Explore = () => {
  const reviews = getReviews();
  console.log(reviews.data);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <h1 className="self-center text-2xl font-semibold">Explore</h1> */}
      <div className="flex flex-col justify-center items-center">
        {/* @ts-ignore */}
        {reviews &&
          //@ts-ignore
          reviews?.data?.map((review) => {
            return (
              <div key={review.id}>
                {/* <video className="" src={review.video} /> */}
                <Video controls={["PlayPause", "Fullscreen"]}>
                  <source src={review.video} type="video/webm" />
                </Video>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Explore;
