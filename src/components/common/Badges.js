import React from "react";
import { styled } from "styled-components";

const Badges = ({
  list = [
    "획득한 뱃지가 없습니다",
    "획득한 뱃지가 없습니다",
    "획득한 뱃지가 없습니다",
  ],
}) => {
  return (
    <Wrapper>
      <div className="badge">
        <div className="circle-num">❶</div>
        <div className="badge-name">{list[0]}</div>
      </div>
      <div className="badge">
        <div className="circle-num">❷</div>
        <div className="badge-name">{list[1]}</div>
      </div>
      <div className="badge">
        <div className="circle-num">❸</div>
        <div className="badge-name">{list[2]}</div>
      </div>
    </Wrapper>
  );
};

export default Badges;

const Wrapper = styled.div`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px; /* 150% */

  .badge {
    display: flex;
    gap: 5px;
    margin-bottom: 12px;
  }

  .circle-num {
    margin-top: 1px;
  }
`;
