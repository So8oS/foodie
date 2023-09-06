import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { UploadButton } from "@uploadthing/react";
import { Ring } from "@uiball/loaders";

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
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // @ts-ignore
  const add = async (data: IFormInput, e) => {
    setSubmitting(true);
    try {
      await axios.post("/api/addResturant", {
        name: data.name,
        address: data.address,
        cuisineType: data.cuisineType,
        openingHours: data.openingHours,
        contactInfo: data.contactInfo,
        website: data.website,
        image: image,
      });
    } catch (err: any) {
      console.log(err.response.data.message);
      setSubmitting(false);
      setError(err.response.data.message);
    }
    if (!error) {
      e.target.reset();
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4  ">
      <h1 className="text-3xl font-bold">Add a restaurant</h1>
      <h1 className="text-[#F45867] animate-pulse" role="alert" data-testid="error">
        {error}
      </h1>
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
            <input className="w-full outline-none " type="text" {...register("name")} required />
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
        <button disabled={submitting} className=" p-2 w-40 rounded-lg shadow-2xl border border-slate-400 self-center text-[#F45867] text-xl font-semibold mt-5 flex justify-center items-center ">
          {!submitting ? "Submit" : <Ring size={20} lineWeight={8} speed={3} color="#F45867" />}
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
