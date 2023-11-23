import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import report from "../../assets/common/report.png";
import Badge from "../../components/user/Badge";
import AdBanner from "../../components/common/AdBanner";
import { useNavigate, useParams } from "react-router-dom";
import { memberGeUserProfile } from "../../api/member";
import { reviewsPostReview, rr } from "../../api/review";
const ReviewPage = () => {
  const navigate = useNavigate();
  const { memberId, postId } = useParams();
  console.log(memberId, postId);
  const [profile, setProfile] = useState({});
  //백 로직에 의해 배지 배치 순서와 인덱스(id)다름 주의
  const [selectedList, setSelectList] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleBadgeSelect = (badgeId) => {
    let copy = [...selectedList];
    copy[badgeId] = !copy[badgeId];
    setSelectList(copy);
  };
  const getData = async () => {
    const data_profile = await memberGeUserProfile(memberId);
    setProfile(data_profile);
  };

  const handleBadgeIdList = () => {
    let badge_id_list = [];
    //선택여부가 true인 뱃지의 인덱스(아이디)를 넣은 리스트를 반환
    selectedList.map((el, index) => {
      if (el === true) {
        badge_id_list.push(index);
      }
    });
    return badge_id_list;
  };
  const handleSubmit = async () => {
    const badgeList = handleBadgeIdList();
    const status = await reviewsPostReview(memberId, postId, badgeList);
    if (status === 200) {
      alert("리뷰가 등록되었습니다");
      navigate("/"); //추후 수정
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header title={"리뷰하기"} isLogin={true} />
      <Wrapper>
        <div className="gradient" />

        <Top>
          <div className="profile">
            <img
              className="profile-image"
              src={profile.profileImageUrl}
              alt="프로필 이미지"
            />
          </div>
          <div
            className="report"
            onClick={() => navigate(`/user-report/${memberId}`)}
          >
            <img className="report-button" src={report} alt="신고하기" />
          </div>
        </Top>

        <div className="h1">
          {profile.nickname}님과 함께한 플로깅 어떠셨나요?
        </div>
        <div className="h2">
          주최자에 관한 리뷰를 남겨주시면, 다른 분들께 도움이 돼요!
        </div>

        <div className="badges">
          <div className="row">
            {/* 뱃지 길이로 인해 배열의 화면 배치 순서와 백엔드 로직 상의 뱃지 아이디가 달라 직접 아이디 넣는 하드코딩*/}
            <div onClick={() => handleBadgeSelect(11)}>
              <Badge id={11} isSelected={selectedList[11]} />
            </div>
            <div onClick={() => handleBadgeSelect(2)}>
              <Badge id={2} isSelected={selectedList[2]} />
            </div>
          </div>
          <div className="row">
            <div onClick={() => handleBadgeSelect(0)}>
              <Badge id={0} isSelected={selectedList[0]} />
            </div>
            <div onClick={() => handleBadgeSelect(3)}>
              <Badge id={3} isSelected={selectedList[3]} />
            </div>
          </div>
          <div className="row">
            <div onClick={() => handleBadgeSelect(4)}>
              <Badge id={4} isSelected={selectedList[4]} />
            </div>
            <div onClick={() => handleBadgeSelect(6)}>
              <Badge id={6} isSelected={selectedList[6]} />
            </div>
          </div>
          <div className="row">
            <div onClick={() => handleBadgeSelect(5)}>
              <Badge id={5} isSelected={selectedList[5]} />
            </div>
            <div onClick={() => handleBadgeSelect(10)}>
              <Badge id={10} isSelected={selectedList[10]} />
            </div>
          </div>
          <div className="row">
            <div onClick={() => handleBadgeSelect(9)}>
              <Badge id={9} isSelected={selectedList[9]} />
            </div>
            <div onClick={() => handleBadgeSelect(12)}>
              <Badge id={12} isSelected={selectedList[12]} />
            </div>
          </div>
          <div className="row">
            <div onClick={() => handleBadgeSelect(8)}>
              <Badge id={8} isSelected={selectedList[8]} />
            </div>
            <div onClick={() => handleBadgeSelect(1)}>
              <Badge id={1} isSelected={selectedList[1]} />
            </div>
          </div>
          <div className="row">
            <div onClick={() => handleBadgeSelect(7)}>
              <Badge id={7} isSelected={selectedList[7]} />
            </div>
          </div>
        </div>

        <div className="submit" onClick={handleSubmit}>
          선택 완료
        </div>

        <AdBanner />
      </Wrapper>
    </>
  );
};

export default ReviewPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .gradient {
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background: linear-gradient(
      180deg,
      #f3efff 0%,
      rgba(243, 239, 255, 0) 100%
    );
  }

  .h1 {
    margin-top: 24px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }

  .h2 {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 600;
    line-height: 18px; /* 150% */
  }
  .badges {
    margin-top: 46px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  .row {
    display: flex;
    gap: 16px;
  }

  .submit {
    margin-top: 48px;
    display: inline-flex;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: var(--sub, #beef62);

    color: var(--main, #410fd4);

    /* semibold16pt */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  width: 128px;
  height: 128px;
  margin: 24px auto 0;

  .profile {
    position: absolute;
    display: flex;
    width: 128px;
    height: 128px;
    flex-shrink: 0;
    border-radius: 128px;
  }
  .profile-image {
    width: 128px;
    height: 128px;
    flex-shrink: 0;
    border-radius: 128px;
    background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  }

  .report {
    cursor: pointer;
    position: relative;
    left: 64px;
  }

  .report-button {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;
