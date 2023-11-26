import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/common/Header";
import Tag from "../../components/common/Tag";
import History from "../../components/common/History";
import Top3Badges from "../../components/common/Top3Badges";
import { getAgeRange } from "../../components/common/ageRange";
import { getKorGender } from "../../components/common/gender";

import { reviewsGetTop3Reviews } from "../../api/review";
import { postsGetUserCount } from "../../api/posts";
import { memberGeUserProfile } from "../../api/member";

import report from "../../assets/common/report.png";
import default_profile from "../../assets/common/default_profile.png";

const UserProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [badges, setBadges] = useState([]);
  const [history, setHistory] = useState({});
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const data_profile = await memberGeUserProfile(id);
      const data_badges = (await reviewsGetTop3Reviews(id)).data.data;
      const data_history = (await postsGetUserCount(id)).data.data;

      data_profile && setProfile(data_profile);
      data_badges && setBadges(data_badges.badges);
      data_history && setHistory(data_history);
    } catch (err) {
      alert("데이터를 가져오는데 실패했습니다.");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    profile && (
      <>
        <Header title={`${profile.nickname}님의 프로필`} isLogin={true} />
        <Wrapper>
          <div className="gradient" />

          <Top>
            <div className="profile">
              <img
                className="profile-image"
                src={
                  profile.profileImageUrl
                    ? profile.profileImageUrl
                    : default_profile
                }
                alt="프로필 이미지"
              />
            </div>
            <div
              className="report"
              onClick={() => navigate(`/user-report/${id}`)}
            >
              <img className="report-button" src={report} alt="신고하기" />
            </div>
          </Top>

          <div className="name">{profile.nickname}</div>
          <div className="tags">
            <Tag name={getAgeRange(profile.ageRange) + "대"} />
            <Tag name={getKorGender(profile.gender)} />
          </div>

          <div className="badges">
            <Top3Badges list={badges} />
          </div>

          <div className="history">
            <History
              contents={[
                {
                  count: history.hostedPostCount,
                  text: "주최한 플로깅 모임",
                },
                { count: history.joinedPostCount, text: "플로깅 참여 횟수" },
              ]}
            />
          </div>
        </Wrapper>
      </>
    )
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
    margin-top: 40px;
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
    cursor: pointer;
  }

  .report-button {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;
