import { ChangeEvent, useState } from 'react';

export type SelectOption = { value: string; label: string };

type SelectBoxProps = {
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
};

const SelectBox = ({ options, onChange, placeholder }: SelectBoxProps) => {
  const [selectedValue, setSelectedValue] = useState<string>();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <select value={selectedValue} onChange={handleChange}>
      {placeholder && (
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
