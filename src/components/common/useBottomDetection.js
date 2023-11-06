import { useState, useEffect } from "react";

// 화면 맨 하단임을 감지할 파일에서 이 파일을 import한 후
// const isScrollBottom = useBottomDetection(); 을 내부에 선언해 사용

const useBottomDetection = () => {
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

  return isScrollBottom;
};

export default useBottomDetection;
