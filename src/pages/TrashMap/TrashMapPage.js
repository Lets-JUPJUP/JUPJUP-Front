import { useState } from "react";
import Header from "../../components/common/Header";
import KakaoMap from "../../components/trashmap/KakaoMap";
import AdBanner from "../../components/common/AdBanner";

const TrashMapPage = () => {
  // 사용자의 현재 위치
  const [curLocation, setCurLocation] = useState(null);

  // 반경 내 쓰레기통 조회 api로 얻은 데이터
  const [trashPageData, setTrashPageData] = useState([]);

  // 사용자가 선택한 쓰레기통 정보
  const [selectedData, setSelectedData] = useState(null);
  return (
    <>
      <Header title="성동구 쓰레기통 지도" />
      <KakaoMap
        curLocation={curLocation}
        setCurLocation={setCurLocation}
        trashPageData={trashPageData}
        setTrashPageData={setTrashPageData}
      />
      <AdBanner />
    </>
  );
};

export default TrashMapPage;
