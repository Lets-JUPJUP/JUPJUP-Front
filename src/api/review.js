import client from "./client";

export const reviewsGetTop3Reviews = async (memberId) => {
  try {
    const res = await client.get(`/api/v1/reviews/top3/${memberId}`);

    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};
