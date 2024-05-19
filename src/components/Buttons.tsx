import React, { Dispatch, SetStateAction, useState } from 'react'
import { BsEraserFill } from "react-icons/bs"
import { useRouter } from 'next/navigation'
import { PiHeartStraightBreakFill } from "react-icons/pi"
import { PiHeartStraightFill } from "react-icons/pi"

interface ButtonsType  {
    solvableSudoku : (number | null)[][]
    clickedCell : {
        row: number;
        col: number;
    }
    setSolvableSudoku : Dispatch<SetStateAction<(number | null)[][]>>
    setFilledCells : Dispatch<SetStateAction<number>>
    lifesLeft : number
}

const Buttons:React.FC<ButtonsType> = ({solvableSudoku, clickedCell, setSolvableSudoku, setFilledCells, lifesLeft}) => {
    
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()

  const handleErase = () => {
    if(clickedCell.row!==-1 && clickedCell.col!==-1 && clickedCell.row!==null && clickedCell.col!==null){
        setIsClicked(true)
        setFilledCells((prev)=>prev-1)
        setSolvableSudoku(prev => {
            const newSolvaleSudoku = prev.map((row,rindex)=>
                row.map((col,cindex)=>
                    rindex===clickedCell.row && cindex===clickedCell.col ? null : col
                )
            )
            return newSolvaleSudoku
        })
        setTimeout(()=>{
            setIsClicked(false)
        },200)
    }
  }

  return (
    <div className='flex justify-between items-center w-full'>
        <div className='flex'>
            {Array.from({ length: lifesLeft }, (_, index) => (
                <PiHeartStraightFill fill={"#FFFFFF"} size={30} key={index}/>
            ))}
            {Array.from({ length: 3-lifesLeft }, (_, index) => (
                <PiHeartStraightBreakFill fill={"#FF0000"} size={30}  key={index}/>
            ))}
        </div>
        <div className='flex gap-4'>
            <button className={`flex p-1 gap-2 rounded-md border-2 transition-colors duration-200 hover:scale-105 ${isClicked ? "bg-[#a75ef8] border-white" : "bg-white border-[#a75ef8]"}`} onClick={handleErase} disabled={clickedCell.row!==-1 && clickedCell.col!==-1 && solvableSudoku[clickedCell.row][clickedCell.col]===null}>
                <text className={`text-lg font-bold transition-colors duration-200 ${isClicked ? "text-white" : "text-[#a75ef8]"}`}>Erase</text>
                <BsEraserFill className="transition-colors duration-200" fill={`${isClicked ? "#FFFFFF" : "#a75ef8"}`} />
            </button>
            <button className='text-lg font-bold bg-white border-2 border-[#a75ef8] text-[#a75ef8] p-1 rounded-md hover:scale-105' onClick={()=>router.push('/')}>BACK</button>
        </div>
    </div>
  )
}

export default Buttons
