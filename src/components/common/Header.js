import React from "react";
import { styled } from "styled-components";
import logo from "../../assets/common/logo.png";
import alarm from "../../assets/common/alarm.png";
import user from "../../assets/common/user.png";
import GradientLine from "./GradientLine";
import { useNavigate } from "react-router-dom";

const Header = ({
  title,
  isDetailPage = false,
  title2 = false,
  link = false,
}) => {
  const toHome = () => {
    window.location.href = "/";
  };

  const toLink = () => {
    window.location.href = `${link}`;
  };

  const navigate = useNavigate();

  return (
    <>
      <Wrapper>
        {isDetailPage === true ? (
          <div className="detailTitle">{title}</div>
        ) : (
          <div className="left">
            <img
              className="logo"
              src={logo}
              alt="Let's JUPJUP"
              onClick={toHome}
            />
            <div className="title">{title}</div>
            {title2 && link && (
              <div className="title2" onClick={toLink}>
                {title2}
              </div>
            )}
          </div>
        )}

        <div className="btns">
          <div
            className="btn"
            onClick={() => {
              navigate("/notifications");
            }}
          >
            <img src={alarm} alt="알림모음으로" />
          </div>
          <div
            className="btn"
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <img src={user} alt="마이페이지로" />
          </div>
        </div>
      </Wrapper>

      {isDetailPage === true ? <GradientLine /> : null}
    </>
  );
};

export default Header;

const Wrapper = styled.div`
  width: 100%;
  /* height: 57px; */
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--white, #fff);
  /* margin-bottom: 10px; */
  padding-bottom: 10px;

  .left {
    height: 48px;
    display: flex;
    align-items: start;

    .logo {
      margin-left: 24px;
      width: 151.386px;
      height: 48px;
      flex-shrink: 0;
      cursor: pointer;
    }

    .title {
      align-self: flex-end;
      margin-left: 8px;
      font-size: 16px;
      font-weight: 600;
    }

    .title2 {
      align-self: flex-end;
      margin-left: 8px;
      font-size: 16px;
      font-weight: 600;

      color: var(--grey, #e8e8e8);
    }
  }

  .detailTitle {
    font-size: 16px;
    font-weight: 600;
    margin-left: 24px;
  }

  .btns {
    /* margin-top: 9px; */
    display: flex;
    flex-direction: column;
    height: 48px;
    justify-content: space-between;

    margin-right: 16px;
    .btn {
      width: 20px;
      height: 20px;
      display: flex;

      img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
`;
