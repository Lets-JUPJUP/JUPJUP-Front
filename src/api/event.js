import { client } from "./client";

//공식행사 전체 리스트 조회
export const eventGetEventList = async () => {
  return client.get("api/v1/eventInfos/lists");
};

//공식행사 하나 상세 조회
export const eventGetEventDetail = async (id) => {
  return client.get(`api/v1/eventInfos/${id}`);
};

//공식행사 관심있어요 인원 수 조회
export const eventGetJoinCount = async (id) => {
  return client.get(`api/v1/eventinfos/${id}/count`);
};

//공식행사 관심있어요 post (url eventinfos 소문자 주의)
export const eventPostJoin = async (id) => {
  return client.post(`api/v1/eventinfos/${id}/join`);
};

//공식행사 관심있어요 취소 (url eventinfos 소문자 주의)
export const eventDeleteJoin = async (id) => {
  return client.delete(`api/v1/eventinfos/${id}/join`);
};
