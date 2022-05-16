import { useState } from "react";
import styled from "styled-components";

const Error = styled.div`
  color: red;
  height: 24px;
`;
const Inputs = styled.div`
  display: flex;
  gap: 16px;
`;
const Input = styled.input`
  margin-left: 8px;
`;

const GameOptionsForm = ({ startGame }) => {
  const [numRows, setNumRows] = useState(5);
  const [numColumns, setNumColumns] = useState(8);
  const [numRupoors, setNumRupoors] = useState(8);
  const [numBombs, setNumBombs] = useState(8);

  const maxNumRupoors = numRows * numColumns;
  const maxNumBombs = numRows * numColumns;
  const errorMsg =
    numRupoors + numBombs > numRows * numColumns
      ? "Too many rupoors and bombs"
      : null;

  return (
    <div>
      <Inputs>
        <label>
          <span>Number of rows:</span>
          <Input
            type="number"
            min="1"
            step="1"
            max="5"
            value={numRows}
            onChange={(e) => setNumRows(+e.target.value)}
          />
        </label>
        <label>
          <span>Number of columns:</span>
          <Input
            type="number"
            min="1"
            step="1"
            max="8"
            value={numColumns}
            onChange={(e) => setNumColumns(+e.target.value)}
          />
        </label>
        <label>
          <span>Number of rupoors:</span>
          <Input
            type="number"
            min="0"
            step="1"
            max={maxNumRupoors}
            value={numRupoors}
            onChange={(e) => setNumRupoors(+e.target.value)}
          />
        </label>
        <label>
          <span>Number of bombs:</span>
          <Input
            type="number"
            min="0"
            step="1"
            max={maxNumBombs}
            value={numBombs}
            onChange={(e) => setNumBombs(+e.target.value)}
          />
        </label>
      </Inputs>
      <Error>{errorMsg}</Error>
      <div>
        <button
          disabled={!!errorMsg}
          onClick={() =>
            startGame({ numRows, numColumns, numRupoors, numBombs })
          }
        >
          New game
        </button>
      </div>
    </div>
  );
};

export default GameOptionsForm;
