import { useState } from "react";
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
      <StyledBottomSheet open={bsOpen} onDismiss={onDisMiss}>
        <TrashBottomSheet selectedData={selectedData}/>
      </StyledBottomSheet>
      <AdBanner />
    </>
  );
};

export default TrashMapPage;

const StyledBottomSheet = styled(BottomSheet)`
  /* [data-rsbs-header] {
    background-color: var(--main);
  } */
`;
