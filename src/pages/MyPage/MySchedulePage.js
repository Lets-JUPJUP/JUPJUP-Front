import React from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import PloggingPostBox from "../../components/common/PloggingPostBox";
import FloatingButton from "../../components/common/FloatingButton";
import AdBanner from "../../components/common/AdBanner";
import { useState } from "react";

const MySchedulePage = () => {
  // '주최한 플로깅'을 선택한 경우 true
  const [isHostClicked, setIsHostClicked] = useState(true);
  const onTabClick = () => {
    setIsHostClicked(!isHostClicked);
  };
  return (
    <Wrapper>
      <Header title="내 플로깅 일정" isLogin={true} />
      <DivisionLine />

      <ReviewDiv>
        <div className="mainText">이 플로깅 어떠셨나요?</div>
        <ReviewButton>리뷰하기</ReviewButton>
      </ReviewDiv>
      <PostDiv>
        <PloggingPostBox />
      </PostDiv>

      <DivisionLine />
      {/* ReviewDiv에서부터 DivisionLine은 24시간 이내 플로깅을 했을 때만 보여짐 */}

      <Tab>
        <div
          className={isHostClicked ? "isClicked" : "isNotClicked"}
          onClick={onTabClick}
        >
          주최한 플로깅
        </div>
        <div
          className={isHostClicked ? "isNotClicked" : "isClicked"}
          onClick={onTabClick}
        >
          참여 신청한 플로깅
        </div>
      </Tab>

      {isHostClicked === true ? (
        <PostDiv>
          <PloggingPostBox />
          <PloggingPostBox />
          <PloggingPostBox />
          <PloggingPostBox status="finish" />
        </PostDiv>
      ) : (
        <PostDiv>
          <PloggingPostBox status="join" />
          <PloggingPostBox status="join" />
          <PloggingPostBox status="finish" />
          <PloggingPostBox status="finish" />
          <PloggingPostBox status="finish" />
        </PostDiv>
      )}

      <FloatingButton />
      <AdBanner />
    </Wrapper>
  );
};

export default MySchedulePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DivisionLine = styled.div`
  width: 95%;
  height: 2px;
  background: var(--main, "#410FD4");
`;

const ReviewDiv = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;

  .mainText {
    font-size: 16px;
    font-weight: 600;
  }
`;

const ReviewButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background: var(--sub, #beef62);

  color: var(--main, #410fd4);
  font-size: 16px;
  font-weight: 600;

  border: 0px;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  font-size: 16px;
  font-weight: 600;

  width: 90%;
  margin-top: 12px;

  .isClicked {
    cursor: pointer;
  }

  .isNotClicked {
    color: var(--grey, #e8e8e8);
    cursor: pointer;
  }
`;

const PostDiv = styled.div`
  width: 100%;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  margin: 12px 0;
`;
