import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ic_reset from "../../assets/PloggingList/ic_reset.png";
import GradientLine from "../common/GradientLine";

const FilteringBox = ({
  exceptEnded,
  setExceptEnded,
  selectedBtn,
  btnList,
}) => {
  const currentUrl = "/plogging-list";
  const navigate = useNavigate();

  // 필터링 기능
  const toggleButtonClick = (id) => {
    const element = btnList[id];
    // url에 필터링 요소를 붙이기
    navigate(currentUrl + element.keyword);
  };

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
                toggleButtonClick(item.id);
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
