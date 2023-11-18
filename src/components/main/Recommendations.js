import React from "react";
import Slider from "react-slick";
import { styled } from "styled-components";

import { recommendationsData } from "./recommendationsData";

const Recommendations = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Wrapper>
      <div className="title">성동구 플로깅, 이 장소를 추천해요!</div>

      {recommendationsData.map((list) => {
        return (
          <StyledSlider {...settings}>
            {list.map((img) => {
              return (
                <Card>
                  <img src={img} alt="" />
                </Card>
              );
            })}
          </StyledSlider>
        );
      })}
    </Wrapper>
  );
};

export default Recommendations;
const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 8px 8px 0px 0px;
  background: linear-gradient(180deg, #f3efff 0%, #fff 15.21%);
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  row-gap: 32px;

  margin-bottom: 100px;

  .title {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }
`;

const Card = styled.div`
  display: flex;
  width: 342px;
  height: 342px;
  flex-shrink: 0;
  border-radius: 8px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;

  img {
    width: 100%;
    height: 100%;
  }
`;

const StyledSlider = styled(Slider)`
  width: 100%;

  .slick-dots {
    top: 342px;
  }
`;
