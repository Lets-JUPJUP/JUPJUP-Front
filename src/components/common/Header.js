import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import logo from "../../assets/common/logo.png";
import alarm from "../../assets/common/alarm.png";
import new_notification from "../../assets/common/new_notification.png";
import user from "../../assets/common/user.png";
import GradientLine from "./GradientLine";
import { useNavigate } from "react-router-dom";

import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { notificationGetUnreadCount } from "../../api/notification";

const Header = ({
  title,
  isDetailPage = false,
  title2 = false,
  link = false,
}) => {
  const toHome = () => {
    window.location.href = "/";
  };

  const toLink = () => {
    window.location.href = `${link}`;
  };

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("juptoken");
  const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN;

  //sse 구독, 실시간 메세지 받기
  const EventSource = EventSourcePolyfill || NativeEventSource;

  const [isNewNoti, setIsNewNoti] = useState(false);

  const getCount = async () => {
    try {
      const res = (await notificationGetUnreadCount()).data.data;
      if (!res.includes("0")) {
        setIsNewNoti(true);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCount();

    if (accessToken) {
      let eventSource;
      const fetchSse = async () => {
        console.log("구독");
        try {
          eventSource = new EventSource(
            `${SERVER_DOMAIN}/api/v1/notifications/subscribe`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              withCredentials: true,
            }
          );

          /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
          eventSource.onmessage = async (event) => {
            //data:{"id":3,"content":"신청한 플로깅 모임이 인원을 충족하여 성사되었습니다.","contentId":2,"isRead":false,"notificationType":"FLOGGING","time":"2023-11-16T23:19:16.552449"}

            const res = await event.data;
            console.log(res);
            if (!res.includes("EventStream Created.")) {
              setIsNewNoti(true); // 헤더 알림 아이콘 상태 변경
            }
          };

          /* EVENTSOURCE ONERROR ------------------------------------------------------ */
          eventSource.onerror = async (event) => {
            if (!event.error.message.includes("No activity"))
              eventSource.close();
          };
        } catch (error) {
          console.log(error);
        }
      };
      fetchSse();
      return () => eventSource.close();
    }
  }, []);

  return (
    <>
      <Wrapper>
        {isDetailPage === true ? (
          <div className="detailTitle">{title}</div>
        ) : (
          <div className="left">
            <img
              className="logo"
              src={logo}
              alt="Let's JUPJUP"
              onClick={toHome}
            />
            <div className="title">{title}</div>
            {title2 && link && (
              <div className="title2" onClick={toLink}>
                {title2}
              </div>
            )}
          </div>
        )}

        <div className="btns">
          {isNewNoti ? (
            <div
              className="btn"
              onClick={() => {
                navigate("/notifications");
              }}
            >
              <img src={new_notification} alt="알림모음으로" />
            </div>
          ) : (
            <div
              className="btn"
              onClick={() => {
                navigate("/notifications");
              }}
            >
              <img src={alarm} alt="알림모음으로" />
            </div>
          )}
          <div
            className="btn"
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <img src={user} alt="마이페이지로" />
          </div>
        </div>
      </Wrapper>

      {isDetailPage === true ? <GradientLine /> : null}
    </>
  );
};

export default Header;

const Wrapper = styled.div`
  width: 100%;
  /* height: 57px; */
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--white, #fff);
  /* margin-bottom: 10px; */
  padding-bottom: 10px;

  .left {
    height: 48px;
    display: flex;
    align-items: start;

    .logo {
      margin-left: 24px;
      width: 151.386px;
      height: 48px;
      flex-shrink: 0;
      cursor: pointer;
    }

    .title {
      align-self: flex-end;
      margin-left: 8px;
      font-size: 16px;
      font-weight: 600;
    }

    .title2 {
      align-self: flex-end;
      margin-left: 8px;
      font-size: 16px;
      font-weight: 600;

      color: var(--grey, #e8e8e8);
    }
  }

  .detailTitle {
    font-size: 16px;
    font-weight: 600;
    margin-left: 24px;
  }

  .btns {
    /* margin-top: 9px; */
    display: flex;
    flex-direction: column;
    height: 48px;
    justify-content: space-between;

    margin-right: 16px;
    .btn {
      width: 20px;
      height: 20px;
      display: flex;

      img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
`;
