import deepCopyRows from "./deepCopyRows";

const updateProbabilities = ({
  rows,
  numRupoors,
  numBombs,
  updatedRow,
  updatedColumn,
  updatedStatus,
}) => {
  const newRows = deepCopyRows(rows);
  const numRows = newRows.length;
  const numColumns = newRows[0].length;
  let unidentifiedBadSpots = numRupoors + numBombs;
  const consideredSpots = [];

  // Mark all neighbors of rupees as probability zero if
  // the number of
  for (let r = 0; r < numRows; ++r) {
    for (let c = 0; c < numColumns; ++c) {
      const box = newRows[r][c];
      if (box.status === "green") {
        for (let rr = r - 1; rr < r + 1; ++rr) {
          for (let cc = c - 1; cc < c + 1; ++cc) {
            if (
              rr < 0 ||
              rr >= numRows ||
              cc < 0 ||
              cc >= numColumns ||
              (rr === r && cc === c)
            ) {
              continue;
            }
            newRows[rr][cc].probability = 0;
          }
        }
      }
    }
  }

  // Decrement found bombs and rupoors from total bad spots,
  // add unknown spots to list of considered spots,
  // mark good spots with probability 0
  for (let r = 0; r < numRows; ++r) {
    for (let c = 0; c < numColumns; ++c) {
      const box = newRows[r][c];
      if (
        box.status === "bomb" ||
        box.status === "rupoor" ||
        box.probability === 1
      ) {
        unidentifiedBadSpots -= 1;
      } else if (box.status !== "undug") {
        box.probability = 0;
      } else if (box.probability !== 0) {
        consideredSpots.push({ rowIndex: r, columnIndex: c });
      }
    }
  }

  const avgProb = unidentifiedBadSpots / consideredSpots.length;

  // initialize uncertain spots to average probability
  for (let r = 0; r < numRows; ++r) {
    for (let c = 0; c < numColumns; ++c) {
      const box = newRows[r][c];
      if (
        box.status === "undug" &&
        box.probability !== 1 &&
        box.probability !== 0
      ) {
        box.probability = avgProb;
      }
    }
  }

  return newRows;
};

export default updateProbabilities;
