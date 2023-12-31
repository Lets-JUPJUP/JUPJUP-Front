import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ic_star_default from "../../assets/common/ic_star_default.png";
import ic_star_clicked from "../../assets/common/ic_star_clicked.png";
import ic_star_default_main from "../../assets/common/ic_star_default_main.png";
import ic_star_clicked_main from "../../assets/common/ic_star_clicked_main.png";

import img_default1 from "../../assets/common/defaultImage/img_default1.png";
import img_default2 from "../../assets/common/defaultImage/img_default2.png";
import img_default3 from "../../assets/common/defaultImage/img_default3.png";

import Tag from "./Tag";
import { settingGender } from "./gender";
import { settingAge } from "./ageRange";
import { settingDate } from "./time";
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

  useEffect(() => {
    // 찜하기 초기 상태 설정
    setIsClicked(isHearted);
  }, [isHearted]);

  const onStarClick = async (event) => {
    event.stopPropagation(); // 상세 페이지 이동 이벤트 버블링 막기
    if (isHearted === null) {
      alert("해당 기능을 사용하기 위해서는 로그인이 필요합니다!");
      navigate(`/login`);
    } else {
      isClicked === true ? await deleteHeart(id) : await postHeart(id);
      setIsClicked(!isClicked);
    }
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
    if (fileUrls?.length > 0) {
      // 이미지가 있으면
      return fileUrls[0];
    } else {
      // 이미지가 없는 경우 기본 이미지 3개 중에 출력
      return id % 3 === 0
        ? img_default1
        : id % 3 === 1
        ? img_default2
        : img_default3;
    }
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
          <div>일시 | {settingDate(startDate) + "~"}</div>
          <div className="tagList">
            <Tag name={settingAge(postAgeRanges)} status={status} />
            <Tag name={settingGender(postGender)} status={status} />
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
