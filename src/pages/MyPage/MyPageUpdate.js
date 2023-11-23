import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import GradientLine from "../../components/common/GradientLine";

import SetProfileImg from "../../components/common/SetProfileImg";
import ValidNameCheck from "../../components/common/ValidNameCheck";

import Tag from "../../components/common/Tag";
import Top3Badges from "../../components/common/Top3Badges";

import Footer from "../../components/common/Footer";

import { getAgeRange } from "../../components/common/ageRange";
import { getKorGender } from "../../components/common/gender";

import { memberGetMyProfile, memberUpdateProfile } from "../../api/member";
import { reviewsGetTop3Reviews } from "../../api/review";
import { s3GetImageUrl } from "../../api/s3presignedurl";

const MyPageUpdate = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  //프로필 이미지
  const [imgFile, setImgFile] = useState(null); //이미지 원본 파일

  const [nickname, setNickname] = useState("");
  //닉네임 유효성 체크 (중복, 유효문자)
  const [isValid, setIsValid] = useState(false);

  const [badges, setBadges] = useState([]);

  const getData = async () => {
    try {
      const data_profile = await memberGetMyProfile();
      const userId = data_profile.id;
      const data_badges = (await reviewsGetTop3Reviews(userId)).data.data;

      data_profile && setProfile(data_profile);
      data_badges && setBadges(data_badges.bages);

      setNickname(data_profile.nickname);
    } catch (err) {
      alert("데이터를 가져오는데 실패했습니다.");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    const gender = profile.gender; // 사용자의 성별 정보 받아오기
    let img_url = [profile.profileImageUrl]; // 사용자의 기존 이미지 url

    if (isValid) {
      // 유효 닉네임일 경우 post
      if (imgFile) {
        //새로 등록한 이미지가 있을 경우 s3 업로드, url 얻기
        try {
          img_url = await s3GetImageUrl([imgFile]); //백 로직에 의해 배열로 보내야함
        } catch (err) {
          alert("이미지 업로드 에러");
          console.log(err);
        }
      }
      const res = await memberUpdateProfile(
        nickname,
        gender,
        ...img_url //배열 속 이미지 url 한개,
      );
      if (res === 200) {
        navigate(`/mypage`);
      }
    } else {
      alert("유효하지 않은 닉네임입니다.");
    }
  };

  return (
    <>
      <Header title="내 프로필 수정" />
      <Wrapper>
        <GradientLine />

        <SetProfileImg
          profileImage={profile.profileImageUrl}
          setImgFile={setImgFile}
        />

        <ValidNameCheck
          setNickname={setNickname}
          nickname={nickname}
          isValid={isValid}
          setIsValid={setIsValid}
        />

        <UpdateButton onClick={handleSubmit}>수정 완료</UpdateButton>

        <div className="tags">
          <Tag name={getAgeRange(profile.ageRange) + "대"} status="finish" />
          <Tag name={getKorGender(profile.gender)} status="finish" />
        </div>

        <div style={{ marginTop: "20px" }}>
          <Top3Badges list={badges} />
        </div>
      </Wrapper>
      <Footer isNotFixed={true} />
    </>
  );
};

export default MyPageUpdate;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;
  // 전체 높이에서 Header 높이, Footer 높이 제외
  height: calc(100vh - 80px - 132px);

  .tags {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 40px;
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
    }

    .name-value {
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
`;

const UpdateButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background: var(--sub, #beef62);

  color: var(--main, #410fd4);
  font-size: 16px;
  font-weight: 600;

  border: 0px;

  margin-top: 22px;
`;
