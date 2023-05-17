"use client";
import React from "react";
import Image from "next/image";
import nike from "../../public/nike-trans.png";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

import { signIn, signOut, useSession } from "next-auth/react";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

import Link from "next/link";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const { data: session } = useSession();

  const formSubmit = (data) => {
    // axios
    //   .post(`/api/user/postRegister`, data)
    //   .then(() => {
    //     // closeModal();
    //     console.log("success");
    //     // setSuccess(true);
    //     setTimeout(() => {}, 2000);
    //     router.push("/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     // setLoading(false);
    //   });
    console.log(data);
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
          </div>

          <div className="flex justify-between w-full">
            <div className="flex items-center gap-4">
              <input type="checkbox" className="w-8 h-8 " />
              <label htmlFor="" className="text-gray-400 text-lg">
                Keep me signed in
              </label>
            </div>
            <h2 className="text-gray-300">Forgotten your password?</h2>
          </div>

          <div className="text-center text-gray-400">
            By logging in, you agree to Nike's{" "}
            <span className="underline mx-1">Privacy Policy</span>
            and
            <span className="underline mx-1">Terms of Use.</span>
          </div>

          <button
            type="submit"
            className="w-full text-center font-black bg-black text-white py-3 text-xl"
          >
            SIGN IN
          </button>

          <h3 className="text-gray-400 cursor-default">
            Not a Member?
            <Link href={"/login"}>
              <span className="ml-3 underline text-black cursor-pointer">
                Join us
              </span>
            </Link>
          </h3>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
