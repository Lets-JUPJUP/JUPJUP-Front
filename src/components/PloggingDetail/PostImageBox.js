import React from "react";
import { styled } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PostImageBox = ({ fileUrls }) => {
  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "50px",
    slidesToShow: 1,
    speed: 500,
    initialSlide: 0,
    // autoplay: true,
    // autoplaySpeed: 2000,
  };
  return (
    <Wrapper>
      <StyledSlider {...settings}>
        {fileUrls && fileUrls.length > 0
          ? fileUrls.map((element, index) => {
              return <Image url={element} key={index} />;
            })
          : null}
      </StyledSlider>
    </Wrapper>
  );
};

export default PostImageBox;

const Wrapper = styled.div`
  /* width: 90%;
  height: 171px;
  background-image: url(https://img.freepik.com/premium-vector/environmental-protection-banner-people-are-jogging-and-picking-up-trash-plogging_540284-690.jpg);
   */
  width: 100%;
  margin-bottom: 40px;
  margin-top: 80px; // header 높이
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  max-width: 600px;

  margin: 0 auto;

  .slick-dots {
    /* top: 343px; */
    bottom: 15px;
  }

  // active된 요소의 dot
  .slick-dots li.slick-active button:before {
    color: var(--sub, #beef62);
  }
`;

const Image = styled.div`
  width: 280px;
  /* height: 376px; */
  height: 280px;
  background: ${(props) => `url(${props.url}) center/cover no-repeat`};
`;
