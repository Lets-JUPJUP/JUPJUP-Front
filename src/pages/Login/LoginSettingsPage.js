import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import background2 from "../../assets/login/background2.png";
import tag from "../../assets/login/tag.png";

import Header from "../../components/common/Header";
import ValidNameCheck from "../../components/common/ValidNameCheck";
import { memberGetMyProfile, memberUpdateProfile } from "../../api/member";
import { getAgeRange } from "../../components/common/ageRange";
import { getKorGender } from "../../components/common/gender";
import { useNavigate } from "react-router-dom";

const LoginSettingsPage = () => {
  const [myProfile, setMyProfile] = useState({});
  const [isHaveGender, setIsHaveGender] = useState(false);
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await memberGetMyProfile();
    setMyProfile(data);
    if (data.gender !== "NOT_DEFINED") {
      setIsHaveGender(true);
      setGender(data.gender);
    }
    setNickname(data.nickname);
  };

  const handleSubmit = async () => {
    if (isHaveGender && isValid) {
      const status = await memberUpdateProfile(nickname, gender, profileImage);
      if (status === 200) {
        alert("회원가입 완료");
        navigate("/");
      }
    } else {
      alert("유효하지 않은 닉네임입니다.");
    }
  };
  return (
    <Wrapper>
      <Header title={`${myProfile.nickname}님, 반가워요!`} />

      {myProfile.nickname && (
        <Mid>
          <div className="profile">
            <img
              className="profile-image"
              src={myProfile.profileImageUrl}
              alt="profile"
            />
          </div>
          <ValidNameCheck
            setNickname={setNickname}
            nickname={nickname}
            isValid={isValid}
            setIsValid={setIsValid}
          />
          <div className="tags">
            <div className="tag">
              <img src={tag} className="tag-icon" alt="연령" />
              {getAgeRange(myProfile.ageRange)}대
            </div>
            {isHaveGender && (
              <div className="tag">
                <img src={tag} className="tag-icon" alt="성별" />
                {getKorGender(myProfile.gender)}
              </div>
            )}
          </div>
        </Mid>
      )}

      <Bottom>
        <div className="start-msg">
          레츠줍줍과 함께
          <br />더 깨끗하고 활기찬 성동구를 만들어봐요!
        </div>
        <div onClick={handleSubmit} className="start-button">
          좋아요!
        </div>
      </Bottom>
      <img className="background" src={background2} alt="" />
    </Wrapper>
  );
};

export default LoginSettingsPage;
const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  color: var(--darken, #290886);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  .background {
    z-index: -1;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 314px;
    flex-shrink: 0;
  }
`;

const Mid = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .profile {
    width: 128px;
    height: 128px;
    flex-shrink: 0;
    border-radius: 128px;
    background-color: gray;
    display: flex;
    img {
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      border-radius: 128px;
    }
  }

  .tags {
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    color: var(--white, #fff);
    font-size: 12px;
    font-weight: 600;
    line-height: 18px; /* 150% */

    .tag {
      display: inline-flex;
      padding: 1px 4px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 4px;
      background: var(--main, #410fd4);
      margin-right: 8px;

      .tag-icon {
        width: 12px;
        height: 12px;
      }
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;

  .start-msg {
    position: absolute;
    bottom: 29%;
    width: 100%;
    height: 50px;
  }

  .start-button {
    position: absolute;
    bottom: 18%;
    display: flex;
    width: 300px;
    height: 44px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 8px;
    background: var(--sub, #beef62);
  }
`;
