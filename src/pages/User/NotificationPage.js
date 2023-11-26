import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import Notification from "../../components/user/Notification";
import AdBanner from "../../components/common/AdBanner";
import {
  notificationGetNotiList,
  notificationPostReadEntire,
} from "../../api/notification";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const getData = async () => {
    try {
      const data = (await notificationGetNotiList()).data.data;

      data && setNotifications(data);
    } catch (err) {
      alert("알림 조회 오류");
    }
  };

  const handleReadAll = async () => {
    try {
      const res = await notificationPostReadEntire();
      if (res.status == 200) {
        alert("모든 알림을 읽음 처리했습니다.");
      }
    } catch (err) {
      console.log(err);
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
          {notifications.length ? (
            <div className="read-all" onClick={handleReadAll}>
              전체 읽음으로 처리하기
            </div>
          ) : (
            <>알림이 없습니다.</>
          )}
          {notifications.map((el) => {
            return (
              <Notification
                key={el.id}
                type={el.notificationType}
                content={el.content}
                postId={el.contentId}
                isRead={el.isRead}
                id={el.id}
              />
            );
          })}
        </div>
      </Wrapper>
      <div style={{ height: 100 + "px" }}></div>
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
  .read-all {
    align-self: flex-end;
    border-radius: 4px;
    background: var(--midgrey, #7e7e7e);
    display: inline-flex;
    padding: 8px 12px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;

    color: var(--white, #fff);

    /* semibold16pt */
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }

  .alarms {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
