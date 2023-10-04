import { MemoBlockType } from "../../types/types";
import { ImageContainer } from "./styled";

import ricky from "../../assets/ricky.jpeg";

interface MemoBlockProps {
  memoBlock: MemoBlockType;
  animating: boolean;
  handleMemoClick: (memoBlock: MemoBlockType) => void;
}

const Component = ({
  memoBlock,
  animating,
  handleMemoClick,
}: MemoBlockProps) => {
  return (
    <div
      className="memo-block"
      onClick={() =>
        !memoBlock.flipped && !animating && handleMemoClick(memoBlock)
      }
    >
      <div
        className={`memo-block-inner ${
          memoBlock.flipped && "memo-block-flipped"
        }`}
      >
        <ImageContainer className="memo-block-front">
          <img src={ricky} alt="character" />
        </ImageContainer>
        <ImageContainer className="memo-block-back">
          <img src={memoBlock?.character.img} alt="character" />
        </ImageContainer>
      </div>
    </div>
  );
};

export { Component as MemoBlock };
export default Component;
