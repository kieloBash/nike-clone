// 'use client'
import React from "react";
import Image from "next/image";
import nike from "../../public/nike.jpg";

import Link from "next/link";

const SignIn = () => {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-4 w-1/3">
        <div className="flex gap-4 flex-1 items-center">
          <Image width={80} height={80} src={nike} alt="Logo" />
        </div>
        <h1 className="font-black text-4xl text-center w-full ">
          YOUR ACCOUNT FOR <br /> EVERYTHING NIKE
        </h1>
        <form className="font-light w-full flex flex-col gap-8 mt-10 items-center">
          <div className="flex flex-col gap-4 w-full">
            <input
              type="text"
              className="p-2 px-4 w-full text-2xl bg-transparent border border-gray-300"
              placeholder="Email address"
            />
            <input
              type="password"
              className="p-2 px-4 w-full text-2xl bg-transparent border border-gray-300"
              placeholder="Password"
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
