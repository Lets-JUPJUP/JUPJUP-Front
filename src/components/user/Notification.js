import React from "react";
import styled from "styled-components";
import alarm_comment from "../../assets/user/alarm/alarm_comment.png";
import alarm_plogging from "../../assets/user/alarm/alarm_plogging.png";
import { useNavigate } from "react-router-dom";
import { notificationPostReadEach } from "../../api/notification";
const Notification = ({ type, content, postId, isRead, id }) => {
  let icon = "";
  let title = "";

  const navigate = useNavigate();

  const handleClick = () => {
    try {
      notificationPostReadEach(id);
    } catch (err) {
      alert("알림 읽음 처리 오류");
    }
    navigate(`/plogging-detail/${postId}`);
  };

  if (type === "COMMENT") {
    //댓글
    icon = alarm_comment;
    title = "새로운 댓글이 달렸어요";
  } else if (type === "REPLY") {
    //대댓글
    icon = alarm_comment;
    title = "새로운 대댓글이 달렸어요";
  } else if (type === "PLOGGING") {
    // 모집/참가 성공
    icon = alarm_plogging;
    title = "플로깅 성사 여부를 확인하세요";
  }

  return (
    <Wrapper $isRead={isRead} onClick={handleClick}>
      <img className="icon" src={icon} alt="" />
      <div className="container">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
      </div>
    </Wrapper>
  );
};

export default Notification;
const Wrapper = styled.div`
  display: flex;
  width: 342px;
  height: 44px;
  padding: 8px;
  flex-direction: row;

  gap: 8px;
  border-radius: 8px;
  //읽음 여부에 따른 배경색 설정
  background: ${(props) => (props.$isRead ? "#E8E8E8" : "#f3efff")};

  .icon {
    width: 16px;
    height: 16px;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .title {
    font-size: 12px;
    font-weight: 600;
  }
  .content {
    font-weight: 400;
  }
`;
