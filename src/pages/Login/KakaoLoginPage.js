import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const KakaoLoginPage = () => {
  const location = useLocation();
  const [searchParams, _] = useSearchParams();
  //const KAKAO_CODE = location.search.split("=")[1]; // 인가코드

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      localStorage.setItem("juptoken", accessToken); // 로컬 스토리지에 저장
      navigate("/");
    } else {
      alert("로그인에 실패하였습니다.");
      navigate("/login");
    }
  }, []);

  return <div>카카오 로그인중..</div>;
};

export default KakaoLoginPage;