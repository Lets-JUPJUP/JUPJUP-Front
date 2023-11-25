import styled from "styled-components";
import ic_star_white from "../../assets/mypage/ic_star_white.png";
import ic_written from "../../assets/mypage/ic_written.png";
import ic_schedule from "../../assets/mypage/ic_schedule.png";
import { useNavigate } from "react-router-dom";

// 마이페이지 메뉴
const MyMenu = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div
        className="container"
        onClick={() => {
          navigate("/mypage/interest");
        }}
      >
        <img src={ic_star_white} alt="star" className="mymenu-icon" />
        <div className="text">관심 있는 글</div>
      </div>
      <div className="divider" />
      <div
        className="container"
        onClick={() => {
          navigate("/mypage/comment");
        }}
      >
        <img src={ic_written} alt="write" className="mymenu-icon" />
        <div className="text">댓글 단 글</div>
      </div>
      <div className="divider" />
      <div
        className="container"
        onClick={() => {
          navigate("/mypage/schedule");
        }}
      >
        <img src={ic_schedule} alt="schedule" className="mymenu-icon" />
        <div className="text">내 플로깅 일정</div>
      </div>
    </Wrapper>
  );
};

export default MyMenu;

const Wrapper = styled.div`
  /* width: 90%;
  max-width: 358px; */
  width: 358px;
  border-radius: 8px;
  background: var(--main, #410fd4);

  display: flex;
  box-sizing: border-box;
  padding: 10px 0;

  margin: 12px 0;

  .container {
    width: 33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;

    cursor: pointer;
  }

  .divider {
    width: 2px;
    height: 44px;
    background: var(--white, "#fff");
  }

  .mymenu-icon {
    width: 16px;
    height: 16px;
  }

  .text {
    font-size: 16px;
    font-weight: 600;
    color: var(--white, #fff);
  }
`;
