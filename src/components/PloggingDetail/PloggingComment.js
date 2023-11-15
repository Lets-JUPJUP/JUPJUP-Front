import React from "react";
import { styled } from "styled-components";
import CommentBox from "../common/CommentBox";
import CoCommentBox from "./CoCommentBox";

const PloggingComment = ({ writeMode, setWriteMode }) => {
  return (
    <Wrapper>
      <MainDiv>
        <BigBoldText>댓글 00</BigBoldText>
        <SmallBoldText
          className="linkText"
          onClick={() => {
            setWriteMode(!writeMode);
          }}
        >
          {writeMode === true ? "돌아가기 >" : "댓글 작성하기 >"}
        </SmallBoldText>
      </MainDiv>
      <CommentDiv>
        <CommentBox />
        <CoCommentBox />
        <CoCommentBox />
        <CommentBox />
        <CommentBox />
        <CommentBox />
      </CommentDiv>
    </Wrapper>
  );
};

export default PloggingComment;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const MainDiv = styled.div`
  width: 90%;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CommentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 8px;

  // 하단 댓글창 높이(34px)까지 합해서 여백 만들기
  margin-bottom: 42px;
`;

// 글씨 종류
const BigBoldText = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const SmallBoldText = styled.div`
  font-weight: 600;

  &.linkText {
    color: var(--midgrey, #7e7e7e);
    cursor: pointer;
  }
`;
