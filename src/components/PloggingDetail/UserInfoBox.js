import React from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

import ic_userbig from "../../assets/common/ic_userbig.png";
import Tag from "../common/Tag";

/* 보낼 props 목록
isMine : 본인 정보일 경우 true - 배경색 x
name : 사용자 이름
tag1 : 태그1 (나이대)
tag2 : 태그2 (성별)
userId : 유저 아이디
*/

const UserInfoBox = ({
  isMine = false,
  profileImageUrl,
  name,
  tag1,
  tag2,
  userId,
}) => {
  const navigate = useNavigate();

  // 프로필 페이지로 이동
  const handleProfile = () => {
    navigate(`/user-profile/${userId}`);
  };

  return (
    <Wrapper className={isMine === true ? "" : "greyColor"}>
      <div className="section">
        <img
          src={profileImageUrl ? profileImageUrl : ic_userbig}
          alt="user"
          className="user"
          onClick={handleProfile}
        />
        <div className="userName">{name}</div>
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
    height: 40px;
    border-radius: 40px;
  }

  .section {
    display: flex;
    align-items: center;
    gap: 8px;

    .userName {
      // 최대 넓이 초과 시 말줄임표
      max-width: 150px;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
  }
`;
