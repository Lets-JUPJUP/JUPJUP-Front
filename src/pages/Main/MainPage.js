import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import Carousel from "../../components/main/Carousel";
import mountain from "../../assets/main/mountain.png";
import History from "../../components/common/History";
import Recommendations from "../../components/main/Recommendations";
import { useNavigate } from "react-router-dom";
import { postsGetMyCount } from "../../api/posts";
import { eventGetEventList } from "../../api/event";
import Footer from "../../components/common/Footer";
const MainPage = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState({});
  const [list, setList] = useState([]);
  const isLogin = localStorage.getItem("juptoken"); //로그인 되어있으면 history 조회

  const getData = async () => {
    if (isLogin) {
      try {
        const data = (await postsGetMyCount()).data.data;
        setHistory(data);
      } catch (err) {
        alert("데이터를 가져오는데 실패했습니다.");
      }
    }

    try {
      const data = (await eventGetEventList()).data.data;
      setList(data);
      console.log("sdasd", data);
    } catch (err) {
      alert("공식행사 데이터 get오류");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header />
      <Wrapper>
        <div className="carousel">
          <Carousel list={list} />
        </div>

        <div className="container">
          <div className="map-btn" onClick={() => navigate("/trash-map")}>
            성동구 쓰레기통 지도
            <div className="navigate">보러가기 {">"}</div>
          </div>

          <div className="monthly">성동구의 플로깅 현황 with 레츠줍줍</div>

          <div className="join-plogging">
            <img className="mountain" src={mountain} alt="" />
            <div
              className="join-btn"
              onClick={() => navigate("/plogging-list")}
            >
              플로깅 참여하기
            </div>
          </div>

          {history.totalPostsCount && (
            <History
              contents={[
                { count: history.totalPostsCount, text: "플로깅 모임" },
                { count: history.joinedPostsCount, text: "나의 참여 횟수" },
              ]}
            />
          )}

          <div className="recommendations">
            <Recommendations />
          </div>
        </div>
      </Wrapper>
      {isLogin && <Footer isNotFixed={true} />}
    </>
  );
};

export default MainPage;

const Wrapper = styled.div`
  width: 100%;

  .container {
    margin: auto;
    width: 358px;
    display: flex;
    flex-direction: column;
  }

  .carousel {
    margin-top: 8px;
    margin-bottom: 12px;
  }

  .map-btn {
    box-sizing: border-box;
    //width: 160px;
    height: 68px;
    flex-shrink: 0;
    border-radius: 8px;
    background: var(--main, #410fd4);
    display: flex;
    flex-direction: column;
    padding: 13px 14px 14px 10px;
    color: var(--white, #fff);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
    align-self: flex-end;

    .navigate {
      align-self: flex-end;
      margin-top: 3px;
      font-size: 12px;
      line-height: 18px; /* 150% */
    }
  }

  .monthly {
    margin-top: 20px;
    color: var(--black, #09090a);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }

  .join-plogging {
    margin-top: 7px;
    display: flex;
    justify-content: space-between;

    .mountain {
      width: 174px;
      height: 43px;
      flex-shrink: 0;
    }

    .join-btn {
      // width: 125px;
      height: 40px;
      box-sizing: border-box;
      padding: 8px 12px;
      border-radius: 8px;
      background: var(--sub, #beef62);

      color: var(--black, #09090a);

      font-size: 16px;
      font-weight: 600;
      line-height: 24px; /* 150% */
    }
  }

  .recommendations {
    margin-top: 12px;
  }
`;
