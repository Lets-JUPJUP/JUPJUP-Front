import { Navigate, Outlet } from "react-router-dom";

//로그인 완료 유저만 접근 가능한 페이지
const isLogin = !!localStorage.getItem("juptoken");

export const PrivateRoute = () => {
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

//회원가입 중간 이탈자만 login-settings에 접근할 수 있도록 함.
const isTemp = !!localStorage.getItem("temptoken");

export const PrivateRouteTemp = () => {
  return isTemp ? <Outlet /> : <Navigate to="/" />;
};
