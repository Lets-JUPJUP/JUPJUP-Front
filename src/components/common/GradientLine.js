import styled from "styled-components";

// 그라데이션 구분선
const GradientLine = () => {
  return <Line />;
};

export default GradientLine;

const Line = styled.div`
  width: 100vw;
  height: 12px;
  background: linear-gradient(180deg, #f3efff 0%, rgba(243, 239, 255, 0) 100%);
`;
