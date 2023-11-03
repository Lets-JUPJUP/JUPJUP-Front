import styled from "styled-components";
import ic_tag from "../../assets/common/ic_tag.png";
import ic_tag_main from "../../assets/common/ic_tag_main.png";

// 태그 컴포넌트 - props로 태그 이름, 상태 전달
// 상태는 색상을 뜻합니다. (생략 시 default로 설정)
// default : 보라색 배경에 흰색 글자
// join : 참여 완료 - 연초록 배경에 보라색 글자
// finish : 모집 완료 - 회색 배경에 흰색 글자

const Tag = ({ name, status }) => {
  // 상태에 따른 색상 설정
  const colorSetting = (status) => {
    if (status === "join") {
      return { background: "#BEEF62", text: "#410FD4" };
    } else if (status === "finish") {
      return { background: "#7E7E7E", text: "#FFF" };
    } else {
      return { background: "#410FD4", text: "#FFF" };
    }
  };
  return (
    <TagWrapper color={colorSetting(status).background}>
      <TagIcon src={status === "join" ? ic_tag_main : ic_tag} alt="tag" />
      <TagName color={colorSetting(status).text}>{name}</TagName>
    </TagWrapper>
  );
};

export default Tag;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  padding: 4px;
  border-radius: 4px;

  background: ${(props) => props.color};

  @media screen and (max-width: 768px) {
    padding: 1px 4px;
  }
`;

const TagIcon = styled.img`
  width: 12px;
`;

const TagName = styled.div`
  color: ${(props) => props.color};
  font-size: 12px;
  font-weight: 600;
  line-height: 18px; /* 150% */
`;
