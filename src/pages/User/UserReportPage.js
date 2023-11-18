import React, { useState } from "react";
import Header from "../../components/common/Header";
import { styled } from "styled-components";
import add from "../../assets/common/add.png";
import AddPhoto from "../../components/common/AddPhoto";
import AdBanner from "../../components/common/AdBanner";
import { useNavigate, useParams } from "react-router-dom";
import { reportPostUserReport } from "../../api/report";
import { s3GetImageUrl } from "../../api/s3presignedurl";

const UserReportPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [imgFile, setImgFile] = useState([]); //사진 한장만 첨부 가능이지만 배열처리 (백 로직)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    //요청
    let urls = [];
    if (content === "") {
      alert("신고 사유를 작성해주세요.");
    } else if (imgFile.length === 0) {
      alert("신고 대상자의 부적절한 활동을 증명할 사진을 1장 첨부해주세요");
    } else {
      //이미지 s3 업로드
      try {
        urls = await s3GetImageUrl(imgFile);
      } catch (err) {
        alert("이미지 업로드 에러");
      }

      const inputs = {
        targetId: id,
        content: content,
        images: urls,
      };
      try {
        const res = await reportPostUserReport(inputs);
        if (res.status) {
          alert("신고/제보가 등록되었습니다.");
          navigate("/");
        }
      } catch (err) {
        alert("신고/제보 등록 에러");
        console.log(err);
      }
    }
  };

  return (
    <>
      <Header title={"신고 및 제보"} isLogin={true} />
      <Wrapper>
        <Content
          placeholder="어떤 문제가 있는지 알려주세요."
          onChange={handleChange}
        />
        <div className="photo-container">
          <AddPhoto
            setImgFile={setImgFile}
            imgFile={imgFile}
            isMultiple={false}
            maxFiles={1}
          />
        </div>
        <div className="submit">
          <SubmitButton onClick={handleSubmit}>신고 / 제보하기</SubmitButton>
        </div>
      </Wrapper>
      <AdBanner />
    </>
  );
};

export default UserReportPage;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto 0;

  .photo-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;
  }

  .submit {
    position: absolute;
    bottom: 86px;
    right: 5%;
    width: 100%;
    display: flex;
    justify-content: end;
  }
`;
const Content = styled.textarea`
  font-size: 12px;
  display: flex;
  border: none;
  outline: none;
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: 288px;
  padding: 8px;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--light, #f3efff);
`;
const SubmitButton = styled.div`
  cursor: pointer;
  display: inline-flex;
  box-sizing: border-box;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: var(--sub, #beef62);

  color: var(--main, #410fd4);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;
