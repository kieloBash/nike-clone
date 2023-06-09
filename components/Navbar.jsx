"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import nike from "../public/nike.jpg";
import jordan from "../public/jordan.jpg";

import Link from "next/link";
import useSearchRegister from "@/hooks/useSearchRegister";
import { signIn, signOut, useSession } from "next-auth/react";
import NavItemCard from "./NavItemCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavItemCardTransaction from "./NavItemCardTransaction";
import useLoadingRegister from "@/hooks/useLoadingRegister";

const Navbar = () => {
  const searchRegister = useSearchRegister();
  const loadingRegister = useLoadingRegister();

  const categories = ["Men", "Women", "Kids", "Sale"];

  const { data: session } = useSession();
  const [userFavorites, setUserFavorites] = useState([]);
  const [userFavItems, setUserFavItems] = useState([]);

  const [userCart, setUserCart] = useState([]);
  const [userCartTransactions, setUserCartTransactions] = useState([]);

  const [toggleFavorites, setToggleFavorites] = useState(false);
  const [toggleUserCart, setToggleUserCart] = useState(false);

  const router = useRouter();
  useEffect(() => {
    async function fetchUser() {
      loadingRegister.setOpen();
      const response = await fetch(`/api/get/user/${session.user.email}`)
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
          setUserFavorites(data.favorites);
          setUserCart(data.cart);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loadingRegister.setClose();
        });
    }

    if (session?.user) fetchUser();
  }, [session]);

  useEffect(() => {
    async function fetchTransactions() {
      loadingRegister.setOpen();
      try {
        const arr = {
          email: session?.user.email,
        };
        axios
          .post(`/api/transactions/getUserTransactions`, arr)
          .then((res) => {
            console.log("success", res);
            setTimeout(() => {}, 2000);
            setUserCartTransactions(res.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            loadingRegister.setClose();
          });
      } catch (error) {
        console.log(error);
      }
    }
    if (userCart.length > 0 && session?.user.email) fetchTransactions();
  }, [userCart]);

  useEffect(() => {
    loadingRegister.setClose();
  }, []);

  useEffect(() => {
    async function fetchFavoriteItems() {
      loadingRegister.setOpen();
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
          .finally(() => {
            loadingRegister.setClose();
          });
      } catch (error) {
        console.log(error);
      }
    }
    if (userFavorites.length > 0) fetchFavoriteItems();
  }, [userFavorites]);

  return (
    <>
      <nav className="flex flex-col px-10 py-8 text-xl">
        <div className="flex w-full items-center justify-between text-lg font-light">
          <div className="flex flex-1 items-center gap-4">
            <Image width={50} height={50} src={jordan} alt="Logo" />
          </div>

          <div className="flex gap-6">
            {session?.user && (
              <>
                <Link href={"/user/orders"}>
                  <h1 className="cursor-pointer">{session.user.email}</h1>
                </Link>
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
              <h1
                className="cursor-pointer"
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
              >
                Sign Out
              </h1>
            ) : (
              <h1 className="cursor-pointer" onClick={() => signIn()}>
                Sign In
              </h1>
            )}
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex flex-1 cursor-pointer items-center gap-4">
            <Link href="/">
              <Image width={120} height={120} src={nike} alt="Logo" />
            </Link>
          </div>

          <div className="flex flex-[2] items-center justify-center gap-8">
            <h1 className="cursor-pointer font-bold hover:underline">
              New & Featured
            </h1>
            {categories.map((category, index) => {
              return (
                <Link href={`/store/${category}`} key={index}>
                  <h1 className="cursor-pointer font-bold hover:underline">
                    {category}
                  </h1>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-1 gap-6 ">
            <div
              className="flex items-center gap-2 rounded-full bg-gray-200 p-2 px-3"
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
                className="h-8 w-8"
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
                  className="h-8 w-8 cursor-pointer"
                  onClick={() => {
                    if (session?.user) setToggleFavorites((prev) => !prev);
                    else router.push("/signin");
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>

                {toggleFavorites && (
                  <div className="absolute right-0 top-full z-50 mt-4 flex max-h-[17rem] w-96 flex-col gap-6 overflow-y-scroll rounded-xl bg-white p-4 shadow-md">
                    {userFavItems.length > 0 ? (
                      <>
                        {userFavItems.map((item, index) => {
                          return (
                            <div
                              className=""
                              onClick={() => {
                                setToggleFavorites(false);
                                setToggleUserCart(false);
                              }}
                            >
                              <NavItemCard item={item} key={index} />
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <div className="text-md text-center">No Favorites</div>
                      </>
                    )}

                    <hr className="" />
                    <div className="-mt-3 flex cursor-pointer items-center justify-center gap-2 ">
                      <div className="text-sm ">Find More Items</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
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
              <div className="relative">
                <div
                  className="relative cursor-pointer"
                  onClick={() => {
                    if (session?.user) setToggleUserCart((prev) => !prev);
                    else router.push("/signin");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>

                  <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black text-sm text-white">
                    {userCartTransactions.length}
                  </div>
                </div>

                {toggleUserCart && (
                  <div className="absolute right-0 top-full z-50 mt-4 flex max-h-[19rem] w-96 flex-col gap-6 overflow-y-scroll rounded-xl bg-white p-4 shadow-md">
                    {userCartTransactions.length > 0 ? (
                      <>
                        {userCartTransactions.map((item, index) => {
                          return (
                            <div
                              className=""
                              onClick={() => {
                                setToggleFavorites(false);
                                setToggleUserCart(false);
                              }}
                            >
                              <NavItemCardTransaction item={item} key={index} />
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div className="text-md text-center">No Items</div>
                    )}

                    <hr className="" />
                    <div className="-mt-3 flex cursor-pointer items-center justify-center gap-2 ">
                      <div className="text-sm ">Find More Items</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
