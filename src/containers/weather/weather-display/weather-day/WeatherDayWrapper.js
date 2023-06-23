import styled from "styled-components";


export const WeatherDayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  width: 150px;
  div {
    width: 150px; // if this line is not added the parent div is 830px wide. idk why.
    text-align: center;
  }
`;
