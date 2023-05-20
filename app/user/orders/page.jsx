"use client";
import CheckOutModal from "@/components/modals/CheckOutModal";
import useLoadingRegister from "@/hooks/useLoadingRegister";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const container_wind = "w-full bg-white p-6 text-lg shadow-md rounded-md";
  const { data: session } = useSession();
  const loadingRegister = useLoadingRegister();

  const [cart, setCart] = useState([]);
  const [checkOut, setCheckOut] = useState([]);
  const [total, setTotal] = useState(0);
  const [toggleSelectAll, setToggleSelectAll] = useState(false);
  const [toggleCheckOut, setToggleCheckOut] = useState(false);

  useEffect(() => {
    if (session?.user) {
      loadingRegister.setOpen();
      const dataToSend = {
        email: session.user.email,
      };
      axios
        .post(`/api/transactions/getUserTransactions`, dataToSend)
        .then((res) => {
          console.log("success", res.data);
          setCart(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setInterval(() => {
            loadingRegister.setClose();
          }, 1000);
        });

      return () => {
        setInterval;
      };
    }
  }, [session]);

  const handleItemClick = (index) => {
    const cartSelected = cart[index];

    if (checkOut.includes(cartSelected)) {
      const newArr = checkOut.filter((item) => item != cartSelected);
      setCheckOut(newArr);
    } else {
      setCheckOut([...checkOut, cartSelected]);
    }
  };

  const handleSelectAll = () => {
    if (!toggleSelectAll) setCheckOut(cart);
    else setCheckOut([]);
  };

  useEffect(() => {
    if (checkOut.length > 0) {
      let total = 0;
      checkOut.forEach((item) => {
        total += Number(item.price);
      });
      setTotal(total);
    } else setTotal(0);
  }, [checkOut]);

  return (
    <>
      {session?.user.email && (
        <section className="flex w-full flex-col gap-8 px-10 py-4">
          {toggleCheckOut && <CheckOutModal order={checkOut} setToggleCheckOut={setToggleCheckOut}/>}
          <h1 className="text-4xl font-black">Orders Page</h1>
          <div
            className={`flex w-full justify-between text-gray-400 ${container_wind}`}
          >
            <div className="flex flex-1 items-center gap-8">
              {/* <input type="checkbox" className="h-4 w-4 cursor-pointer" /> */}
              Product
            </div>

            <div className="flex flex-1 items-center justify-evenly">
              <h2 className="flex-1 text-center">Unit Price</h2>
              <h2 className="flex-1 text-center">Color</h2>
              <h2 className="flex-1 text-center">Size</h2>
              <h2 className="flex-1 text-center">Actions</h2>
            </div>
          </div>

          <div
            className={`${container_wind} flex flex-col items-center justify-between gap-16`}
          >
            {cart.map((item, index) => {
              return (
                <div
                  className="flex w-full flex-col items-center justify-between "
                  key={index}
                >
                  <div className="flex w-full items-center">
                    <div className="flex w-1/2 items-center gap-8">
                      <>
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => handleItemClick(index)}
                        />
                      </>

                      <div className="flex items-center gap-4">
                        <div className="h-[8rem] w-[8rem]">
                          <Image
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
                            src={item.picture}
                          />
                        </div>
                        <h1 className="text-2xl font-bold">{item.name}</h1>
                      </div>
                    </div>

                    <div className="flex w-1/2 items-center justify-evenly">
                      <h2 className="flex-1 cursor-default text-center font-bold">
                        ₱{Number(item.price).toLocaleString()}
                      </h2>

                      <div className="flex flex-1 cursor-default items-center justify-center">
                        {item.color}
                      </div>

                      <h2 className="flex-1 cursor-default text-center">
                        US {item.size}
                      </h2>
                      <div className="flex flex-1 items-center justify-center">
                        <button
                          type="button"
                          className="flex rounded-lg bg-red-200 px-2 py-1 text-red-600 shadow-md transition duration-100 hover:-translate-y-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`${container_wind} mt-20 flex items-center justify-between`}
          >
            <div className="flex flex-1 items-center gap-4">
              <input
                type="checkbox"
                className="h-4 w-4"
                onClick={() => {
                  setToggleSelectAll((prev) => !prev);
                  handleSelectAll();
                }}
              />
              <h1 className="">Select All ({cart.length})</h1>
            </div>

            <div className="flex gap-6">
              <h1 className="">
                Total ({checkOut.length} item):{" "}
                <span className="text-4xl font-black">
                  ₱{Number(total).toLocaleString()}
                </span>
              </h1>
              <button
                type="button"
                onClick={() => {
                  if (checkOut.length > 0) setToggleCheckOut((prev) => !prev);
                }}
                className="bg-black px-16 text-lg font-semibold text-white shadow-md"
              >
                Check Out
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OrdersPage;
