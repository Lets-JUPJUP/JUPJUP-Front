import axios from "axios";
import { memberGetNewToken } from "./member";

const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN;

export const client = axios.create();

client.defaults.baseURL = `${SERVER_DOMAIN}/`;
client.defaults.withCredentials = true;

const token = localStorage.getItem("juptoken"); // access token

client.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;

//엑세스 토큰 재발급을 위한 refreshClient 생성
export const tempClient = axios.create();

tempClient.defaults.baseURL = `${SERVER_DOMAIN}/`;
tempClient.defaults.withCredentials = true;

// client의 api 콜을 인터셉트
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    //기존에 수행하려고 했던 API 설정 정보
    const originalConfig = error.config;

    //토큰 만료일때
    if (error.response.data.status === "UNAUTHORIZED") {
      try {
        // 토큰 재발급
        console.log("ddd");
        const res = await memberGetNewToken();

        if (res.status === 200) {
          //로컬스토리지 저장 후 새로고침
          localStorage.setItem("juptoken", res.data.data.accessToken);
          window.location.reload();

          //client의 api 콜 헤더에 재발급 받은 token 넣기
          originalConfig.headers[
            "Authorization"
          ] = `Bearer ${res.data.data.accessToken}`;
          //실행하던 api 이어서 실행
          return tempClient(originalConfig);
        }
      } catch (err) {
        // 토큰 재발급 실패할 경우 (refreshToken 만료)
        console.log(err);
        alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
        //만료된 토큰 제거
        localStorage.removeItem("juptoken");

        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);
