import React from 'react';

const CanceledLabel = ({ children }) => (
  <span
    style={{
      backgroundColor: 'rgba(255, 0, 0, 0.2',
      color: 'red',
      borderRadius: '8px',
      padding: '4px 9px',
      display: 'inline-block',
      border: 'none',
      fontWeight: 'bold',
    }}
  >
    {children}
  </span>
);

export default CanceledLabel;
