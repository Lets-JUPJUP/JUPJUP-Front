import styled from "styled-components";
import PloggingPostBox from "../common/PloggingPostBox";

const PloggingListSection = () => {
  return (
    <Wrapper>
      <PloggingPostBox status="join" />
      <PloggingPostBox status="finish" />
      <PloggingPostBox />
      <PloggingPostBox />
      <PloggingPostBox />
      <PloggingPostBox />
      <PloggingPostBox status="join" />
      <PloggingPostBox status="finish" />
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

  padding-top: 117px; // 헤더 57px + 필터링박스 48px + 구분선 12px
  padding-bottom: 80px; // 광고배너 68px + 여백 12px
`;
