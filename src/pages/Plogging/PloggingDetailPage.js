import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

import Header from "../../components/common/Header";

import ic_share from "../../assets/PloggingDetail/ic_share.png";

import PostImageBox from "../../components/PloggingDetail/PostImageBox";
import PloggingInfo from "../../components/PloggingDetail/PloggingInfo";
import PloggingComment from "../../components/PloggingDetail/PloggingComment";

import FloatingButton from "../../components/common/FloatingButton";
import JoinFooter from "../../components/PloggingDetail/JoinFooter";

import CommentInput from "../../components/common/CommentInput";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import UserBottomSheet from "../../components/PloggingDetail/UserBottomSheet";
import ParticipateAlert from "../../components/PloggingDetail/ParticipateAlert";

import { getPostsDetail } from "../../api/posts";
import { memberGetMyProfile } from "../../api/member";

const PloggingDetailPage = () => {
  // 댓글창 open 여부
  const [writeMode, setWriteMode] = useState(false);

  // BottomSheet open 여부
  const [bsOpen, setBsOpen] = useState(false);

  // footer 참여하기 클릭 시 모달창 open 여부
  const [modalOpen, setModalOpen] = useState(false);

  // api로 받아온 data
  const [pageData, setPageData] = useState({});

  const [userId, setUserId] = useState(0);

  // bottomsheet close하기
  const onDisMiss = () => {
    setBsOpen(false);
  };

  const location = useLocation();
  // 게시글 id pathname에서 알아내기
  const postId = location.pathname.split("/")[2];

  // 상세 페이지 api 가져오기
  const getData = async () => {
    const data = await getPostsDetail(postId);
    console.log(data);
    setPageData(data.data);
  };

  useEffect(() => {
    getData();
  }, [postId]);

  const getUserId = async () => {
    const memberData = await memberGetMyProfile();
    setUserId(memberData.id);
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <>
      {Object.entries(pageData).length > 0 ? (
        <>
          <Fixed>
            <Header title={pageData.title} isLogin={true} isDetailPage={true} />
          </Fixed>
          <Wrapper>
            <PostImageBox fileUrls={pageData.fileUrls} />

            <ShareDiv>
              <img src={ic_share} alt="share" />
            </ShareDiv>
            <DivisionLine />
            {/* 플로깅 정보 */}
            <PloggingInfo
              authorId={pageData.authorId}
              authorNickname={pageData.authorNickname}
              authorProfileImageUrl={pageData.authorProfileImageUrl}
              createdAt={pageData.createdAt}
              startPlace={pageData.startPlace}
              startDate={pageData.startDate}
              dueDate={pageData.dueDate}
              minMember={pageData.minMember}
              maxMember={pageData.maxMember}
              postAgeRanges={pageData.postAgeRanges}
              postGender={pageData.postGender}
              content={pageData.content}
            />
            <CommentLine />
            {/* 플로깅 댓글 */}
            <PloggingComment
              writeMode={writeMode}
              setWriteMode={setWriteMode}
              postId={postId}
              userId={userId}
            />
            <FloatingButton isWriteBtnHidden={true} />

            <BottomSheet open={bsOpen} onDismiss={onDisMiss}>
              <UserBottomSheet />
            </BottomSheet>

            {writeMode === true ? (
              <CommentInput setWriteMode={setWriteMode} />
            ) : (
              <JoinFooter
                bsOpen={bsOpen}
                setBsOpen={setBsOpen}
                setModalOpen={setModalOpen}
              />
            )}

            {modalOpen === true ? (
              <ParticipateAlert setModalOpen={setModalOpen} />
            ) : null}
          </Wrapper>
        </>
      ) : (
        <div>로딩 중..</div>
      )}
    </>
  );
};

export default PloggingDetailPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Fixed = styled.div`
  position: fixed;
  top: 0;
  width: 100%;

  z-index: 50;
`;

const ShareDiv = styled.div`
  width: 90%;

  display: flex;
  justify-content: flex-end;
  img {
    width: 16px;
    cursor: pointer;
  }
`;

const DivisionLine = styled.div`
  width: 95%;
  height: 1.2px;
  background: var(--main, "#410FD4");

  margin: 12px 0;
`;

const CommentLine = styled.div`
  width: 100%;
  height: 1.2px;
  background: var(--light, "#f3efff");
  margin: 12px 0;
`;
