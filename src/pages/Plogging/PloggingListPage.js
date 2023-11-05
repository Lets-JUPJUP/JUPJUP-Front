import { styled } from "styled-components";

import Header from "../../components/common/Header";
import FilteringBox from "../../components/PloggingList/FilteringBox";
import PloggingListSection from "../../components/PloggingList/PloggingListSection";
import AdBanner from "../../components/common/AdBanner";
import FloatingButton from "../../components/common/FloatingButton";

const PloggingListPage = () => {
  return (
    <>
      <Fixed>
        <Header />
        <FilteringBox />
      </Fixed>

      <PloggingListSection />
      <FloatingButton />
      <AdBanner isFixed={true}/>
    </>
  );
};

export default PloggingListPage;

const Fixed = styled.div`
  position: fixed;
  z-index: 1;
  background-color: var(--white, #fff);
`;
