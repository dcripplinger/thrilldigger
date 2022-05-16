const deepCopyRows = (rows) => {
  return rows.map((row) => row.map((box) => ({ ...box })));
};

export default deepCopyRows;
