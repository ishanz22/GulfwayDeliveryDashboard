import React from 'react';

const ApprovedLabel = ({ children }) => (
  <span
    style={{
      backgroundColor: 'rgba(144, 238, 144, 0.4)',
      color: 'green',
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

export default ApprovedLabel;
