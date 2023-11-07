import React from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import report from "../../assets/common/report.png";
import Badge from "../../components/user/Badge";
import AdBanner from "../../components/common/AdBanner";
const ReviewPage = () => {
  return (
    <>
      <Header title={"리뷰하기"} isLogin={true} />
      <Wrapper>
        <div className="gradient" />

        <Top>
          <div className="profile">
            <img className="profile-image" src={""} alt="프로필 이미지" />
          </div>
          <div className="report">
            <img className="report-button" src={report} alt="신고하기" />
          </div>
        </Top>

        <div className="h1">사용자 이름님과 함께한 플로깅 어떠셨나요?</div>
        <div className="h2">
          주최자에 관한 리뷰를 남겨주시면, 다른 분들께 도움이 돼요!
        </div>

        <div className="badges">
          <div className="row">
            <Badge id={11} /> <Badge id={2} />
          </div>
          <div className="row">
            <Badge id={0} /> <Badge id={3} />
          </div>
          <div className="row">
            <Badge id={4} /> <Badge id={6} />
          </div>
          <div className="row">
            <Badge id={5} /> <Badge id={10} />
          </div>
          <div className="row">
            <Badge id={9} /> <Badge id={12} />
          </div>
          <div className="row">
            <Badge id={8} /> <Badge id={1} />
          </div>
          <div className="row">
            <Badge id={7} />
          </div>
        </div>

        <div className="submit">선택 완료</div>

        <AdBanner />
      </Wrapper>
    </>
  );
};

export default ReviewPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .gradient {
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background: linear-gradient(
      180deg,
      #f3efff 0%,
      rgba(243, 239, 255, 0) 100%
    );
  }

  .h1 {
    margin-top: 24px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }

  .h2 {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 600;
    line-height: 18px; /* 150% */
  }
  .badges {
    margin-top: 46px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  .row {
    display: flex;
    gap: 16px;
  }

  .submit {
    margin-top: 48px;
    display: inline-flex;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: var(--sub, #beef62);

    color: var(--main, #410fd4);

    /* semibold16pt */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  width: 128px;
  height: 128px;
  margin: 24px auto 0;

  .profile {
    position: absolute;
    display: flex;
    width: 128px;
    height: 128px;
    flex-shrink: 0;
    border-radius: 128px;
  }
  .profile-image {
    width: 128px;
    height: 128px;
    flex-shrink: 0;
    border-radius: 128px;
    background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  }

  .report {
    position: relative;
    left: 64px;
  }

  .report-button {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;
