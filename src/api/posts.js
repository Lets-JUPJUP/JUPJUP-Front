import client from "./client";

export const postsCreatePlogging = async (inputs) => {
  try {
    console.log(inputs);
    const res = await client.post("api/v1/posts", inputs);

    console.log(res);
    // return res;
  } catch (err) {
    console.log(err);
  }
};
