import client from "./client";

export const postsCreatePlogging = async (inputs) => {
  return client.post("api/v1/posts", inputs);
};

//나의 참여횟수 & 전체 참여횟수 get
export const postsGetMyCount = async () => {
  try {
    const res = await client.get("api/v1/posts/counts");

    return res.data.data;
  } catch (err) {
    alert("history 조회 오류");
  }
};
