import React, { useEffect, useState } from "react";
import styled from "styled-components";
import edit from "../../assets/common/edit.png";
import { memberCheckValidName, memberCheckValidName_ } from "../../api/member";
const ValidNameCheck = ({
  setNickname,
  nickname,
  isValid,
  setIsValid,
  isTemp = false, //isTemp는 회원가입 중도이탈 예외처리를 위한 props로 따로 설정X
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    setIsEditing(!isEditing);
  };

  const finishEditing = () => {
    checkIsValid();
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const checkValidExpression = () => {
    const myRe = /^[ㄱ-ㅎ가-힣a-zA-Z0-9_]+$/;
    return myRe.test(nickname);
  };
  const checkIsValid = async () => {
    let data;

    if (isTemp === true) {
      const temp_token = localStorage.getItem("temptoken");
      data = await memberCheckValidName_(nickname, temp_token);
    } else {
      data = await memberCheckValidName(nickname);
    }

    if (data && data.isExistingNickname === false && checkValidExpression()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkIsValid();
  }, []);

  return (
    <Wrapper>
      <div className="name">
        {!isEditing ? (
          <>
            <div className="name-value">{nickname}</div>
            <div onClick={startEditing}>
              <img className="name-button" src={edit} alt="수정하기" />
            </div>
          </>
        ) : (
          <>
            <input
              maxLength="8"
              autofocus="autofocus"
              className="name-input"
              placeholder={nickname}
              onChange={handleChange}
            />
            <div onClick={finishEditing}>
              <div className="check-button" alt="중복확인">
                중복확인
              </div>
            </div>
          </>
        )}
      </div>
      <div className="line" />
      {isValid ? (
        <div className="valid-message">사용 가능한 이름입니다!</div>
      ) : (
        <div className="error-message">사용할 수 없는 이름입니다!</div>
      )}
    </Wrapper>
  );
};

export default ValidNameCheck;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .name {
    margin-top: 40px;
    display: flex;
    align-items: start;

    .name-button {
      margin-left: 9px;
      margin-top: 2px;
      width: 16px;
      height: 20px;
      flex-shrink: 0;
      margin-left: -1px;
    }

    .check-button {
      color: #fff;
      margin-left: 9px;
      margin-top: 2px;
      flex-shrink: 0;
      margin-left: -1px;
      flex-shrink: 0;
      border-radius: 4px;
      background: #7e7e7e;
      text-align: center;
      padding: 0px 4px;
      font-size: 12px;
    }
    .name-value {
      color: black;
      width: 90px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .name-input {
      font-size: 16px;
      font-weight: 600;
      width: 90px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: none;
      outline: none;
      text-align: center;
      line-height: 24px;
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

  .valid-message {
    margin-top: 8px;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px; /* 150% */
  }
`;
