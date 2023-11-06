import React from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import PloggingPostBox from "../../components/common/PloggingPostBox";
import FloatingButton from "../../components/common/FloatingButton";
import AdBanner from "../../components/common/AdBanner";

const MyInterestPage = () => {
  return (
    <Wrapper>
      <Header
        title="관심 있는 글"
        isLogin={true}
        title2="댓글 단 글"
        link="/mypage/comment"
      />
      <DivisionLine />
      <PostDiv>
        <PloggingPostBox />
        <PloggingPostBox />
        <PloggingPostBox />
        <PloggingPostBox />
      </PostDiv>

      <FloatingButton />
      <AdBanner />
    </Wrapper>
  );
};

export default MyInterestPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DivisionLine = styled.div`
  width: 95%;
  height: 2px;
  background: var(--main, "#410FD4");

  margin-bottom: 12px;
`;

const PostDiv = styled.div`
  width: 100%;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
