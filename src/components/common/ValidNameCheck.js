import React, { useEffect, useState } from "react";
import styled from "styled-components";
import edit from "../../assets/common/edit.png";
import { memberCheckValidName } from "../../api/member";
const ValidNameCheck = ({ setNickname, nickname, isValid, setIsValid }) => {
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
    const data = await memberCheckValidName(nickname);
    console.log(data);
    if (data.isExistingNickname === false && checkValidExpression()) {
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
              maxLength="15"
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
      margin-left: 9px;
      margin-top: 2px;
      height: 20px;
      flex-shrink: 0;
      margin-left: -1px;
      font-size: 10px;
      flex-shrink: 0;
      border-radius: 8px;
      background: var(--sub, #beef62);
      text-align: center;
      padding: 0px 5px;
    }
    .name-value {
      color: black;
      width: 90px;
      text-align: center;
    }

    .name-input {
      font-size: 16px;
      font-weight: 600;
      width: 90px;
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
