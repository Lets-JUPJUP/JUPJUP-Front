import styled from "styled-components";
import PloggingPostBox from "../common/PloggingPostBox";
import { checkStatus } from "../common/checkPostsStatus";

const PloggingListSection = ({ pageData }) => {
  /*
  postbox에 필요한 요소 : 
  id, fileUrls(포스트 이미지 파일 배열), title, isHearted (찜하기 여부), 
  startPlace, starDate, postAgeRanges 배열, postGender(string), withPet(Boolean) 
  */

  return (
    <Wrapper>
      {pageData.length > 0 ? (
        pageData.map((post) => {
          return (
            <PloggingPostBox
              key={post.id}
              status={checkStatus(post)}
              id={post.id}
              fileUrls={post.fileUrls}
              title={post.title}
              isHearted={post.isHearted}
              startPlace={post.startPlace}
              startDate={post.startDate}
              postAgeRanges={post.postAgeRanges}
              postGender={post.postGender}
              withPet={post.withPet}
            />
          );
        })
      ) : (
        <div>주어진 조건에 해당하는 플로깅 모집글이 없습니다.</div>
      )}
    </Wrapper>
  );
};

export default PloggingListSection;

const Wrapper = styled.div`
  width: 100%;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  padding-top: 140px; // 헤더 80px + 필터링박스 48px + 구분선 12px
  padding-bottom: 80px; // 광고배너 68px + 여백 12px
`;
