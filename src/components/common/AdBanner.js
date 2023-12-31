import styled from "styled-components";
import ad_1 from "../../assets/ad/ad_1.png";
import ad_2 from "../../assets/ad/ad_2.png";
import ad_3 from "../../assets/ad/ad_3.png";
import Slider from "react-slick";
// 광고 배너
const AdBanner = ({ isNotFixed }) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const list = [
    {
      img: ad_1,
    },
    {
      img: ad_2,
    },
    {
      img: ad_3,
    },
  ];
  return (
    <Wrapper className={isNotFixed === true ? "" : "isFixed"}>
      <Banner className={isNotFixed === true ? "" : "isFixed"}>
        <StyledSlider {...settings}>
          {list.map((el, index) => {
            return (
              <img className="banner_img" src={el.img} alt="" key={index} />
            );
          })}
        </StyledSlider>
      </Banner>
    </Wrapper>
  );
};

export default AdBanner;

const Wrapper = styled.div`
  width: 100%;
  background: var(--grey, #e8e8e8);
  height: 68px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  z-index: 10;

  &.isFixed {
    position: fixed;
    bottom: 0;
  }
`;

const Banner = styled.div`
  max-width: 390px;
  width: 100vw;
  height: 68px;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;

  .banner_img {
    height: 68px;
  }
  .slick-prev {
    left: 10px;
    z-index: 1;
  }
  .slick-next {
    right: 10px;
    z-index: 1;
  }
`;
