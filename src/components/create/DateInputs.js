import React, { useEffect } from "react";
import styled from "styled-components";

const DateInputs = ({ date, setDate, isColored = "false" }) => {
  const handleChange = (e) => {
    const { value, name } = e.target;
    setDate({
      ...date,
      [name]: String(value).padStart(2, "0"),
    });
  };

  return (
    <Wrapper>
      <Input
        $isColored={isColored}
        className="month"
        name="month"
        placeholder="00"
        type="number"
        min="1"
        max="12"
        onChange={handleChange}
        maxLength="2"
        onInput={(e) => {
          if (e.target.value.length > e.target.maxLength)
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }}
      />
      월
      <Input
        $isColored={isColored}
        className="date"
        name="date"
        placeholder="00"
        type="number"
        min="1"
        max="31"
        onChange={handleChange}
        maxLength="2"
        onInput={(e) => {
          if (e.target.value.length > e.target.maxLength)
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }}
      />
      일
      <Input
        $isColored={isColored}
        className="hour"
        name="hour"
        placeholder="00"
        type="number"
        min="0"
        max="23"
        onChange={handleChange}
        maxLength="2"
        onInput={(e) => {
          if (e.target.value.length > e.target.maxLength)
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }}
      />
      시
      <Input
        $isColored={isColored}
        className="min"
        name="min"
        placeholder="00"
        type="number"
        min="0"
        max="60"
        onChange={handleChange}
        maxLength="2"
        onInput={(e) => {
          if (e.target.value.length > e.target.maxLength)
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }}
      />
      분
    </Wrapper>
  );
};

export default DateInputs;
const Wrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const Input = styled.input`
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

  background: ${(props) => (props.$isColored === "true" ? "#f3efff" : "#fff")};
`;
