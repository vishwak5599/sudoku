"use client"
import { Suspense, useEffect, useState } from "react";
import PossibleCards from "../../components/PossibleCards"
import Grid from "../../components/Grid"
import SkeletonGrid from "../../components/SkeletonGrid"
import Buttons from "../../components/Buttons"
import YouWonPage from "../../components/YouWonPage"
import { useSearchParams } from 'next/navigation'

const HomePageContent = () => {
  const [solvedSudoku, setSolvedSudoku] = useState<(number | null)[][]>([[5, 3, 4, 6, 7, 8, 9, 1, 2],
                                                  [6, 7, 2, 1, 9, 5, 3, 4, 8],
                                                  [1, 9, 8, 3, 4, 2, 5, 6, 7],
                                                  [8, 5, 9, 7, 6, 1, 4, 2, 3],
                                                  [4, 2, 6, 8, 5, 3, 7, 9, 1],
                                                  [7, 1, 3, 9, 2, 4, 8, 5, 6],
                                                  [9, 6, 1, 5, 3, 7, 2, 8, 4],
                                                  [2, 8, 7, 4, 1, 9, 6, 3, 5],
                                                  [3, 4, 5, 2, 8, 6, 1, 7, 9]
                        ])
  const searchParams = useSearchParams()
  const cellsToRemove = searchParams ? searchParams.get('cellsToRemove') : "36"

  const [solvableSudoku, setSolvableSudoku] = useState<(number | null)[][]>([])
  const [clickedCell, setClickedCell] = useState({row:-1,col:-1})
  const [difficulty, setDifficulty] = useState(cellsToRemove ? parseInt(cellsToRemove, 10) : 36)
  const [loading, setLoading] = useState(true)
  const [removedCells, setRemovedCells] = useState<{ row: number; col: number }[]>([]);
  const [isCorrectChoice, setIsCorrectChoice] = useState(0)
  const [filledCells, setFilledCells] = useState(81-difficulty)
  const [lifesLeft, setLifesLeft] = useState(3)

  const removeCells = (solvedSudoku: (number | null)[][], difficulty: number) => {
    const solvableSudokuCopy: (number | null)[][] = solvedSudoku.map((row)=>[...row])
    const removedCells: { row: number; col: number }[] = []
    const removedCellsSet: Set<string> = new Set<string>()

    while(difficulty>0){
      let row = Math.floor(Math.random()*9)
      let col = Math.floor(Math.random()*9)
      let cell = `${row}${col}`
      if(!removedCellsSet.has(cell)){
        solvableSudokuCopy[row][col] = null
        removedCells.push({ row: row, col: col });
        removedCellsSet.add(cell)
        difficulty--
      }
    }
    return { solvableSudokuCopy, removedCells };
  }

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[solvedSudoku, difficulty])

  useEffect(() => {
    if (solvedSudoku.length > 0) {
      const { solvableSudokuCopy, removedCells } = removeCells(solvedSudoku, difficulty);
      setSolvableSudoku(solvableSudokuCopy);
      setRemovedCells(removedCells);
    }
  }, [solvedSudoku, difficulty])

  return (
    <main className="flex flex-col h-screen w-screen font-anticDidone bg-[#BF77F6]">
      {filledCells===81 || lifesLeft===0 ? <YouWonPage lifesLeft={lifesLeft} /> : 
        (
          <>
            <div className="text-xl md:text-2xl lg:text-3xl xxl:text-6xl text-center mt-3 lg:mt-6 xl:mt-7 -mb-3 -lg:mb-2 font-bold">SUDOKU</div>
            <div className="flex flex-col md:flex-row gap-6 lg:gap-16 items-center justify-center text-lg md:text-xl lg:text-xl xl:text-2xl">
              <div className="flex flex-col gap-4">
                {loading ? <SkeletonGrid /> : <Grid solvableSudoku={solvableSudoku} clickedCell={clickedCell} setClickedCell={setClickedCell} isCorrectChoice={isCorrectChoice} removedCells={removedCells} />}
                <Buttons solvableSudoku={solvableSudoku} clickedCell={clickedCell} setSolvableSudoku={setSolvableSudoku} setFilledCells={setFilledCells} lifesLeft={lifesLeft} />
              </div>
              <PossibleCards solvedSudoku={solvedSudoku} clickedCell={clickedCell} setSolvableSudoku={setSolvableSudoku} setIsCorrectChoice={setIsCorrectChoice} removedCells={removedCells} setFilledCells={setFilledCells} setLifesLeft={setLifesLeft} />
            </div>
          </>
        )
      }
    </main>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}