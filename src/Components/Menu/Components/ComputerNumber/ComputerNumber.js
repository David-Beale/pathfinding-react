import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeComputerNumber } from "../../../../redux/settings";
import CustomSlider from "../../../../Styling/Components/CustomSlider";
import { Container, SliderTitle } from "./ComputerNumberStyle";

export default function ComputerNumber() {
  const [localSliderValue, setLocalSliderValue] = useState(15);

  // Retrieve redux dispatch
  const dispatch = useDispatch();

  return (
    <Container>
      <SliderTitle>Number of computer cars</SliderTitle>
      <CustomSlider
        value={localSliderValue}
        onMouseDown={(e) => e.stopPropagation()}
        min={0}
        max={500}
        step={1}
        onChange={(e, value) => setLocalSliderValue(value)}
        onChangeCommitted={(e, value) => dispatch(changeComputerNumber(value))}
        valueLabelDisplay="auto"
      />
    </Container>
  );
}
