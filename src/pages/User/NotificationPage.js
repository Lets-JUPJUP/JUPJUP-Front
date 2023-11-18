import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import Notification from "../../components/user/Notification";
import AdBanner from "../../components/common/AdBanner";
import {
  notificationGetNotiList,
  notificationPostReadEntire,
} from "../../api/notification";

//할거
//데이터 받아와서 화면에 연결 (타입 키값 읽기)
//알림목록 get 오류
//네비게이션

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const getData = async () => {
    const data = await notificationGetNotiList(0, 10);
    data && setNotifications(data.notificationResDtos);

    notificationPostReadEntire();
  };
  useEffect(() => {
    getData();
  }, []);
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
