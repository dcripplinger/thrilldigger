import { useState } from "react";
import styled from "styled-components";
import GameOptionsForm from "./GameOptionsForm";
import updateProbabilities from "./updateProbabilities";
import deepCopyRows from "./deepCopyRows";
import Table from "./Table";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
`;
const Subtitle = styled.div``;

const App = () => {
  const [rows, setRows] = useState(null);
  const [currentNumRupoors, setCurrentNumRupoors] = useState(null);
  const [currentNumBombs, setCurrentNumBombs] = useState(null);

  const startGame = ({ numRows, numColumns, numRupoors, numBombs }) => {
    const newRows = [...Array(numRows)].map(() =>
      Array(numColumns).fill({ probability: null, status: "undug" })
    );
    setRows(updateProbabilities({ rows: newRows, numRupoors, numBombs }));
    setCurrentNumRupoors(numRupoors);
    setCurrentNumBombs(numBombs);
  };

  const onUpdate = ({ rowIndex, columnIndex, status }) => {
    const newRows = deepCopyRows(rows);
    newRows[rowIndex][columnIndex].status = status;
    setRows(
      updateProbabilities({
        rows: newRows,
        numRupoors: currentNumRupoors,
        numBombs: currentNumBombs,
      })
    );
  };

  return (
    <Container>
      <Title>Thrill Digger</Title>
      <Subtitle>
        Get assistance with the Thrill Digger mini-game in The Legend of Zelda:
        Skyward Sword!
      </Subtitle>
      <GameOptionsForm startGame={startGame} />
      {rows && <Table rows={rows} onUpdate={onUpdate} />}
    </Container>
  );
};

export default App;
