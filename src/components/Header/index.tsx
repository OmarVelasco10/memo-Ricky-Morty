import { Button, MainContainer, Score } from "./styled";

interface HeaderProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const Component = ({ score, setScore }: HeaderProps) => {
  return (
    <MainContainer>
      <Score>Intentos restantes: {score}</Score>
      <Button className="btn" onClick={() => setScore(5)}>
        Reiniciar
      </Button>
    </MainContainer>
  );
};

export { Component as Header };
export default Component;
