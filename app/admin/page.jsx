"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const schema = yup.object({
  name: yup.string().required(),
  // pic: yup.array().of(yup.string()),
  //   colorways: yup.array().of(yup.string().required()),
  price: yup.number().positive().required(),
  //   sizes: yup.array().of(yup.number().positive().required()),
  description: yup.string().required(),
  productDetails: yup.string().required(),
  // category: yup.string().required(),
  // benefits: yup.array().of(yup.string()),
  //   reviews: yup.array().of(yup.string()),
  //   gender: yup.array().of(yup.string()),
  //   usage: yup.array().of(yup.string()),
});

const AdminiPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [reviews, setReviews] = useState([]);

  const [pictures, setPictures] = useState([]);
  const [hasPicture, setHasPicture] = useState(false);

  const [toggleError, setToggleError] = useState(false);

  // const [usage, setUsage] = useState([]);

  const [colorways, setColorways] = useState([]);
  const [colorwayTyped, setColorwayTyped] = useState("");

  const [benefits, setBenefits] = useState([]);
  const [benefitTyped, setBenefitTyped] = useState("");

  const [sizes, setSizes] = useState([]);
  const [sizeTyped, setSizeTyped] = useState();

  const [genderCategory, setGenderCategory] = useState("");
  const [category, setCategory] = useState("");

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
          setSizeTyped(Number(value));
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
    if (checkAtLeastOneTrue(usage)) {
      if (colorways.length > 0 && benefits.length > 0 && sizes.length > 0) {
        setToggleError(false);
        setLoading(true);
        const usage = getUsageString();
        const newData = {
          ...data,
          colorways,
          benefits,
          sizes,
          genderCategory,
          usage,
          reviews,
          pictures,
          category,
        };
        axios
          .post(`/api/addProduct`, newData)
          .then(() => {
            // closeModal();
            console.log("success");
            setSuccess(true);
            setTimeout(() => {}, 2000);
            router.push("/");
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });

        // console.log(getUsageString())
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    // const newPicture = { picture: base64 };
    const updatedPictures = [...pictures, base64];

    setPictures(updatedPictures);
    setHasPicture(true);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  function getUsageString() {
    let val = [];

    usageLabel.forEach((str) => {
      if (usage[str]) val.push(str);
    });

    return val;
  }

  return (
    <section className="w-full flex flex-col justify-center items-center ">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-2/3 rounded-2xl p-8 shadow-xl flex flex-col gap-6 min-w-[60rem] max-w-[75rem]"
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
              <h2 className="font-normal text-xl">Category: </h2>
              <select
                name=""
                id=""
                className="bg-transparent border-[2px] border-gray-400 shadow-sm outline-none px-2 py-2 text-lg font-light"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select an Option</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
                <option value="Service">Service</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-normal text-xl">Good for:</h2>
              <select
                name=""
                id=""
                className="bg-transparent border-[2px] border-gray-400 shadow-sm outline-none px-2 py-2 text-lg font-light"
                value={genderCategory}
                onChange={(e) => setGenderCategory(e.target.value)}
              >
                <option value="">Select an Option</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
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

        <hr />
        <div className="grid grid-cols-4 gap-4 border border-black border-dashed min-h-[15rem]  p-4">
          <input
            type="file"
            className="input-field"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
            hidden
          />

          {hasPicture && (
            <>
              {pictures.map((pic, index) => {
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
                    alt={`Uploaded Image ${index}`}
                    className="rounded-xl shadow-md cursor-pointer"
                    src={pic}
                    onClick={() => {
                      const newArray = [...pictures];
                      newArray.splice(index, 1);
                      setPictures(newArray);
                      setToggleError(false);
                    }}
                  />
                );
              })}
            </>
          )}

          {pictures.length < 4 && (
            <div
              className="flex-col gap-2 w-full h-full border border-gray-400 border-dashed cursor-pointer hover:border-[2px] hover:border-black transition duration-150 flex justify-center items-center"
              onClick={() => document.querySelector(".input-field").click()}
            >
              <div className="border border-gray-500 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <h1 className="text-gray-500 text-sm">Upload product picture</h1>
            </div>
          )}
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

      {loading && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex justify-center items-center flex-col">
          <h1 className="text-4xl text-center font-black">ADDING PRODUCT...</h1>
          {success && (
            <h2 className="text-8xl text-center font-black text-green-500">
              SUCCESS
            </h2>
          )}
        </div>
      )}
    </section>
  );
};

export default AdminiPage;
