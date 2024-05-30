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

// 모집글에 대댓글 작성하기
export const postPloggingReplyComment = async (postId, comment, parentId) => {
  try {
    const res = await client.post(`/api/v1/comments/reply/${postId}`, {
      parentId: parentId,
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

// 모집글에 댓글 삭제하기
export const deletePloggingComment = async (commentId) => {
  try {
    const res = await client.delete(`/api/v1/comments/${commentId}`);
    return res;
  } catch (err) {
    throw err;
  }
};

// 모집글에 대댓글 삭제하기
export const deletePloggingReplyComment = async (replyId) => {
  try {
    const res = await client.delete(`/api/v1/comments/reply/${replyId}`);
    return res;
  } catch (err) {
    throw err;
  }
};