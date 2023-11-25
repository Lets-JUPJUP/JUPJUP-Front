import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { goodFeedbackList, badFeedbackList } from "./feedbackList";

// 플로깅 상세 페이지 사용자 목록
const TrashBottomSheet = ({ selectedData }) => {
  // 가로쓰레기통, 푸르미 재활용장 이미지 순서
  const trashCanImgUrl =
    "https://mediahub.seoul.go.kr/uploads/mediahub/2021/09/tpuykXsdsBZQXeTWToBZZEYuYyQSMNof.jpeg";
  const recycleStationImgUrl =
    "https://blog.kakaocdn.net/dn/W21sn/btriHBWbViQ/L13mvEr72tjXcnfFi2S9Ak/img.jpg";

  //   console.log(selectedData);
  return (
    <Wrapper>
      <div className="title">
        {selectedData.trashCanType === "RECYCLING_STATION"
          ? "성동 푸르미 재활용 정거장"
          : "성동 가로쓰레기통"}{" "}
        - {selectedData.detail}
      </div>
      <div className="address">{selectedData.address}</div>
      <TrashImage
        url={
          selectedData.trashCanType === "RECYCLING_STATION"
            ? recycleStationImgUrl
            : trashCanImgUrl
        }
      />
      <div className="feedbackSection">
        <div className="subTitle">👍 좋아요</div>
        <div className="feedbackList">
          {goodFeedbackList.map((feedback, index) => {
            return <TrashFeedBack key={index}>{feedback.title}</TrashFeedBack>;
          })}
        </div>
      </div>
      <DivisionLine />
      <div className="feedbackSection">
        <div className="subTitle">👎 나빠요</div>
        <div className="feedbackList">
          {badFeedbackList.map((feedback, index) => {
            return <TrashFeedBack key={index}>{feedback.title}</TrashFeedBack>;
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default TrashBottomSheet;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 80px; // AdBanner 높이 68px + gap 12px

  font-weight: 600;

  .title {
    font-size: 16px;
    margin-top: 20px;
  }

  .address {
    margin-top: 4px;
    margin-bottom: 12px;
  }

  .feedbackSection {
    width: 90%;
    margin: 16px 0;

    .subTitle {
      font-size: 16px;
    }

    .feedbackList {
      width: 90%;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      margin-top: 12px;
    }
  }
`;

const TrashImage = styled.div`
  width: 90%;
  max-width: 390px;
  height: 88px;
  background: ${(props) => `url(${props.url}) center/cover no-repeat`};
`;

const TrashFeedBack = styled.span`
  display: flex;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 4px;

  background: var(--grey, #e8e8e8);
  color: var(--main, #410fd4);

  margin-right: 8px;
  cursor: pointer;
`;

const TrashFeedBackClicked = styled(TrashFeedBack)`
  background: var(--main, #410fd4);
  color: var(--white, #fff);
`;

const DivisionLine = styled.div`
  width: 95%;
  height: 1.2px;
  background: var(--main, "#410FD4");
`;
