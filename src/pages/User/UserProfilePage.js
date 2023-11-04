import React from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import report from "../../assets/user/report.png";
import Tag from "../../components/common/Tag";
const UserProfilePage = () => {
  return (
    <>
      <Header title={"주최자 이름님의 프로필"} isLogin={true} />
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

        <div className="name">주최자 이름</div>
        <div className="tags">
          <Tag name={"20대"} /> <Tag name={"여성"} />
        </div>

        <Badges>
          <div className="badge">
            <div className="circle-num">❶</div>
            <div className="badge-name">함께 또 걷고 싶은 플로깅 파트너</div>
          </div>
          <div className="badge">
            <div className="circle-num">❷</div>
            <div className="badge-name">함께 또 걷고 싶은 플로깅 파트너</div>
          </div>
          <div className="badge">
            <div className="circle-num">❸</div>
            <div className="badge-name">함께 또 걷고 싶은 플로깅 파트너</div>
          </div>
        </Badges>

        <History>
          <div className="container">
            <div className="count">00개</div>
            <div className="title">주최한 플로깅 모임</div>
          </div>

          <div className="divider" />

          <div className="container">
            <div className="count">00회</div>
            <div className="title">플로깅 참여 횟수</div>
          </div>
        </History>
      </Wrapper>
    </>
  );
};

export default UserProfilePage;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .gradient {
    margin-top: 12px;
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
  .name {
    margin-top: 40px;
    color: #000;
    text-align: center;

    /* semibold16pt */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }
  .tags {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    gap: 8px;
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

const Badges = styled.div`
  margin-top: 16vh;
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px; /* 150% */

  .badge {
    display: flex;
    gap: 5px;
    margin-bottom: 12px;
  }

  .circle-num {
    margin-top: 1px;
  }
`;

const History = styled.div`
  width: 358px;
  height: 68px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--light, #f3efff);
  position: absolute;
  bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  .divider {
    width: 2px;
    height: 44px;
    background: #09090a;
  }
  .container {
    width: 50%;
  }
  .count {
    color: var(--black, #09090a);
    text-align: center;

    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }

  .title {
    color: var(--black, #09090a);
    text-align: center;

    font-size: 12px;
    font-weight: 600;
    line-height: 18px; /* 150% */
  }
`;
