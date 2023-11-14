import React from "react";
import { styled } from "styled-components";

import ic_userbig from "../../assets/common/ic_userbig.png";
import Tag from "../common/Tag";

/* 보낼 props 목록
isMine : 본인 정보일 경우 true - 배경색 x
name : 사용자 이름
tag1 : 태그1 (나이대)
tag2 : 태그2 (성별)
*/

const UserInfoBox = ({ isMine, name, tag1, tag2 }) => {
  return (
    <Wrapper className={isMine === true ? "" : "greyColor"}>
      <div className="section">
        <img src={ic_userbig} alt="user" className="user" />
        <div>{name}</div>
      </div>

      <div className="section">
        <Tag name={tag1} />
        <Tag name={tag2} />
      </div>
    </Wrapper>
  );
};

export default UserInfoBox;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 90%;

  box-sizing: border-box;
  padding: 8px;

  font-size: 16px;
  font-weight: 600;

  border-radius: 8px;

  &.greyColor {
    background: var(--grey, #e8e8e8);
  }

  .user {
    width: 40px;
  }

  .section {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
