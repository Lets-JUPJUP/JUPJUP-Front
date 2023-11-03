import { useState } from "react";
import styled from "styled-components";
import ic_reset from "../../assets/PloggingList/ic_reset.png";

const FilteringBox = () => {
  // 필터링 버튼
  const [buttonList, setButtonList] = useState([
    { title: "모집마감 제외", isClicked: true },
    { title: "연령무관", isClicked: false },
    { title: "성별무관", isClicked: false },
    { title: "여성만", isClicked: false },
    { title: "남성만", isClicked: false },
    { title: "반려동물과 함께", isClicked: false },
  ]);

  // 필터링 기능
  const toggleButtonClick = (index) => {
    // 색깔 바꾸기
    setButtonList((prevButtonList) => {
      // 배열의 복사본 생성
      const newButtonList = [...prevButtonList];

      // 원하는 인덱스의 isClicked 값을 반대로 설정
      newButtonList[index].isClicked = !newButtonList[index].isClicked;

      // 새로운 상태로 설정
      return newButtonList;
    });
  };

  return (
    <Wrapper>
      <img
        src={ic_reset}
        alt="새로고침"
        onClick={() => {
          window.location.reload();
        }}
      />
      {buttonList.map((item, index) => {
        return (
          <FilterButton
            key={index}
            className={item.isClicked ? "isClicked" : ""}
            onClick={() => {
              toggleButtonClick(index);
            }}
          >
            {item.title}
          </FilterButton>
        );
      })}
    </Wrapper>
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
