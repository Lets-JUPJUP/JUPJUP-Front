import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ic_arrow from "../../assets/PloggingDetail/ic_arrow.png";
import ic_user from "../../assets/common/user.png";
import ic_delete from "../../assets/common/ic_delete.png";
import ic_report from "../../assets/common/ic_report.png";
import { settingDate } from "../common/time";
import {
  deletePloggingReplyComment,
  getCommentsByPost,
} from "../../api/comment";

// 대댓글 컴포넌트
const CoCommentBox = ({
  cocommentInfo,
  postId,
  userId,
  setCommentData,
  setCommentNo,
}) => {
  const navigate = useNavigate();

  // 신고하기 페이지로 이동
  const handleReport = () => {
    navigate(`/user-report/${cocommentInfo.writerInfoDto.writerId}`);
  };

  // 프로필 페이지로 이동
  const handleProfile = () => {
    navigate(`/user-profile/${cocommentInfo.writerInfoDto.writerId}`);
  };

  // 대댓글 삭제
  const handleDeleteCoComment = async () => {
    if (window.confirm("대댓글을 삭제하시겠습니까?")) {
      try {
        await deletePloggingReplyComment(cocommentInfo.id);
      } catch (err) {
        alert(
          "대댓글을 삭제하는 과정에서 오류가 생겼습니다. 다시 시도해주세요."
        );
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

  return (
    <Wrapper>
      <img src={ic_arrow} alt="arrow" className="arrow" />
      <MainBox>
        <HeadDiv>
          <div className="left">
            <img
              src={
                cocommentInfo.writerInfoDto.profileImageUrl
                  ? cocommentInfo.writerInfoDto.profileImageUrl
                  : ic_user
              }
              alt="user"
              className="user"
              onClick={handleProfile}
            />
            <BoldText>{cocommentInfo.writerInfoDto.nickname}</BoldText>
          </div>
          <div className="right">
            <div>{settingDate(cocommentInfo.createdDate)}</div>
            {cocommentInfo.writerInfoDto.writerId === userId ? (
              <img
                src={ic_delete}
                alt="delete"
                className="delete"
                onClick={handleDeleteCoComment}
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
        <BodyDiv>{cocommentInfo.content}</BodyDiv>
      </MainBox>
    </Wrapper>
  );
};

export default CoCommentBox;

const Wrapper = styled.div`
  width: 90%;
  background: var(--white, #fff);

  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 6px;

  .arrow {
    width: 8px;
  }
`;

const MainBox = styled.div`
  width: 90%;
  min-height: 40px;

  padding: 8px 6px; // border 크기 때문에 양옆은 2px 줄이기
  box-sizing: border-box;

  border-radius: 8px;
  border: 2px solid var(--light, #f3efff);
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

  .delete,
  .report {
    width: 16px;
    cursor: pointer;
  }
`;

const BodyDiv = styled.div`
  margin-top: 4px;
  margin-left: 24px; // user icon 20px + gap 4px;
  margin-right: 20px; // report icon 16px + gap 4px;
`;

// 글씨 종류
const BoldText = styled.div`
  font-weight: 600;
`;
