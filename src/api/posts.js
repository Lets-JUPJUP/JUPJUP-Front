import client from "./client";

export const postsCreatePlogging = async (inputs) => {
  try {
    console.log(inputs);
    const res = await client.post("api/v1/posts", inputs);

    return res.status;
  } catch (err) {
    alert("글 작성 오류");
  }
};
