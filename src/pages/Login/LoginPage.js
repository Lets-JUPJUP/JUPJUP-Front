import React from "react";
import { styled } from "styled-components";
import background from "../../assets/login/background.png";
import logo from "../../assets/login/logo.png";
import kakao from "../../assets/login/kakao.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handlekakaoLogin = () => {
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN;
    const KAKAO_AUTH_URL = `${SERVER_DOMAIN}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;

    //window.open(KAKAO_AUTH_URL);
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <Wrapper>
      <img className="logo" src={logo} alt="Let's JUPJUP" />
      <div className="login-button" onClick={handlekakaoLogin}>
        <img src={kakao} className="kakao-icon" alt="" />
        카카오 로그인
      </div>
      <img className="background" src={background} alt="" />
    </Wrapper>
  );
};

export default LoginPage;
const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    margin-top: 25vh;
    width: 250px;
    flex-shrink: 0;
  }

  .login-button {
    cursor: pointer;
    z-index: 1;
    position: absolute;
    bottom: 18%;
    width: 300px;
    height: 44px;
    flex-shrink: 0;
    border-radius: 8px;
    background: #fee500;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #000;
    font-family: AppleSDGothicNeoM00;
    font-size: 14px;
    font-weight: 400;

    .kakao-icon {
      position: relative;
      left: -79px;
      width: 18px;
      height: 16.622px;
      flex-shrink: 0;
    }
  }

  .background {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 407.914px;
    flex-shrink: 0;
  }
`;
