import React from "react";
import { styled } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "50px",
    slidesToShow: 1,
    speed: 500,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Wrapper>
      <StyledSlider {...settings}>
        <div className="slide">
          <Card>
            <h3>1</h3>
          </Card>
        </div>
        <div className="slide">
          <Card>
            <h3>2</h3>
          </Card>
        </div>
        <div className="slide">
          <Card>
            <h3>3</h3>
          </Card>
        </div>
        <div className="slide">
          <Card>
            <h3>4</h3>
          </Card>
        </div>
        <div className="slide">
          <Card>
            <h3>5</h3>
          </Card>
        </div>
        <div className="slide">
          <Card>
            <h3>6</h3>
          </Card>
        </div>
      </StyledSlider>
    </Wrapper>
  );
};

export default Carousel;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Card = styled.div`
  margin: auto;
  width: 280px;
  height: 376px;
  flex-shrink: 0;
  background: var(--grey, #e8e8e8);
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  max-width: 420px;
`;
