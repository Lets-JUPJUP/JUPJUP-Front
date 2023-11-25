import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import Header from "../../components/common/Header";

import ic_close from "../../assets/common/ic_close.png";

import PostImageBox from "../../components/PloggingDetail/PostImageBox";
import KakaoShareBtn from "../../components/PloggingDetail/KakaoShareBtn";
import PloggingInfo from "../../components/PloggingDetail/PloggingInfo";
import PloggingComment from "../../components/PloggingDetail/PloggingComment";

import FloatingButton from "../../components/common/FloatingButton";
import JoinFooter from "../../components/PloggingDetail/JoinFooter";

import CommentInput from "../../components/common/CommentInput";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import UserBottomSheet from "../../components/PloggingDetail/UserBottomSheet";
import ParticipateAlert from "../../components/PloggingDetail/ParticipateAlert";

import { deletePloggingPosts, getPostsDetail } from "../../api/posts";
import { memberGetMyProfile } from "../../api/member";
import { getPostsJoinMembers } from "../../api/postjoin";

const PloggingDetailPage = () => {
  // 댓글창 open 여부
  const [writeMode, setWriteMode] = useState(false);

  // BottomSheet open 여부
  const [bsOpen, setBsOpen] = useState(false);

  // footer 참여하기 클릭 시 모달창 open 여부
  const [modalOpen, setModalOpen] = useState(false);

  // api로 받아온 detail data
  const [pageData, setPageData] = useState({});

  // api로 받아온 user data
  const [userData, setUserData] = useState({});

  // 참여하기 여부 저장하는 state
  // - 초기 설정은 JoinFooter에서, - 변경은 Alert창에서
  const [isPlogJoined, setIsPlogJoined] = useState(false);

  // api로 받아온 plogging member data
  const [plogMembersData, setPlogMembersData] = useState([]);

  // 댓글 데이터
  const [commentData, setCommentData] = useState([]);

  // 대댓글 모드 state [대댓글인지, parentId]
  const [isReplyMode, setIsReplyMode] = useState([false, null]);

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

    setPageData(data.data);
  };

  useEffect(() => {
    getData();
  }, [postId]);

  // 사용자 정보, 플로깅 참여 멤버 조회
  const getUserData = async () => {
    const data1 = await memberGetMyProfile(); // 사용자 정보

    setUserData(data1);

    const data2 = await getPostsJoinMembers(postId); // 플로깅 참여 멤버

    setPlogMembersData(data2.data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const navigate = useNavigate();

  // 게시글 삭제 서버에 제출
  const handleDelete = async () => {
    if (window.confirm("해당 게시글을 삭제하시겠습니까?")) {
      // 만약 참여자가 1명이라도 존재하면 게시글 삭제 불가 안내
      if (plogMembersData.length > 0) {
        alert(
          "플로깅 모집글에 1명 이상의 참여자가 있다면 게시글 삭제가 불가합니다."
        );
        return;
      }
      try {
        await deletePloggingPosts(postId);
      } catch (err) {
        alert(
          "게시글을 삭제하는 과정에서 오류가 생겼습니다. 다시 시도해주세요."
        );
        console.log(err);
      } finally {
        navigate(`/plogging-list`);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <Fixed>
        <Header title={pageData.title} isLogin={true} isDetailPage={true} />
      </Fixed>
      {Object.entries(pageData).length > 0 && userData ? (
        <>
          <Wrapper>
            <PostImageBox fileUrls={pageData.fileUrls} />

            <ShareDiv>
              {/* 게시글 작성자와 유저의 아이디가 같을 때만 삭제 */}
              {pageData.authorId === userData.id ? (
                <img
                  src={ic_close}
                  alt="delete"
                  className="delete"
                  onClick={handleDelete}
                />
              ) : null}

              <KakaoShareBtn
                pageData={pageData}
                commentLength={commentData.length}
              />
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
              userId={userData.id}
              commentData={commentData}
              setCommentData={setCommentData}
              setIsReplyMode={setIsReplyMode}
            />
            <FloatingButton isWriteBtnHidden={true} />

            <BottomSheet open={bsOpen} onDismiss={onDisMiss}>
              <UserBottomSheet
                curMemberNum={plogMembersData.length}
                maxMember={pageData.maxMember}
                authorId={pageData.authorId}
                authorNickname={pageData.authorNickname}
                authorProfileImageUrl={pageData.authorProfileImageUrl}
                plogMembersInfo={plogMembersData}
              />
            </BottomSheet>

            {writeMode === true ? (
              <CommentInput
                setWriteMode={setWriteMode}
                location="ploggingDetail"
                postId={postId}
                isReplyMode={isReplyMode}
                setIsReplyMode={setIsReplyMode}
                setCommentData={setCommentData}
              />
            ) : (
              <JoinFooter
                bsOpen={bsOpen}
                setBsOpen={setBsOpen}
                setModalOpen={setModalOpen}
                curMemberNum={plogMembersData.length}
                maxMember={pageData.maxMember}
                dueDate={pageData.dueDate}
                isHearted={pageData.isHearted}
                isJoined={pageData.isJoined}
                isPlogJoined={isPlogJoined}
                setIsPlogJoined={setIsPlogJoined}
                postId={postId}
              />
            )}

            {modalOpen === true ? (
              <ParticipateAlert
                setModalOpen={setModalOpen}
                postId={postId}
                setIsPlogJoined={setIsPlogJoined}
                setPlogMembersData={setPlogMembersData}
              />
            ) : null}
          </Wrapper>
        </>
      ) : (
        <div style={{ marginTop: "100px" }}>로딩 중..</div>
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
  align-items: center;

  .delete {
    width: 20px;
    cursor: pointer;
    margin-right: 12px;
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
