import React from "react";
import { styled } from "styled-components";

import badge_0 from "../../assets/user/badges/badge_0.png";
import badge_1 from "../../assets/user/badges/badge_1.png";
import badge_2 from "../../assets/user/badges/badge_2.png";
import badge_3 from "../../assets/user/badges/badge_3.png";
import badge_4 from "../../assets/user/badges/badge_4.png";
import badge_5 from "../../assets/user/badges/badge_5.png";
import badge_6 from "../../assets/user/badges/badge_6.png";
import badge_7 from "../../assets/user/badges/badge_7.png";
import badge_8 from "../../assets/user/badges/badge_8.png";
import badge_9 from "../../assets/user/badges/badge_9.png";
import badge_10 from "../../assets/user/badges/badge_10.png";
import badge_11 from "../../assets/user/badges/badge_11.png";
import badge_12 from "../../assets/user/badges/badge_12.png";

export const badgeList = [
  {
    id: 0,
    icon: badge_0,
    text: "걸음이 빠른 스피드 플로거",
  },
  {
    id: 1,
    icon: badge_1,
    text: "열정이 넘치는 파이어 플로거",
  },
  {
    id: 2,
    icon: badge_2,
    text: "여유로운 슬로우 플로거",
  },
  {
    id: 3,
    icon: badge_3,
    text: "친절한 성동 가이드 금자씨",
  },
  {
    id: 4,
    icon: badge_4,
    text: "가본 적 없는 루트 개척자",
  },
  {
    id: 5,
    icon: badge_5,
    text: "환경을 사랑하는 에코 플로거",
  },
  {
    id: 6,
    icon: badge_6,
    text: "칼같은 시간 관리의 달인",
  },
  {
    id: 7,
    icon: badge_7,
    text: "성동구 거리를 지배하는 지리 마에스트로",
  },
  {
    id: 8,
    icon: badge_8,
    text: "깔끔함과 꼼꼼함의 대명사",
  },
  {
    id: 9,
    icon: badge_9,
    text: "긍정적인 해피 바이러스",
  },
  {
    id: 10,
    icon: badge_10,
    text: "마무리도 완벽한 플로깅 고수",
  },
  {
    id: 11,
    icon: badge_11,
    text: "함께 또 걷고 싶은 플로깅 파트너",
  },
  {
    id: 12,
    icon: badge_12,
    text: "귀엽고 깜찍한 네 발 친구",
  },
];
const Badge = ({
  id,
  size = "12px",
  isShowCount = false,
  count = 0,
  isSelected = false,
}) => {
  return isSelected ? (
    <WrapperSelected>
      <img className="icon" src={badgeList[id].icon} alt="" />
      {badgeList[id].text}
      {isShowCount ? <div> ( {count} )</div> : <></>}
    </WrapperSelected>
  ) : (
    <Wrapper $size={size} $isBlack={isShowCount}>
      <img className="icon" src={badgeList[id].icon} alt="" />
      {badgeList[id].text}
      {isShowCount ? <div> ( {count} )</div> : <></>}
    </Wrapper>
  );
};

export default Badge;

const Wrapper = styled.div`
  display: flex;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  background: var(--grey, #e8e8e8);

  color: ${(props) => (props.$isBlack ? "#000" : "#410fd4")};
  font-size: ${(props) => props.$size};
  font-weight: 600;
  line-height: 18px; /* 150% */

  .icon {
    width: ${(props) => props.$size};
    height: ${(props) => props.$size};
  }
`;

const WrapperSelected = styled.div`
  display: flex;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  background: #410fd4;

  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px; /* 150% */

  .icon {
    width: 12px;
    height: 12px;
  }
`;
