import React from "react";
import Header from "../../components/common/Header";
import { styled } from "styled-components";
import add from "../../assets/common/add.png";
import AddPhoto from "../../components/common/AddPhoto";
import AdBanner from "../../components/common/AdBanner";

const UserReportPage = () => {
  return (
    <>
      <Header title={"신고 및 제보"} isLogin={true} />
      <Wrapper>
        <Content placeholder="어떤 문제가 있는지 알려주세요." />
        <div className="photo-container">
          <AddPhoto />
        </div>
        <div className="submit">
          <SubmitButton>신고 / 제보하기</SubmitButton>
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
