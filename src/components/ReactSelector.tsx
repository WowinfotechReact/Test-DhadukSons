import React from "react";
import Select from "react-select";

// Define the type for options
export interface OptionType {
  value: string | number;
  label: string;
}

// Props type for the reusable component
interface MySelectProps {
  options: OptionType[];
  value: OptionType | null;
  onChange: (option: OptionType | null) => void;
  placeholder?: string;
}

const MySelect: React.FC<MySelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div style={{ width: 300 }}>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default MySelect;
