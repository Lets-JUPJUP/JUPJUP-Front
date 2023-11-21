import { client } from "./client";

// 플로깅 참여하기
export const postPloggingJoin = async (id) => {
  try {
    const res = await client.post(`/api/v1/posts/${id}/join`);
    return res;
  } catch (err) {
    throw err;
  }
};

// 플로깅 참여한 멤버 조회하기
export const getPostsJoinMembers = async (id) => {
  try {
    const res = await client.get(`/api/v1/posts/${id}/members`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
