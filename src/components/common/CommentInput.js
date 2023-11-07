import { useState } from "react";
import styled from "styled-components";
import ic_arrowup from "../../assets/common/ic_arrowup.png";
import ic_arrowup_white from "../../assets/common/ic_arrowup_white.png";

// 댓글 입력창
const CommentInput = () => {
  // textarea focus 여부
  const [inputFocused, setInputFocused] = useState(false);
  // 댓글 입력값 저장
  const [comment, setComment] = useState("");
  return (
    <Wrapper>
      <textarea
        placeholder="댓글을 입력해봐요."
        onFocus={() => {
          setInputFocused(true);
        }}
        onBlur={() => {
          setInputFocused(false);
        }}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />

      <img src={inputFocused ? ic_arrowup : ic_arrowup_white} alt="submit" />
    </Wrapper>
  );
};

export default CommentInput;

const Wrapper = styled.div`
  width: 100%;
  height: 34px;

  box-sizing: border-box;
  padding: 8px 5%;

  background: var(--main, #410fd4);

  position: fixed;
  bottom: 0;

  display: flex;
  align-items: center;
  gap: 4px;

  textarea {
    width: 100%;
    height: 24px;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 600;
    line-height: 24px;

    border: none;

    background: var(--main, #410fd4);
    color: var(--white, #fff);
  }

  // 댓글 창 focus 되었을 때
  textarea:focus {
    height: 72px;
    border: none;
    outline: none;

    line-height: normal;

    background: var(--light, #f3efff);
    color: var(--black, #09090a);
  }

  // focus되었을 때 부모 요소 변경
  &:focus-within {
    background: var(--light, #f3efff);
    height: 88px;
    align-items: flex-start;
  }

  img {
    width: 20px;
    cursor: pointer;
  }
`;
