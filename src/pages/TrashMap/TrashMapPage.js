import Header from "../../components/common/Header";
import KakaoMap from "../../components/trashmap/KakaoMap";
import AdBanner from "../../components/common/AdBanner";

const TrashMapPage = () => {
  return (
    <>
      <Header title="성동구 쓰레기통 지도" />
      <KakaoMap />
      <AdBanner />
    </>
  );
};

export default TrashMapPage;
