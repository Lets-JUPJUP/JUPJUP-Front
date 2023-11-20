import { Cookies } from "react-cookie";

const cookies = new Cookies();

//쿠키에서 가져오기
export const getCookie = (name) => {
  return cookies.get(name);
};

//쿠키에서 삭제
export const removeCookie = (name) => {
  return cookies.remove(name);
};
export const setCookie = () => {
  // options에는 경로(path), 만료 날짜(expires), 도메인(domain), 보안(secure), SameSite 설정 등이 가능합니다.
  // 자세한 내용은 react-cookie 문서를 참조하세요.
  cookies.set(
    "refreshtest",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb25naW5nMDFAZ21haWwuY29tIiwiaWF0IjoxNzAwNDYwNDcxLCJleHAiOjE3MDE3NTY0NzF9.vBgVmqr4jpAER8Gj2jxhT7PTP_N_QauDl_b9JtA2VCk"
  );
};
