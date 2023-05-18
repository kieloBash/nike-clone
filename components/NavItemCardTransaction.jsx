import React from "react";
import Image from "next/image";
import Link from "next/link";
const NavItemCardTransaction = ({ item }) => {
  return (
    <div className="w-full items-center flex flex-col">
      <div className="items-center flex gap-4 w-full">
        <div className="flex flex-col w-full">
          <h1 className="text-md ">{item.name}</h1>
          <h2 className="text-md font-bold">
            ₱{Number(item.price).toLocaleString()}
          </h2>
          <h2 className="text-sm font-semibold">{item.color}</h2>
          <h2 className="text-sm font-semibold">{item.size}</h2>
          <div className="flex">
            <h2 className="text-sm font-semibold p-1 bg-gray-300 rounded-md text-gray-600">
              {item.status}
            </h2>
          </div>
        </div>
        <div className="w-full h-[7rem]">
          <Link href={`/store/items/${item.itemId}`}>
            <Image
              width="0"
              height="0"
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Item Card"
              className="rounded-xl shadow-md"
              src={item.picture}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavItemCardTransaction;
