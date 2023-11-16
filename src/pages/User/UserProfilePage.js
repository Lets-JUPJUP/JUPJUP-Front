import React from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import report from "../../assets/common/report.png";
import Tag from "../../components/common/Tag";
import History from "../../components/common/History";
import Top3Badges from "../../components/common/Top3Badges";
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

        <div className="badges"></div>
        <Top3Badges
          list={[
            "함께 또 걷고 싶은 플로깅 파트너",
            "함께 또 걷고 싶은 플로깅 파트너",
            "함께 또 걷고 싶은 플로깅 파트너",
          ]}
        />

        <div className="history">
          <History
            contents={[
              {
                count: 0,
                text: "주최한 플로깅 모임",
              },
              { count: 0, text: "플로깅 참여 횟수" },
            ]}
          />
        </div>
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

    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }
  .tags {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .badges {
    margin-top: 16vh;
  }

  .history {
    position: absolute;
    bottom: 30px;
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
    left: 55px;
  }

  .report-button {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;
