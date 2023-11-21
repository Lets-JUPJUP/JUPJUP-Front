import { client } from "./client";

// 모집글에 댓글 작성하기
export const postPloggingComment = async (postId, comment) => {
  try {
    const res = await client.post(`/api/v1/comments/${postId}`, {
      content: comment,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

// 모집글에 댓글 조회하기
export const getCommentsByPost = async (id) => {
  try {
    const res = await client.get(`/api/v1/comments/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 작성한 댓글의 게시글 조회
export const getCommentedPosts = async () => {
  try {
    const res = await client.get(`/api/v1/comments/commented-posts`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
