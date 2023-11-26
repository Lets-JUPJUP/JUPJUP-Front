import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import KakaoMap from "../../components/trashmap/KakaoMap";
import AdBanner from "../../components/common/AdBanner";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import TrashBottomSheet from "../../components/trashmap/TrashBottomSheet";

const TrashMapPage = () => {
  // 사용자의 현재 위치
  const [curLocation, setCurLocation] = useState(null);

  // 반경 내 쓰레기통 조회 api로 얻은 데이터
  const [trashPageData, setTrashPageData] = useState([]);

  // 사용자가 선택한 쓰레기통 정보
  const [selectedData, setSelectedData] = useState(null);

  // 바텀시트
  const bottomSheetRef = useRef();

  // 각 쓰레기통에 대한 피드백 posted 여부
  const initalArr = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  const [feedbackPosted, setFeedbackPosted] = useState(initalArr);

  // BottomSheet open 여부
  const [bsOpen, setBsOpen] = useState(false);

  // bottomsheet close하기
  const onDisMiss = () => {
    setBsOpen(false);
  };

  return (
    <>
      <Header title="성동구 쓰레기통 지도" />
      <KakaoMap
        curLocation={curLocation}
        setCurLocation={setCurLocation}
        trashPageData={trashPageData}
        setTrashPageData={setTrashPageData}
        setBsOpen={setBsOpen}
        setSelectedData={setSelectedData}
      />
      <StyledBottomSheet
        ref={bottomSheetRef}
        open={bsOpen}
        onDismiss={onDisMiss}
        snapPoints={({ headerHeight }) => [
          headerHeight + 68,
          headerHeight + 500,
        ]}
        defaultSnap={({ headerHeight }) => headerHeight + 68}
        header={
          <div
            onClick={() => {
              bottomSheetRef.current.snapTo(
                ({ headerHeight }) => headerHeight + 500
              );
            }}
          >
            해당 쓰레기통에 대한 의견을 남겨주세요
          </div>
        }
        expandOnContentDrag={true}
      >
        <TrashBottomSheet
          selectedData={selectedData}
          feedbackPosted={feedbackPosted}
          setFeedbackPosted={setFeedbackPosted}
          initalArr={initalArr}
        />
      </StyledBottomSheet>
      <AdBanner />
    </>
  );
};

export default TrashMapPage;

const StyledBottomSheet = styled(BottomSheet)`
  [data-rsbs-header]:before {
    background-color: var(--white, "#fff");
  }

  [data-rsbs-header] {
    border-top-left-radius: 16px;
    border-top-left-radius: var(--rsbs-overlay-rounded, 16px);
    border-top-right-radius: 16px;
    border-top-right-radius: var(--rsbs-overlay-rounded, 16px);
    background-color: var(--main, "#410FD4");
    color: var(--white, "#fff");
  }
`;
