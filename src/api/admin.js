import { adminClient } from "./client";

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
