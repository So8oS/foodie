// ReviewForm.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadButton } from "@uploadthing/react";
import { AiOutlineClose } from "react-icons/ai";
// @ts-ignore

const ReviewForm = ({ onSubmit, onCancel }) => {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  // @ts-ignore

  const handleImageUpload = (res) => {
    console.log(res[0].url);
    setImage(res[0].url);
    alert("Upload Completed");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <button onClick={onCancel} className="p-1 rounded-lg shadow-2xl border border-slate-400 self-end text-[#F45867] ">
          <AiOutlineClose />
        </button>
        <h1 className="text-3xl font-bold">Make A Review</h1>
        <div className="flex flex-col justify-center items-center mt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-4">
            <textarea className="border border-black rounded-lg p-2 w-72 text-center" placeholder="Food was great..." {...register("reviewText")} />
            <input className="border border-black rounded-lg p-2  text-center" type="number" placeholder="1-10" {...register("rating")} />

            {/* @ts-ignore */}
            <UploadButton
              className="p-2   rounded-lg shadow-2xl border border-slate-400 self-center text-[#F45867] text-xl font-semibold"
              endpoint="imageUploader"
              onClientUploadComplete={handleImageUpload}
              // @ts-ignore

              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
            <button type="submit" className="p-2 rounded-lg shadow-2xl border border-slate-400 self-center text-[#F45867] text-lg font-semibold">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
