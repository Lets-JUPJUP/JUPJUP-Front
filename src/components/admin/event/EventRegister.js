import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { s3GetImageUrl } from "../../../api/s3presignedurl";
import { adminPostEvent } from "../../../api/admin";

const EventRegister = () => {
  const navigate = useNavigate();

  // 공식 행사 폼 데이터
  const [eventForm, setEventForm] = useState({
    title: "",
    infoUrl: "",
    imageUrl: "",
  });

  //이미지 원본 파일
  const [imgFile, setImgFile] = useState(null);

  // title, infoUrl 업로드
  const handleTextChange = (e) => {
    const { value, name } = e.target;
    setEventForm({
      ...eventForm,
      [name]: value,
    });
  };

  // image file 업로드
  const handleUploadImage = (e) => {
    const fileData = e.target.files[0];
    setImgFile(fileData);
  };

  // 등록 완료 버튼 클릭 시 실행
  const handleSubmit = async () => {
    let s3imgUrl = ""; // 이미지 url 변수
    // 제목, url 입력하지 않았을 경우 return
    if (eventForm.title === "" || eventForm.infoUrl === "") {
      alert("항목을 모두 입력해주세요!");
      return;
    } else if (imgFile === null) {
      // 이미지 입력하지 않았을 경우 return
      alert("이미지를 업로드해주세요!");
      return;
    } else {
      // 이미지 s3 업로드
      try {
        s3imgUrl = await s3GetImageUrl([imgFile]); // 배열 형태로 post
        // console.log("이미지 링크", s3imgUrl[0]);
      } catch (err) {
        alert("이미지 업로드 오류");
        console.log(err);
      }
      // 제출
      if (s3imgUrl !== "") {
        try {
          const res = await adminPostEvent({
            ...eventForm,
            imageUrl: s3imgUrl[0],
          });
          if (res.status === 200) {
            alert("게시글이 성공적으로 등록되었습니다!");
            navigate(`/admin/event-manage`);
          } else if (
            res.status === "BAD_REQUEST" ||
            res.status === "FORBIDDEN"
          ) {
            alert(res.message);
          }
        } catch (err) {
          alert("공식 행사 정보 게시글 작성 오류");
          console.log(err);
        }
      }
    }
  };

  return (
    <Wrapper>
      <div className="inputSection">
        <div className="title">행사명</div>
        <input
          placeholder="행사명"
          type="text"
          name="title"
          onChange={handleTextChange}
        />
      </div>
      <div className="inputSection">
        <div className="title">이미지</div>
        <input
          placeholder="이미지 url"
          type="file"
          accept="image/*"
          onChange={handleUploadImage}
        />
      </div>
      <div className="inputSection">
        <div className="title">연결 링크</div>
        <input
          placeholder="웹페이지 url"
          type="url"
          name="infoUrl"
          onChange={handleTextChange}
        />
      </div>
      <div className="buttonSection">
        <RegisterBtn onClick={handleSubmit}>등록 완료</RegisterBtn>
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
