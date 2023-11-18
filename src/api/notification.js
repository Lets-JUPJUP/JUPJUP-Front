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
  try {
    const res = await client.get(
      `api/v1/notifications?page=${page}&size=${size}`
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    alert("알림 조회 오류");
  }
};

//전체 알림 읽음 처리
export const notificationPostReadEntire = async () => {
  try {
    const res = await client.post(`api/v1/notifications/read/list`);

    console.log(res);
    return res;
  } catch (err) {
    alert("알림 읽음 처리 오류");
  }
};
