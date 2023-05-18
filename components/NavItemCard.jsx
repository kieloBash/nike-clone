import React from "react";
import Image from "next/image";
import Link from "next/link";
const NavItemCard = ({ item }) => {
  return (
    <div className="w-full items-center flex flex-col">
      <div className="items-center flex gap-4 w-full">
        <div className="flex flex-col w-full">
          <h1 className="text-md ">{item.name}</h1>
          <h2 className="text-md font-bold">
            ₱{Number(item.price).toLocaleString()}
          </h2>
          <h2 className="text-sm font-semibold mt-3">{item.colorways[0]}</h2>
        </div>
        <div className="w-full h-[7rem]">
          <Link href={`/store/items/${item._id}`}>
            <Image
              width="0"
              height="0"
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Item Card"
              className="rounded-xl shadow-md"
              src={item.pictures[0]}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavItemCard;
