import React, { useState } from "react";
import { styled } from "styled-components";
import Slider from "@mui/material/Slider";

const RangeSlider = ({ marks, min, max, step }) => {
  //   function valuetext(value) {
  //     return `${value}대`;
  //   }
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <CustomedSlider
        //getAriaLabel={() => "XXX range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        //getAriaValueText={valuetext}
        min={min}
        max={max}
        marks={marks}
        step={step}
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
