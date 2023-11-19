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
    try {
      const data = (await notificationGetNotiList(0, 10)).data.data
        .notificationResDtos;

      data && setNotifications(data);
    } catch (err) {
      alert("알림 조회 오류");
    }

    try {
      notificationPostReadEntire();
    } catch (err) {
      alert("알림 읽음 처리 오류");
    }
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
          {notifications.map((el) => {
            return (
              <Notification
                type={el.notificationType}
                content={el.content}
                postId={el.postId}
              />
            );
          })}

          <Notification
            type={"PLOGGING"}
            content={"신청한 어쩌고 저쩌고"}
            postId={1}
          />
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
