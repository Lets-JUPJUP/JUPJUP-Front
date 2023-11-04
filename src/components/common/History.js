import React from "react";
import { styled } from "styled-components";
const History = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="count">00개</div>
        <div className="title">주최한 플로깅 모임</div>
      </div>

      <div className="divider" />

      <div className="container">
        <div className="count">00회</div>
        <div className="title">플로깅 참여 횟수</div>
      </div>
    </Wrapper>
  );
};

export default History;

const Wrapper = styled.div`
  width: 358px;
  height: 68px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--light, #f3efff);
  display: flex;
  justify-content: center;
  align-items: center;

  .divider {
    width: 2px;
    height: 44px;
    background: #09090a;
  }
  .container {
    width: 50%;
  }
  .count {
    color: var(--black, #09090a);
    text-align: center;

    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }

  .title {
    color: var(--black, #09090a);
    text-align: center;

    font-size: 12px;
    font-weight: 600;
    line-height: 18px; /* 150% */
  }
`;
