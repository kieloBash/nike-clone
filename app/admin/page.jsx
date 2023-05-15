"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";

const schema = yup.object({
  name: yup.string().required(),
  pic: yup.array().of(yup.string()),
  //   colorways: yup.array().of(yup.string().required()),
  price: yup.number().positive().required(),
  //   sizes: yup.array().of(yup.number().positive().required()),
  description: yup.string().required(),
  category: yup.string().required(),
  // benefits: yup.array().of(yup.string()),
  //   productDetails: yup.array().of(yup.string()),
  //   reviews: yup.array().of(yup.string()),
  //   gender: yup.array().of(yup.string()),
  //   usage: yup.array().of(yup.string()),
});

const AdminiPage = () => {
  const [colorways, setColorways] = useState([]);
  const [colorwayTyped, setColorwayTyped] = useState("");

  const [sizes, setSizes] = useState([]);
  const [sizeTyped, setSizeTyped] = useState();

  const inputs = [
    {
      placeholder: "Name",
      register: "name",
      typeInput: "text",
    },
    {
      placeholder: "Price",
      register: "price",
      typeInput: "number",
    },
    {
      placeholder: "Description",
      register: "description",
      typeInput: "text",
    },
    {
      placeholder: "Category",
      register: "category",
      typeInput: "text",
    },
  ];

  const inputArrays = [
    {
      category: "colorway",
      type: "text",
      value: colorwayTyped,
      placeholder: "Colorways ie. red,white,blue",
      arrays: colorways,
    },
    {
      category: "size",
      type: "number",
      value: sizeTyped,
      placeholder: "Size ie. 7.5",
      arrays: sizes,
    },
  ];

  const setter = (category, value) => {
    switch (category) {
      case "colorway":
        if (value !== "") {
          setColorwayTyped(value);
        }
        break;
      case "size":
        if (value !== "") {
          setSizeTyped(value);
        }
        break;
      default:
        break;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = (data) => {
    const newData = { ...data, colorways };
    console.log(newData);
  };

  const addIntoArray = (type) => {
    switch (type) {
      case "colorway":
        if (colorwayTyped !== "") {
          setColorways([...colorways, colorwayTyped]);
          setColorwayTyped("");
        }
        break;
      case "size":
        if (sizeTyped !== "") {
          setSizes([...sizes, sizeTyped]);
          setSizeTyped("");
        }
        break;
      default:
        break;
    }
  };

  return (
    <section className="w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-1/4 rounded-2xl p-8 shadow-xl flex flex-col gap-6"
      >
        <h1 className="text-2xl font-black text-center">Add Product</h1>
        <hr />
        <div className="flex flex-col w-full gap-4">
          {inputs.map((i, index) => {
            return (
              <>
                <input
                  key={index}
                  type={i.typeInput}
                  className="bg-transparent border-[2px] border-gray-400 shadow-sm outline-none px-2 py-2 text-lg font-light hover:border-black focus:border-black"
                  placeholder={i.placeholder}
                  {...register(`${i.register}`)}
                />
              </>
            );
          })}
          <hr />

          {inputArrays.map((i, index) => {
            return (
              <div className="flex flex-col gap-2" key={index}>
                <div className="flex justify-between items-center bg-transparent border-[2px] group-focus:border-black border-gray-400 px-2 w-full ">
                  <input
                    type={i.type}
                    className="group focus:text-black shadow-sm outline-none py-2 text-lg font-light hover:border-black  w-full"
                    placeholder={i.placeholder}
                    value={i.value}
                    onChange={(e) => {
                      setter(i.category, e.target.value);
                    }}
                  />
                  <div className="flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => addIntoArray(i.category)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {i.arrays.length > 0 &&
                    i.arrays.map((color, index) => {
                      return (
                        <span
                          key={index}
                          className="bg-gray-300 text-black px-2 py-1 rounded-2xl cursor-pointer"
                          onClick={() => {
                            const newArray = [...i.arrays];
                            newArray.splice(index, 1);
                            setColorways(newArray);
                          }}
                        >
                          {color}
                        </span>
                      );
                    })}
                </div>
              </div>
            );
          })}

          <button
            type="submit"
            className="w-full text-center font-black bg-black text-white py-3 text-xl"
          >
            JOIN US
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminiPage;
