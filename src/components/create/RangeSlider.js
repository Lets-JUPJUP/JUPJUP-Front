import React, { useState } from "react";
import { styled } from "styled-components";
import Slider from "@mui/material/Slider";

const RangeSlider = ({
  isForAge = false,
  currentMaxAge,
  marks,
  min,
  max,
  step,
  value,
  setValue,
  minDistance = 0,
  disableSwap = false,
}) => {
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (minDistance === 0) {
      setValue(newValue);
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  //연령 설정에서 50세-60세 영역 선택시 50-59로 라벨 보여주기
  function valueLabelFormat(value) {
    let scaledValue = value;
    if (isForAge && scaledValue === currentMaxAge) {
      scaledValue--;
    }

    return `${scaledValue}`;
  }

  return (
    <div>
      <CustomedSlider
        disableSwap={disableSwap}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        min={min}
        max={max}
        marks={marks}
        step={step}
        valueLabelFormat={valueLabelFormat}
      />
    </div>
  );
};

export default RangeSlider;
const CustomedSlider = styled(Slider)(() => ({
  height: 8,
  "& .MuiSlider-track": {
    color: "#C6B2FF",
  },

  "& .MuiSlider-rail": {
    backgroundColor: "#E8E8E8",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#410FD4",
    height: 4,
    width: 2,
  },

  "& .MuiSlider-thumb": {
    height: 12,
    width: 12,
    backgroundColor: "#410FD4",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
    },
  },

  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "#F3EFFF",
    color: "#000",
  },
}));
