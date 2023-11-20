import axios from "axios";
import { memberGetNewToken } from "./member";
import { getCookie, setCookie } from "../config/cookie";

const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN;

export const client = axios.create();

client.defaults.baseURL = `${SERVER_DOMAIN}/`;
client.defaults.withCredentials = true;

const token = localStorage.getItem("juptoken"); // access token

client.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;

//엑세스 토큰 재발급을 위한 refreshClient 생성
export const refreshClient = axios.create();

refreshClient.defaults.baseURL = `${SERVER_DOMAIN}/`;
refreshClient.defaults.withCredentials = true;

setCookie();
const refreshToken = getCookie("refreshToken");

refreshClient.defaults.headers.common["Cookie"] = refreshToken; //쿠키열기

// client의 api 콜을 인터셉트
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 기존에 수행하려고 했던 API 설정정보
    const originalConfig = error.config;
    // 기존의 refreshToken
    //토큰 만료일때
    if (error.response.data.status === "UNAUTHORIZED") {
      try {
        console.log("tleh");
        // 토큰 재발급
        const res = await memberGetNewToken();

        if (res.status === 200) {
          //로컬스토리지 저장 후 새로고침
          localStorage.setItem("juptoken", res.data.data.accessToken);
          window.location.replace();

          //client의 api 콜 헤더에 재발급 받은 token 넣기
          originalConfig.headers["Authorization"] = res.data.data.accessToken;
          //실행하던 api 이어서 실행
          refreshClient(originalConfig);
        }
      } catch (err) {
        // 토큰 재발급 실패할 경우 (refreshToken 만료)
        alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
        //만료된 토큰 제거
        localStorage.removeItem("juptoken");

        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);
