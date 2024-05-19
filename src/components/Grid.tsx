"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface gridType {
    solvableSudoku: (number|null)[][]
    clickedCell: {
        row: number;
        col: number;
    }
    setClickedCell: Dispatch<SetStateAction<{
        row: number;
        col: number;
    }>>
    isCorrectChoice : number
    removedCells : {
        row: number;
        col: number;
    }[]
}

const Grid:React.FC<gridType> = ({solvableSudoku, clickedCell, setClickedCell, isCorrectChoice, removedCells}) => {

    const [sameRCGCells, setSameRCGCells] = useState<{row: number,col: number}[]>([])

    const handleClick = (rindex: number,cindex: number) => {
        setClickedCell((prev)=>({...prev,row:rindex,col:cindex}))
    }

    useEffect(() => {
        const newSameRCGCells:{row: number, col: number}[] = []
    
        for (let i = 0; i < 9; i++) {
            if (!newSameRCGCells.some(cell => cell.row === clickedCell.row && cell.col === i)) {
                newSameRCGCells.push({ row: clickedCell.row, col: i })
            }
            if (!newSameRCGCells.some(cell => cell.row === i && cell.col === clickedCell.col)) {
                newSameRCGCells.push({ row: i, col: clickedCell.col })
            }
        }
    
        const startRow = Math.floor(clickedCell.row / 3) * 3
        const startCol = Math.floor(clickedCell.col / 3) * 3
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (!newSameRCGCells.some(cell => cell.row === i && cell.col === j)) {
                    newSameRCGCells.push({ row: i, col: j });
                }
            }
        }
        setSameRCGCells(newSameRCGCells)
    }, [clickedCell]);
    
    return (
        <div className="flex flex-col mt-5 md:mt-6 xl:mt-7">
            {solvableSudoku.map((row,rindex)=>(
                <div className="flex" key={rindex}>
                    {row.map((col,cindex)=>(
                        <div className={`flex text-black px-2.5 py-1 md:px-4 md:py-2 lg:px-5 lg:py-2 xxl:px-7 xxl:py-3.5 border-1 border-[#a75ef8] cursor-pointer

                                ${col===null ? "px-2.8 md:px-4.2 lg:px-5.2 xxl:px-7.2" : ""}
                                ${clickedCell.row===-1 && clickedCell.col===-1 ? "bg-white" : ""}
                                ${!sameRCGCells.some(item => item.row===rindex && item.col===cindex) && clickedCell.row!==-1 && clickedCell.col!==-1 && solvableSudoku[rindex][cindex]!==solvableSudoku[clickedCell.row][clickedCell.col] && solvableSudoku[clickedCell.row][clickedCell.col]!==null ? "bg-white" : ""}
                                ${clickedCell.row!==-1 && clickedCell.col!==-1 && ((solvableSudoku[clickedCell.row][clickedCell.col]!==null && solvableSudoku[rindex][cindex]===solvableSudoku[clickedCell.row][clickedCell.col]) || (solvableSudoku[clickedCell.row][clickedCell.col]===null && cindex===clickedCell.col && rindex===clickedCell.row)) ? "bg-violet-400" : ""}
                                ${!sameRCGCells.some(item => item.row===rindex && item.col===cindex) && clickedCell.row!==-1 && clickedCell.col!==-1 && ((solvableSudoku[clickedCell.row][clickedCell.col]===null)) ? "bg-white" : ""}
                                ${sameRCGCells.some(item => item.row===rindex && item.col===cindex) ? "bg-violet-200" : ""}
                                ${!removedCells.some((cell) => cell.row === rindex && cell.col === cindex) ? "font-bold text-violet-900" : "text-violet-500"}
                                ${isCorrectChoice===1 && rindex===clickedCell.row && cindex===clickedCell.col ? "bg-[#26ff26] animate-blink-fade-green" : ""}
                                ${isCorrectChoice===-1 && rindex===clickedCell.row && cindex===clickedCell.col ? "bg-[#ff4122] animate-blink-fade-red" : ""}

                                ${rindex % 3 === 0 && rindex !== 0 ? "border-t-4 border-t-black" : ""} 
                                ${cindex % 3 === 0 && cindex !== 0 ? "border-l-4 border-l-black" : ""} 
                                ${rindex === 0 ? "border-t-4 border-t-[#a75ef8]" : ""}
                                ${cindex === 0 ? "border-l-4 border-l-[#a75ef8]" : ""}
                                ${rindex === 8 ? "border-b-4 border-b-[#a75ef8]" : ""}
                                ${cindex === 8 ? "border-r-4 border-r-[#a75ef8]" : ""}`}

                                key={cindex} onClick={()=>handleClick(rindex,cindex)}>
                                    
                            <span className={`${col===null ? "invisible" : ""}`}>{col!==null ? col : "_"}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
    }

export default Grid

