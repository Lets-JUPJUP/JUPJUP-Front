import React, { useState } from "react";
import { styled } from "styled-components";
import RangeSlider from "./RangeSlider";
import { age_marks, count_marks } from "./marks";
import add from "../../assets/create/add.png";
import AddPhoto from "../common/AddPhoto";
const Form = () => {
  const [startDate, setStartDate] = useState({
    month: "",
    date: "",
    hour: "",
    min: "",
  });
  const [joinDate, setJoinDate] = useState({
    month: "",
    date: "",
    hour: "",
    min: "",
  });

  const handleStartDateChange = (e) => {
    const { value, name } = e.target;
    setStartDate({
      ...startDate,
      [name]: String(value).padStart(2, "0"),
    });

    console.log(startDate);
  };

  const handleJoinDateChange = (e) => {
    const { value, name } = e.target;
    setJoinDate({
      ...joinDate,
      [name]: String(value).padStart(2, "0"),
    });

    console.log(startDate);
  };

  return (
    <Wrapper>
      <div className="gradient" />
      <Container>
        <div className="title">제목</div>
        <Input placeholder="입력하기" />
        <Divider />
        <div className="subjects">출발 일시</div>
        <div className="start-inputs">
          <input
            className="month"
            name="month"
            placeholder="00"
            type="number"
            min="1"
            max="12"
            onChange={handleStartDateChange}
            maxLength="2"
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
          />
          월
          <input
            className="date"
            name="date"
            placeholder="00"
            type="number"
            min="1"
            max="31"
            onChange={handleStartDateChange}
            maxLength="2"
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
          />
          일
          <input
            className="hour"
            name="hour"
            placeholder="00"
            type="number"
            min="0"
            max="23"
            onChange={handleStartDateChange}
            maxLength="2"
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
          />
          시
          <input
            className="min"
            name="min"
            placeholder="00"
            type="number"
            min="0"
            max="60"
            onChange={handleStartDateChange}
            maxLength="2"
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
          />
          분
        </div>

        <div className="subjects">출발 장소</div>
        <Input placeholder="입력하기" />
        <div className="subjects">참여 인원</div>
        <div className="slider-container">
          <RangeSlider marks={count_marks} min={2} max={10} step={1} />
        </div>
        <div className="subjects">참여 성별</div>
        <ButtonContainer>
          <div className="btns">
            <div className="btn">성별무관</div>
            <div className="btn">여성만</div>
            <div className="btn">남성만</div>
          </div>

          <div className="btns">
            <div className="btn">반려동물과 함께</div>
          </div>
        </ButtonContainer>
        <div className="subjects">참여 연령</div>
        <div className="slider-container">
          <RangeSlider marks={age_marks} min={10} max={70} step={10} />
        </div>
        <Divider />
        <div className="subjects">본문</div>
        <Content placeholder="본문 내용을 작성해주세요." />
        <AddPhoto />
      </Container>

      <Footer>
        <div className="container">
          <div className="join-inputs">
            <input
              className="month"
              name="month"
              placeholder="00"
              type="number"
              min="1"
              max="12"
              onChange={handleJoinDateChange}
              maxLength="2"
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
            />
            월
            <input
              className="date"
              name="date"
              placeholder="00"
              type="number"
              min="1"
              max="31"
              onChange={handleJoinDateChange}
              maxLength="2"
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
            />
            일
            <input
              className="hour"
              name="hour"
              placeholder="00"
              type="number"
              min="0"
              max="23"
              onChange={handleJoinDateChange}
              maxLength="2"
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
            />
            시
            <input
              className="min"
              name="min"
              placeholder="00"
              type="number"
              min="0"
              max="60"
              onChange={handleJoinDateChange}
              maxLength="2"
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
            />
            분
          </div>
          <div className="text">까지 모집</div>
        </div>
        <div className="submit">작성하기</div>
      </Footer>
    </Wrapper>
  );
};

export default Form;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .gradient {
    width: 100vw;
    height: 20px;
    background: linear-gradient(
      180deg,
      #f3efff 0%,
      rgba(243, 239, 255, 0) 100%
    );
  }

  .title {
    margin-bottom: 5px;
    margin-left: 5px;
    color: #000;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }

  .subjects {
    margin-bottom: 5px;
    margin-left: 5px;
    font-size: 12px;
    font-weight: 600;
    line-height: 18px; /* 150% */
  }

  .slider-container {
    margin-top: 8px;
    padding: 8px;
  }
`;
const Container = styled.div`
  width: 358px;
  align-self: center;

  .start-inputs {
    display: flex;
    gap: 4px;
    color: var(--black, #09090a);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
    margin-bottom: 14px;

    input {
      outline: none;
      border: none;
      width: 21px;
      height: 24px;
      display: flex;
      padding: 0px 4px;
      align-items: flex-start;
      border-radius: 4px;
      background: var(--light, #f3efff);

      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 150% */
    }
  }
`;
const Input = styled.input`
  display: flex;
  align-self: center;
  outline: 0;
  border: 0;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding: 8px;
  border-radius: 8px;
  background: var(--light, #f3efff);
  margin-bottom: 12px;
`;

const Divider = styled.div`
  display: flex;
  width: 100%;
  height: 2px;
  background: #410fd4;
  margin-bottom: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  .btns {
    display: flex;
    margin-left: 5px;
    gap: 8px;
  }
  .btn {
    border-radius: 4px;
    background: var(--midgrey, #7e7e7e);
    display: inline-flex;
    padding: 5px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    color: var(--white, #fff);
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
  }
`;
const Content = styled.textarea`
  display: flex;
  width: 358px;
  height: 100px;
  border: none;
  outline: none;
  box-sizing: border-box;
  padding: 8px;
  align-items: flex-start;
  border-radius: 8px;
  background: var(--light, #f3efff);
  resize: none;
`;
const Footer = styled.div`
  margin-top: 16px;
  box-sizing: border-box;
  width: 100%;
  height: 88px;
  flex-shrink: 0;
  background: var(--main, #410fd4);
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;

  .container {
    display: flex;
  }

  .join-inputs {
    color: var(--white, #09090a);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
    display: flex;
    gap: 4px;
    padding-top: 8px;
    input {
      outline: none;
      border: none;
      width: 21px;
      height: 24px;
      display: flex;
      padding: 0px 4px;
      align-items: flex-start;
      border-radius: 4px;

      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 150% */
    }
  }

  .text {
    margin-left: 5px;
    padding: 8px 0;
    color: var(--white, #fff);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }

  .submit {
    display: flex;
    box-sizing: border-box;
    height: 34.607px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--sub, #beef62);

    color: var(--main, #410fd4);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }
`;
