import { ThemeProvider } from "styled-components";
import "./App.css";
import { theme } from "./style/theme";
import { useEffect, useState } from "react";
import { Character, MemoBlockType } from "./types/types";
import { fetchCharacters } from "./api/fetchCharacters";
import { Board } from "./components";

function App() {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState<MemoBlockType[]>(
    []
  );
  const [score, setScore] = useState(5);
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [selectedMemoBlock, setSelectedMemoBlock] =
    useState<MemoBlockType | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      const allCharacters: Character[] = await fetchCharacters();
      setCharacterList(allCharacters?.slice(0, 8));
    };
    fetchAllCharacters();
  }, []);

  useEffect(() => {
    const shuffledCharacterList = shuffleArray([
      ...characterList,
      ...characterList,
    ]);

    setShuffledMemoBlocks(
      shuffledCharacterList.map((character: Character, i: number) => ({
        index: i,
        character,
        flipped: false,
      }))
    );
  }, [characterList]);

  const shuffleArray = (a: any) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
  };

  const handleMemoClick = (memoBlock: MemoBlockType) => {
    console.log("click", memoBlock);
    const flippedMemoBlock: MemoBlockType = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy: MemoBlockType[] = shuffledMemoBlocks.map(
      (block) => ({ ...block })
    );

    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);

    if (selectedMemoBlock === null) {
      setSelectedMemoBlock(memoBlock);
    } else if (selectedMemoBlock.character === memoBlock.character) {
      setSelectedMemoBlock(null);
      setScore(score + 1);
    } else {
      setScore(score - 1);
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(
          selectedMemoBlock.index,
          1,
          selectedMemoBlock
        );
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Board
          memoBlocks={shuffledMemoBlocks}
          animating={animating}
          handleMemoClick={handleMemoClick}
          score={score}
          setScore={setScore}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
