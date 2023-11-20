import axios from "axios";
import client from "./client";

const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN;

//sse 구독요청
export const notificationSubscribeSSE = async (accessToken) => {
  //토큰 로컬스토리지 set 후 새로고침 전에 구독 요청을 하므로 토큰 props로 받아서 사용

  return axios.get(`${SERVER_DOMAIN}/api/v1/notifications/subscribe`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

//알림 조회
export const notificationGetNotiList = async (page, size) => {
  return client.get(`api/v1/notifications/list?page=${page}&size=${size}`);
};

//전체 알림 읽음 처리
export const notificationPostReadEntire = async () => {
  return client.post(`api/v1/notifications/read/list`);
};

//단일 알림 읽음 차리
export const notificationPostReadEach = async (id) => {
  return client.post(`api/v1/notifications/read/${id}`);
};
