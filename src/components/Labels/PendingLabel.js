import React from 'react';

const PendingLabel = ({ children }) => (
  <span
    style={{
      backgroundColor: 'rgba(169, 169, 169, 0.2',
      color: 'GREY',
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

export default PendingLabel;
