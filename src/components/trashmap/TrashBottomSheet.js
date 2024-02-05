import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { goodFeedbackList, badFeedbackList } from "./feedbackList";
import { getTrashCanFeedback, postTrashCanFeedback } from "../../api/trashmap";

// 플로깅 상세 페이지 사용자 목록
const TrashBottomSheet = ({ selectedData }) => {
  // 가로쓰레기통, 푸르미 재활용장 이미지 순서
  const trashCanImgUrl =
    "https://mediahub.seoul.go.kr/uploads/mediahub/2021/09/tpuykXsdsBZQXeTWToBZZEYuYyQSMNof.jpeg";
  const recycleStationImgUrl =
    "https://blog.kakaocdn.net/dn/W21sn/btriHBWbViQ/L13mvEr72tjXcnfFi2S9Ak/img.jpg";

  // 각 쓰레기통에 대한 피드백 posted 여부
  const [isFeedbackPosted, setIsFeedbackPosted] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });

  // 쓰레기통 피드백 여부 받아오는 함수
  const getFeedbackData = async () => {
    const res = await getTrashCanFeedback(selectedData.id);
    // console.log(selectedData.id);
    // console.log("쓰레기통 피드백 여부", res.data);
    setIsFeedbackPosted(res.data);
  };

  useEffect(() => {
    getFeedbackData();
  }, [selectedData.id]);

  // 피드백 버튼 클릭 시 실행되는 함수
  const onFeedbackClick = async (feedbackCode) => {
    try {
      // post 보내기
      const res = await postTrashCanFeedback(selectedData.id, feedbackCode);
      alert(`'${res.data.data.feedback}' 피드백이 정상적으로 전달되었습니다!`);
      // 색깔 변경
      setIsFeedbackPosted((prevState) => {
        return { ...prevState, [feedbackCode]: true };
      });
    } catch (err) {
      console.log(err);
      alert(
        "피드백을 전달하는 과정에서 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  // 이미 전달된 피드백 버튼 클릭 시 실행되는 함수
  const onAlreadyClick = () => {
    alert("이미 관리자에게 전달된 피드백입니다!");
  };

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
            // 이미 제출한 피드백의 경우 보라색 버튼으로 변경
            return isFeedbackPosted[feedback.feedbackCode] === false ? (
              <TrashFeedBack
                key={index}
                onClick={() => onFeedbackClick(feedback.feedbackCode)}
              >
                {feedback.title}
              </TrashFeedBack>
            ) : (
              <TrashFeedBackClicked key={index} onClick={onAlreadyClick}>
                {feedback.title}
              </TrashFeedBackClicked>
            );
          })}
        </div>
      </div>
      <DivisionLine />
      <div className="feedbackSection">
        <div className="subTitle">👎 나빠요</div>
        <div className="feedbackList">
          {badFeedbackList.map((feedback, index) => {
            // 이미 제출한 피드백의 경우 보라색 버튼으로 변경
            return isFeedbackPosted[feedback.feedbackCode] === false ? (
              <TrashFeedBack
                key={index}
                onClick={() => onFeedbackClick(feedback.feedbackCode)}
              >
                {feedback.title}
              </TrashFeedBack>
            ) : (
              <TrashFeedBackClicked key={index} onClick={onAlreadyClick}>
                {feedback.title}
              </TrashFeedBackClicked>
            );
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
