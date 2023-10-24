import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PATHS } from 'config.js';
import DeliveryLogo from '../../assets/Delivery.png'; // Import your DeliveryLogo image

const NavLogo = () => {
  const logoStyle = {
    height: '66px',
    position: 'absolute', 
    top: '10px',
    width: '150px',
    marginLeft: 'auto', 
    marginRight: 'auto', 
    display: 'block',
  };

  return (
    <div className="logo position-relative" style={{ paddingBottom: '50px', textAlign: 'center',marginRight:'30px' }}>
      <Link to={DEFAULT_PATHS.APP}>
        <img src={DeliveryLogo} alt="Delivery Logo" style={logoStyle} />
      </Link>
    </div>
  );
};

export default React.memo(NavLogo);
