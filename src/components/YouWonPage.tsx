import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const YouWonPage:React.FC = () => {
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()

  const handleNewGame = () => {
    setIsClicked(true)
    setTimeout(()=>{
        router.push('/')
    },200)
  }

  useEffect(()=>{
    if(isClicked){
        setTimeout(()=>{
            setIsClicked(false)
        },200)
    }
  },[isClicked])

  return (
    <div className=''>
      <div className="text-xl md:text-2xl lg:text-3xl xxl:text-6xl text-center mt-3 lg:mt-6 xl:mt-7 -mb-3 -lg:mb-2 font-bold">SUDOKU</div>
      <div className='flex flex-col items-center gap-6 lg:gap-12 mt-36 lg:mt-52'>
          <text className="text-white font-bold text-xl md:text-2xl xl:text-4xl">YOU WON</text>
          <button className={`rounded-md border-2 transition-colors duration-200 text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold p-1 lg:p-2 ${isClicked ? "text-white" : "text-[#a75ef8]"} ${isClicked ? "bg-[#a75ef8] border-white" : "bg-white border-[#a75ef8]"}`} onClick={handleNewGame}>NEW GAME</button>
      </div>
    </div>
  )
}

export default YouWonPage
