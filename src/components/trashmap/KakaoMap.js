import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getTrashCanInRadius } from "../../api/trashmap";

import loading from "../../assets/common/loading.gif";
import ic_reset from "../../assets/trashmap/ic_reset_white.png";
import ic_mapmarker from "../../assets/trashmap/ic_mapmarker.png";
import pin_trash from "../../assets/trashmap/pin_trash.png";
import pin_recycle from "../../assets/trashmap/pin_recycle.png";

const KakaoMap = ({
  curLocation,
  setCurLocation,
  trashPageData,
  setTrashPageData,
  setBsOpen,
  setSelectedData,
}) => {
  // 기본 위치 (성동구청)
  const defaultLocation = [37.5633088, 127.036696];

  // 사용자의 현재 위치인지 기본 위치인지
  const [isCenterDefault, setIsCenterDefault] = useState(false);

  // 새로고침 상태
  const [refreshNum, setRefreshNum] = useState(0);

  // 새로고침 버튼 클릭 시 상태 변경 -> useEffect 실행
  const onRefreshButtonClick = () => {
    setRefreshNum((prev) => prev + 1);
  };

  useEffect(() => {
    // 성공 시 successHandler, 실패 시 errorHandler 함수가 실행
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    } else {
      alert("GeoLocation 기능을 사용할 수 없습니다. 다시 시도해주세요");
      return;
    }
  }, [refreshNum]);

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
      // 지도 다 로드된 후 alert 띄우기 위해 0.1초 이후 실행
      setTimeout(async () => {
        if (
          window.confirm(
            "주변에 쓰레기통이 없습니다!\n성동구청 근처 쓰레기통을 검색할까요?"
          )
        ) {
          // 성동구청 근처 쓰레기통 검색
          const defaultData = await getTrashCanInRadius(...defaultLocation);
          console.log(
            "성동구청 근처 쓰레기통 조회",
            defaultData.data.trashCans
          );
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
      }, 100);
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

  const onMarkerClick = (trashElement) => {
    setBsOpen(true);
    setSelectedData(trashElement);
  };

  return (
    <>
      {curLocation ? (
        <StyledMap
          center={{ lat: curLocation.latitude, lng: curLocation.longitude }}
          level={3}
          isPanto={true}
        >
          <ButtonDiv>
            <button className="refreshBtn" onClick={onRefreshButtonClick}>
              <img src={ic_reset} alt="새로고침" />
              <span>현재 위치에서 검색</span>
            </button>
          </ButtonDiv>
          <MapMarker
            position={{ lat: curLocation.latitude, lng: curLocation.longitude }}
            image={{
              src: ic_mapmarker, // 마커 이미지
              size: {
                width: 37,
                height: 49,
              }, // 마커이미지의 크기
            }}
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
                    clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
                    onClick={() => onMarkerClick(trashElement)}
                  />
                );
              })
            : null}
        </StyledMap>
      ) : (
        <LoadingDiv>
          <div className="loadingContainer">
            <img src={loading} alt="loading" className="loading" />
            <div className="loadingText">
              위치 정보에 동의하지 않으셨다면 동의해주세요
            </div>
          </div>
        </LoadingDiv>
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
  font-weight: 600;

  width: 150px;
  max-width: 180px;
  text-align: center;
`;

const LoadingDiv = styled.div`
  height: calc(100vh - 80px - 68px);
  display: flex;
  justify-content: center;
  align-items: center;

  .loadingContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .loading {
    width: 100px;
    height: 100px;
  }

  .loadingText {
    font-size: 16px;
    margin-top: 12px;
  }
`;

const ButtonDiv = styled.div`
  position: absolute;
  top: 90px; // header 80px + marginTop 10px
  z-index: 50;
  width: 100%;
  display: flex;
  justify-content: center;

  .refreshBtn {
    background: var(--main, #410fd4);
    color: var(--white, #fff);
    border-radius: 4px;
    border: 2px solid var(--white, #fff);
    padding: 5px 8px;

    display: flex;
    align-items: center;
    gap: 4px;

    img {
      width: 10px;
    }
  }
`;
