import React from "react";

const Sidebar = () => {
  const categories = [
    "Lifestyle",
    "Jordan",
    "Running",
    "Basketball",
    "Football",
    "Training & Gym",
    "Skateboarding",
    "Golf",
    "Tennis",
    "Athletics",
    "Walking",
  ];
  const genders = ["Men", "Women", "Unisex"];
  return (
    <div className="flex flex-col gap-16 sticky top-20 overflow-y-scroll h-screen">
      <div className="flex flex-col gap-2 text-xl p-8 px-16">
        {categories.map((category, index) => {
          return (
            <div className="cursor-pointer" key={index}>
              {category}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col text-xl">
        <hr />
        <div className="flex flex-col gap-2 p-8 px-16">
          {genders.map((gender, index) => {
            return (
              <div
                className="cursor-pointer flex gap-4 items-center"
                key={index}
              >
                <input type="checkbox" className="w-5 h-5" />
                <h1 className="">{gender}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
