import client from "./client";

export const postHeart = async (id) => {
  try {
    const res = await client.post(`/api/v1/hearts/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};

//좋아요 취소
export const deleteHeart = async (id) => {
  try {
    const res = await client.delete(`/api/v1/hearts/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};

// 관심 있는 게시글 모아보기
export const getInterestPosts = async () => {
  try {
    const res = await client.get(`/api/v1/hearts/lists`);
    return res.data.data;
  } catch (err) {
    throw err;
  }
};
