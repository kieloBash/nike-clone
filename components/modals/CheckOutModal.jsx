"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useSession } from "next-auth/react";

const schema = yup.object({
  address: yup.string().required(),
  paymentMethod: yup.string().required(),
  pickupLocation: yup.string(),
  specialInstructions: yup.string(),
});

const CheckOutModal = ({ order, setToggleCheckOut }) => {
  const { data: session } = useSession();
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pickupLocation, setPickUpLocation] = useState("");
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const locations = ["Metro Manila", "Makati", "Cebu", "Trinoma"];
  function generatedId() {
    const randomId1 = Math.random().toString(36).substring(2, 10);
    const randomId2 = Math.random().toString(36).substring(2, 10);

    return randomId1 + randomId2;
  }

  useEffect(() => {
    if (order.length > 0) {
      let total = 0;
      order.forEach((item) => {
        total += Number(item.price);
      });
      setTotal(total);
    }

    async function fetchUser() {
      const response = await fetch(`/api/get/user/${session.user.email}`)
        .then(async (res) => {
          const data = await res.json();
          console.log(data.orders);
          setOrders(data.orders);
          setCart(data.cart);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // setLoading(false);
        });
    }

    if (session?.user) fetchUser();
  }, []);

  const formSubmit = (data) => {
    const orderId = generatedId();
    let items = [];
    let toOrder = [...orders, orderId];
    order.forEach((i) => {
      items.push(i.transactionId);
    });
    const dataToSend = {
      orderId,
      ...data,
      email: session?.user.email,
      amountToPay: total,
      orderStatus: "Pending",
      items,
      orders: toOrder,
    };

    console.log(dataToSend);
    axios
      .post(`/api/user/postOrder`, dataToSend)
      .then(() => {
        console.log("success");
        setToggleCheckOut(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        //
      });

    const dataToDelete = {
      orders: items,
      email: session?.user.email,
    };
    axios
      .post("/api/user/postDeleteCart", dataToDelete)
      .then(() => {
        console.log("Deleted successfully");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});

    const filtered = cart.filter((item) => !items.includes(item));
    const dataToUpdate = {
      cart: filtered,
      email: session?.user.email,
    };
    axios
      .put(`/api/user/postDeleteCart`, dataToUpdate)
      .then(() => {
        console.log("success");
        setTimeout(() => {}, 2000);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.reload(false);
      });
  };

  return (
    <article className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md">
      <div className="flex w-1/2 max-w-[35rem] flex-col rounded-md bg-white p-8 shadow-lg">
        <h1 className="text-left text-4xl font-black">Check out details</h1>
        <form
          className="mt-10 flex w-full flex-col gap-6"
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-xl">
              <h2 className="font-bold">Item details</h2>
              <h2 className="mr-4">({order.length}) Items</h2>
            </div>
            {order.map((item, index) => {
              return (
                <>
                  <div
                    className="flex w-full cursor-default items-center justify-between text-lg"
                    key={index}
                  >
                    <div className="flex items-center gap-2">
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
                      <div className="flex flex-col px-4">
                        <h2 className="">{item.name}</h2>
                        <h2 className="">{item.color}</h2>
                        <h2 className="">US {item.size}</h2>
                      </div>
                    </div>

                    <h2 className="px-4 text-2xl font-bold">
                      ₱{Number(item.price).toLocaleString()}
                    </h2>
                  </div>
                  <hr className="my-2" />
                </>
              );
            })}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between text-xl">
              <h2 className="font-bold">User details</h2>
            </div>

            <div className="relative w-full">
              <div className="text-md absolute -top-3 left-3 bg-white px-2 font-light">
                Address
              </div>
              <input
                type="text"
                className="w-full border border-gray-400 bg-white px-2 py-3 text-xl"
                {...register(`address`)}
              />
            </div>

            <div className="flex w-full items-center gap-2">
              <div className="relative w-full">
                <div className="text-md absolute -top-3 left-3 bg-white px-2 font-light">
                  Payment Option
                </div>
                <select
                  name=""
                  id=""
                  className="border border-gray-400 px-10 py-3 text-xl "
                  defaultValue={"COD"}
                  value={paymentMethod}
                  {...register(`paymentMethod`)}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="COD">COD</option>
                  <option value="Pick-up">Pick-up</option>
                  <option value="GCash">GCash</option>
                </select>
              </div>

              <h1 className="">
                Total ({order.length} item):{" "}
                <span className="text-4xl font-black">
                  ₱{Number(total).toLocaleString()}
                </span>
              </h1>
            </div>

            {paymentMethod === "Pick-up" && (
              <>
                <div className="relative w-full">
                  <div className="text-md absolute -top-3 left-3 bg-white px-2 font-light">
                    Pick-up Location
                  </div>
                  <select
                    name=""
                    id=""
                    className="w-full border border-gray-400 px-2 py-3 text-xl"
                    defaultValue={"Metro Manila"}
                    value={pickupLocation}
                    {...register(`pickupLocation`)}
                    onChange={(e) => setPickUpLocation(e.target.value)}
                  >
                    {locations.map((loc, index) => {
                      return (
                        <option value={loc} key={index}>
                          {loc}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="relative w-full">
            <div className="text-md absolute -top-3 left-3 bg-white px-2 font-light">
              Special Instructions
            </div>
            <textarea
              {...register(`specialInstructions`)}
              type="text"
              className="w-full border border-gray-400 bg-white px-2 py-3 text-xl"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setToggleCheckOut(false);
              }}
              className="flex-1 border border-black bg-white py-3 text-xl font-black text-black shadow-md"
            >
              Cancel Order
            </button>
            <button
              type="submit"
              className="flex-1 bg-black py-3 text-xl font-black text-white shadow-md"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default CheckOutModal;
