import { useState } from "react";
import styled from "styled-components";
import ic_star_default from "../../assets/common/ic_star_default.png";
import ic_star_clicked from "../../assets/common/ic_star_clicked.png";
import ic_star_default_main from "../../assets/common/ic_star_default_main.png";
import ic_star_clicked_main from "../../assets/common/ic_star_clicked_main.png";
import Tag from "./Tag";

// 보라색 배경: 참여 전 or 모집 중
// 연초록색 배경: 참여 완료
// 회색 배경: 모집 완료

const PloggingPostBox = ({ status }) => {
  // 클릭 여부
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

  const settingBackgroundColor = () => {
    if (status === "join") {
      return `var(--subbright, #EEFFCE)`;
    } else if (status === "finish") {
      return `var(--grey, #E8E8E8)`;
    } else {
      return `var(--light, #f3efff)`;
    }
  };

  return (
    <Wrapper color={settingBackgroundColor()}>
      <ImageBox />
      <ContentBox>
        <Content>
          <div className="title">제목</div>
          <StarIcon src={settingStarIcon()} alt="별" onClick={onStarClick} />
        </Content>
        <Content>
          <div style={{ marginBottom: "4px" }}>장소 | 가나다라마바사</div>
        </Content>
        <Content>
          <div>일시 | 00/00 00:00~</div>
          <div className="tagList">
            <Tag name="20~29세" status={status} />
            <Tag name="성별무관" status={status} />
          </div>
        </Content>
      </ContentBox>
    </Wrapper>
  );
};

export default PloggingPostBox;

const Wrapper = styled.div`
  width: 90%;
  /* height: 62px; */

  padding: 8px;

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

  background-image: url(https://img.freepik.com/premium-vector/environmental-protection-banner-people-are-jogging-and-picking-up-trash-plogging_540284-690.jpg);
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
`;

const StarIcon = styled.img`
  width: 16px;
  // main color로 filter
  /* filter: brightness(0) saturate(100%) invert(17%) sepia(91%) saturate(5802%)
      hue-rotate(257deg) brightness(78%) contrast(120%); */
`;
