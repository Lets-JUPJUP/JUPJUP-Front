import React from "react";
import { styled } from "styled-components";

import ic_userbig from "../../assets/common/ic_userbig.png";

const PloggingInfo = () => {
  const ploggingData = [
    { title: "출발 일시", content: "| 텍스트" },
    { title: "출발 장소", content: "| 텍스트" },
    { title: "참여 인원", content: "| 최소 n인 ~ 최소 N인" },
    { title: "참여 성별", content: "| 성별무관" },
    { title: "참여 연령", content: "| 연령무관" },
  ];
  return (
    <Wrapper>
      <UserInfo>
        <div className="userImage">
          <img src={ic_userbig} alt="userbig" />
        </div>
        <div className="userText">
          <div>
            <BigBoldText>사용자 이름</BigBoldText>
            <SmallGreyText>00/00 00:00</SmallGreyText>
          </div>
          <SmallBoldText className="linkText">
            프로필 보러가기 &gt;
          </SmallBoldText>
        </div>
      </UserInfo>
      <SmallBoldText className="endTime">
        00월 00일 00:00까지 참여자 모집 중
      </SmallBoldText>
      <InfoBox className="margin">
        {ploggingData.map((item) => {
          return (
            <Info>
              <SmallBoldText>{item.title}</SmallBoldText>
              <SmallBoldText>{item.content}</SmallBoldText>
            </Info>
          );
        })}
      </InfoBox>
      <ContentBox className="margin">
        주최자가 자유롭게 작성하는 글 내용 상자
      </ContentBox>
    </Wrapper>
  );
};

export default PloggingInfo;

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 40px;
  }

  .userText {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const ContentBox = styled.div`
  background: var(--light, #f3efff);
  padding: 8px;
  border-radius: 8px;

  &.margin {
    margin-bottom: 16px;
  }
`;

const InfoBox = styled(ContentBox)`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.margin {
    margin-bottom: 12px;
  }
`;

const Info = styled.div`
  display: flex;
  gap: 8px;
`;

// 글씨 종류
const BigBoldText = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const SmallBoldText = styled.div`
  font-weight: 600;

  &.endTime {
    margin-left: 48px; // 이미지 40px + gap 8px
    margin-bottom: 8px;
  }

  &.linkText {
    color: var(--midgrey, #7e7e7e);
    cursor: pointer;
  }
`;

const SmallGreyText = styled.div`
  color: var(--midgrey, #7e7e7e);
  margin-top: 3px;
`;
