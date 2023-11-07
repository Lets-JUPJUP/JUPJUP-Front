import styled from "styled-components";
import ic_arrow from "../../assets/PloggingDetail/ic_arrow.png";
import ic_user from "../../assets/common/user.png";
import ic_report from "../../assets/common/report.png";

// 대댓글 컴포넌트
const CoCommentBox = () => {
  return (
    <Wrapper>
      <img src={ic_arrow} alt="arrow" className="arrow" />
      <MainBox>
        <HeadDiv>
          <div className="left">
            <img src={ic_user} alt="user" className="user" />
            <BoldText>사용자 이름</BoldText>
          </div>
          <div className="right">
            <div>00/00 00:00</div>
            <img src={ic_report} alt="report" className="report" />
          </div>
        </HeadDiv>
        <BodyDiv>오 좋은 행사네요 전 신청했습니다~</BodyDiv>
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

  padding: 8px;
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
  }

  .report {
    width: 16px;
    cursor: pointer;
  }
`;

const BodyDiv = styled.div`
  /* margin-left: 24px; // user icon 20px + gap 4px;
  margin-right: 20px; // report icon 16px + gap 4px; */
  margin: 4px 20px 0px 24px;
`;

// 글씨 종류
const BoldText = styled.div`
  font-weight: 600;
`;
