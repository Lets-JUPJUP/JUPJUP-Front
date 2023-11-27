import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

import ic_star_default from "../../assets/common/ic_star_default.png";
import ic_star_clicked from "../../assets/common/ic_star_clicked.png";

import { countDDay } from "../common/time";
import { deleteHeart, postHeart } from "../../api/heart";

// isJoined === pageData로 받아온 참여하기 값,
// isPlogjoined, setIsPlogJoined는 참여하기 토글
const JoinFooter = ({
  bsOpen,
  setBsOpen,
  setModalOpen,
  setCancelModalOpen,
  curMemberNum,
  maxMember,
  dueDate,
  isHearted,
  isJoined,
  isPlogJoined,
  setIsPlogJoined,
  postId,
}) => {
  // 찜하기(★) 여부
  const [isStarClicked, setIsStarClicked] = useState(false);

  useEffect(() => {
    // 찜하기 초기 상태 설정
    setIsStarClicked(isHearted);
  }, [isHearted]);

  // 찜하기(★) 클릭 시 실행되는 함수
  const onStarClick = async () => {
    isStarClicked === true
      ? await deleteHeart(postId)
      : await postHeart(postId);
    setIsStarClicked(!isStarClicked);
  };

  useEffect(() => {
    // 참여하기 초기 상태 설정
    setIsPlogJoined(isJoined);
  }, [isJoined]);

  // 00 / 00 참여 중 클릭 시 실행되는 함수
  const openParticipantList = () => {
    setBsOpen(true);
  };

  // 참여 모달 띄우기
  const openJoinModal = () => {
    setModalOpen(true);
  };

  // 참여 취소 모달 띄우기
  const openCancelModal = () => {
    setCancelModalOpen(true);
  };

  return (
    <Wrapper>
      <div className="main">
        <BigBoldText>{countDDay(dueDate)}</BigBoldText>
        <div className="right">
          <img
            src={isStarClicked === true ? ic_star_clicked : ic_star_default}
            alt="star"
            onClick={onStarClick}
          />
          {countDDay(dueDate) === "모집 마감" ? (
            <JoinFinishButton>참여마감</JoinFinishButton>
          ) : isPlogJoined === true ? (
            <JoinAlreadyButton onClick={openCancelModal}>
              참여중
            </JoinAlreadyButton>
          ) : (
            <JoinButton onClick={openJoinModal}>참여하기</JoinButton>
          )}
        </div>
      </div>
      <div>
        <span
          className="participant"
          onClick={openParticipantList}
          style={{ visibility: bsOpen === true ? "hidden" : "visible" }}
        >
          {/* 플로깅 멤버는 본인 포함이므로 현재 멤버에 +1 */}
          {curMemberNum + 1} / {maxMember} 참여중 &gt;
        </span>
      </div>
    </Wrapper>
  );
};

export default JoinFooter;

const Wrapper = styled.div`
  width: 100%;
  height: 88px;

  color: var(--white, "#fff");
  background: var(--main, #410fd4);

  box-sizing: border-box;
  padding: 0 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: fixed;
  bottom: 0;

  z-index: 10;

  .main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      width: 23px;
      cursor: pointer;
    }
  }

  .participant {
    font-weight: 600;
    cursor: pointer;
  }
`;

const JoinButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background: var(--sub, #beef62);

  color: var(--main, #410fd4);
  font-size: 16px;
  font-weight: 600;

  border: 0px;
`;

const JoinAlreadyButton = styled(JoinButton)`
  background: var(--white, #fff);
`;

const JoinFinishButton = styled(JoinButton)`
  background: var(--midgrey, #7e7e7e);
`;

// 글씨 종류
const BigBoldText = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
