import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import ValidNameCheck from "../../components/common/ValidNameCheck";
import { getAgeRange } from "../../components/common/ageRange";
import { getKorGender } from "../../components/common/gender";

import { memberGetMyProfile_, memberUpdateProfile_ } from "../../api/member";

import background2 from "../../assets/login/background2.png";
import tag from "../../assets/login/tag.png";
import SetProfileImg from "../../components/common/SetProfileImg";
import { s3GetImageUrl } from "../../api/s3presignedurl";
//추가 처리 해야 할 것
//프로필 이미지 수정

//저장된 temptoken 있어야만 접근가능하게
const LoginSettingsPage = () => {
  const [myProfile, setMyProfile] = useState({});

  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  //프로필 이미지
  const [imgFile, setImgFile] = useState(null); //이미지 원본 파일

  //닉네임 유효성 체크 (중복, 유효문자)
  const [isValid, setIsValid] = useState(false);
  const [isHaveGender, setIsHaveGender] = useState(false);
  const [isHaveAge, setIsHaveAge] = useState(false);

  // const [tempToken, setTempToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);

  const navigate = useNavigate();
  const tempToken = localStorage.getItem("temptoken");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await memberGetMyProfile_(tempToken);
    setMyProfile(data);
    if (data.gender !== "NOT_DEFINED") {
      setIsHaveGender(true);
      setGender(data.gender);
    }
    if (data.ageRange !== "NOT_DEFINED") {
      setIsHaveAge(true);
      setAge(data.ageRange);
    }
    setNickname(data.nickname);
  };

  const handleSubmit = async () => {
    //성별,나이 정보있고, 유효 닉네임일 경우 post
    var img_url = [myProfile.profileImageUrl]; //기존 이미지 url
    if (isHaveGender && isHaveAge && isValid) {
      if (imgFile) {
        //새로 등록한 이미지가 있을 경우 s3 업로드, url 얻기
        try {
          img_url = await s3GetImageUrl([imgFile]); //백 로직에 의해 배열로 보내야함
        } catch (err) {
          alert("이미지 업로드 에러");
        }
      }
      try {
        const status = (
          await memberUpdateProfile_(
            nickname,
            gender,
            ...img_url, //배열 속 이미지 url 한개
            age,
            tempToken
          )
        ).status;

        if (status === 200) {
          //프로필 수정 완료
          localStorage.setItem("juptoken", tempToken);
          localStorage.setItem("id", myProfile.id);
          localStorage.removeItem("temptoken");

          alert("회원가입 완료");

          navigate("/");
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
        alert("회원가입 오류");
      }
    } else if (!isHaveGender && isValid) {
      setShowModal(true);
    } else if (!isHaveAge && isValid) {
      setShowAgeModal(true);
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
                onClick={() => {
                  setGender("MALE");
                  setIsHaveGender(true);
                }}
                $isClicked={gender === "MALE"}
              >
                남성
              </GenderBtn>
              <GenderBtn
                onClick={() => {
                  setGender("FEMALE");
                  setIsHaveGender(true);
                }}
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
      {showAgeModal && (
        <AgeSettingModal>
          <div className="modal">
            <div className="title">나이를 알려주세요!</div>
            <div className="subtitle">이후 수정이 불가능한 정보입니다</div>
            <div className="btns">
              <Age
                onClick={() => {
                  setAge("AGE_10_19");
                  setIsHaveAge(true);
                }}
                $isClicked={age === "AGE_10_19"}
              >
                10대
              </Age>
              <Age
                onClick={() => {
                  setAge("AGE_20_29");
                  setIsHaveAge(true);
                }}
                $isClicked={age === "AGE_20_29"}
              >
                20대
              </Age>
              <Age
                onClick={() => {
                  setAge("AGE_30_39");
                  setIsHaveAge(true);
                }}
                $isClicked={age === "AGE_30_39"}
              >
                30대
              </Age>
              <Age
                onClick={() => {
                  setAge("AGE_40_49");
                  setIsHaveAge(true);
                }}
                $isClicked={age === "AGE_40_49"}
              >
                40대
              </Age>
              <Age
                onClick={() => {
                  setAge("AGE_50_59");
                  setIsHaveAge(true);
                }}
                $isClicked={age === "AGE_50_59"}
              >
                50대
              </Age>
              <Age
                onClick={() => {
                  setAge("AGE_60_69");
                  setIsHaveAge(true);
                }}
                $isClicked={age === "AGE_60_69"}
              >
                60대
              </Age>
            </div>
            <div className="submit-btn" onClick={handleSubmit}>
              입력 완료했어요!
            </div>
          </div>
        </AgeSettingModal>
      )}
      <Header title={`${myProfile.nickname}님, 반가워요!`} />

      {myProfile.nickname && (
        <Mid>
          <SetProfileImg
            profileImage={myProfile.profileImageUrl}
            setImgFile={setImgFile}
          />

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

  .input {
    display: none;
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
  height: 100vh;
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

const AgeSettingModal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
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
    height: 164px;
    border-radius: 8px;
    background: var(--light, #f3efff);
    padding-top: 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    width: 250px;
    height: 50px;
    overflow-x: scroll;
    display: flex;
    align-items: center;
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
const Age = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 30px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${(props) => (props.$isClicked ? " #410fd4" : "#7E7E7E")};
`;
