import React from "react";
import getReviews from "./../../lib/getReviews";

const Explore = () => {
  const reviews = getReviews();
  console.log(reviews.data);

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="self-center text-2xl font-semibold">Explore</h1>
      <div className="grid grid-cols-3 gap-2 mt-5 ">
        {/* @ts-ignore */}
        {reviews &&
          //@ts-ignore
          reviews?.data?.map((review) => {
            return (
              <>
                <video controls className="" src={review.video} />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Explore;
