import FilteringBox from "../components/PloggingList/FilteringBox";
import PloggingListSection from "../components/PloggingList/PloggingListSection";
import AdBanner from "../components/common/AdBanner";
import FloatingButton from "../components/common/FloatingButton";

const PloggingListPage = () => {
  return (
    <>
      <FilteringBox />
      <PloggingListSection />
      <FloatingButton />
      <AdBanner />
    </>
  );
};

export default PloggingListPage;
