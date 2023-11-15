import React from "react";
import { styled } from "styled-components";
import UserInfoBox from "./UserInfoBox";

// 플로깅 상세 페이지 사용자 목록
const UserBottomSheet = () => {
  return (
    <Wrapper>
      <div className="title">이 플로깅의 참여자</div>
      <div className="peopleNum">(00 / 00)</div>

      <UserInfoBox isMine={true} name="사용자 이름" tag1="20대" tag2="여성" />
      <DivisionLine />
      <div className="participant">
        <UserInfoBox name="사용자 이름" tag1="20대" tag2="여성" />
        <UserInfoBox name="사용자 이름" tag1="30대" tag2="여성" />
        <UserInfoBox name="사용자 이름" tag1="40대" tag2="남성" />
        <UserInfoBox name="사용자 이름" tag1="20대" tag2="남성" />
      </div>
    </Wrapper>
  );
};

export default UserBottomSheet;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 88px; // JoinFooter 높이

  font-size: 16px;
  font-weight: 600;

  .title {
    margin-top: 20px;
  }

  .peopleNum {
    margin-top: 4px;
    margin-bottom: 8px;
  }

  .participant {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 8px;
    margin: 8px 0;

    width: 100%;
  }
`;

const DivisionLine = styled.div`
  width: 95%;
  height: 1.2px;
  background: var(--main, "#410FD4");
`;
