import React from "react";
import { styled } from "styled-components";
import background2 from "../../assets/login/background2.png";
import edit from "../../assets/login/edit.png";
import tag from "../../assets/login/tag.png";

import Header from "../../components/common/Header";
const LoginSettingsPage = () => {
  return (
    <Wrapper>
      <Header title={"ooo님, 반가워요!"} />

      <Mid>
        <div className="profile">
          <img className="profile-image" src="" alt="profile" />
        </div>
        <div className="name">
          <div className="name-value">사용자 이름</div>
          <div>
            <img className="name-button" src={edit} alt="수정하기" />
          </div>
        </div>
        <div className="line" />
        <div className="error-message">사용할 수 없는 이름입니다!</div>
        <div className="tags">
          <div className="tag">
            <img src={tag} className="tag-icon" alt="연령" />
            20대
          </div>
          <div className="tag">
            <img src={tag} className="tag-icon" alt="성별" />
            여성
          </div>
        </div>
      </Mid>

      <Bottom>
        <div className="start-msg">
          레츠줍줍과 함께
          <br />더 깨끗하고 활기찬 성동구를 만들어봐요!
        </div>
        <div className="start-button">좋아요!</div>
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
  .name {
    margin-top: 40px;
    display: flex;

    .name-button {
      margin-left: 9px;
      margin-top: 2px;
      width: 16px;
      height: 20px;
      flex-shrink: 0;
    }

    .name-value {
      color: black;
    }
  }
  .line {
    margin-top: 4px;
    width: 128px;
    height: 2px;
    background: #290886;
  }

  .error-message {
    margin-top: 8px;
    color: #f00;
    text-align: center;

    font-size: 12px;
    font-weight: 400;
    line-height: 18px; /* 150% */
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
