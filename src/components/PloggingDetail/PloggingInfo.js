import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import ic_userbig from "../../assets/common/ic_userbig.png";

import { settingAge } from "../common/ageRange";
import { settingGender } from "../common/gender";
import { settingDate } from "../common/time";

const PloggingInfo = ({
  authorId,
  authorNickname,
  authorProfileImageUrl,
  createdAt,
  startPlace,
  startDate,
  dueDate,
  minMember,
  maxMember,
  postAgeRanges,
  postGender,
  content,
}) => {
  // 플로깅 데이터
  const ploggingData = [
    {
      title: "출발 일시",
      content: `| ${settingDate(startDate, true) + "~"}`,
    },
    { title: "출발 장소", content: `| ${startPlace}` },
    {
      title: "참여 인원",
      content: `| 최소 ${minMember}인 ~ 최소 ${maxMember}인`,
    },
    {
      title: "참여 성별",
      content: `| ${settingGender(postGender)}`,
    },
    {
      title: "참여 연령",
      content: `| ${settingAge(postAgeRanges)}`,
    },
  ];

  const navigate = useNavigate();

  // 사용자 상세 페이지로 이동
  const linkToUserPage = () => {
    navigate(`/user-profile/${authorId}`);
  };

  return (
    <Wrapper>
      <UserInfo>
        <div className="userImage">
          <img
            src={authorProfileImageUrl ? authorProfileImageUrl : ic_userbig}
            alt="userbig"
            onClick={linkToUserPage}
          />
        </div>
        <div className="userText">
          <div>
            <BigBoldText>{authorNickname}</BigBoldText>
            <SmallGreyText>{settingDate(createdAt)}</SmallGreyText>
          </div>
          <SmallBoldText className="linkText" onClick={linkToUserPage}>
            프로필 보러가기 &gt;
          </SmallBoldText>
        </div>
      </UserInfo>
      <SmallBoldText className="endTime">
        {settingDate(dueDate, true)}까지 참여자 모집 중
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
      <ContentBox className="margin">{content}</ContentBox>
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
    height: 40px;
    border-radius: 40px;
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
