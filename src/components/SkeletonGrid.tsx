import React from "react";

const SkeletonGrid = () => {
  return (
    <div className="flex flex-col mt-5 md:mt-6 xl:mt-7">
      {Array.from({ length: 9 }).map((_, rindex) => (
        <div className="flex" key={rindex}>
          {Array.from({ length: 9 }).map((_, cindex) => (
            <div
              className={`flex text-black px-2.5 py-1 md:px-4 md:py-2 lg:px-5 lg:py-2 xxl:px-7 xxl:py-3.5 border-1 border-[#a75ef8] bg-gray-300 animate-pulse
                            ${rindex % 3 === 0 && rindex !== 0 ? "border-t-4 border-t-black" : ""}
                            ${cindex % 3 === 0 && cindex !== 0 ? "border-l-4 border-l-black" : ""}
                            ${rindex === 0 ? "border-t-4 border-t-[#a75ef8]" : ""}
                            ${cindex === 0 ? "border-l-4 border-l-[#a75ef8]" : ""}
                            ${rindex === 8 ? "border-b-4 border-b-[#a75ef8]" : ""}
                            ${cindex === 8 ? "border-r-4 border-r-[#a75ef8]" : ""}`}
              key={cindex}
            >
              <span className="invisible">_</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
