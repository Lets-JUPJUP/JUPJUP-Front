import styled from "styled-components";
import ic_user from "../../assets/common/user.png";
import ic_comment from "../../assets/common/ic_comment.png";
import ic_report from "../../assets/common/ic_report.png";
import ic_delete from "../../assets/common/ic_delete.png";
import { settingDate } from "./time";
import { getCommentsByPost, deletePloggingComment } from "../../api/comment";

// 댓글 컴포넌트
const CommentBox = ({
  commentInfo,
  postId,
  userId,
  setCommentData,
  setWriteMode,
  setIsReplyMode,
}) => {
  // 대댓글 작성하기
  const handleCoComment = () => {
    if (window.confirm("대댓글을 작성하시겠습니까?")) {
      setWriteMode(true); // 댓글창 열기
      setIsReplyMode([true, commentInfo.id]); // 대댓글 모드로 변경, parentId 전달
    } else {
      return;
    }
  };

  // 댓글 삭제 서버에 제출
  const handleDelete = async () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await deletePloggingComment(commentInfo.id);
      } catch (err) {
        alert("댓글을 삭제하는 과정에서 오류가 생겼습니다. 다시 시도해주세요.");
      } finally {
        const newCommentData = await getCommentsByPost(postId);
        setCommentData(newCommentData.data.commentDtoList);
      }
    } else {
      return;
    }
  };
  return (
    <Wrapper>
      <HeadDiv>
        <div className="left">
          <img
            src={
              commentInfo.writerInfoDto.profileImageUrl
                ? commentInfo.writerInfoDto.profileImageUrl
                : ic_user
            }
            alt="user"
            className="user"
          />
          <BoldText>{commentInfo.writerInfoDto.nickname}</BoldText>
        </div>
        <div className="right">
          <div>{settingDate(commentInfo.createdDate)}</div>
          <img
            src={ic_comment}
            alt="comment"
            className="comment"
            onClick={handleCoComment}
          />
        </div>
      </HeadDiv>
      <BodyDiv>
        <div>{commentInfo.content}</div>
        {commentInfo.writerInfoDto.writerId === userId ? (
          <img
            src={ic_delete}
            alt="delete"
            className="delete"
            onClick={handleDelete}
          />
        ) : (
          <img src={ic_report} alt="report" className="report" />
        )}
      </BodyDiv>
    </Wrapper>
  );
};

export default CommentBox;

const Wrapper = styled.div`
  width: 90%;
  min-height: 56px;

  padding: 8px;
  box-sizing: border-box;

  border-radius: 8px;
  background: var(--grey, #e8e8e8);
`;

const HeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .user {
    width: 20px;
    height: 20px;
    border-radius: 20px;
  }

  .comment {
    width: 16px;
    cursor: pointer;
  }
`;

const BodyDiv = styled.div`
  /* margin-left: 24px; // user icon 20px + gap 4px;
  margin-right: 20px; // report icon 16px + gap 4px; */
  margin-top: 4px;
  margin-left: 24px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .report {
    width: 16px;
    cursor: pointer;
    margin-left: 4px; // gap
  }

  .delete {
    width: 16px;
    cursor: pointer;
    margin-left: 4px; // gap
  }
`;

// 글씨 종류
const BoldText = styled.div`
  font-weight: 600;
`;
