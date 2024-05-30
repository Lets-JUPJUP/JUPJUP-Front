import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import UserInfoBox from "./UserInfoBox";

import { getAgeRange } from "../../components/common/ageRange";
import { getKorGender } from "../../components/common/gender";
import { memberGeUserProfile } from "../../api/member";

// 플로깅 상세 페이지 사용자 목록
const UserBottomSheet = ({
  curMemberNum,
  maxMember,
  authorId,
  authorNickname,
  authorProfileImageUrl,
  plogMembersInfo,
}) => {
  const [authorData, setAuthorData] = useState({});
  // authorId 기반으로 나이대, 성별 찾기
  const getData = async () => {
    const data = await memberGeUserProfile(authorId);
    // console.log("authorData", data);
    setAuthorData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Wrapper>
      <div className="title">이 플로깅의 참여자</div>
      <div className="peopleNum">
        ({curMemberNum + 1} / {maxMember})
      </div>
      {authorData ? (
        <>
          <UserInfoBox
            isMine={true}
            name={authorNickname}
            profileImageUrl={authorProfileImageUrl}
            tag1={getAgeRange(authorData.ageRange) + "대"}
            tag2={getKorGender(authorData.gender)}
            userId={authorData.id}
          />
          <DivisionLine />
          <div className="participant">
            {plogMembersInfo.length > 0 ? (
              plogMembersInfo.map((member) => {
                return (
                  <UserInfoBox
                    name={member.nickname}
                    profileImageUrl={member.profileImageUrl}
                    tag1={getAgeRange(member.ageRange) + "대"}
                    tag2={getKorGender(member.gender)}
                    userId={member.memberId}
                  />
                );
              })
            ) : (
              <div>이 플로깅에 참여한 다른 멤버가 없습니다.</div>
            )}
          </div>
        </>
      ) : (
        <div>로딩 중...</div>
      )}
    </Wrapper>
  );
};

export default UserBottomSheet;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 88px; // JoinFooter 높이

  font-size: 16px;
  font-weight: 600;

  .title {
    margin-top: 20px;
  }

  .peopleNum {
    margin-top: 4px;
    margin-bottom: 8px;
  }

  .participant {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 8px;
    margin: 8px 0;

    width: 100%;
    max-height: 250px;
    overflow-y: scroll;
  }
`;

const DivisionLine = styled.div`
  width: 95%;
  height: 1.2px;
  background: var(--main, "#410FD4");
`;
