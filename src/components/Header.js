import React from "react";
import { styled } from "styled-components";
import logo from "../assets/login/logo.png";
const Header = ({ title }) => {
  return (
    <Wrapper>
      <img className="logo" src={logo} alt="Let's JUPJUP" />
      <div className="title">{title}</div>
    </Wrapper>
  );
};

export default Header;
const Wrapper = styled.div`
  display: flex;
  align-items: end;
  .logo {
    margin-left: 24px;
    width: 151.386px;
    height: 48px;
    flex-shrink: 0;
  }

  .title {
    margin-left: 8px;
  }
`;
