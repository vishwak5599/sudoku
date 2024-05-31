import React, { Dispatch, SetStateAction, useState } from 'react'
import { TbBulbFilled } from "react-icons/tb"
import { useRouter } from 'next/navigation'
import { PiHeartStraightBreakFill } from "react-icons/pi"
import { PiHeartStraightFill } from "react-icons/pi"

interface ButtonsType  {
    solvableSudoku : (number | null)[][]
    clickedCell : {
        row: number;
        col: number;
    }
    solvedSudoku : (number | null)[][]
    setSolvableSudoku : Dispatch<SetStateAction<(number | null)[][]>>
    lifesLeft : number
    hintsLeft : number
    setHintsLeft : Dispatch<SetStateAction<number>>
    removedCells : {
        row: number;
        col: number;
    }[]
}

const Buttons:React.FC<ButtonsType> = ({solvableSudoku, clickedCell, solvedSudoku, setSolvableSudoku, lifesLeft, hintsLeft, setHintsLeft, removedCells}) => {
    
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()

  const findHint = () => {
    if(clickedCell.row!==-1 && clickedCell.col!==-1 && hintsLeft>0 && solvableSudoku[clickedCell.row][clickedCell.col]===null && removedCells && removedCells.some(cell=>cell.row===clickedCell.row && cell.col===clickedCell.col)){
        setIsClicked(true)
        setSolvableSudoku(prev => {
            const newSolvableSudoku = prev.map((row, rIndex) =>
                row.map((col, cIndex) =>
                    (rIndex === clickedCell.row && cIndex === clickedCell.col) ? solvedSudoku[clickedCell.row][clickedCell.col] : col
                )
            );
            return newSolvableSudoku
        })
        setHintsLeft(hintsLeft-1)
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
                <PiHeartStraightBreakFill fill={"#FF0000"} size={30} key={index}/>
            ))}
        </div>
        <div className='flex gap-4'>
            <button className={`flex items-center p-1 gap-2 rounded-md border-2 transition-colors duration-200 hover:scale-105 ${isClicked ? "bg-[#a75ef8] border-white" : "bg-white border-[#a75ef8]"}`} onClick={findHint} disabled={clickedCell.row!==-1 && clickedCell.col!==-1 && solvableSudoku[clickedCell.row][clickedCell.col]!==null && hintsLeft===0}>
                <text className={`text-lg font-bold transition-colors duration-200 ${isClicked ? "text-white" : "text-[#a75ef8]"}`}>HINT</text>
                <TbBulbFilled className="mb-1 transition-colors duration-200" fill={`${isClicked ? "#FFFFFF" : hintsLeft===3 ? "#007000" : hintsLeft===2 ? "#F87305" : hintsLeft===1 ? "#F0FF42" : "#FF0000"}`} />
            </button>
            <button className='text-lg font-bold bg-white border-2 border-[#a75ef8] text-[#a75ef8] p-1 rounded-md hover:scale-105' onClick={()=>router.push('/')}>BACK</button>
        </div>
    </div>
  )
}

export default Buttons
