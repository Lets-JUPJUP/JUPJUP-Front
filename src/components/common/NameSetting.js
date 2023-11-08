import React from "react";
import styled from "styled-components";
import edit from "../../assets/common/edit.png";
const NameSetting = () => {
  return (
    <Wrapper>
      <div className="name">
        <div className="name-value">사용자 이름</div>
        <div>
          <img className="name-button" src={edit} alt="수정하기" />
        </div>
      </div>
      <div className="line" />
      <div className="error-message">사용할 수 없는 이름입니다!</div>
    </Wrapper>
  );
};

export default NameSetting;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .name {
    margin-top: 40px;
    display: flex;

    .name-button {
      margin-left: 9px;
      margin-top: 2px;
      width: 16px;
      height: 20px;
      flex-shrink: 0;
    }

    .name-value {
      color: black;
    }
  }
  .line {
    margin-top: 4px;
    width: 128px;
    height: 2px;
    background: #290886;
  }

  .error-message {
    margin-top: 8px;
    color: #f00;
    text-align: center;

    font-size: 12px;
    font-weight: 400;
    line-height: 18px; /* 150% */
  }
`;
