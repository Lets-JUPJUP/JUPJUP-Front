import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { eventGetEventList } from "../../api/event";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const data = (await eventGetEventList()).data.data;
      setList(data);
    } catch (err) {
      alert("공식행사 데이터 get오류");
    }
  };
  useEffect(() => {
    getData();
  }, []);
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
        {list.map((el) => {
          return (
            <div key={el.id}>
              <div
                className="slide"
                onClick={() => navigate(`/event/${el.id}`)}
              >
                <Card>
                  <img
                    className="event_image"
                    src={el.imageUrl}
                    alt="성동구 공식행사"
                  />
                </Card>
              </div>
            </div>
          );
        })}
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
  cursor: pointer;
  margin: auto;
  width: 280px;
  height: 376px;
  flex-shrink: 0;
  background: var(--grey, #e8e8e8);

  .event_image {
    width: 100%; //한쪽만 100% & overflow hidden 처리 중 선택
    height: 100%;
  }
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  max-width: 420px;
`;
