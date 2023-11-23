import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import ic_star_default from "../../assets/common/ic_star_default.png";
import ic_star_clicked from "../../assets/common/ic_star_clicked.png";
import AdBanner from "../../components/common/AdBanner";
import CommentBox from "../../components/common/CommentBox";
import CommentInput from "../../components/common/CommentInput";
import { useParams } from "react-router-dom";
import {
  eventDeleteJoin,
  eventGetEventDetail,
  eventGetJoinCount,
  eventPostJoin,
  getEventComment,
} from "../../api/event";
const EventPage = () => {
  // 클릭 여부
  const [isClicked, setIsClicked] = useState(false); //디폴트값 현재 정보로
  const [data, setData] = useState({});
  const [count, setCount] = useState("");

  // 댓글 데이터
  const [commentData, setCommentData] = useState([]);

  const { id } = useParams(); // 이벤트 게시글 아이디
  const userId = localStorage.getItem("id"); // 유저 아이디

  // 관심 있어요 (★) 클릭
  const onStarClick = () => {
    if (isClicked === false) {
      //관심있어요 post
      try {
        eventPostJoin(id);
        setIsClicked(!isClicked);
        setCount(count + 1);
      } catch (err) {
        alert("요청 오류");
      }
    } else if (isClicked === true) {
      //관심있어요 취소
      try {
        eventDeleteJoin(id);
        setIsClicked(!isClicked);
        setCount(count - 1);
      } catch (err) {
        alert("요청 오류");
      }
    }
  };

  const getData = async () => {
    try {
      const res = (await eventGetEventDetail(id)).data.data;

      setData(res);
      setIsClicked(res.joined); //현재 참가 여부
    } catch (err) {
      alert("데이터를 가져올 수 없습니다.");
    }

    try {
      const count = (await eventGetJoinCount(id)).data.data.joinCount;

      setCount(count);
    } catch (err) {
      alert("데이터를 가져올 수 없습니다.");
    }

    try {
      // 댓글 가져오기
      const data = await getEventComment(id);
      console.log("댓글", data.data.eventcommentDtoList);
      setCommentData(data.data.eventcommentDtoList);
    } catch (err) {
      alert("데이터를 가져올 수 없습니다.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <Header title="공식 행사" />
      <div>
        <Card src={data.imageUrl}></Card>
        <div className="cardInfo">
          <div className="interest">
            <img
              src={isClicked ? ic_star_clicked : ic_star_default}
              alt="star"
              className="star"
              onClick={onStarClick}
            />
            <BoldText>관심 있어요 &#40;{count}&#41;</BoldText>
          </div>
          <BoldText
            className="link"
            onClick={() => {
              window.open(data.infoUrl);
            }}
          >
            홈페이지 &gt;
          </BoldText>
        </div>
      </div>
      <AdBanner isNotFixed={true} />

      <CommentDiv>
        {commentData.length > 0 ? (
          commentData.map((comment, index) => {
            return (
              <CommentBox
                key={index}
                commentInfo={comment}
                postId={id}
                userId={userId}
                setCommentData={setCommentData}
                location="event"
              />
            );
          })
        ) : (
          <div className="empty">해당 게시글에 대한 댓글이 없습니다.</div>
        )}
      </CommentDiv>

      {/* setWriteMode, setIsReplyMode 생략 */}
      <CommentInput
        location="event"
        postId={id}
        isReplyMode={[false, null]}
        setCommentData={setCommentData}
      />
    </Wrapper>
  );
};

export default EventPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .cardInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 12px;
    margin-bottom: 24px;
  }

  .star {
    width: 16px;
  }

  .interest {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .link {
    cursor: pointer;
  }
`;

const Card = styled.img`
  width: 280px;
  height: 376px;
  background: var(--grey, #e8e8e8);
`;

const BoldText = styled.div`
  font-weight: 600;
`;

const CommentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 12px;

  // 하단 댓글창 최대 높이(88px) + 여백 12px까지 합해서 여백 만들기
  margin-bottom: 100px;

  .empty {
    height: 100px;
  }
`;
