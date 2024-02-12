import { adminClient } from "./client";
import { client } from "./client";

// 공식 행사 정보 리스트 조회
export const adminGetEvents = async () => {
  return adminClient.get(`/api/v1/admins/eventInfos/lists`);
};

// 공식 행사 정보 게시글 작성
export const adminPostEvent = async (inputs) => {
  return adminClient.post(`/api/v1/admins/eventInfos`, inputs);
};

// 공식 행사 정보 게시글 삭제
export const adminDeleteEvent = async (eventId) => {
  return adminClient.delete(`/api/v1/admins/eventInfos/${eventId}`);
};

//신고 내역 조회
export const adminGetReports = async () => {
  return adminClient.get("api/v1/admins/reports");
};

//유저 전체 조회
export const adminGetUsers = async () => {
  return adminClient.get("api/v1/admins/members/list");
};

//유저 강제 탈퇴
export const adminDeleteUser = async (memberId) => {
  return adminClient.delete(`api/v1/admins/members/${memberId}`);
};

// 전체 쓰레기통 피드백 조회
export const adminGetTrashCanLists = async (pageNo) => {
  return adminClient.get(`api/v1/admins/trashCans/list?pageNo=${pageNo}`);
};

// 특정 쓰레기통 피드백 조회
export const adminGetTrashCanFeedbacks = async (trashCanId) => {
  return adminClient.get(`api/v1/admins/trashCans/${trashCanId}`);
};
