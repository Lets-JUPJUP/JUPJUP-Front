import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ic_reset from "../../assets/PloggingList/ic_reset.png";
import GradientLine from "../common/GradientLine";

const FilteringBox = ({
  exceptEnded,
  setExceptEnded,
  selectedBtn,
  setSelectedBtn,
  searchParam, // 필터링 url (?뒤에 나오는 주소)
}) => {
  const currentUrl = "/plogging-list";

  const navigate = useNavigate();

  // 필터링 버튼 리스트
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

  // 필터링 기능
  const toggleButtonClick = (keyword) => {
    // url에 필터링 요소를 붙이기
    navigate(currentUrl + keyword);
  };

  useEffect(() => {
    // url 검색을 통해 필터링 요소가 있는지 확인
    const findItem = btnList.find((item) => item.keyword === searchParam);

    if (searchParam === "" || findItem) {
      // 필터링 요소가 없거나 (전체 list), 올바른 필터링 요소가 있을 경우
      setSelectedBtn(searchParam === "" ? null : findItem);
    } else {
      // 잘못된 키워드로 검색했을 경우
      alert("올바른 키워드로 검색해주세요.");
      window.location.href = currentUrl;
    }
  }, [searchParam]);

  return (
    <>
      <Wrapper>
        <img
          src={ic_reset}
          alt="새로고침"
          onClick={() => {
            navigate(currentUrl);
          }}
        />
        <FilterButton
          className={exceptEnded ? "isClicked" : ""}
          onClick={() => {
            setExceptEnded(!exceptEnded);
          }}
        >
          모집마감 제외
        </FilterButton>
        {btnList.map((item, index) => {
          return (
            <FilterButton
              key={index}
              className={selectedBtn?.title === item.title ? "isClicked" : ""}
              onClick={() => {
                toggleButtonClick(item.keyword);
              }}
            >
              {item.title}
            </FilterButton>
          );
        })}
      </Wrapper>
      <GradientLine />
    </>
  );
};

export default FilteringBox;

const Wrapper = styled.div`
  width: 100vw;
  height: 48px;
  overflow-x: scroll;

  // scrollbar 제거
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 20px;
    margin-left: 16px;
    cursor: pointer;
  }
`;

const FilterButton = styled.button`
  background: var(--midgrey, #7e7e7e);
  color: var(--white, #fff);

  // 클릭되었을 경우 색 변경
  &.isClicked {
    background: var(--sub, #beef62);
    color: var(--main, #410fd4);
  }

  padding: 5px;
  border: 0px;
  border-radius: 4px;

  white-space: nowrap;

  font-weight: 600;
`;
