import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getTrashCanInRadius } from "../../api/trashmap";

import pin_trash from "../../assets/trashmap/pin_trash.png";
import pin_recycle from "../../assets/trashmap/pin_recycle.png";

const KakaoMap = ({
  curLocation,
  setCurLocation,
  trashPageData,
  setTrashPageData,
}) => {
  // 기본 위치 (성동구청)
  const defaultLocation = [37.5633088, 127.036696];

  // 사용자의 현재 위치인지 기본 위치인지
  const [isCenterDefault, setIsCenterDefault] = useState(false);

  useEffect(() => {
    // 성공 시 successHandler, 실패 시 errorHandler 함수가 실행
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    } else {
      alert("GeoLocation 기능을 사용할 수 없습니다. 다시 시도해주세요");
      return;
    }
  }, []);

  const successHandler = async (response) => {
    console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setCurLocation({ latitude, longitude });
    // 반경 내 쓰레기통 조회
    const data = await getTrashCanInRadius(latitude, longitude);
    console.log("첫 번째 쓰레기통 조회", data.data.trashCans);
    setTrashPageData(data.data.trashCans);

    if (data.data.trashCans.length <= 0) {
      // 주변 쓰레기통이 없는 경우
      if (
        window.confirm(
          "주변에 쓰레기통이 없습니다!\n성동구청 근처 쓰레기통을 검색할까요?"
        )
      ) {
        // 성동구청 근처 쓰레기통 검색
        const defaultData = await getTrashCanInRadius(...defaultLocation);
        console.log("성동구청 근처 쓰레기통 조회", defaultData.data.trashCans);
        setTrashPageData(defaultData.data.trashCans);
        // 지도 중심 이동
        setCurLocation({
          latitude: defaultLocation[0],
          longitude: defaultLocation[1],
        });
        // 지도의 중심이 사용자의 현재 위치가 아님을 표시
        setIsCenterDefault(true);
        return;
      } else {
        // 원하지 않는 경우 사용자의 현재 위치만 표시
        return;
      }
    }
  };

  const errorHandler = (error) => {
    if (error.message === "User denied Geolocation") {
      alert("위치 정보에 동의해주셔야 해당 서비스 이용이 가능합니다.");
      return;
    } else {
      console.log(error);
    }
  };

  return (
    <>
      {curLocation ? (
        <StyledMap
          center={{ lat: curLocation.latitude, lng: curLocation.longitude }}
          level={3}
          isPanto={true}
        >
          <MapMarker
            position={{ lat: curLocation.latitude, lng: curLocation.longitude }}
          >
            <InfoWindow>
              {isCenterDefault === true
                ? "기본 위치"
                : "당신의 현재 위치입니다"}
            </InfoWindow>
          </MapMarker>
          {trashPageData.length > 0
            ? trashPageData.map((trashElement) => {
                return (
                  <MapMarker
                    position={{
                      lat: trashElement.latitude,
                      lng: trashElement.longitude,
                    }}
                    image={{
                      src:
                        trashElement.trashCanType === "RECYCLING_STATION"
                          ? pin_recycle
                          : pin_trash, // 마커 이미지
                      size: {
                        width: 40,
                        height: 40,
                      }, // 마커이미지의 크기
                    }}
                  />
                );
              })
            : null}
        </StyledMap>
      ) : (
        <div>로딩 중...위치 정보에 동의하지 않으셨다면 동의해주세요</div>
      )}
    </>
  );
};

export default KakaoMap;

const StyledMap = styled(Map)`
  width: 100%;
  // 전체 높이 - Header높이 - Footer높이
  height: calc(100vh - 80px - 68px);
`;

const InfoWindow = styled.div`
  padding: 5px;
  background-color: var(--white, #fff);
  font-family: "Pretendard";
`;
