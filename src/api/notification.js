import { client } from "./client";

//알림 조회
export const notificationGetNotiList = async () => {
  return client.get(`api/v1/notifications/list`);
};

//전체 알림 읽음 처리
export const notificationPostReadEntire = async () => {
  return client.post(`api/v1/notifications/read/list`);
};

//단일 알림 읽음 차리
export const notificationPostReadEach = async (id) => {
  return client.post(`api/v1/notifications/read/${id}`);
};
