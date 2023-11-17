import client from "./client";

export const postsCreatePlogging = async (inputs) => {
  return client.post("api/v1/posts", inputs);
};

//나의 참여횟수 & 전체 참여횟수 get
export const postsGetMyCount = async () => {
  return client.get("api/v1/posts/counts");
};

//특정 사용자의 참여횟수 & 주최횟수
export const postsGetUserCount = async (id) => {
  return client.get(`api/v1/posts/${id}/counts`);
};
