import styled from "styled-components";
import ic_user from "../../assets/common/user.png";
import ic_comment from "../../assets/common/ic_comment.png";
import ic_report from "../../assets/common/ic_report.png";

// 댓글 컴포넌트
const CommentBox = () => {
  return (
    <Wrapper>
      <HeadDiv>
        <div className="left">
          <img src={ic_user} alt="user" className="user" />
          <BoldText>사용자 이름</BoldText>
        </div>
        <div className="right">
          <div>00/00 00:00</div>
          <img src={ic_comment} alt="comment" className="comment" />
        </div>
      </HeadDiv>
      <BodyDiv>
        <div>오 좋은 행사네요 전 신청했습니다~</div>
        <img src={ic_report} alt="report" className="report" />
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
`;

// 글씨 종류
const BoldText = styled.div`
  font-weight: 600;
`;
