import React from "react";
export interface Post {
  id: string;
  name: string;
  prompt: string;
  photo: string;
}

import { download } from "../assets";
import { downloadImage } from "../utils";

const Card: React.FC<Post> = ({ id, name, prompt, photo }: Post) => {
  return (
    <article className="rounded-xl group relative card shadow-card hover:shadow-cardhover">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <section className="hidden group-hover:flex flex-col max-h-[95.5%] absolute bottom-0 inset-x-0 bg-[#10131F] rounded-md m-2 p-4 overflow-y-auto">
        <p className="text-white text-md font-semibold tracking-tight">
          {prompt}
        </p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex justify-center items-center rounded-full onject-cover text-white text-sm font-bolder bg-green-700">
              {name?.[0] || "N"}
            </div>
            <span className="text-white text-sm">{name}</span>
          </div>
          <button
            className="outline-none bg-transparen border-none"
            onClick={() => downloadImage(id, photo)}
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </section>
    </article>
  );
};

export default Card;
