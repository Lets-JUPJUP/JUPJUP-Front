import React from "react";
import { useEffect } from "react";
import { styled } from "styled-components";
import { getPostsJoinMembers, postPloggingJoin } from "../../api/postjoin";

const ParticipateAlert = ({
  setModalOpen,
  postId,
  setIsPlogJoined,
  setPlogMembersData,
}) => {
  // 모달창 뜰 때 스크롤 방지
  useEffect(() => {
    document.body.style.position = "fixed";
    return () => {
      document.body.style.position = "static";
    };
  }, []);

  const refuse = () => {
    setModalOpen(false);
  };

  const accept = async () => {
    try {
      // 참여하기 신청 post
      await postPloggingJoin(postId);
      setIsPlogJoined(true);
      // 참여자 목록도 업데이트하기
      const memberData = await getPostsJoinMembers(postId);
      setPlogMembersData(memberData.data);
    } catch (err) {
      console.log(err);
      if (err.message === "최대 인원을 초과하여 참여할 수 없습니다.") {
        alert("최대 인원을 초과하여 플로깅에 참여할 수 없습니다.");
      } else if (err.message === "성별이 해당 플로깅의 조건과 맞지 않습니다.") {
        alert("성별이 해당 플로깅의 조건과 맞지 않습니다.");
      } else if (err.message === "나이가 해당 플로깅의 조건과 맞지 않습니다.") {
        alert("나이가 해당 플로깅의 조건과 맞지 않습니다.");
      } else {
        alert("참여하기 실행 과정에서 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <Wrapper>
      <AlertBox>
        <div className="title">즐거운 플로깅 되길 바라요!</div>
        <div className="caution">한 번 참여신청하면 취소가 어려워요</div>
        <div className="buttonDiv">
          <JoinButton className="no" onClick={refuse}>
            다시 생각해 볼게요
          </JoinButton>
          <JoinButton className="yes" onClick={accept}>
            네, 알겠어요
          </JoinButton>
        </div>
      </AlertBox>
    </Wrapper>
  );
};

export default ParticipateAlert;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;

  /* background: var(--black, #09090a); */
  background: rgba(9, 9, 10, 0.25);

  z-index: 20; // footer보다 z-index 높게
`;

const AlertBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  width: 90%;
  max-width: 500px;

  border-radius: 8px;
  background: var(--light, #f3efff);

  box-sizing: border-box;
  padding: 12px 0;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .title {
    font-size: 16px;
    font-weight: 600;
  }

  .caution {
    color: var(--midgrey, #7e7e7e);
    font-weight: 600;
  }

  .buttonDiv {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const JoinButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;

  &.yes {
    background: var(--sub, #beef62);
    color: var(--main, #410fd4);
  }

  &.no {
    background: var(--midgrey, #7e7e7e);
    color: var(--white, #fff);
  }

  font-size: 16px;
  font-weight: 600;

  border: 0px;
`;
