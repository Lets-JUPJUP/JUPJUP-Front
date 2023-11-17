import axios from "axios";

export const notificationSubscribeSSE = async (accessToken) => {
  //토큰 로컬스토리지 set 후 새로고침 전에 구독 요청을 하므로 토큰 props로 받아서 사용
  const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN;

  try {
    const res = await axios.get(
      `${SERVER_DOMAIN}/api/v1/notifications/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(res);
    return res;
  } catch (err) {
    alert("SSE 구독 요청 오류");
  }
};
