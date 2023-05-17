"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ItemPage = ({ params }) => {
  const [itemData, setItemData] = useState({});
  const [loading, setLoading] = useState(true);

  const [stars, setStars] = useState([false, false, false, false, false]);

  const [toggleReviews, setToggleReviews] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/items/${params.itemId}`)
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
          setItemData(data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  const handleWriteReview = () => {
    if (session?.user) {
      console.log("hello user");
    } else {
      router.push("/signin");
    }
  };

  const handleAddToBag = () => {
    if (session?.user) {
      console.log("hello user");
    } else {
      router.push("/signin");
    }
  };

  const handleFavorite = () => {
    if (session?.user) {
      console.log("hello user");
    } else {
      router.push("/signin");
    }
  };



  return (
    <section className="w-full px-20 mt-14">
      {loading && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex justify-center items-center flex-col">
          <h1 className="text-4xl text-center font-black">LOADING...</h1>
        </div>
      )}

      {itemData?.name && (
        <div className="flex gap-12">
          <div className="flex-[2]">
            <div className="grid grid-cols-2 gap-4">
              {itemData.pictures.map((pic, index) => {
                return (
                  <Image
                    key={index}
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt="Item Card"
                    className="rounded-xl shadow-md"
                    src={pic}
                  />
                );
              })}
              {itemData.pictures.map((pic, index) => {
                return (
                  <Image
                    key={index}
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt="Item Card"
                    className="rounded-xl shadow-md"
                    src={pic}
                  />
                );
              })}
              {itemData.pictures.map((pic, index) => {
                return (
                  <Image
                    key={index}
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt="Item Card"
                    className="rounded-xl shadow-md"
                    src={pic}
                  />
                );
              })}
              {itemData.pictures.map((pic, index) => {
                return (
                  <Image
                    key={index}
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt="Item Card"
                    className="rounded-xl shadow-md"
                    src={pic}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <h1 className="font-semibold text-3xl">{itemData.name}</h1>
            <h2 className="font-normal text-xl font-gray-600">
              {itemData.genderCategory}' {itemData.category}
            </h2>

            <h3 className="mt-5 font-semibold text-xl ">
              ₱{Number(itemData.price).toLocaleString()}
            </h3>

            <div className="flex flex-col mt-14 gap-1">
              <div className="flex justify-between w-full py-2 font-semibold">
                <h2 className="">Select Size</h2>
                <h2 className="text-gray-600">Size Guide</h2>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {itemData.sizes.map((size, index) => {
                  return (
                    <span
                      key={index}
                      className="rounded-md shadow-sm border border-gray-300 text-center py-3 text-xl font-semibold hover:border-black transition duration-100 cursor-pointer"
                    >
                      US {size}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex w-full mt-4 flex-col gap-4">
              <button className=" rounded-full w-full py-5 text-xl text-white bg-black" onClick={handleAddToBag}>
                Add to Bag
              </button>
              <div onClick={handleFavorite} className="cursor-pointer flex rounded-full w-full text-xl py-5 text-gray-800 bg-white border border-gray-400 justify-center items-center">
                <div className="flex gap-2">
                  <button className="">Favorite</button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10 mt-4">
              <p className="text-center text-lg px-8 text-gray-600 ">
                This product is excluded from site promotions and discounts.
              </p>

              <p className="text-left text-xl font-semibold">
                {itemData.description}
              </p>

              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                    />
                  </svg>
                  <h1 className="ml-2 text-xl">
                    Color Shown: {itemData.colorways[0]}
                  </h1>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                    />
                  </svg>
                  <h1 className="ml-2 text-xl">Style: DX4334-300</h1>
                </div>
              </div>

              <h1 className="underline font-semibold text-xl cursor-pointer">
                View Product Details
              </h1>
            </div>

            <hr className="my-8" />
            <div className="flex justify-between items-center font-semibold text-2xl">
              <h1 className="">Free Delivery and Returns</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>

            <hr className="my-8" />
            <div className="flex justify-between items-center font-semibold text-2xl">
              <h1 className="">Reviews ({itemData.reviews.length})</h1>

              <div
                className="flex gap-4 items-center cursor-pointer"
                onClick={() => setToggleReviews((prev) => !prev)}
              >
                <div className="flex gap-1">
                  {stars.map((shown, index) => {
                    return (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-6 h-6 ${
                          shown ? "fill-yellow-400" : "fill-gray-300"
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    );
                  })}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={`${
                      toggleReviews
                        ? "M4.5 15.75l7.5-7.5 7.5 7.5"
                        : "M19.5 8.25l-7.5 7.5-7.5-7.5"
                    }  `}
                  />
                </svg>
              </div>
            </div>

            {toggleReviews && (
              <div className="flex flex-col gap-2 mt-16">
                <div className="flex gap-6 justify-start">
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 fill-gray-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 fill-gray-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 fill-gray-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 fill-gray-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 fill-gray-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <h1 className="text-xl">0 Stars</h1>
                </div>

                <p className="text-xl">
                  Have your say. Be the first to review the {itemData.name}
                </p>

                <h2
                  className="underline font-semibold text-xl cursor-pointer"
                  onClick={handleWriteReview}
                >
                  Write a Review
                </h2>
              </div>
            )}

            <hr className="my-8" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ItemPage;
