import styled from "styled-components";

// Footer
const Footer = () => {
  return (
    <Wrapper>
      <div className="contents">
        <div>로그아웃</div>
        <div>회원탈퇴</div>
        <div>레츠 줍줍 (Let’s JUPJUP)</div>
      </div>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  width: 100%;
  height: 132px;

  background: var(--grey, #e8e8e8);
  color: var(--white, #fff);

  font-weight: 600;

  display: flex;
  justify-content: center;

  position: fixed;
  bottom: 0;

  .contents {
    display: flex;
    flex-direction: column;
    gap: 8px;

    width: 90%;
    margin-top: 12px;
  }
`;
