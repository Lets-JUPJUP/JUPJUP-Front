import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ic_star_default from "../../assets/common/ic_star_default.png";
import ic_star_clicked from "../../assets/common/ic_star_clicked.png";
import ic_star_default_main from "../../assets/common/ic_star_default_main.png";
import ic_star_clicked_main from "../../assets/common/ic_star_clicked_main.png";
import Tag from "./Tag";
import { getKorGender } from "./gender";
import { getKorPostAgeRanges } from "./ageRange";
import { deleteHeart, postHeart } from "../../api/heart";

// 보라색 배경: 참여 전 or 모집 중
// 연초록색 배경: 참여 완료
// 회색 배경: 모집 완료

const PloggingPostBox = ({
  status,
  id,
  fileUrls,
  title,
  isHearted,
  startPlace,
  startDate,
  postAgeRanges,
  postGender,
  withPet,
}) => {
  // 전체 박스 클릭 시 상세 페이지로 이동
  const navigate = useNavigate();
  const linkToDetailPage = () => {
    navigate(`/plogging-detail/${id}`);
  };

  // 찜하기(★) 여부
  const [isClicked, setIsClicked] = useState(false);

  const onStarClick = () => {
    setIsClicked(!isClicked);
  };

  // 참여 완료(join) 상태일 경우 보라색 별 아이콘 설정
  const settingStarIcon = () => {
    if (status === "join") {
      return isClicked ? ic_star_clicked_main : ic_star_default_main;
    } else {
      return isClicked ? ic_star_clicked : ic_star_default;
    }
  };

  // 박스 배경색 설정
  const settingBackgroundColor = () => {
    if (status === "join") {
      return `var(--subbright, #EEFFCE)`;
    } else if (status === "finish") {
      return `var(--grey, #E8E8E8)`;
    } else {
      return `var(--light, #f3efff)`;
    }
  };

  // 이미지 url 설정 (ex. "https://~~")
  const settingImageUrl = () => {
    // 기본 이미지
    const defaultImgUrl =
      "https://img.freepik.com/premium-vector/environmental-protection-banner-people-are-jogging-and-picking-up-trash-plogging_540284-690.jpg";
    return fileUrls.length > 0 ? fileUrls[0] : defaultImgUrl;
  };

  // startDate 설정 (ex. "2023-03-06T09:30:00")
  const settingDate = () => {
    const [date, time] = startDate.split("T");
    const [, month, day] = date.split("-");
    // time에서 seconds는 제외하고 출력
    return month + "/" + day + " " + time.slice(0, time.length - 3) + "~";
  };

  // age 설정 (ex. ['AGE_20_29', 'AGE_30_39'])
  const settingAge = () => {
    const ageResult = getKorPostAgeRanges(postAgeRanges);
    if (ageResult === "연령무관") {
      return ageResult;
    } else {
      const [min, max] = ageResult;
      return min + "~" + max + "세";
    }
  };

  // gender 설정 (ex. FEMALE)
  const settingGender = () => {
    return getKorGender(postGender) + (postGender !== "ANY" ? "만" : "");
  };

  return (
    <Wrapper color={settingBackgroundColor()} onClick={linkToDetailPage}>
      <ImageBox url={settingImageUrl()} />
      <ContentBox>
        <Content>
          <div className="title">{title}</div>
          <StarIcon src={settingStarIcon()} alt="별" onClick={onStarClick} />
        </Content>
        <Content className="content">
          <div>장소 | {startPlace}</div>
        </Content>
        <Content className="content">
          <div>일시 | {settingDate()}</div>
          <div className="tagList">
            <Tag name={settingAge()} status={status} />
            <Tag name={settingGender()} status={status} />
          </div>
        </Content>
        {withPet === true ? (
          <WithPetDiv>
            <Tag name="반려동물과 함께" status={status} />
          </WithPetDiv>
        ) : null}
      </ContentBox>
    </Wrapper>
  );
};

export default PloggingPostBox;

const Wrapper = styled.div`
  width: 90%;
  /* height: 62px; */

  padding: 8px;

  // padding이 width 안쪽으로 생기게 수정
  box-sizing: border-box;

  border-radius: 8px;

  // join(참여 완료)일 때는 연초록, finish(모집 완료)일 때는 회색, 나머지는 보라색 배경
  background: ${(props) => props.color};

  display: flex;
  gap: 8px;
`;

const ImageBox = styled.div`
  width: 60px;
  height: 62px;

  border-radius: 4px;

  background-image: ${(props) => `url(${props.url})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ContentBox = styled.div`
  /* 이미지박스 제외한 나머지 넓이 */
  width: calc(100% - 60px);
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .title {
    font-weight: 600;
    margin-bottom: 8px;
  }

  .tagList {
    display: flex;
    gap: 2px;
  }

  &.content {
    margin-bottom: 4px;
  }
`;

const WithPetDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StarIcon = styled.img`
  width: 16px;
  // main color로 filter
  /* filter: brightness(0) saturate(100%) invert(17%) sepia(91%) saturate(5802%)
      hue-rotate(257deg) brightness(78%) contrast(120%); */
`;
