import React from "react";
import { styled } from "styled-components";
import ic_settings from "../../assets/common/ic_settings.png";

// 사용자 이미지, 정보 수정 컴포넌트
// writeMode를 true로 설정해야 수정 가능
// false일 경우 수정 페이지로 이동
const UpdateProfile = ({ writeMode }) => {
  return (
    <Wrapper>
      <div className="updateProfile">
        <ProfileImage />
        <img src={ic_settings} alt="settings" />
      </div>
    </Wrapper>
  );
};

export default UpdateProfile;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .updateProfile {
    position: relative;
    img {
      width: 16px;
      position: absolute;
      top: 0;
      right: 0;

      cursor: pointer;
    }
  }
`;

const ProfileImage = styled.div`
  width: 128px;
  height: 128px;

  border-radius: 128px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  background-position: center;
`;
