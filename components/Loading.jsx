"use client";
import useLoadingRegister from "@/hooks/useLoadingRegister";
import React from "react";

const Loading = () => {
  const loadingRegister = useLoadingRegister();
  return (
    <>
      {loadingRegister.isOpen ? (
        <>
          <section className="absolute inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-md">
            <h1 className="text-8xl font-black text-white">LOADING...</h1>
          </section>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loading;
