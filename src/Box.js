import styled from "styled-components";

const backgroundColors = [
  "#FFFFFF", // 0%
  "#FFCCCB", // >0, <=25
  "#F0AAAD", // >25, <=50
  "#E1888F", // >50, <=75
  "#D16570", // >75, <100
  "#C24352", // 100%
];

const getBackgroundColor = (roundedProbPercent) => {
  if (roundedProbPercent === 0) {
    return backgroundColors[0];
  } else if (roundedProbPercent <= 25) {
    return backgroundColors[1];
  } else if (roundedProbPercent <= 50) {
    return backgroundColors[2];
  } else if (roundedProbPercent <= 75) {
    return backgroundColors[3];
  } else if (roundedProbPercent < 100) {
    return backgroundColors[4];
  } else {
    // roundedProbPercent === 100
    return backgroundColors[5];
  }
};

const Container = styled.div`
  width: 96px;
  height: 96px;
  border: 1px solid black;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 4px;
  background-color: ${(p) => p.backgroundColor};
`;
const Probability = styled.div`
  font-weight: 700;
`;

const Box = ({ status, probability, onChangeStatus }) => {
  const probPercent = probability * 100;
  const probString = probPercent.toFixed(1);
  const backgroundColor = getBackgroundColor(Number(probString));

  return (
    <Container backgroundColor={backgroundColor}>
      <Probability>{`${probString}%`}</Probability>
      <select value={status} onChange={(e) => onChangeStatus(e.target.value)}>
        <option value="undug">Undug</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="silver">Silver</option>
        <option value="gold">Gold</option>
        <option value="rupoor">Rupoor</option>
        <option value="bomb">Bomb</option>
      </select>
    </Container>
  );
};

export default Box;
