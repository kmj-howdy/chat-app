import { PropsWithClassName } from '@/types/style';
import { ChangeEvent } from 'react';

export type SelectOption = { value: string; label: string };

export type SelectBoxProps = {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SelectBox = ({
  options,
  value = '',
  onChange,
  placeholder,
  className,
}: PropsWithClassName<SelectBoxProps>) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleChange} className={className}>
      {placeholder && (
        <option value="" disabled hidden>
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
