import client from "./client";

export const reportPostUserReport = async (inputs) => {
  return await client.post("/api/v1/reports", inputs);
};
