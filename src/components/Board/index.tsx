import { MemoBlockType } from "../../types/types";
import { Header } from "../Header";
import { MemoBlock } from "../MemoBlock";
import { Main, MainContainer } from "./styled";

interface BoardProps {
  memoBlocks: MemoBlockType[];
  animating: boolean;
  handleMemoClick: (memoBlock: MemoBlockType) => void;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const Component = (props: BoardProps) => {
  const { memoBlocks, animating, handleMemoClick, score, setScore } = props;
  return (
    <MainContainer>
      <Header score={score} setScore={setScore} />
      <Main>
        {memoBlocks?.map((memoBlock: MemoBlockType, i: number) => {
          return (
            <MemoBlock
              key={`${i}-character`}
              memoBlock={memoBlock}
              animating={animating}
              handleMemoClick={handleMemoClick}
            />
          );
        })}
      </Main>
    </MainContainer>
  );
};
export { Component as Board };
export default Component;
