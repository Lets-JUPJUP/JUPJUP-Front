import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { memberGetMyProfile } from "../../api/member";

const KakaoLoginPage = () => {
  const location = useLocation();
  const [searchParams, _] = useSearchParams();

  const navigate = useNavigate();

  const navigateUser = async () => {
    const data = await memberGetMyProfile();

    if (data.isProfileCreated) {
      navigate("/");
      window.location.reload();
    } else {
      navigate("/login-settings");
      window.location.reload();
    }
  };

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    console.log(accessToken);
    if (accessToken) {
      localStorage.setItem("juptoken", accessToken); // 로컬 스토리지에 저장

      navigateUser();
    } else {
      alert("로그인에 실패하였습니다.");
      navigate("/login");
    }
  }, []);

  return <div>카카오 로그인중..</div>;
};

export default KakaoLoginPage;
