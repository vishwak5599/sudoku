"use client"
import { Suspense, useEffect, useState } from "react";
import PossibleCards from "../../components/PossibleCards"
import Grid from "../../components/Grid"
import SkeletonGrid from "../../components/SkeletonGrid"
import Buttons from "../../components/Buttons"
import YouWonPage from "../../components/YouWonPage"
import { useSearchParams } from 'next/navigation'

const HomePageContent = () => {
  const [solvedSudoku, setSolvedSudoku] = useState<(number | null)[][]>([])
  const searchParams = useSearchParams()
  const cellsToRemove = searchParams ? searchParams.get('cellsToRemove') : "36"

  const initializeBoard = () => {
    return Array.from({ length: 9 }, () => Array(9).fill(null));
  };

  const [solvableSudoku, setSolvableSudoku] = useState<(number | null)[][]>(initializeBoard())
  const [clickedCell, setClickedCell] = useState({row:-1,col:-1})
  const [difficulty, setDifficulty] = useState(cellsToRemove ? parseInt(cellsToRemove, 10) : 36)
  const [loading, setLoading] = useState(true)
  const [removedCells, setRemovedCells] = useState<{ row: number; col: number }[]>([]);
  const [isCorrectChoice, setIsCorrectChoice] = useState(0)
  const [filledCells, setFilledCells] = useState(81-difficulty)
  const [lifesLeft, setLifesLeft] = useState(3)

  const isValidElement = (grid: (number | null)[][], row: number, col: number, num: number) => {
    for(let i=0;i<9;i++){
      if(grid[i][col]===num || grid[row][i]===num) return false
    }
    const startRow = Math.floor(row/3)*3
    const startCol = Math.floor(col/3)*3
    for(let i=startRow;i<startRow+3;i++){
      for(let j=startCol;j<startCol+3;j++){
        if(grid[i][j]===num) return false
      }
    }
    return true
  }

  const solveGrid = (grid: (number | null)[][]) => {
    for(let row=0;row<9;row++){
      for(let col=0;col<9;col++){
        if(grid[row][col]===null){
          for(let num=1;num<=9;num++){
            if(isValidElement(grid,row,col,num)){
              grid[row][col]=num
              if(solveGrid(grid)){
                return true
              }
              else{
                grid[row][col]=null
              }
            }
          }
          return false
        }
      }
    }
    return true
  }
  
  const generateGrid = () => {
    const grid = initializeBoard()
    const filledNumbers: number[] = []
    for(let i=1;i<=7;i+=3){
      for(let j=1;j<=7;j+=3){
        let placed = false
        while(!placed){
          let random = Math.floor(Math.random()*9 + 1)
          if(!filledNumbers.includes(random)){
            grid[i][j]=random
            filledNumbers.push(random)
            placed=true
          }
        }
      }
    }
    solveGrid(grid)
    return grid
  }

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
    const newGrid = generateGrid()
    setSolvedSudoku(newGrid)
  },[])

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