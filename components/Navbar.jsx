"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import nike from "../public/nike.jpg";
import jordan from "../public/jordan.jpg";

import Link from "next/link";
import SearchModal from "./SearchModal";
import useSearchRegister from "@/hooks/useSearchRegister";
import { signIn, signOut, useSession } from "next-auth/react";
import NavItemCard from "./NavItemCard";
import axios from "axios";

const Navbar = () => {
  const searchRegister = useSearchRegister();

  const categories = ["Men", "Women", "Kids", "Sale"];

  const { data: session } = useSession();
  const [userFavorites, setUserFavorites] = useState([]);
  const [userFavItems, setUserFavItems] = useState([]);

  const [toggleFavorites, setToggleFavorites] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`/api/get/user/${session.user.email}`)
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
          setUserFavorites(data.favorites);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }

    if (session?.user) fetchUser();
  }, [session]);

  useEffect(() => {
    async function fetchFavoriteItems() {
      try {
        const arr = {
          favorites: userFavorites,
        };
        axios
          .post(`/api/get/user/favorite/items`, arr)
          .then((res) => {
            console.log("success", res);
            setTimeout(() => {}, 2000);
            setUserFavItems(res.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {});
      } catch (error) {
        console.log(error);
      }
    }
    if (userFavorites.length > 0) fetchFavoriteItems();
  }, [userFavorites]);

  return (
    <>
      <nav className="text-xl flex flex-col py-8 px-10">
        <div className="flex w-full justify-between items-center text-lg font-light">
          <div className="flex gap-4 flex-1 items-center">
            <Image width={50} height={50} src={jordan} alt="Logo" />
          </div>

          <div className="flex gap-6">
            {session?.user && (
              <>
                <h1 className="cursor-pointer">{session.user.email}</h1>
                <h1 className="cursor-default">|</h1>
              </>
            )}

            <h1 className="cursor-pointer">Find a Store</h1>
            <h1 className="cursor-default">|</h1>
            <h1 className="cursor-pointer">Help</h1>
            <h1 className="cursor-default">|</h1>
            <Link href={"/admin"}>
              <h1 className="cursor-pointer">Join Us</h1>
            </Link>
            <h1 className="cursor-default">|</h1>
            {session?.user ? (
              <h1 className="cursor-pointer" onClick={() => signOut()}>
                Sign Out
              </h1>
            ) : (
              <h1 className="cursor-pointer" onClick={() => signIn()}>
                Sign In
              </h1>
            )}
          </div>
        </div>

        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 flex-1 items-center cursor-pointer">
            <Link href="/">
              <Image width={120} height={120} src={nike} alt="Logo" />
            </Link>
          </div>

          <div className="flex justify-center items-center gap-8 flex-[2]">
            <h1 className="font-bold cursor-pointer hover:underline">
              New & Featured
            </h1>
            {categories.map((category, index) => {
              return (
                <Link href={`/store/${category}`} key={index}>
                  <h1 className="font-bold cursor-pointer hover:underline">
                    {category}
                  </h1>
                </Link>
              );
            })}
          </div>

          <div className="flex gap-6 flex-1 ">
            <div
              className="flex bg-gray-200 items-center p-2 px-3 rounded-full gap-2"
              onClick={() => {
                // setToggleSearchModal(true);
                searchRegister.onOpen();
              }}
            >
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
                className="bg-gray-200 outline-none"
                placeholder="Search"
                disabled
              />
            </div>

            <div className="flex items-center gap-6">
              {/* FAVORITES */}
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => setToggleFavorites((prev) => !prev)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>

                {toggleFavorites && (
                  <div className="absolute z-50 w-96 p-4 flex flex-col gap-6 bg-white top-full right-0 mt-4 shadow-md rounded-xl max-h-[17rem] overflow-y-scroll">
                    {userFavItems.length > 0 &&
                      userFavItems.map((item, index) => {
                        return <NavItemCard item={item} key={index} />;
                      })}

                    <hr className="" />
                    <div className="flex justify-center gap-2 items-center cursor-pointer -mt-3 ">
                      <div className="text-sm ">Find More Items</div>
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
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {/* END OF FAVORITES */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
