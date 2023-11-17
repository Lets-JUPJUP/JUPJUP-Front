import client from "./client";

//특정 사용자의 탑 3 리뷰 조회
export const reviewsGetTop3Reviews = async (memberId) => {
  return await client.get(`api/v1/reviews/top3/${memberId}`);
};

//리뷰 작성
export const reviewsPostReview = async (memberId, postId, badgeList) => {
  try {
    const res = await client.post(`api/v1/reviews`, {
      memberId: memberId,
      postId: postId,
      badgeList: badgeList,
    });

    return res.status;
  } catch (err) {
    alert(err.response.data.message);
  }
};
