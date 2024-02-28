import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

import Header from "../../components/common/Header";
import FilteringBox from "../../components/PloggingList/FilteringBox";
import PloggingListSection from "../../components/PloggingList/PloggingListSection";
import AdBanner from "../../components/common/AdBanner";
import FloatingButton from "../../components/common/FloatingButton";
import { getPostsList, getPostsListUnAuth } from "../../api/posts";

const PloggingListPage = () => {
  const location = useLocation();
  const searchParam = location.search; // 필터링 url (?뒤에 나오는 주소)

  const isLogin = !!localStorage.getItem("juptoken"); // 로그인 여부

  // 모집마감 제외 여부
  const [exceptEnded, setExceptEnded] = useState(true);

  // 선택된 버튼
  const [selectedBtn, setSelectedBtn] = useState(null);

  // api로 받아온 data
  const [pageData, setPageData] = useState([]);

  // api 가져오는 함수
  const getData = async () => {
    // 필터링 요소가 없을 경우
    if (searchParam === "") {
      // 로그인하지 않았을 경우 - isHearted, isJoined null 처리됨
      const data = isLogin ? await getPostsList() : await getPostsListUnAuth();

      setPageData(data.data); // pageData 설정
    } else if (selectedBtn) {
      // 올바른 데이터가 들어올 경우
      // searchParam에서 keyword와 value를 분리
      const [keyword, value] = searchParam.slice(1).split("=");
      const data = isLogin
        ? await getPostsList(keyword, value)
        : await getPostsListUnAuth(keyword, value);

      setPageData(data.data); // pageData 설정
    } else {
      // 잘못된 데이터가 들어올 경우
      return;
    }
  };

  useEffect(() => {
    getData();
  }, [selectedBtn]);

  return (
    <>
      <Fixed>
        <Header title={"플로깅 이벤트"} />
        <FilteringBox
          exceptEnded={exceptEnded}
          setExceptEnded={setExceptEnded}
          selectedBtn={selectedBtn}
          setSelectedBtn={setSelectedBtn}
          searchParam={searchParam}
        />
      </Fixed>

      <PloggingListSection
        pageData={
          // 모집마감 제외일 경우 isEnded=false만 분리
          exceptEnded === true
            ? pageData.filter((element) => !element.isEnded)
            : pageData
        }
      />
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
