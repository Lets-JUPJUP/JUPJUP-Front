import { client } from "./client";

export const postsCreatePlogging = async (inputs) => {
  return client.post("api/v1/posts", inputs);
};

//나의 참여횟수 & 전체 참여횟수 get
export const postsGetMyCount = async () => {
  return client.get("api/v1/posts/counts");
};

//특정 사용자의 참여횟수 & 주최횟수
export const postsGetUserCount = async (id) => {
  return client.get(`api/v1/posts/${id}/counts`);
};

// 플로깅 모집글 리스트 모아보기 - 로그인 안된 상태
export const getPostsListUnAuth = async (keyword, value) => {
  try {
    // 필터링이 있으면
    let res;
    if (keyword === "age") {
      res = await client.get(
        `/api/v1/posts/listByAgeRange/unauth?postAgeRangeStr=any`
      );
    } else if (keyword === "gender") {
      res = await client.get(
        `/api/v1/posts/listByGender/unauth?postGender=${value}`
      );
    } else if (keyword === "withPet") {
      res = await client.get(`/api/v1/posts/listByPet/unauth?withPet=true`);
    } else {
      // 필터링 없으면
      res = await client.get(`/api/v1/posts/list/unauth`);
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 플로깅 모집글 리스트 모아보기 - 로그인된 상태
export const getPostsList = async (keyword, value) => {
  try {
    // 필터링이 있으면
    let res;
    if (keyword === "age") {
      res = await client.get(
        `/api/v1/posts/listByAgeRange?postAgeRangeStr=any`
      );
    } else if (keyword === "gender") {
      res = await client.get(`/api/v1/posts/listByGender?postGender=${value}`);
    } else if (keyword === "withPet") {
      res = await client.get(`/api/v1/posts/listByPet?withPet=true`);
    } else {
      // 필터링 없으면
      res = await client.get(`api/v1/posts/list`);
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 플로깅 모집글 상세보기
export const getPostsDetail = async (id) => {
  try {
    const res = await client.get(`/api/v1/posts/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 플로깅 모집글 삭제하기
export const deletePloggingPosts = async (id) => {
  try {
    const res = await client.delete(`/api/v1/posts/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};

// 사용자가 주최한 게시글 리스트 조회
export const getHostedPosts = async () => {
  try {
    const res = await client.get(`/api/v1/posts/hosted`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 사용자가 참여한 게시글 리스트 조회
export const getJoinedPosts = async () => {
  try {
    const res = await client.get(`/api/v1/posts/joined`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
