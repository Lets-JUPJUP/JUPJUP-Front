import { client } from "./client";

export const eventGetEventList = async () => {
  return client.get("api/v1/eventInfos/lists");
};

export const eventGetEventDetail = async (id) => {
  return client.get(`api/v1/eventInfos/${id}`);
};
