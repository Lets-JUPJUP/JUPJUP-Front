import client from "./client";

// 작성한 댓글의 게시글 조회
export const getCommentedPosts = async () => {
  try {
    const res = await client.get(`/api/v1/comments/commented-posts`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
