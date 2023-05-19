import { Select, Center, Box, CheckIcon } from "native-base";
import React from "react";

type Option = {
  label: string;
  value: string;
};

type SelectDropdownProps = {
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
};

export const SelectDropdown = ({
  selectedValue,
  onValueChange,
  options = [],
  placeholder = "Choose Service",
}: SelectDropdownProps) => {
  return (
    <Center>
      <Box maxW="300">
        <Select
          selectedValue={selectedValue}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder={placeholder}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={onValueChange}
        >
          {options.map((option) => (
            <Select.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Select>
      </Box>
    </Center>
  );
};
