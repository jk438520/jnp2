import styled from "styled-components";

const GifWrapper = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
border: hidden;
`;

export const SquareContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px; /* adjust this value to your desired size */
  height: 300px; /* adjust this value to your desired size */
  overflow: hidden;
  border: hidden;
`;

export default GifWrapper;