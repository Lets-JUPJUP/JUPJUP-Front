import styled from "styled-components";
import PloggingPostBox from "../common/PloggingPostBox";

const PloggingListSection = () => {
  return (
    <Wrapper>
      <PloggingPostBox status="join"/>
      <PloggingPostBox status="finish"/>
      <PloggingPostBox />
      <PloggingPostBox />
      <PloggingPostBox />
      <PloggingPostBox />
      <PloggingPostBox status="join"/>
      <PloggingPostBox status="finish"/>
      <PloggingPostBox />
      <PloggingPostBox />
      <PloggingPostBox />
      <PloggingPostBox />
    </Wrapper>
  );
};

export default PloggingListSection;

const Wrapper = styled.div`
  width: 100%;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  // 상단 높이 12px 그라데이션 적용
  position: relative; /* 가상 요소를 포함할 수 있도록 상대 위치로 설정 */
  padding-top: 12px;

  padding-bottom: 80px; // 광고배너 68px + 여백 12px

  &::before {
    content: ""; /* 가상 요소의 내용을 지정 */
    position: absolute;
    top: 0; /* 부모 요소 상단에 배치 */
    left: 0;
    width: 100%;
    height: 20px;
    background: linear-gradient(
      180deg,
      #f3efff 0%,
      rgba(243, 239, 255, 0) 100%
    );
  }
`;
