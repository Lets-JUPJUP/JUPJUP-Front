import { useState, useEffect } from "react";
import styled from "styled-components";
import fab_write from "../../assets/common/fab_write.png";
import fab_trash from "../../assets/common/fab_trash.png";

// 플로팅 버튼 컴포넌트
// 컴포넌트 사용 시 isWriteBtnHidden props 속성을 true로 설정하시면 write 버튼이 사라집니다.
const FloatingButton = ({ isWriteBtnHidden }) => {
  // 스크롤 맨 아래 있는지 여부
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  // 스크롤 맨 아래 있는지 체크하는 함수
  function checkScrollBottom() {
    if (
      window.innerHeight + Math.round(window.scrollY) >=
      document.body.offsetHeight
    ) {
      setIsScrollBottom(true); // 맨 아래 있을 경우 플로팅 버튼 숨기기
    } else {
      setIsScrollBottom(false);
    }
  }

  // 스크롤 감지 이벤트
  useEffect(() => {
    window.addEventListener("scroll", checkScrollBottom);
    return () => {
      window.removeEventListener("scroll", checkScrollBottom);
    };
  });

  return (
    <Wrapper className={isScrollBottom ? "isScrollBottom" : ""}>
      <img src={fab_trash} alt="trash" />
      <img
        src={fab_write}
        alt="write"
        className={isWriteBtnHidden ? "isWriteBtnHidden" : ""}
      />
    </Wrapper>
  );
};

export default FloatingButton;

const Wrapper = styled.div`
  position: fixed;
  bottom: 80px; // 광고배너 높이 68px + 여백 12px
  right: 16px;

  display: flex;
  flex-direction: column;

  gap: 12px;

  img {
    width: 56px;

    /* shadow */
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    cursor: pointer;
  }

  // 스크롤 맨 아래에 있을 경우 플로팅 버튼 숨기기
  &.isScrollBottom {
    display: none;
  }

  // write 버튼 숨기기
  .isWriteBtnHidden {
    display: none;
  }
`;
