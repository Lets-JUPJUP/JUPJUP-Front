import React from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import Carousel from "../../components/main/Carousel";
import mountain from "../../assets/main/mountain.png";
import History from "../../components/common/History";
import Recommendations from "../../components/main/Recommendations";
const MainPage = () => {
  return (
    <>
      <Header isLogin={true} />
      <Wrapper>
        <div className="carousel">
          <Carousel />
        </div>

        <div className="container">
          <div className="map-btn">
            성동구 쓰레기통 지도
            <div className="navigate">보러가기 {">"}</div>
          </div>

          <div className="monthly">00월, 성동구의 플로깅 현황</div>

          <div className="join-plogging">
            <img className="mountain" src={mountain} alt="" />
            <div className="join-btn">플로깅 참여하기</div>
          </div>

          <History
            contents={[
              { count: 0, text: "플로깅 모임" },
              { count: 0, text: "나의 참여 횟수" },
            ]}
          />

          <div className="recommendations">
            <Recommendations />
          </div>
        </div>
      </Wrapper>
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
    margin-bottom: 30px;
  }

  .map-btn {
    box-sizing: border-box;
    width: 160px;
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
      width: 125px;
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
