import styled from "styled-components";
import Box from "./Box";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  gap: 4px;
`;

const Table = ({ rows, onUpdate }) => {
  return (
    <Container>
      {rows.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((box, columnIndex) => (
            <Box
              key={`${rowIndex},${columnIndex}`}
              status={box.status}
              probability={box.probability}
              onChangeStatus={(status) =>
                onUpdate({ status, rowIndex, columnIndex })
              }
            />
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Table;
