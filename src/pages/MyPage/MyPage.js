import React from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import GradientLine from "../../components/common/GradientLine";
import UpdateProfile from "../../components/common/UpdateProfile";
import edit from "../../assets/login/edit.png";
import Tag from "../../components/common/Tag";
import Top3Badges from "../../components/common/Top3Badges";
import History from "../../components/common/History";
import Footer from "../../components/common/Footer";
import MyMenu from "../../components/mypage/MyMenu";

const MyPage = () => {
  return (
    <>
      <Header title="내 프로필" />
      <Wrapper>
        <GradientLine />

        <div style={{ marginTop: "24px" }}>
          <UpdateProfile writeMode={true} />
        </div>

        <div className="name">
          <div className="name-value">사용자 이름</div>
          <img className="name-button" src={edit} alt="수정하기" />
        </div>
        <div className="line" />

        <div className="tags">
          <Tag name="20대" />
          <Tag name="여성" />
        </div>

        <div style={{ marginTop: "20px" }}>
          <Top3Badges
            list={[
              "함께 또 걷고 싶은 플로깅 파트너",
              "함께 또 걷고 싶은 플로깅 파트너",
              "함께 또 걷고 싶은 플로깅 파트너",
            ]}
          />
        </div>

        <History
          contents={[
            {
              count: 0,
              text: "주최한 플로깅 모임",
            },
            { count: 0, text: "플로깅 참여 횟수" },
          ]}
        />

        <MyMenu />
      </Wrapper>
      <Footer />
    </>
  );
};

export default MyPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;
  // 전체 높이에서 Header 높이, Footer 높이 제외
  height: calc(100vh - 80px - 132px);

  .tags {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 40px;
  }

  .name {
    margin-top: 40px;
    display: flex;
    align-items: flex-end;

    .name-button {
      margin-left: 9px;
      margin-top: 2px;
      width: 16px;
      height: 20px;
      flex-shrink: 0;
    }

    .name-value {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .line {
    margin-top: 4px;
    width: 128px;
    height: 2px;
    background: var(--darken, "#290886");
  }
`;

// const UpdateButton = styled.button`
//   padding: 8px 12px;
//   border-radius: 4px;
//   background: var(--sub, #beef62);

//   color: var(--main, #410fd4);
//   font-size: 16px;
//   font-weight: 600;

//   border: 0px;
// `;
