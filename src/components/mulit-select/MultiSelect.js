import React, { useState } from 'react';
import MultiselectTwoSides from 'react-multiselect-two-sides';
import './MyComponent.css';

function MyComponent() {
  const [options] = useState([
    { name: 'Dashboard', value: 0 },
    { name: 'Vendors', value: 1 },
    { name: 'Vendor Dashboard', value: 2, disabled: true },
    { name: 'Restaurant', value: 3 },
    { name: 'Grocery', value: 4 },
    { name: 'Orders', value: 5 },
    { name: 'Rewards', value: 6 },
    { name: 'Spin Wheel', value: 7 },
    { name: 'Wishlist', value: 8 },
    { name: 'Flash Deals', value: 9 },
    { name: 'Payment', value: 10 },
    { name: 'Riders', value: 11 },
    { name: 'Charge', value: 12 },
      { name: 'Support', value: 13 },
    { name: 'Setting', value: 14 },
    { name: 'Account', value: 15 },
    { name: 'Shipping', value: 16 },
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
