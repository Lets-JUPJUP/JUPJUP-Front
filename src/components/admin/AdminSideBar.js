import React from "react";
import { styled } from "styled-components";

import logo from "../../assets/admin/logo_white.png";

// 관리자 페이지 사이드 바
const AdminSideBar = () => {
  return (
    <Wrapper>
      <img src={logo} alt="logo" />
      <MenuSection>
        <Text>공식행사 관리</Text>
        <div className="menuBlock">
          <Text className="menuTitle">사용자 관리</Text>
          <SubText>사용자 전체 조회</SubText>
          <SubText>문의/신고내역 조회</SubText>
        </div>
        <Text>쓰레기통 관리</Text>
      </MenuSection>
    </Wrapper>
  );
};

export default AdminSideBar;

const Wrapper = styled.div`
  width: 22%;
  height: 100vh;
  background: var(--main, "#410FD4");
  color: var(--white, #fff);

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 60%;
    /* margin: 70px 0; */
    margin-top: 50px;
    margin-bottom: 70px;
  }
`;

const MenuSection = styled.div`
  width: 60%;
  text-align: end;

  display: flex;
  flex-direction: column;
  gap: 24px;

  .menuBlock {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 600;

  cursor: pointer;

  &.menuTitle {
    margin-bottom: 6px;
  }
`;

const SubText = styled.div`
  font-size: 16px;
  color: var(--grey2, #cdcdcd);

  cursor: pointer;
`;
