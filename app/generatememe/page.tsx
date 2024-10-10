'use client';

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../loading";

interface GeneratorProps {
  searchParams: {
    url: string;
    boxCount: string;
    id: string;
    name: string;
  };
}

const MemeGeneratorPage = ({ searchParams }: GeneratorProps) => {
  const { url, id, boxCount, name } = searchParams;
  const [loading, setLoading] = useState<boolean>(false);
  const [inputTexts, setInputTexts] = useState<string[]>([]);
  const [memeUrl, setMemeUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    if (boxCount) {
      const count = parseInt(boxCount);
      setInputTexts(Array(count).fill(" "));
    }
  }, [boxCount]);

  const handleInput = (index: number, value: string) => {
    const updatedInp = [...inputTexts];
    updatedInp[index] = value;
    setInputTexts(updatedInp);
  };

  const generateMeme = async () => {
    setLoading(true);
    try {
      for (let i = 0; i < inputTexts.length; i++) {
        if (inputTexts[i]) {
          inputTexts[i] = inputTexts[i].trim();
        }
      }
      const params = new URLSearchParams();
      params.append("template_id", id!);
      params.append("username", "akasha_");
      params.append("password", "aaa!1234");

      inputTexts.forEach((text, index) => {
        params.append(`boxes[${index}][text]`, text);
        params.append(`boxes[${index}][max_font_size]`, "25");
      });

      const response = await fetch(
        `https://api.imgflip.com/caption_image?${params.toString()}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();
      if (result.success) {
        setMemeUrl(result.data.url);
        const imageResponse = await fetch(result.data.url);
        const blob = await imageResponse.blob();
        const blobUrl = URL.createObjectURL(blob);
        setDownloadUrl(blobUrl);
        setLoading(false);
      } else {
        console.error("Error generating meme:", result.error_message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while generating the meme. Please try again.",
      });
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <h2 className="text-center text-[24px] sm:text-[36px] py-4 text-gray-900 font-bold">
        Selected Meme Template: {name}
      </h2>

      {/* Show the template image */}
      {url && !memeUrl ? (
        <Image
          className="m-auto shadow-md rounded-lg p-2"
          src={url}
          width={450}
          height={450}
          alt="memeimg"
        />
      ) : null}

      {/* Show the generated meme */}
      {memeUrl && (
        <div className="m-auto w-full sm:w-[500px] border-2 border-gray-200 p-4 rounded-lg shadow-lg mt-10">
          <Image
            width={500}
            height={500}
            src={memeUrl}
            quality={80}
            className="rounded-md"
            alt={name}
          />
          {downloadUrl && (
            <a
              href={downloadUrl}
              download={name}
              className="btn btn-primary mt-4 flex justify-center bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 rounded-lg hover:from-blue-400 hover:to-green-300 transition-all duration-300"
            >
              Download Meme
            </a>
          )}
        </div>
      )}

      <div>
        <div className="flex flex-col gap-4 w-full sm:w-[450px] m-auto mt-12 shadow-md p-6 rounded-lg bg-gray-50">
          <h1 className="text-center text-3xl font-semibold text-gray-800">
            ENTER MEME TEXT
          </h1>
          {inputTexts.length > 0 &&
            inputTexts.map((_, index) => (
              <input
                type="text"
                key={index}
                onChange={(e) => handleInput(index, e.target.value)}
                placeholder={`Text for box ${index + 1}`}
                className="input input-bordered w-full rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 shadow-sm"
              />
            ))}
          <button
            onClick={generateMeme}
            className="btn btn-primary mt-4 flex justify-center bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 rounded-lg hover:from-blue-400 hover:to-green-300 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Creating Meme..." : "Generate Meme"}
          </button>
        </div>
      </div>
    </>
  );
};

export default MemeGeneratorPage;
