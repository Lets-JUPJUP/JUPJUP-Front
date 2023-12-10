import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ic_user from "../../assets/common/user.png";
import ic_comment from "../../assets/common/ic_comment.png";
import ic_report from "../../assets/common/ic_report.png";
import ic_delete from "../../assets/common/ic_delete.png";
import { settingDate } from "./time";
import { getCommentsByPost, deletePloggingComment } from "../../api/comment";
import { deleteEventComment, getEventComment } from "../../api/event";

// 댓글 컴포넌트
const CommentBox = ({
  commentInfo,
  postId,
  userId,
  setCommentData,
  setCommentNo,
  setWriteMode,
  setIsReplyMode,
  location = "ploggingDetail",
}) => {
  const navigate = useNavigate();

  // 대댓글 작성하기
  const handleCoComment = () => {
    if (window.confirm("대댓글을 작성하시겠습니까?")) {
      setWriteMode(true); // 댓글창 열기
      setIsReplyMode([true, commentInfo.id]); // 대댓글 모드로 변경, parentId 전달
    } else {
      return;
    }
  };

  // 신고하기 페이지로 이동
  const handleReport = () => {
    navigate(`/user-report/${commentInfo.writerInfoDto.writerId}`);
  };

  // 프로필 페이지로 이동
  const handleProfile = () => {
    navigate(`/user-profile/${commentInfo.writerInfoDto.writerId}`);
  };

  // 댓글 삭제 서버에 제출 - 플로깅 상세 페이지
  const handleDeletePloggingDetail = async () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await deletePloggingComment(commentInfo.id);
      } catch (err) {
        alert("댓글을 삭제하는 과정에서 오류가 생겼습니다. 다시 시도해주세요.");
      } finally {
        // 댓글 데이터 update
        const newCommentData = await getCommentsByPost(postId);
        setCommentData(newCommentData.data.commentDtoList);
        // 댓글 개수 update
        setCommentNo(newCommentData.data.commentNo);
      }
    } else {
      return;
    }
  };

  // 댓글 삭제 서버에 제출 - 공식 행사 상세 페이지
  const handleDeleteEvent = async () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await deleteEventComment(postId, commentInfo.id);
      } catch (err) {
        alert("댓글을 삭제하는 과정에서 오류가 생겼습니다. 다시 시도해주세요.");
      } finally {
        const newCommentData = await getEventComment(postId);
        setCommentData(newCommentData.data.eventcommentDtoList);
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
            onClick={handleProfile}
          />
          <BoldText>{commentInfo.writerInfoDto.nickname}</BoldText>
        </div>
        <div className="right">
          <div>{settingDate(commentInfo.createdDate)}</div>
          {commentInfo.writerInfoDto.writerId === userId ? (
            <img
              src={ic_delete}
              alt="delete"
              className="delete"
              onClick={
                location === "event"
                  ? handleDeleteEvent
                  : handleDeletePloggingDetail
              }
            />
          ) : (
            <img
              src={ic_report}
              alt="report"
              className="report"
              onClick={handleReport}
            />
          )}
        </div>
      </HeadDiv>
      <BodyDiv>
        <div>
          {commentInfo.isRemoved === true
            ? "(작성자에 의해 삭제된 댓글입니다.)"
            : commentInfo.content}
        </div>
        {location === "event" ? null : (
          <img
            src={ic_comment}
            alt="comment"
            className="comment"
            onClick={handleCoComment}
          />
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

const BodyDiv = styled.div`
  /* margin-left: 24px; // user icon 20px + gap 4px;
  margin-right: 20px; // report icon 16px + gap 4px; */
  margin-top: 4px;
  margin-left: 24px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .comment {
    width: 16px;
    cursor: pointer;
  }
`;

// 글씨 종류
const BoldText = styled.div`
  font-weight: 600;
`;
