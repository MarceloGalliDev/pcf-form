import styled from "styled-components";

export const TooltipText = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  color: green;
`;

export const TooltipBox = styled.div`
  visibility: hidden;
  z-index: 1;
  height: 0;

  img {
    z-index: 2;
    width: 300px;
    height:225px;
  }
`;

export const TooltipCard = styled.div`
  position: relative;

   & ${TooltipText}:hover + ${TooltipBox} {
    visibility: visible;
    z-index: 1;

   }
`;