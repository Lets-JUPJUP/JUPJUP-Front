import React, { useState } from "react";
import { styled } from "styled-components";

import ic_star_default from "../../assets/common/ic_star_default.png";
import ic_star_clicked from "../../assets/common/ic_star_clicked.png";

import useBottomDetection from "../common/useBottomDetection";

const JoinFooter = () => {
  const isScrollBottom = useBottomDetection();
  // 별 클릭 여부
  const [isStarClicked, setIsStarClicked] = useState(false);
  const onStarClick = () => {
    setIsStarClicked(!isStarClicked);
  };
  return (
    <Wrapper className={isScrollBottom === true ? "displayNone" : ""}>
      <div className="main">
        <BigBoldText>모집 마감까지 00시간 00분</BigBoldText>
        <div className="right">
          <img
            src={isStarClicked === true ? ic_star_clicked : ic_star_default}
            alt="star"
            onClick={onStarClick}
          />
          <JoinButton>참여하기</JoinButton>
        </div>
      </div>
      <SmallBoldText className="linkText">00 / 00 참여중 &gt;</SmallBoldText>
    </Wrapper>
  );
};

export default JoinFooter;

const Wrapper = styled.div`
  width: 100%;
  height: 88px;

  color: var(--white, "#fff");
  background: var(--main, #410fd4);

  box-sizing: border-box;
  padding: 0 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: fixed;
  bottom: 0;

  &.displayNone {
    display: none;
  }

  .main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      width: 23px;
      cursor: pointer;
    }
  }
`;

const JoinButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background: var(--sub, #beef62);

  color: var(--main, #410fd4);
  font-size: 16px;
  font-weight: 600;

  border: 0px;
`;

// 글씨 종류
const BigBoldText = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const SmallBoldText = styled.div`
  font-weight: 600;
  cursor: pointer;
`;
