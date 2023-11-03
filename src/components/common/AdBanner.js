import styled from "styled-components";
import ic_info from "../../assets/common/ic_info.png";

// 광고 배너
const AdBanner = () => {
  return (
    <Wrapper>
      <img src={ic_info} alt="info" className="info" />
      <div>(광고배너)</div>
    </Wrapper>
  );
};

export default AdBanner;

const Wrapper = styled.div`
  width: 100%;
  height: 68px;
  background: var(--grey, #e8e8e8);

  position: fixed;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  .info {
    width: 16px;
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;
