import React from "react";
import styled from "styled-components";
import alarm_0 from "../../assets/user/alarm/alarm_0.png";
import alarm_1 from "../../assets/user/alarm/alarm_1.png";
import alarm_2 from "../../assets/user/alarm/alarm_2.png";
import { useNavigate } from "react-router-dom";
const Notification = ({ type, content, postId }) => {
  let icon = "";
  let title = "";

  const navigate = useNavigate();

  if (type === "COMMENT") {
    //댓글
    icon = alarm_0;
    title = "새로운 댓글이 달렸어요";
  } else if (type === "REPLY") {
    //대댓글
    icon = alarm_1;
    title = "새로운 대댓글이 달렸어요";
  } else if (type === "PLOGGING") {
    // 모집/참가 성공
    icon = alarm_2;
    title = "플로깅 성사 여부를 확인하세요";
  }

  return (
    <Wrapper
      onClick={() => {
        navigate(`/plogging-detail/${postId}`);
      }}
    >
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
  background: var(--light, #f3efff);

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
