import React from "react";
import styled from "styled-components";

const EventRegister = () => {
  return (
    <Wrapper>
      <div className="inputSection">
        <div className="title">행사명</div>
        <input placeholder="행사명" type="text" />
      </div>
      <div className="inputSection">
        <div className="title">이미지</div>
        <input placeholder="이미지 url" type="url" />
      </div>
      <div className="inputSection">
        <div className="title">연결 링크</div>
        <input placeholder="웹페이지 url" type="url" />
      </div>
      <div className="buttonSection">
        <RegisterBtn>등록 완료</RegisterBtn>
      </div>
    </Wrapper>
  );
};

export default EventRegister;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  font-size: 16px;

  .inputSection {
    display: flex;
    gap: 48px;
    /* width: 100%; */
    align-items: center;
    justify-content: space-between;
  }

  .title {
    white-space: nowrap;
    font-weight: 600;
    width: 70px;
  }

  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--black, #09090a);
    padding-bottom: 5px;

    font-size: 16px;
    outline: none;
  }

  .buttonSection {
    display: flex;
    justify-content: flex-end;
  }
`;

const RegisterBtn = styled.button`
  padding: 8px 12px;
  border: 0px;
  border-radius: 4px;

  font-size: 16px;
  font-weight: 600;

  background: var(--sub, #beef62);
  color: var(--main, #410fd4);
`;
