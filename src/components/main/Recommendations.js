import React from "react";
import { styled } from "styled-components";

const Recommendations = () => {
  return (
    <Wrapper>
      <div className="title">성동구 플로깅, 이 장소를 추천해요!</div>
      <Card />
      <Card />
      <Card />
    </Wrapper>
  );
};

export default Recommendations;
const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 8px 8px 0px 0px;
  background: linear-gradient(180deg, #f3efff 0%, #fff 15.21%);
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  .title {
    color: var(--midgrey, #7e7e7e);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
    margin-bottom: 33px;
  }
`;

const Card = styled.div`
  width: 342px;
  height: 342px;
  flex-shrink: 0;
  border-radius: 8px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`;
