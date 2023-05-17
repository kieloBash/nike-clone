import React from "react";
import Image from "next/image";
import Link from "next/link";
const ItemCard = ({ image, name, category, noColors, price, itemId }) => {
  return (
    <Link href={`/store/items/${itemId}`}>
      <div className="w-full flex flex-col cursor-pointer">
        <div className="w-full h-[70%]">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Item Card"
            className="rounded-xl shadow-md"
            src={image[0]}
          />
        </div>
        <div className="flex flex-col text-xl mt-5 gap-0 font-light">
          <h1 className="font-normal">{name}</h1>
          <h2 className="text-gray-600">{category}</h2>
          <h2 className="text-gray-600">{noColors} Colours</h2>
          <h2 className="font-bold mt-8">${price}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
