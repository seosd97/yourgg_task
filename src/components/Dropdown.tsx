import React, { useCallback, useMemo } from 'react';
import Select, { ActionMeta, CSSObjectWithLabel, OptionProps, Options, StylesConfig } from 'react-select';

import { DropdownOption } from '../../types';

interface Props {
  options: DropdownOption[],
  onChange?: (value: DropdownOption) => void,
  value: string,
  isDisabled?: boolean,
  width?: number,
  height?: number,
};

const Dropdown: React.FC<Props> = ({
  options,
  onChange = () => null,
  value = '',
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

  const onChangeValue = useCallback((
    option: unknown,
  ) => {
    if (onChange != null) {
      onChange(option as DropdownOption);
    }
  }, [onChange]);

  const selectedValue = useMemo(() => (
    options.find(option => option.value === value)
  ), [value]);

  return (
    <Select
      instanceId="react-select-instance"
      styles={style}
      options={options}
      isDisabled={isDisabled}
      isSearchable={false}
      onChange={onChangeValue}
      value={selectedValue}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => <span className="dropdown-indicator" />,
      }}
    />
  );
};

export default Dropdown;
