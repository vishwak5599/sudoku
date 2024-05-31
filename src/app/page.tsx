"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

const Page = () => {
  const levels = [
    { level: 0, value: "EASY", cellsToRemove: 36 },
    { level: 1, value: "MEDIUM", cellsToRemove: 42 },
    { level: 2, value: "HARD", cellsToRemove: 45 }
  ];
  const [isClicked, setIsClicked] = useState(-1);
  const router = useRouter();

  const handleDifficultySelection = (cellsToRemove: number, level: number) => {
    setIsClicked(level);
    setTimeout(() => {
      setIsClicked(-1)
    }, 200)

    setTimeout(() => {
      router.push(`/GamePage?cellsToRemove=${cellsToRemove}`)},
    200)
  };

  return (
    <main className="flex flex-col items-center h-screen w-screen font-anticDidone bg-[#BF77F6] gap-10">
      <div className="text-xl md:text-2xl lg:text-3xl xxl:text-6xl text-center mt-3 lg:mt-6 xl:mt-7 -mb-3 -lg:mb-2 font-bold">SUDOKU</div>
      <h1 className="text-white font-semibold text-xl md:text-2xl xl:text-3xl mt-28 lg:mt-32">
        CHOOSE YOUR DIFFICULTY
      </h1>
      <div className="flex gap-4 text-white font-bold">
        {levels.map((item, index) => (
          <button
            key={index}
            className={`font-semibold py-2 px-4 rounded-md border-2 hover:scale-105 ${
              isClicked === item.level ? "text-white bg-[#a75ef8] border-white" : "text-[#a75ef8] bg-white border-[#a75ef8]"
            }`}
            onClick={() => handleDifficultySelection(item.cellsToRemove, item.level)}
          >
            {item.value}
          </button>
        ))}
      </div>
    </main>
  );
};

export default Page;
