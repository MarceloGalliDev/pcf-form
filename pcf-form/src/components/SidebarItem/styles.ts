import styled from "styled-components";

export const Container = styled.div`
  margin: 30px 0;
  cursor: pointer;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
`;

export const Info = styled.div`
  flex: 1;
  margin-right: 20px;
`;

export const Title = styled.div`
  text-align: right;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 15px;
  color: #591C21;
  `;

export const Description = styled.div`
  text-align: right;
  font-size: 13px;
  color: #591C21;
`;

export const Point = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border: 1px solid #591C21;
  border-radius: 50%;
  margin-left: 30px;
  margin-right: -5.5px;
  background-color: ${props => props.active ? '#591C21' : '#F2F2F2'};
`;