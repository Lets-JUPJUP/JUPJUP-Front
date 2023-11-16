import React from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import Notification from "../../components/user/Notification";
import AdBanner from "../../components/common/AdBanner";

const NotificationPage = () => {
  return (
    <>
      <Header title={"알림"} isLogin={true} />
      <Wrapper>
        <div className="gradient" />
        <div className="alarms">
          <Notification type={0} title={""} content={""} />
          <Notification type={1} title={""} content={""} />
          <Notification type={2} title={""} content={""} />
        </div>
      </Wrapper>

      <AdBanner />
    </>
  );
};

export default NotificationPage;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .gradient {
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background: linear-gradient(
      180deg,
      #f3efff 0%,
      rgba(243, 239, 255, 0) 100%
    );
  }

  .alarms {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
