"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ItemCard from "@/components/ItemCard";
import tempImage from "../../../public/tempKicks.jpg";
import tempImage2 from "../../../public/tempWomen.webp";
import tempImage3 from "../../../public/temp3.webp";

import axios from "axios";

const CategoryPage = ({ params }) => {
  const items = [
    {
      image: tempImage,
      name: "Air Jordan Low SE",
      category: `Men's Shoes`,
      noColors: 1,
      price: "6,395",
    },
    {
      image: tempImage2,
      name: "Air Jordan 1 Low FlyEase",
      category: `Men's Shoes On/Off Shoes`,
      noColors: 1,
      price: "7,395",
    },
    {
      image: tempImage2,
      name: "Air Jordan 1 Low FlyEase",
      category: `Men's Shoes On/Off Shoes`,
      noColors: 1,
      price: "7,395",
    },
    {
      image: tempImage2,
      name: "Air Jordan 1 Low FlyEase",
      category: `Men's Shoes On/Off Shoes`,
      noColors: 1,
      price: "7,395",
    },
    {
      image: tempImage3,
      name: "Nike Air Force 1 '07",
      category: `Men's Shoes`,
      noColors: 2,
      price: "5,495",
    },
    {
      image: tempImage3,
      name: "Nike Air Force 1 '07",
      category: `Men's Shoes`,
      noColors: 2,
      price: "5,495",
    },
    {
      image: tempImage3,
      name: "Nike Air Force 1 '07",
      category: `Men's Shoes`,
      noColors: 2,
      price: "5,495",
    },
  ];

  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/get/${params.category}`)
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
    if (itemData.length > 0) {
      console.log(itemData);
    }
  }, [loading]);
  return (
    <section className="flex flex-col w-full relative">
      {/* HEADER */}
      <div className="flex justify-between items-center px-16 text-3xl font-semibold sticky top-0 bg-white py-10 z-20">
        <h1 className="">{params.category}'s Shoes (517)</h1>
        <div className="flex gap-8 text-xl font-normal">
          <div className="flex gap-2 cursor-pointer">
            <h2 className="">Hide Filters</h2>
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
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          </div>
          <div className="flex gap-2 cursor-pointer">
            <h2 className="">Sort By</h2>
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <section className="flex relative">
        <Sidebar />
        <div className="w-full px-20 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex justify-center items-center flex-col">
              <h1 className="text-4xl text-center font-black">LOADING...</h1>
            </div>
          )}
          <h1 className="text-center mb-5 text-6xl font-bold">
            {params.category} Page
          </h1>{" "}
          <hr />
          <div className="mt-8 grid grid-cols-3 gap-5">
            {itemData.length > 0 && (
              <>
                {itemData.map((item, index) => {
                  return (
                    <div className="" key={index}>
                      <ItemCard image={item.pictures} name={item.name} category={`${params.category}'s ${item.category}`} noColors={item.colorways.length} price={item.price} itemId={item.itemId}/>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default CategoryPage;
