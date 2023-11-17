import React, { useState } from "react";
import { styled } from "styled-components";
import RangeSlider from "./RangeSlider";
import { age_marks, count_marks } from "./marks";
import AddPhoto from "../common/AddPhoto";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";

import { getFormattedAgeRange } from "../common/ageRange";
import { postsCreatePlogging } from "../../api/posts";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [inputs, setInputs] = useState({
    title: "",
    startPlace: "",
    content: "",
  });
  const [count, setCount] = useState([2, 10]);
  const [ageRange, setAgeRange] = useState([10, 70]);

  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [postGender, setPostGender] = useState("ANY");
  const [withPet, setWithPet] = useState(false);

  const [imgFile, setImgFile] = useState([]); //이미지 원본 파일 배열
  const [imgUrls, setImgUrls] = useState([]); //이미지 s3 url
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      inputs.title &&
      inputs.startPlace &&
      inputs.content &&
      startDate &&
      dueDate
    ) {
      if (startDate < dueDate) {
        alert("모집 마감 일시는 시작 일시보다 빨라야 합니다.");
        return;
      }

      //날짜 포맷
      let formatted_due = handleDateFormat(dueDate);
      let formatted_start = handleDateFormat(startDate);

      //요청 바디
      let inputs_to_send = {
        ...inputs,
        startDate: formatted_start,
        minMember: count[0],
        maxMember: count[1],
        postGender: postGender,
        postAgeRanges: getFormattedAgeRange(ageRange),
        dueDate: formatted_due,
        withPet: withPet,
        images: imgUrls,
      };
      setInputs(inputs_to_send);

      try {
        //모집글 등록 요청
        const res = await postsCreatePlogging(inputs_to_send);
        if (res.status === 200) {
          alert("모집글이 등록 되었습니다.");
          navigate("/"); //리스트 목록으로 추후 수정
        }
      } catch (err) {
        alert("글 작성 오류");
      }
    } else {
      alert("내용을 모두 입력하세요.");
    }
  };

  const handleDateFormat = (date) => {
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(date - tzoffset).toISOString().substr(0, 16);
    return localISOTime;
  };

  const ExampleCustomInput = forwardRef(
    ({ isColored = "false", isBigFont = "false", value, onClick }, ref) => (
      <CustomCalendarInput
        $isColored={isColored}
        $isBigFont={isBigFont}
        className="custom-date-input"
        onClick={onClick}
        ref={ref}
      >
        {value !== "" ? (
          value
        ) : (
          <div className="placeholder">날짜를 선택하세요</div>
        )}
      </CustomCalendarInput>
    )
  );

  return (
    <Wrapper>
      <div className="gradient" />
      <Container>
        <div className="title">제목</div>
        <Input name="title" placeholder="입력하기" onChange={handleChange} />
        <Divider />
        <div className="subjects">출발 일시</div>
        <div className="start-inputs">
          <ReactDatePicker
            dateFormat="yyyy.MM.dd HH:mm"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeInputLabel="Time:"
            customInput={<ExampleCustomInput isColored={"true"} />}
            showTimeSelect
            timeFormat="HH:mm"
            minDate={new Date()}
          />
        </div>

        <div className="subjects">출발 장소</div>
        <Input
          name="startPlace"
          placeholder="입력하기"
          onChange={handleChange}
        />
        <div className="subjects">참여 인원</div>
        <div className="slider-container">
          <RangeSlider
            marks={count_marks}
            min={2}
            max={10}
            step={1}
            value={count}
            setValue={setCount}
          />
        </div>
        <div className="subjects">참여 성별</div>
        <ButtonContainer>
          <div className="btns">
            <Btn
              className="btn"
              $isclicked={String(postGender === "ANY")}
              onClick={() => {
                setPostGender("ANY");
              }}
            >
              성별무관
            </Btn>
            <Btn
              className="btn"
              $isclicked={String(postGender === "FEMALE")}
              onClick={() => {
                setPostGender("FEMALE");
              }}
            >
              여성만
            </Btn>
            <Btn
              className="btn"
              $isclicked={String(postGender === "MALE")}
              onClick={() => {
                setPostGender("MALE");
              }}
            >
              남성만
            </Btn>
          </div>

          <div className="btns">
            <Btn
              $isclicked={String(withPet)}
              className="btn"
              onClick={() => {
                setWithPet(!withPet);
              }}
            >
              반려동물과 함께
            </Btn>
          </div>
        </ButtonContainer>
        <div className="subjects">참여 연령</div>
        <div className="slider-container">
          <RangeSlider
            marks={age_marks}
            min={10}
            max={70}
            step={10}
            value={ageRange}
            setValue={setAgeRange}
            minDistance={10}
            disableSwap={true}
          />
        </div>
        <Divider />
        <div className="subjects">본문</div>
        <Content
          name="content"
          placeholder="본문 내용을 작성해주세요."
          onChange={handleChange}
        />
        <AddPhoto setImgFile={setImgFile} imgFile={imgFile} />
      </Container>

      <Footer>
        <div className="container">
          <div className="join-inputs">
            <ReactDatePicker
              dateFormat="yyyy.MM.dd HH:mm"
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              timeInputLabel="Time:"
              customInput={<ExampleCustomInput isBigFont={"true"} />}
              showTimeSelect
              timeFormat="HH:mm"
              maxDate={startDate}
              minDate={new Date()}
            />
          </div>
          <div className="text">까지 모집</div>
        </div>
        <div className="submit" onClick={handleSubmit}>
          작성하기
        </div>
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
    color: var(--black, #09090a);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
    margin-bottom: 14px;
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
`;

const Btn = styled.div`
  background: ${(props) =>
    props.$isclicked === "true" ? "#BEEF62" : "#7e7e7e"};
  border-radius: 4px;

  display: inline-flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${(props) => (props.$isclicked === "true" ? "#410FD4" : "#fff")};

  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
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
    padding-top: 4px;
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
const CustomCalendarInput = styled.div`
  height: 34px;
  display: flex;
  padding: 0px 8px;
  align-items: center;
  border-radius: 4px;

  font-size: ${(props) => (props.$isBigFont === "true" ? "16px" : "14px")};
  font-weight: ${(props) => (props.$isBigFont === "true" ? "600" : "400")};
  line-height: 18px;
  border-radius: 8px;
  color: #000;
  background: ${(props) => (props.$isColored === "true" ? "#f3efff" : "#fff")};
  .placeholder {
    color: gray;
  }
`;
