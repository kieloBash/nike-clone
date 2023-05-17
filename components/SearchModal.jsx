"use client";

import React, { useEffect, useState } from "react";
import nike from "../public/nike.jpg";
import Image from "next/image";
import ItemCard from "./ItemCard";
const SearchModal = ({ setToggleSearchModal }) => {
  const [search, setSearch] = useState("");
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/getAllProducts`)
        .then(async (res) => {
          const data = await res.json();
          setItemData(data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (itemData.length === 0) fetchData();
  }, []);

  useEffect(() => {
    if (search) {
    } else {
    }
  }, [search]);
  return (
    <section className="overflow-hidden sticky top-0 w-full h-full bg-white/60 backdrop-blur-md z-50 flex flex-col items-center p-56 gap-10">
      {loading && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex justify-center items-center flex-col">
          <h1 className="text-4xl text-center font-black">LOADING...</h1>
        </div>
      )}
      <div className="hover:border-gray-500 border border-transparent absolute flex items-center top-24 right-56 bg-black rounded-full shadow-lg z-60 px-4 duration-100 transition hover:-translate-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="w-6 h-6 stroke-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>

        <button
          className="px-4 py-2 text-white text-2xl font-bold rounded-full"
          onClick={() => setToggleSearchModal(false)}
        >
          Go Back
        </button>
      </div>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col items-center">
          <div className="flex gap-4 flex-1 items-center cursor-pointer -mb-2">
            {/* <Image width={120} height={120} src={nike} alt="Logo" /> */}
          </div>
          <h1 className="text-center font-black text-5xl">SEARCH YOUR FIT</h1>
        </div>
        <div className="bg-white flex items-center justify-between w-full border-2 border-black rounded-xl px-2 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            type="text"
            className="w-full text-2xl px-4 rounded-xl outline-none font-bold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-4 max-h-[50rem] overflow-x-hidden">
        {/* <div className="mt-8 grid grid-cols-3 gap-5"> */}
        {itemData.length > 0 && (
          <>
            {itemData.map((item, index) => {
              return (
                <div className="" key={index}>
                  <ItemCard
                    image={item.pictures}
                    name={item.name}
                    category={`${item.genderCategory}'s ${item.category}`}
                    noColors={item.colorways.length}
                    price={item.price}
                    itemId={item.itemId}
                  />
                </div>
              );
            })}
          </>
        )}
        {/* </div> */}
      </div>
    </section>
  );
};

export default SearchModal;
