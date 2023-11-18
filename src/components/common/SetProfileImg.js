import React, { useRef, useState } from "react";
import styled from "styled-components";

import default_profile from "../../assets/login/default-profile.png";
import ic_settings from "../../assets/common/ic_settings.png";

//수정 전 이미지 profileIage, 이미지 파일을 저장할 setImgFile
//s3 업로드 및 수정 요청 콜은 해당 컴포넌트를 불러온곳에서 처리함.
const SetProfileImg = ({ profileImage, setImgFile }) => {
  //프로필 이미지
  const [previewImg, setPreviewImg] = useState(profileImage); //미리보기 이미지

  const imgRef = useRef();

  const uploadImg = () => {
    //이미지 원본파일 저장
    let file = imgRef.current.files[0];
    setImgFile(file);

    //미리보기 이미지 생성
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async (e) => {
      setPreviewImg(e.target.result);
    };
  };

  return (
    <Wrapper>
      <div className="profile">
        <img
          className="profile-image"
          src={previewImg ? previewImg : default_profile}
          alt="profile"
        />
      </div>
      <input
        className="input"
        accept=".jpg, .jpeg, .png"
        type="file"
        id="file-input"
        onChange={uploadImg}
        ref={imgRef}
      />
      <label htmlFor="file-input">
        <div className="setting">
          <img className="set-button" src={ic_settings} alt="이미지 변경" />
        </div>
      </label>
    </Wrapper>
  );
};

export default SetProfileImg;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 128px;
  height: 128px;
  margin: 24px auto 0;

  .input {
    display: none;
  }

  .profile {
    position: absolute;
    width: 128px;
    height: 128px;
    flex-shrink: 0;
    border-radius: 128px;
    background-color: gray;
    display: flex;
  }
  .profile-image {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    border-radius: 128px;
  }
  .setting {
    position: relative;
    left: 55px;
    cursor: pointer;
  }

  .set-button {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;
