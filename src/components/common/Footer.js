import styled from "styled-components";
import { memberPostWithdraw } from "../../api/member";

// Footer
const Footer = ({ isNotFixed = false }) => {
  const onLogout = () => {
    localStorage.removeItem("juptoken");
    alert("로그아웃 되었습니다.");
    window.location.reload();
  };

  const onDelete = async () => {
    const token = localStorage.getItem("juptoken");
    if (token) {
      try {
        const res = await memberPostWithdraw(token);

        if (res.status === 200) {
          localStorage.removeItem("juptoken");
          alert("회원탈퇴 되었습니다.");
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Wrapper className={isNotFixed === true ? "" : "isFixed"}>
      <div className="contents">
        <div onClick={onLogout}>로그아웃</div>
        <div onClick={onDelete}>회원탈퇴</div>
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

  /* position: fixed;
  bottom: 0; */

  .contents {
    display: flex;
    flex-direction: column;
    gap: 8px;

    width: 90%;
    margin-top: 12px;
  }

  &.isFixed {
    position: fixed;
    bottom: 0;
  }
`;
