import React, { useState } from 'react';
import MultiselectTwoSides from 'react-multiselect-two-sides';
import './MyComponent.css';

function MyComponent() {
  const [options] = useState([
    { name: 'Foo', value: 0 },
    { name: 'Bar', value: 1 },
    { name: 'Baz', value: 2, disabled: true },
    { name: 'Qux', value: 3 },
    { name: 'Quux', value: 4 },
    { name: 'Corge', value: 5 },
    { name: 'Grault', value: 6 },
    { name: 'Garply', value: 7 },
    { name: 'Waldo', value: 8 },
    { name: 'Fred', value: 9 },
    { name: 'Plugh', value: 10 },
    { name: 'Xyzzy', value: 11 },
    { name: 'Thud', value: 12 },
      { name: 'Xyzzy', value: 13 },
    { name: 'Thud', value: 14 },
    { name: 'Xyzzy', value: 15 },
    { name: 'Thud', value: 16 },
  ]);

  const [value, setValue] = useState([0, 3, 9]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const selectedCount = value.length;
  const availableCount = options.length - selectedCount;

  return (
    <MultiselectTwoSides
      availableFooter={`Available: ${availableCount}`}
      availableHeader="Available"
      className="msts_theme_example"
      onChange={handleChange}
      selectedFooter={`Selected: ${selectedCount}`}
      selectedHeader="Selected"
      labelKey="name"
      showControls
      searchable
      options={options}
      value={value}
    />
  );
}

export default MyComponent;
