/* eslint-disable @next/next/no-img-element */
import React, { useState, useCallback } from "react";
import { MdEmail } from "react-icons/md";
import { AiFillLock, AiOutlineUser } from "react-icons/ai";
import { AiOutlineGoogle } from "react-icons/ai";
import { getSession, signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Poppins } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { NextPageContext } from "next";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Auth = () => {
  const [varient, setVarient] = React.useState("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleVarient = useCallback(() => {
    setVarient((currentVarient) => (currentVarient === "login" ? "register" : "login"));
  }, []);

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      const { email, password } = data;
      setLoading(true);
      try {
        const response = await signIn("credentials", {
          email,
          password,
          callbackUrl: "/main",
          redirect: false,
        });
        setLoading(false);

        if (response?.error) {
          setError(response.error);
        }
        if (!response?.error) {
          router.push("/main");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [router]
  );

  const userRegister = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      setLoading(true);
      console.log(data);
      const { name, email, password } = data;
      try {
        await axios.post("/api/register", {
          name: name,
          email: email.toLowerCase(),
          password: password,
        });
        console.log(name, email);

        login(data);
        setLoading(false);
      } catch (err: any) {
        console.log("error", err.response.data.error);
        setError(err.response.data.error);
      }
    },
    [login]
  );

  return (
    // Page
    <div className={`flex  flex-col items-center justify-center  `}>
      <div className="flex justify-between w-full">
        <div className="flex">
          <svg className="" xmlns="http://www.w3.org/2000/svg" width="50" height="75" viewBox="0 0 50 75" fill="none">
            <circle cx="2" cy="27" r="30" stroke="#F45867" stroke-width="36" />
          </svg>
          <svg className="absolute " xmlns="http://www.w3.org/2000/svg" width="160" height="66" viewBox="0 0 160 66" fill="none">
            <circle cx="77.5" cy="-16.5" r="82.5" fill="#FFECE7" />
          </svg>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="77" height="72" viewBox="0 0 77 72" fill="none">
          <circle cx="90.5" cy="-18.5" r="90.5" fill="#F45867" />
        </svg>
      </div>
      {/* Component */}
      <div className="flex w-full max-w-[30rem] flex-col  px-4 mt-5  ">
        <h1 className=" text-4xl font-bold self-start md:self-center">{varient === "login" ? "Sign In" : "Register"}</h1>
        {/* Form */}
        {error && <p className="animate-pulse text-red-500">{error}</p>}
        <form
          className="mt-6 flex flex-col gap-6  "
          onSubmit={
            varient === "login"
              ? // @ts-ignore
                handleSubmit(login)
              : // @ts-ignore
                handleSubmit(userRegister)
          }
        >
          {varient === "register" && (
            <div className="flex flex-col gap-2">
              <label className="text-[#9796A1]" htmlFor="">
                Full Name
              </label>
              <div className="flex h-16 w-full  flex-row items-center  gap-2 rounded-xl border  bg-white pl-2 text-xl shadow outline-none ">
                <AiOutlineUser className="w-5 text-[#828282]" />
                <input className="w-full outline-none " {...register("name")} type="text" placeholder="Name" />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-[#9796A1]" htmlFor="">
              Email
            </label>
            <div className="flex h-16 w-full  flex-row items-center  gap-2 rounded-xl border  bg-white pl-2 text-xl shadow outline-none ">
              <MdEmail className="w-5 text-[#828282]" />
              <input className="w-full  outline-none " {...register("email", { required: "Email is required" })} type="email" placeholder="Email" />
            </div>
          </div>
          {/*@ts-ignore */}
          {errors.email && (
            <p className="animate-pulse text-red-500">
              {/* @ts-ignore */}
              {errors.email.message}
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-[#9796A1]" htmlFor="">
              Password
            </label>
            <div className="flex h-16 w-full flex-row items-center gap-2  rounded-xl border bg-white  pl-2 text-xl shadow outline-none ">
              <AiFillLock className="w-5 text-[#828282]" />
              <input className="w-full  outline-none" {...register("password", { required: "Password is required" })} type="password" placeholder="Password" />
            </div>
          </div>
          {/*@ts-ignore */}
          {errors.password && (
            <p className="animate-pulse text-red-500">
              {/* @ts-ignore */}
              {errors.password.message}
            </p>
          )}
          {loading ? (
            <button className="animate-pulse text h-14 w-60 rounded-full bg-[#F45867] text-white shadow self-center  " type="submit">
              Loading...
            </button>
          ) : (
            <button className="text h-14 w-60 rounded-full bg-[#F45867] text-white shadow self-center " type="submit">
              {varient === "login" ? "Sign In" : "Register"}
            </button>
          )}
        </form>
        {/*                              */}
        <span className="self-center mt-5 text-sm font-medium">
          {" "}
          {varient === "login" ? "Not a member? " : "Already a member? "}
          <a
            onClick={() => {
              toggleVarient();
            }}
            className="cursor-pointer text-[#2D9CDB]"
          >
            {varient === "login" ? "Register" : "Login"}
          </a>
        </span>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 ">
          <div className="flex justify-center items-center gap-2">
            <img src="/line-72.png" alt="" />
            <p className="text-sm">continue with</p>
            <img src="/line-72.png" alt="" />
          </div>
          <div className="flex gap-5">
            <div
              className=" flex cursor-pointer items-center justify-center  rounded-full p-2 shadow-2xl gap-2"
              onClick={() => {
                signIn("google", {
                  callbackUrl: "/main",
                });
              }}
            >
              <FcGoogle className="text-[#828282] w-8 h-8 " />
              <h1>Google</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
