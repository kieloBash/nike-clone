"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
const schema = yup.object({
  name: yup.string().required(),
  // pic: yup.array().of(yup.string()),
  //   colorways: yup.array().of(yup.string().required()),
  price: yup.number().positive().required(),
  //   sizes: yup.array().of(yup.number().positive().required()),
  description: yup.string().required(),
  productDetails: yup.string().required(),
  category: yup.string().required(),
  // benefits: yup.array().of(yup.string()),
  //   reviews: yup.array().of(yup.string()),
  //   gender: yup.array().of(yup.string()),
  //   usage: yup.array().of(yup.string()),
});

const AdminiPage = () => {
  const [reviews, setReviews] = useState([]);

  const [toggleError, setToggleError] = useState(false);

  const [colorways, setColorways] = useState([]);
  const [colorwayTyped, setColorwayTyped] = useState("");

  const [benefits, setBenefits] = useState([]);
  const [benefitTyped, setBenefitTyped] = useState("");

  const [sizes, setSizes] = useState([]);
  const [sizeTyped, setSizeTyped] = useState();

  const [gender, setGender] = useState({
    Men: false,
    Women: false,
    Unisex: false,
    Kids: false,
  });

  const genderLabel = ["Men", "Women", "Unisex", "Kids"];

  const [usage, setUsage] = useState({
    Lifestyle: false,
    Basketball: false,
    Volleyball: false,
    Soccer: false,
    Football: false,
    Running: false,
  });

  const usageLabel = [
    "Lifestyle",
    "Basketball",
    "Volleyball",
    "Soccer",
    "Football",
    "Running",
  ];

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
    {
      category: "benefit",
      type: "text",
      value: benefitTyped,
      placeholder: "Bullet for of a benefits",
      arrays: benefits,
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
      case "benefit":
        if (value !== "") {
          setBenefitTyped(value);
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

  function checkAtLeastOneTrue(array) {
    return Object.values(array).some((value) => value === true);
  }

  const formSubmit = (data) => {
    if (checkAtLeastOneTrue(gender) && checkAtLeastOneTrue(usage)) {
      if (colorways.length > 0 && benefits.length > 0 && sizes.length > 0) {
        setToggleError(false);
        const newData = {
          ...data,
          colorways,
          benefits,
          sizes,
          gender,
          usage,
          reviews,
        };
        console.log(newData);
      }
    } else {
      setToggleError(true);
    }
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
      case "benefit":
        if (benefitTyped !== "") {
          setBenefits([...benefits, benefitTyped]);
          setBenefitTyped("");
        }
        break;
      default:
        break;
    }
  };

  const deleteIntoArray = (type, newArray) => {
    switch (type) {
      case "colorway":
        setColorways(newArray);
        break;
      case "size":
        setSizes(newArray);
        break;
      case "benefit":
        setBenefits(newArray);
        break;
      default:
        break;
    }
  };

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-2/3 rounded-2xl p-8 shadow-xl flex flex-col gap-6"
      >
        <h1 className="text-4xl font-black text-center">Add Product</h1>
        <hr />

        <div className="grid grid-cols-3 gap-16 w-full">
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

            <textarea
              {...register("description")}
              placeholder="Product Description"
              className="bg-transparent border-[2px] border-gray-400 shadow-sm outline-none px-2 py-2 text-lg font-light"
            ></textarea>

            <textarea
              {...register("productDetails")}
              placeholder="Product Details"
              className="bg-transparent border-[2px] border-gray-400 shadow-sm outline-none px-2 py-2 text-lg font-light"
            ></textarea>
          </div>

          <div className="flex flex-col w-full gap-4">
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
                        onClick={() => {
                          addIntoArray(i.category);
                          setToggleError(false);
                        }}
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
                              deleteIntoArray(i.category, newArray);
                              setToggleError(false);
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
          </div>

          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col gap-3">
              <h2 className="font-normal text-xl">Good for:</h2>
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                {genderLabel.map((gen, index) => {
                  return (
                    <div
                      className="flex gap-2 items-center justify-start"
                      key={index}
                    >
                      <input
                        type="checkbox"
                        className="w-6 h-6"
                        checked={gender[gen]}
                        onChange={() => {
                          const newObject = { ...gender };
                          newObject[gen] = !newObject[gen];
                          setGender(newObject);
                          setToggleError(false);
                        }}
                      />
                      <label htmlFor="" className="text-lg text-gray-500">
                        {gen}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-normal text-xl">Used for:</h2>
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                {usageLabel.map((use, index) => {
                  return (
                    <div
                      className="flex gap-2 items-center justify-start"
                      key={index}
                    >
                      <input
                        type="checkbox"
                        className="w-6 h-6"
                        checked={usage[use]}
                        onChange={() => {
                          const newObject = { ...usage };
                          newObject[use] = !newObject[use];
                          setUsage(newObject);
                          setToggleError(false);
                        }}
                      />
                      <label htmlFor="" className="text-lg text-gray-500">
                        {use}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full text-center font-black bg-black text-white py-3 text-xl mt-10"
        >
          CONFIRM
        </button>
      </form>

      {toggleError && (
        <div className="mt-16 w-1/4 bg-red-300 text-red-700 px-4 py-5 rounded-lg flex flex-col gap-2 shadow-lg">
          <h1 className="text-xl font-semibold">Error Occured </h1>
          <h2 className="">
            There are incomplete fields. Please fill up all necessary fields
          </h2>
        </div>
      )}
    </section>
  );
};

export default AdminiPage;
