import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import Header from "../../components/common/Header";
import GradientLine from "../../components/common/GradientLine";

import default_profile from "../../assets/login/default-profile.png";
import ic_settings from "../../assets/common/ic_settings.png";
import edit from "../../assets/login/edit.png";

import Tag from "../../components/common/Tag";
import Top3Badges from "../../components/common/Top3Badges";
import History from "../../components/common/History";
import Footer from "../../components/common/Footer";
import MyMenu from "../../components/mypage/MyMenu";

import { getAgeRange } from "../../components/common/ageRange";
import { getKorGender } from "../../components/common/gender";

import { memberGetMyProfile } from "../../api/member";
import { reviewsGetTop3Reviews } from "../../api/review";
import { postsGetUserCount } from "../../api/posts";

const MyPage = () => {
  const [profile, setProfile] = useState({});
  const [badges, setBadges] = useState([]);
  const [history, setHistory] = useState({});

  const getData = async () => {
    try {
      const data_profile = await memberGetMyProfile();
      const userId = data_profile.id;
      const data_badges = (await reviewsGetTop3Reviews(userId)).data.data;
      const data_history = (await postsGetUserCount(userId)).data.data;

      data_profile && setProfile(data_profile);
      data_badges && setBadges(data_badges.bages);
      data_history && setHistory(data_history);
    } catch (err) {
      alert("데이터를 가져오는데 실패했습니다.");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // 수정 페이지로 이동
  const navigate = useNavigate();
  const linkToUpdateMyPage = () => {
    navigate(`/mypage/update`);
  };

  return (
    <>
      <Header title="내 프로필" />
      <Wrapper>
        <GradientLine />

        <div className="profileDiv">
          <ProfileImage
            url={profile.profileImageUrl}
            default={default_profile}
          />
          <img
            src={ic_settings}
            alt="settings"
            className="settings"
            onClick={linkToUpdateMyPage}
          />
        </div>

        <div className="name">
          <div className="name-value">{profile.nickname}</div>
          <img
            className="name-button"
            src={edit}
            alt="edit"
            onClick={linkToUpdateMyPage}
          />
        </div>
        <div className="line" />

        <div className="tags">
          <Tag name={getAgeRange(profile.ageRange) + "대"} />
          <Tag name={getKorGender(profile.gender)} />
        </div>

        <div style={{ margin: "30px 0" }}>
          <Top3Badges list={badges} />
        </div>

        <div>
          <History
            contents={[
              {
                count: history.hostedPostCount,
                text: "주최한 플로깅 모임",
              },
              { count: history.joinedPostCount, text: "플로깅 참여 횟수" },
            ]}
          />

          <MyMenu />
        </div>
      </Wrapper>
      <Footer isNotFixed={true} />
    </>
  );
};

export default MyPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;
  // 전체 높이에서 Header 높이, Footer 높이 제외
  height: calc(100vh - 80px - 132px);
  position: relative;

  .tags {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 40px;
  }

  .profileDiv {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 24px;
    position: relative;

    .settings {
      width: 16px;
      position: absolute;
      top: 0;
      right: 0;

      cursor: pointer;
    }
  }

  .name {
    margin-top: 40px;
    display: flex;
    align-items: flex-end;

    .name-button {
      margin-left: 9px;
      margin-top: 2px;
      width: 16px;
      height: 20px;
      flex-shrink: 0;

      cursor: pointer;
    }

    .name-value {
      color: black;
      width: 90px;
      text-align: center;

      font-size: 16px;
      font-weight: 600;
    }
  }

  .line {
    margin-top: 4px;
    width: 128px;
    height: 2px;
    background: var(--darken, "#290886");
  }

  .bottom {
    position: absolute;
    bottom: 12px;
  }
`;

const ProfileImage = styled.div`
  width: 128px;
  height: 128px;

  border-radius: 128px;
  // https:// 로 시작하면 유효한 이미지 url이라고 가정
  background: ${(props) =>
    `url(${
      props.url?.startsWith("https://") ? props.url : props.default
    }) gray center/cover no-repeat`};
`;
