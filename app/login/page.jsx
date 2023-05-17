"use client";
import React from "react";
import Image from "next/image";
import nike from "../../public/nike-trans.png";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";


const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dateOfBirth: yup.date(),
});

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const formSubmit = (data) => {
    axios
      .post(`/api/user/postRegister`, data)
      .then(() => {
        // closeModal();
        console.log("success");
        // setSuccess(true);
        setTimeout(() => {}, 2000);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  return (
    <section className="w-full flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-4 w-1/3">
        <div className="flex gap-4 flex-1 items-center">
          <Image width={80} height={80} src={nike} alt="Logo" />
        </div>
        <h1 className="font-black text-4xl text-center w-full ">
          YOUR ACCOUNT FOR <br /> EVERYTHING NIKE
        </h1>
        <form
          className="font-light w-full flex flex-col gap-8 mt-10 items-center"
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className="flex flex-col gap-4 w-full">
            <input
              type="text"
              className="p-2 px-4 w-full text-2xl bg-transparent border border-gray-300"
              placeholder="Email address"
              {...register("email")}
            />
            <input
              type="password"
              className="p-2 px-4 w-full text-2xl bg-transparent border border-gray-300"
              placeholder="Password"
              {...register("password")}
            />
            <input
              type="text"
              className="p-2 px-4 w-full text-2xl bg-transparent border border-gray-300"
              placeholder="First Name"
              {...register("firstName")}
            />
            <input
              type="text"
              className="p-2 px-4 w-full text-2xl bg-transparent border border-gray-300"
              placeholder="Last Name"
              {...register("lastName")}
            />
            <div className="flex flex-col w-full gap-2 mb-2">
              <input
                type="date"
                className="p-2 px-4 w-full text-2xl bg-transparent border border-gray-300 text-gray-400 "
                placeholder="Date of Birth"
                {...register("dateOfBirth")}
              />
              <h2 className="text-gray-400 text-center">
                Get a Nike Member Reward every year on your Birthday.
              </h2>
            </div>
            <select
              name=""
              id=""
              className="text-gray-400 p-2 px-4 w-full text-2xl bg-transparent border border-gray-300"
            >
              <option value="Philippines" defaultValue={"Philippines"}>
                Philippines
              </option>
            </select>

            <div className="flex w-full justify-between gap-10">
              <button className="p-2 text-xl bg-transparent border border-gray-300 text-gray-400 ">
                Male
              </button>
              <button className="p-2 text-xl bg-transparent border border-gray-300 text-gray-400 ">
                Female
              </button>
              <button className="p-2 text-xl bg-transparent border border-gray-300 text-gray-400 ">
                Prefer Not to Say
              </button>
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex items-center gap-4">
              <input type="checkbox" className="w-8 h-8 " />
              <label htmlFor="" className="text-gray-400 text-md">
                Sign up for emails to get updates from Nike on products, offers
                and your Member benefits
              </label>
            </div>
          </div>

          <div className="text-center text-gray-400">
            By creating an account, you agree to Nike's
            <span className="underline mx-1">Privacy Policy</span>
            and
            <span className="underline mx-1">Terms of Use.</span>
          </div>

          <button
            type="submit"
            className="w-full text-center font-black bg-black text-white py-3 text-xl"
          >
            JOIN US
          </button>

          <h3 className="text-gray-400 cursor-default">
            Already a Member?{" "}
            <Link href={"/signin"}>
              <span className="ml-3 underline text-black cursor-pointer">
                Sign In
              </span>
            </Link>
          </h3>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
