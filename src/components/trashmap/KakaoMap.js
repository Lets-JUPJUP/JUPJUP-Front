import React, { useEffect } from "react";
import { styled } from "styled-components";

const { kakao } = window;

const KakaoMap = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
  }, []);
  return <Map id="map" />;
};

export default KakaoMap;

const Map = styled.div`
  width: 100%;
  // 전체 높이 - Header높이 - Footer높이
  height: calc(100vh - 80px - 68px);
`;
