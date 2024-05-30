import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AdminKakaoPage = () => {
  const [searchParams, _] = useSearchParams();

  const navigate = useNavigate();

  const navigateUser = async (accessToken) => {
    localStorage.setItem("admintoken", accessToken);
    navigate("/admin/user-manage");
    window.location.reload();
  };

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      navigateUser(accessToken); //로컬스토리지 비동기 저장으로 props로 전달
    } else {
      alert("로그인에 실패하였습니다.");
      navigate("/admin");
    }
  }, []);

  return <div>로그인 중입니다..</div>;
};

export default AdminKakaoPage;
