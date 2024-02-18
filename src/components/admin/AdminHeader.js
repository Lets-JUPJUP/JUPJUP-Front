import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import ic_back from "../../assets/admin/ic_back.png";

// 관리자 페이지 Header
/* PROPS 목록
 * title : 제목 (string)
 * subTitle : 부제목 (string, 생략 가능)
 * backBtn : < 버튼 (boolean, 생략 가능)
 */

const AdminHeader = ({ title, subTitle = null, backBtn = false }) => {
  const navigate = useNavigate();

  // 이전 페이지로 이동하는 함수
  const onGoBack = () => {
    navigate(-1);
  };

  const onLogout = () => {
    localStorage.removeItem("admintoken");
    alert("로그아웃 되었습니다.");
    window.location.reload();
  };

  return (
    <Wrapper>
      <div className="mainSection">
        <div className="left">
          {backBtn === true && (
            <img
              src={ic_back}
              className="backBtn"
              alt="뒤로가기"
              onClick={onGoBack}
            />
          )}
          <div className="title">{title}</div>
        </div>
        <div className="right">
          <LogoutBtn onClick={onLogout}>로그아웃</LogoutBtn>
        </div>
      </div>
      {subTitle !== null ? (
        <div className="subTitle">{subTitle}</div>
      ) : (
        <div className="subTitleHidden">부제목</div>
      )}
    </Wrapper>
  );
};

export default AdminHeader;

const Wrapper = styled.div`
  width: 100%;
  /* height: 100px; */

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  margin-top: 70px;
  margin-bottom: 50px;

  .mainSection {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      position: relative;

      .backBtn {
        cursor: pointer;
        width: 16px;

        position: absolute;
        left: -30px;
      }

      .title {
        font-size: 32px;
        font-weight: 600;

        @media screen and (max-width: 768px) {
          font-size: 24px;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .subTitle {
    margin-top: 12px;
  }

  .subTitleHidden {
    margin-top: 12px;
    visibility: hidden;
  }
`;

const LogoutBtn = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background: var(--grey, #e8e8e8);

  color: var(--black, #09090a);
  font-size: 16px;
  font-weight: 600;

  border: 0px;
`;
