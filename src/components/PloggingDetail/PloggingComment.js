import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import CommentBox from "../common/CommentBox";
import CoCommentBox from "./CoCommentBox";

import { getCommentsByPost } from "../../api/comment";

const PloggingComment = ({
  writeMode,
  setWriteMode,
  postId,
  userId,
  commentData,
  setCommentData,
}) => {
  // 댓글 개수 (대댓글 포함)
  const [commentNo, setCommentNo] = useState(0);

  const getData = async () => {
    const data = await getCommentsByPost(postId);
    setCommentData(data.data.commentDtoList);
    setCommentNo(data.data.commentNo);
    console.log("댓글", data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <MainDiv>
        <BigBoldText>댓글 {commentNo}</BigBoldText>
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
        {commentData.length > 0 ? (
          commentData.map((comment, index) => {
            return (
              <>
                <CommentBox
                  key={index}
                  commentInfo={comment}
                  postId={postId}
                  userId={userId}
                  setCommentData={setCommentData}
                />
                {comment.replyList.length > 0
                  ? comment.replyList.map((cocomment, index) => {
                      return (
                        <CoCommentBox key={index} cocommentInfo={cocomment} />
                      );
                    })
                  : null}
              </>
            );
          })
        ) : (
          <div>해당 게시글에 대한 댓글이 없습니다.</div>
        )}
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
