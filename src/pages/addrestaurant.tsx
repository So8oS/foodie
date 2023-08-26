import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { UploadButton } from "@uploadthing/react";

interface IFormInput {
  name: string;
  address: string;
  cuisineType: string;
  openingHours: string;
  contactInfo: string;
  website: string;
}

const AddRestaurant = () => {
  const [image, setImage] = React.useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // @ts-ignore
  const add = async (data: IFormInput, e) => {
    await axios.post("/api/addResturant", {
      name: data.name,
      address: data.address,
      cuisineType: data.cuisineType,
      openingHours: data.openingHours,
      contactInfo: data.contactInfo,
      website: data.website,
      image: image,
    });
    e.target.reset();
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl">Add a restaurant</h1>
      {/* @ts-ignore */}
      <UploadButton
        className="p-2 mt-4 rounded-lg shadow-2xl border border-slate-400 self-center text-[#F45867] text-xl font-semibold"
        endpoint="imageUploader"
        //@ts-ignore
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log(res[0].url);
          setImage(res[0].url);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {/* @ts-ignore */}
      <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit(add)}>
        <div className="flex justify-center items-center ">
          <label className="w-20" htmlFor="">
            Name:
          </label>
          <div className="flex h-10 w-8/12  flex-row items-center  gap-2 rounded-lg border  bg-white pl-2 text-xl shadow outline-none ">
            <input className="w-full outline-none " type="text" {...register("name")} />
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <label className="w-20" htmlFor="">
            address:{" "}
          </label>
          <div className="flex h-10 w-8/12  flex-row items-center  gap-2 rounded-lg border  bg-white pl-2 text-xl shadow outline-none ">
            <input className="w-full outline-none " type="text" {...register("address")} />
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <label className="w-20" htmlFor="">
            Cuisine Type:{" "}
          </label>
          <div className="flex h-10 w-8/12  flex-row items-center  gap-2 rounded-lg border  bg-white pl-2 text-xl shadow outline-none ">
            <input className="w-full outline-none " type="text" {...register("cuisineType")} />
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <label className="w-20" htmlFor="">
            Opening Hours:{" "}
          </label>
          <div className="flex h-10 w-8/12  flex-row items-center  gap-2 rounded-lg border  bg-white pl-2 text-xl shadow outline-none ">
            <input className="w-full outline-none " type="text" {...register("openingHours")} />
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <label className="w-20" htmlFor="">
            Contact:{" "}
          </label>
          <div className="flex h-10 w-8/12  flex-row items-center  gap-2 rounded-lg border  bg-white pl-2 text-xl shadow outline-none ">
            <input className="w-full outline-none " type="text" {...register("contactInfo")} />
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <label className="w-20" htmlFor="">
            Website:{" "}
          </label>
          <div className="flex h-10 w-8/12  flex-row items-center  gap-2 rounded-lg border  bg-white pl-2 text-xl shadow outline-none ">
            <input className="w-full outline-none " type="text" {...register("website")} />
          </div>
        </div>
        <button className="p-2 w-40 rounded-lg shadow-2xl border border-slate-400 self-center text-[#F45867] text-xl font-semibold mt-2">Submit</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
