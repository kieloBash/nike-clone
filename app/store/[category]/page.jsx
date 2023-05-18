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

  const [toggleFilter, setToggleFilter] = useState(true);
  const [toggleSort, setToggleSort] = useState({ sortBy: "", bool: false });

  const [sortBy, setSortBy] = useState([]);
  const sortButtons = [
    { name: "Featured", value: 1 },
    { name: "Newest", value: 2 },
    { name: "Price: High-Low", value: 3 },
    { name: "Price: Low-High", value: 4 },
  ];

  const [itemData, setItemData] = useState([]);
  const [itemDataFiltered, setItemDataFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/get/${params.category}`)
        .then(async (res) => {
          const data = await res.json();
          setItemData(data);
          setItemDataFiltered(data);
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

  // FILTER OPTIONS
  function hasAllElements(array, elements) {
    return elements.every((element) => array.includes(element));
  }
  function hasAllSizes(array, elements) {
    return elements.every((element) => array.includes(Number(element)));
  }

  const filterItems = () => {
    if (filter.usage?.length > 0 || filter.sizes?.length > 0) {
      let selected = [];
      itemData.forEach((item) => {
        if (
          hasAllElements(item.usage, filter.usage) &&
          hasAllSizes(item.sizes, filter.sizes)
        ) {
          selected.push(item);
        }
      });
      setItemDataFiltered(selected);
    } else {
      setItemDataFiltered(itemData);
    }
  };

  useEffect(() => {
    filterItems();
  }, [filter]);
  // END OF FILTER OPTIONS

  // SORTING
  const sortItems = (sortBy) => {
    let sortedItems = []
    switch (sortBy) {
      case 3:
        sortedItems = [...itemDataFiltered].sort((a, b) => b.price - a.price);
        setItemDataFiltered(sortedItems);
        break;
      case 4:
        sortedItems = [...itemDataFiltered].sort((a, b) => a.price - b.price);
        setItemDataFiltered(sortedItems);
        break;
      default:
        break;
    }
  };

  // END OF SORTING

  return (
    <section className="flex flex-col w-full relative">
      {/* HEADER */}
      <div className="flex justify-between items-center px-16 text-3xl font-semibold sticky top-0 bg-white py-10 z-20">
        <h1 className="">
          {params.category}'s Shoes ({itemDataFiltered.length})
        </h1>
        <div className="flex gap-8 text-xl font-normal">
          <div
            className="flex gap-2 cursor-pointer"
            onClick={() => {
              setToggleFilter((prev) => !prev);
            }}
          >
            <h2 className="">{toggleFilter ? "Hide" : "Show"} Filters</h2>
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
          <div
            className="flex gap-2 cursor-pointer relative"
            onClick={() => {
              const newArr = { ...toggleSort, bool: !toggleSort.bool };
              setToggleSort(newArr);
            }}
          >
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
            {toggleSort.bool && (
              <div className="absolute bg-white top-full right-0 w-56 flex flex-col shadow-md rounded-xl font-semibold mt-4">
                {sortButtons.map((btn, index) => {
                  return (
                    <button
                      key={index}
                      className="text-lg py-2 px-2 text-right pr-10 hover:text-gray-400 transition duration-100"
                      onClick={() => {
                        sortItems(btn.value);
                      }}
                    >
                      {btn.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <section className="flex relative">
        {toggleFilter && <Sidebar setFilter={setFilter} />}
        <div className="w-full px-20 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex justify-center items-center flex-col">
              <h1 className="text-4xl text-center font-black">LOADING...</h1>
            </div>
          )}
          <div className="mt-8 grid grid-cols-3 gap-5">
            {itemDataFiltered.length > 0 && (
              <>
                {itemDataFiltered.map((item, index) => {
                  return (
                    <div className="" key={index}>
                      <ItemCard
                        image={item.pictures}
                        name={item.name}
                        category={`${params.category}'s ${item.category}`}
                        noColors={item.colorways.length}
                        price={item.price}
                        itemId={item._id}
                      />
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
