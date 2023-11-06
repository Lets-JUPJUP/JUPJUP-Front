import React from "react";
import styled from "styled-components";
import alarm_0 from "../../assets/user/alarm/alarm_0.png";
import alarm_1 from "../../assets/user/alarm/alarm_1.png";
import alarm_2 from "../../assets/user/alarm/alarm_2.png";
const Alarm = ({ type, title, content }) => {
  let icon = "";

  if (type === 0) {
    icon = alarm_0;
  } else if (type === 1) {
    icon = alarm_1;
  } else if (type === 2) {
    icon = alarm_2;
  }

  return (
    <Wrapper>
      <img className="icon" src={icon} alt="" />
      <div className="container">
        <div className="title">알림 제목</div>
        <div className="content">알림 내용</div>
      </div>
    </Wrapper>
  );
};

export default Alarm;
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
`;
