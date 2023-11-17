import client from "./client";

export const eventGetEventList = async () => {
  const res = await client.get("api/v1/eventInfos/lists");

  return res.data.data;
};
