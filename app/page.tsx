import Link from "next/link";
import React from "react";

interface memeData {
  id: string;
  name: string;
  url: string;
  box_count: number;
}

async function MemeGenerator() {
  const data = await fetch("https://api.imgflip.com/get_memes");
  const res = await data.json();
  const memes = res.data.memes;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4">
        {memes.map((item: memeData) => {
          return (
            <div
              key={item.id}
              className="shadow-lg p-4 rounded-lg bg-white flex flex-col items-center gap-4 h-full transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={item.url}
                alt={item.name}
                className="rounded-md w-full h-[250px] object-cover transition-all duration-300 hover:opacity-90"
              />

              <h3 className="text-center text-lg font-semibold text-gray-800 truncate">
              {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
              </h3>

              <Link
                href={{
                  pathname: "generatememe/",
                  query: {
                    url: item.url,
                    boxCount: item.box_count,
                    id: item.id,
                    name: item.name,
                  },
                }}
                className="w-full"
              >
                <button className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 rounded-md shadow-md hover:from-blue-400 hover:to-green-300 transition-all duration-300">
                  Create Meme
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MemeGenerator;
