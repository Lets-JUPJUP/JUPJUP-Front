import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

import Header from "../../components/common/Header";
import FilteringBox from "../../components/PloggingList/FilteringBox";
import PloggingListSection from "../../components/PloggingList/PloggingListSection";
import AdBanner from "../../components/common/AdBanner";
import FloatingButton from "../../components/common/FloatingButton";

const PloggingListPage = () => {
  const location = useLocation();
  const searchParam = location.search;

  const isLogin = !!localStorage.getItem("juptoken"); // 로그인 여부

  // 모집마감 제외 여부
  const [exceptEnded, setExceptEnded] = useState(true);

  // 필터링 버튼
  const btnList = [
    { id: 0, title: "연령무관", keyword: "?age=ANY" },
    { id: 1, title: "성별무관", keyword: "?gender=ANY" },
    { id: 2, title: "여성만", keyword: "?gender=FEMALE" },
    { id: 3, title: "남성만", keyword: "?gender=MALE" },
    {
      id: 4,
      title: "반려동물과 함께",
      keyword: "?withPet=TRUE",
    },
  ];

  // 선택된 버튼
  const [selectedBtn, setSelectedBtn] = useState(null);

  useEffect(() => {
    // url 검색을 통해 필터링 요소가 있는지 확인
    const findItem = btnList.find((item) => item.keyword === searchParam);

    if (searchParam === "" || findItem) {
      // 필터링 요소가 없거나 (전체 list), 올바른 필터링 요소가 있을 경우
      setSelectedBtn(searchParam === "" ? null : findItem);
    } else {
      // 잘못된 키워드로 검색했을 경우
      alert("올바른 키워드로 검색해주세요.");
      window.location.href = "/plogging-list";
    }
  }, [location.search]);

  return (
    <>
      <Fixed>
        <Header />
        <FilteringBox
          exceptEnded={exceptEnded}
          setExceptEnded={setExceptEnded}
          selectedBtn={selectedBtn}
          btnList={btnList}
        />
      </Fixed>

      <PloggingListSection />
      <FloatingButton />
      <AdBanner />
    </>
  );
};

export default PloggingListPage;

const Fixed = styled.div`
  position: fixed;
  z-index: 1;
  background-color: var(--white, #fff);
`;
