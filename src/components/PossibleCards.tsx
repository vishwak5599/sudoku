import React, { Dispatch, SetStateAction, useState } from 'react'

interface cardsType {
    clickedCell : {
        row: number;
        col: number;
    }
    setSolvableSudoku : Dispatch<SetStateAction<(number | null)[][]>>
    solvedSudoku : (number | null)[][]
    setIsCorrectChoice : Dispatch<SetStateAction<number>>
    removedCells : {
      row: number;
      col: number;
    }[]
    setFilledCells : Dispatch<SetStateAction<number>>
    setLifesLeft : Dispatch<SetStateAction<number>>
}

const PossibleCards:React.FC<cardsType> = ({clickedCell, setSolvableSudoku, solvedSudoku, setIsCorrectChoice, removedCells, setFilledCells, setLifesLeft}) => {

  const selectNumbers:number[][] = [[1,2,3],[4,5,6],[7,8,9]]
  const [selectedChoice, setSelectedChoice] = useState({row:-1, col:-1})

  const handleSet = (rindex: number, cindex: number) => {
    if(clickedCell.row!==-1 && clickedCell.col!==-1 && clickedCell.row!==null && clickedCell.col!==null && removedCells.some((item)=> item.row===clickedCell.row && item.col===clickedCell.col)){
      if(solvedSudoku[clickedCell.row][clickedCell.col]===selectNumbers[rindex][cindex]){
        setSelectedChoice((prev)=>({...prev, row: rindex, col: cindex}))
        setSolvableSudoku(prev => {
            const newSolvaleSudoku = prev.map((row,newrindex)=>
                row.map((col,newcindex)=>
                    newrindex===clickedCell.row && newcindex===clickedCell.col ? selectNumbers[rindex][cindex] : col
                )
            )
            return newSolvaleSudoku
        })
        setFilledCells((prev)=>prev+1)
        setIsCorrectChoice(1)
      }
      else{
        setIsCorrectChoice(-1)
        setLifesLeft((prev)=>prev-1)
      }
      setTimeout(() => {
        setIsCorrectChoice(0)
      }, 200)
      setTimeout(() => {
        setSelectedChoice({ row: -1, col: -1 })
      }, 500)
    }
  }

  return (
    <div className='flex md:flex-col gap-0.5 md:gap-1'>
      {selectNumbers.map((row,rindex)=>(
        <div className='flex gap-0.5 md:gap-1' key={rindex}>
          {row.map((col,cindex)=>(
            <div className={`cursor-pointer px-2.5 py-1 md:px-4 md:py-2 lg:px-5 lg:py-2 xxl:px-7 xxl:py-3.5 border-1 font-bold text-violet-900
                  ${(selectedChoice.row===rindex && selectedChoice.col===cindex) ? "bg-violet-400 animate-blink-fade-violet" : "bg-white"}
              `} 
              key={cindex} onClick={()=>handleSet(rindex,cindex)} >
                {col}
            </div>
          ))}
        </div>
      ))
      }
    </div>
  )
}

export default PossibleCards
