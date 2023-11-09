import React from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";

import ic_share from "../../assets/PloggingDetail/ic_share.png";

import PloggingInfo from "../../components/PloggingDetail/PloggingInfo";
import PloggingComment from "../../components/PloggingDetail/PloggingComment";

import FloatingButton from "../../components/common/FloatingButton";
import JoinFooter from "../../components/PloggingDetail/JoinFooter";
import { useState } from "react";
import CommentInput from "../../components/common/CommentInput";

const PloggingDetailPage = () => {
  const [writeMode, setWriteMode] = useState(false);
  return (
    <>
      <Fixed>
        <Header title={"제목"} isLogin={true} isDetailPage={true} />
      </Fixed>
      <Wrapper>
        <PostImageBox />

        <ShareDiv>
          <img src={ic_share} alt="share" />
        </ShareDiv>
        <DivisionLine />
        {/* 플로깅 정보 */}
        <PloggingInfo />
        <CommentLine />
        {/* 플로깅 댓글 */}
        <PloggingComment setWriteMode={setWriteMode} />
        <FloatingButton isWriteBtnHidden={true} />

        {writeMode === true ? <CommentInput /> : <JoinFooter />}
      </Wrapper>
    </>
  );
};

export default PloggingDetailPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Fixed = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
`;

const PostImageBox = styled.div`
  width: 90%;
  height: 171px;
  background-image: url(https://img.freepik.com/premium-vector/environmental-protection-banner-people-are-jogging-and-picking-up-trash-plogging_540284-690.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  margin-bottom: 40px;
`;

const ShareDiv = styled.div`
  width: 90%;

  display: flex;
  justify-content: flex-end;
  img {
    width: 16px;
    cursor: pointer;
  }
`;

const DivisionLine = styled.div`
  width: 95%;
  height: 1.2px;
  background: var(--main, "#410FD4");

  margin: 12px 0;
`;

const CommentLine = styled.div`
  width: 100%;
  height: 1.2px;
  background: var(--light, "#f3efff");
  margin: 12px 0;
`;
