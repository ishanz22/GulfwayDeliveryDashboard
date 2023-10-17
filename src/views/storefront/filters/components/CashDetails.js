import React from 'react';
import Rating from 'react-rating';
import { Row, Col, Button, Form,Car,Card } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import DoughnutChartCashDetails from 'components/chart/DoughnutChartCashDetails';
import { gulfwayBlue } from 'layout/colors/Colors';

const CashDetails = () => {
  return (
    <>

         
                  <div className="d-flex justify-content-between align-items-center">
                    <div>Cash Details</div>
              
                  </div>
                  <div className="d-flex justify-content-between ">
                  

                    <div className="d-flex justify-content-between align-items-center" style={{ width: '50%' }}>
                      <DoughnutChartCashDetails />
                    </div>
                  </div>


  
 
      {/* <div className="d-flex flex-row justify-content-between w-100 w-sm-50 w-xl-100">
        <Button variant="outline-primary" className="w-100 me-2">
          Clear
        </Button>
        <Button variant="primary" className="w-100 me-2">
          Filter
        </Button>
      </div> */}
    </>
  );
};

export default CashDetails;
