"use client";
import React, { useEffect, useState } from "react";

const ItemPage = ({ params }) => {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/items/${params.itemId}`)
        .then(async (res) => {
          const data = await res.json();
          setItemData(data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (itemData.length === 0) fetchData();
  }, []);

  return (
    <section className="w-full px-4">
      {loading && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex justify-center items-center flex-col">
          <h1 className="text-4xl text-center font-black">LOADING...</h1>
        </div>
      )}
      {itemData.length > 0 ? (
        <>
          {itemData.map((item, index) => {
            return (
              <div className="" key={index}>
                {item.name}
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default ItemPage;
