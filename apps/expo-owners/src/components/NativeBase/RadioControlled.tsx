import React from "react";
import { Radio } from "native-base";

export const RadioControlled = ({ selectedValue, onValueChange }) => {
  return (
    <Radio.Group
      name="myRadioGroup"
      accessibilityLabel="favorite number"
      value={selectedValue}
      onChange={onValueChange}
    >
      <Radio value={true} my={1}>
        Yes
      </Radio>
      <Radio value={false} my={1}>
        No
      </Radio>
    </Radio.Group>
  );
};
