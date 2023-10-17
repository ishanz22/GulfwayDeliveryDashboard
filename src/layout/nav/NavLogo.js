import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PATHS } from 'config.js';
import DeliveryLogo from '../../assets/Delivery.png'; // Import your DeliveryLogo image

const NavLogo = () => {
  const logoStyle = {
    height: '66px', // To maintain the aspect ratio
    position: 'absolute', // Set the position to absolute
    top: '10px', // Adjust the top position as needed
    left: '0px', // Adjust the left position as needed
    width:"150px",
  
  };

  return (
    <div className="logo position-relative" style={{paddingBottom:"50px"}}>
      <Link to={DEFAULT_PATHS.APP}>
        <img src={DeliveryLogo} alt="Delivery Logo" style={logoStyle} />
      </Link>
    </div>
  );
};

export default React.memo(NavLogo);
