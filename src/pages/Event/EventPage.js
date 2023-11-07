import React, { useState } from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import ic_star_default from "../../assets/common/ic_star_default.png";
import ic_star_clicked from "../../assets/common/ic_star_clicked.png";
import AdBanner from "../../components/common/AdBanner";
import CommentBox from "../../components/common/CommentBox";
import CommentInput from "../../components/common/CommentInput";

const EventPage = () => {
  // 클릭 여부
  const [isClicked, setIsClicked] = useState(false);
  const onStarClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <Wrapper>
      <Header title="공식 행사" />
      <div>
        <Card />
        <div className="cardInfo">
          <div className="interest">
            <img
              src={isClicked ? ic_star_clicked : ic_star_default}
              alt="star"
              className="star"
              onClick={onStarClick}
            />
            <BoldText>관심 있어요</BoldText>
          </div>
          <BoldText className="link">홈페이지 &gt;</BoldText>
        </div>
      </div>
      <AdBanner isNotFixed={true} />

      <CommentDiv>
        <CommentBox />
        <CommentBox />
        <CommentBox />
        <CommentBox />
        <CommentBox />
      </CommentDiv>

      <CommentInput />
    </Wrapper>
  );
};

export default EventPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .cardInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 12px;
    margin-bottom: 24px;
  }

  .star {
    width: 16px;
  }

  .interest {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .link {
    cursor: pointer;
  }
`;

const Card = styled.div`
  width: 280px;
  height: 376px;
  background: var(--grey, #e8e8e8);
`;

const BoldText = styled.div`
  font-weight: 600;
`;

const CommentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 12px;

  // 하단 댓글창 최대 높이(88px) + 여백 12px까지 합해서 여백 만들기
  margin-bottom: 100px;
`;
