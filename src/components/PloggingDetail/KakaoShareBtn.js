import React, { useEffect } from "react";
import { styled } from "styled-components";

import ic_share from "../../assets/PloggingDetail/ic_share.png";
import ic_userBig from "../../assets/common/ic_userbig.png";
import img_default1 from "../../assets/common/defaultImage/img_default1.png";

/*
JS SDK는 PC 또는 모바일에 따라 동작이 변경되는 부분들이 있어서
user agent가 임의로 변경된 환경 (크롬 브라우저 > 개발자모드 > 모바일 설정)을 지원하지 않습니다.
*/

const KakaoShareBtn = ({ pageData, commentLength }) => {
  const onKakaoShare = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAOMAP_API_KEY);
      }

      kakao.Share.createDefaultButton({
        container: "#kakaotalk-sharing-btn",
        objectType: "feed",
        content: {
          title: pageData.title,
          description: pageData.content,
          imageUrl:
            pageData.fileUrls.length > 0 ? pageData.fileUrls[0] : img_default1,
          link: {
            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
            mobileWebUrl: "https://lets-jupjup.com",
            webUrl: "https://lets-jupjup.com",
          },
        },
        itemContent: {
          profileText: pageData.authorNickname,
          profileImageUrl: pageData.authorProfileImageUrl
            ? pageData.authorProfileImageUrl
            : ic_userBig,
        },
        social: {
          commentCount: commentLength,
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: `https://lets-jupjup.com/plogging-detail/${pageData.id}`,
              webUrl: `https://lets-jupjup.com/plogging-detail/${pageData.id}`,
            },
          },
        ],
      });
    }
  };

  useEffect(() => {
    onKakaoShare();
  }, []);

  return <ShareImg src={ic_share} alt="share" id="kakaotalk-sharing-btn" />;
};

export default KakaoShareBtn;

const ShareImg = styled.img`
  width: 16px;
  cursor: pointer;
`;
