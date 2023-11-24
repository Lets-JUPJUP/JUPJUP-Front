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
