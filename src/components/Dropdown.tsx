import Select, { CSSObjectWithLabel, OptionProps, StylesConfig } from 'react-select';

import { DropdownOption } from '../../types';
import React from 'react';

interface Props {
  options: DropdownOption[],
  onChange?: (value: string) => void,
  defaultOption?: string,
  isDisabled?: boolean,
  width?: number,
  height?: number,
};

const Dropdown: React.FC<Props> = ({
  options,
  onChange = () => null,
  defaultOption = '',
  isDisabled = false,
}) => {
  const style: StylesConfig = {
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#BBBBBB',
      },
      borderColor: '#BBBBBB',
      width: 120,
      height: 30,
      borderRadius: 4,
    }),
    singleValue: (base: CSSObjectWithLabel) => ({
      ...base,
      fontSize: 11,
      fontWeight: 'bold',
      lineHeight: '14.98px',
      color: '#2D2B2E',
    }),
    option: (base: CSSObjectWithLabel, state: OptionProps) => ({
      ...base,
      width: 120,
      backgroundColor: state.isFocused ? '#EEEEEE' : '#F8F8F8',
      fontSize: 12,
      lineHeight: '16.34px',
      color: '#2D2B2E',
    }),
    menu: (base: CSSObjectWithLabel) => ({
      ...base,
      backgroundColor: '#F8F8F8',
      width: 120,
    }),
  };

  return (
    <Select
      instanceId="react-select-instance"
      styles={style}
      options={options}
      isDisabled={isDisabled}
      isSearchable={false}
      // onChange={onChange}
      defaultValue={defaultOption}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => <span className="dropdown-indicator" />,
      }}
    />
  );
};

export default Dropdown;
