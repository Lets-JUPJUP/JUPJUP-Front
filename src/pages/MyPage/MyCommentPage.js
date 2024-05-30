import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

import Header from "../../components/common/Header";
import PloggingPostBox from "../../components/common/PloggingPostBox";
import FloatingButton from "../../components/common/FloatingButton";
import AdBanner from "../../components/common/AdBanner";

import { getCommentedPosts } from "../../api/comment";
import { checkStatus } from "../../components/common/checkPostsStatus";

const MyCommentPage = () => {
  // 댓글 남긴 게시글 데이터
  const [myData, setMyData] = useState([]);
  const getData = async () => {
    const data = await getCommentedPosts();
    setMyData(data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <Header
        title="댓글 단 글"
        isLogin={true}
        title2="관심 있는 글"
        link="/mypage/interest"
      />
      <DivisionLine />
      <PostDiv>
        {myData.length > 0 ? (
          myData.map((post) => {
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
          <div>댓글을 단 글이 없습니다.</div>
        )}
      </PostDiv>

      <FloatingButton />
      <AdBanner />
    </Wrapper>
  );
};

export default MyCommentPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DivisionLine = styled.div`
  width: 95%;
  height: 2px;
  background: var(--main, "#410FD4");

  margin-bottom: 12px;
`;

const PostDiv = styled.div`
  width: 100%;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
