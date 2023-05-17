"use client";
import React, { useEffect, useState } from "react";

const Sidebar = ({ setFilter }) => {
  const [categories, setCategories] = useState([
    { name: "Lifestyle", selected: false },
    { name: "Running", selected: false },
    { name: "Basketball", selected: false },
    { name: "Football", selected: false },
    { name: "Soccer", selected: false },
    { name: "Volleyball", selected: false },
  ]);
  const sizes = [
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
  ];

  const [sizesSelected, setSizesSelected] = useState([]);
  const [usageSelected, setUsageSelected] = useState([]);

  const [toggleSizes, setToggleSizes] = useState(true);

  const handleSizeSelect = (index) => {
    let selected = false;
    let selectedIndex = -1;

    for (let i = 0; i < sizesSelected.length; i++) {
      if (sizesSelected[i] === sizes[index]) {
        selected = true;
        selectedIndex = i;
      }
    }

    if (selected) {
      const newArr = [...sizesSelected];
      newArr.splice(selectedIndex, 1);
      setSizesSelected(newArr);
    } else setSizesSelected([...sizesSelected, sizes[index]]);
  };

  function setUsage() {
    let newArr = [];
    categories.forEach((c) => {
      if (c.selected) {
        newArr.push(c.name);
      }
    });
    return newArr;
  }

  useEffect(() => {
    const temp = setUsage();
    console.log(sizesSelected, temp);

    setFilter({
      usage: temp,
      sizes: sizesSelected,
    });
  }, [categories, sizesSelected]);

  return (
    <div className="flex flex-col gap-16 sticky top-20 overflow-y-scroll h-screen max-w-[22rem] px-12 overflow-x-hidden">
      <div className="flex flex-col gap-2 text-xl">
        {categories.map((category, index) => {
          return (
            <div className="cursor-pointer flex gap-4 items-center" key={index}>
              <input
                type="checkbox"
                className="w-6 h-6"
                onChange={() => {
                  let newArr = [...categories];
                  newArr.forEach((row) => {
                    if (row.name == category.name)
                      row.selected = !category.selected;
                  });
                  setCategories(newArr);
                }}
              />
              <h1 className="">{category.name}</h1>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col text-xl w-[20rem]">
        <hr />

        <div className="flex justify-between w-3/4 py-4 pb-5 items-center">
          <h1 className="">Sizes</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 cursor-pointer"
            onClick={() => {
              setToggleSizes((prev) => !prev);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={`${
                toggleSizes
                  ? "M4.5 15.75l7.5-7.5 7.5 7.5"
                  : "M19.5 8.25l-7.5 7.5-7.5-7.5"
              }  `}
            />
          </svg>
        </div>

        {toggleSizes && (
          <div className="grid grid-cols-3 gap-1 w-3/4">
            {sizes.map((size, index) => {
              let selected = false;

              sizesSelected.forEach((s) => {
                if (s === size) selected = true;
              });

              return (
                <span
                  key={index}
                  className={`text-center py-2 bg-transparent ${
                    selected ? "border-black" : "border-gray-400"
                  } rounded-lg cursor-pointer hover:border-black transition duration-200 border-2`}
                  onClick={() => {
                    handleSizeSelect(index);
                  }}
                >
                  {size}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
