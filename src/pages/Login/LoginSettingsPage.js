import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import background2 from "../../assets/login/background2.png";
import tag from "../../assets/login/tag.png";

import Header from "../../components/common/Header";
import ValidNameCheck from "../../components/common/ValidNameCheck";
import { memberGetMyProfile_, memberUpdateProfile_ } from "../../api/member";
import { getAgeRange } from "../../components/common/ageRange";
import { getKorGender } from "../../components/common/gender";
import { useNavigate } from "react-router-dom";
import { notificationSubscribeSSE } from "../../api/notification";

//추가 처리 해야 할 것
//프로필 이미지 수정

//저장된 temptoken 있어야만 접근가능하게
const LoginSettingsPage = () => {
  const [myProfile, setMyProfile] = useState({});

  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState("");

  //닉네임 유효성 체크 (중복, 유효문자)
  const [isValid, setIsValid] = useState(false);
  const [isHaveGender, setIsHaveGender] = useState(false);

  const [tempToken, setTempToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("temptoken");
    setTempToken(token);

    getData(token);
  }, []);

  const getData = async (token) => {
    const data = await memberGetMyProfile_(token);
    setMyProfile(data);
    if (data.gender !== "NOT_DEFINED") {
      setIsHaveGender(true);
      setGender(data.gender);
    } else {
      setShowModal(true);
    }
    setNickname(data.nickname);
  };

  const handleSubmit = async () => {
    //성별 정보있고, 유효 닉네임일 경우 post
    if (isHaveGender && isValid) {
      const status = await memberUpdateProfile_(
        nickname,
        gender,
        profileImage,
        tempToken
      );
      if (status === 200) {
        alert("회원가입 완료");
        localStorage.setItem("juptoken", tempToken);
        localStorage.removeItem("temptoken");

        //SSE 구독 요청
        notificationSubscribeSSE(tempToken);
        navigate("/");
      }
    } else {
      alert("유효하지 않은 닉네임입니다.");
    }
  };
  return (
    <Wrapper>
      {showModal && (
        <GenderSettingModal>
          <div className="modal">
            <div className="title">성별을 알려주세요!</div>
            <div className="subtitle">이후 수정이 불가능한 정보입니다</div>
            <div className="btns">
              <GenderBtn
                onClick={() => setGender("MALE")}
                $isClicked={gender === "MALE"}
              >
                남성
              </GenderBtn>
              <GenderBtn
                onClick={() => setGender("FEMALE")}
                $isClicked={gender === "FEMALE"}
              >
                여성
              </GenderBtn>
            </div>
            <div className="submit-btn" onClick={handleSubmit}>
              입력 완료했어요!
            </div>
          </div>
        </GenderSettingModal>
      )}
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
            isTemp={true}
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

const GenderSettingModal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vhv;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--white, #fff);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px; /* 150% */

  .modal {
    flex-shrink: 0;
    width: 342px;
    height: 166px;
    border-radius: 8px;
    background: var(--light, #f3efff);
    padding-top: 12px;
    box-sizing: border-box;
  }

  .title {
    color: var(--black, #09090a);
    text-align: center;
  }

  .subtitle {
    color: var(--midgrey, #7e7e7e);
    text-align: center;

    font-size: 12px;
    font-weight: 600;
    line-height: 18px; /* 150% */
  }
  .btns {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 3px;
  }

  .submit-btn {
    display: flex;
    width: 224px;
    height: 40px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin: 8px auto 0;

    border-radius: 4px;
    background: var(--sub, #beef62);
    box-sizing: border-box;
    color: var(--main, #410fd4);
  }
`;

const GenderBtn = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 108px;
  height: 40px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${(props) => (props.$isClicked ? " #410fd4" : "#7E7E7E")};
`;
