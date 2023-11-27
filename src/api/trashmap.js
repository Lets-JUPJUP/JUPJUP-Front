import { async } from "q";
import { client } from "./client";

// 반경 내 쓰레기통 조회
export const getTrashCanInRadius = async (mapX, mapY) => {
  try {
    const res = await client.get(`/api/v1/trashCans?mapX=${mapX}&mapY=${mapY}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 피드백 보내기
export const postTrashCanFeedback = async (trashCanId, feedbackCode) => {
  try {
    const res = await client.post(`/api/v1/trashCans/feedbacks`, {
      trashCanId: trashCanId, // 쓰레기통 id
      feedbackCode: feedbackCode,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

// 피드백 조회
export const getTrashCanFeedback = async () => {
  try {
    const res = await client.get(`/api/v1/trashCans/feedbacks`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
