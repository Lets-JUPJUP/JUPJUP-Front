import { useState } from "react";
import styled from "styled-components";
import ic_close from "../../assets/common/ic_close.png";
import ic_arrowup from "../../assets/common/ic_arrowup.png";
import ic_arrowup_white from "../../assets/common/ic_arrowup_white.png";

// 댓글 입력창
const CommentInput = ({ setWriteMode }) => {
  // textarea focus 여부 (true일 경우 댓글창 크기가 커짐)
  const [inputFocused, setInputFocused] = useState(false);
  // 댓글 입력값 저장
  const [comment, setComment] = useState("");

  // 댓글 창 close 버튼 클릭 시 댓글 창이 사라지고 footer 등장
  const closeInput = () => {
    setWriteMode(false);
  };

  return (
    <>
      {inputFocused ? (
        <Wrapper>
          <RestDiv
            onClick={() => {
              // 클릭 시 기본 댓글창으로 변경
              setInputFocused(false);
            }}
          />
          <MainDiv className="focused">
            <textarea
              placeholder="댓글을 입력해봐요."
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
            />
            <div className="buttonDiv">
              <img src={ic_close} alt="close" onClick={closeInput} />
              <img src={ic_arrowup} alt="submit" />
            </div>
          </MainDiv>
        </Wrapper>
      ) : (
        <MainDiv
          className="default"
          onClick={() => {
            setInputFocused(true);
          }}
        >
          <Text>{comment.length > 0 ? comment : "댓글을 입력해봐요."}</Text>
          <img src={ic_arrowup_white} alt="submit" />
        </MainDiv>
      )}
    </>
  );
};

export default CommentInput;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
`;

const RestDiv = styled.div`
  width: 100%;
  height: calc(100% - 88px);
  /* 댓글 입력창 영역 밖 */
`;

const MainDiv = styled.div`
  width: 100%;

  box-sizing: border-box;
  padding: 8px 5%;

  position: fixed;
  bottom: 0;

  display: flex;

  gap: 4px;

  // 기본 div
  &.default {
    background: var(--main, #410fd4);
    height: 34px;
    align-items: center;
  }

  // focus되었을 때
  &.focused {
    background: var(--light, #f3efff);
    height: 88px;
    align-items: flex-start;
  }

  textarea {
    width: 100%;
    height: 72px;

    font-family: Pretendard;
    font-size: 12px;
    font-weight: 600;

    border: none;
    outline: none;

    line-height: normal;

    background: var(--light, #f3efff);
    color: var(--black, #09090a);
  }

  img {
    width: 20px;
    cursor: pointer;
  }

  .buttonDiv {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

// 기본 댓글창
const Text = styled.div`
  width: 100%;
  height: 24px;

  font-size: 12px;
  font-weight: 600;
  line-height: 24px;

  border: none;

  background: var(--main, #410fd4);
  color: var(--white, #fff);

  overflow-y: scroll;
`;
