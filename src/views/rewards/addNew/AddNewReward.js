import React, { useState,useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const AddNewReward = () => {
  const title = 'Add New Reward';
  const description = 'Ecommerce Storefront Checkout Page';

  const [selectValueState, setSelectValueState] = useState();
  const optionsState = [
    { value: 'Points', label: 'Points' },
    { value: 'Gifts', label: 'Gifts' },
    { value: 'Other incentives', label: 'Other incentives' },
  ];

  const [selectValueCity, setSelectValueCity] = useState();
  const optionsCity = [
    { value: 'Points', label: 'Points' },
    { value: 'Gifts', label: 'Gifts' },
    { value: 'Other incentives', label: 'Other incentives' },
  ];

  const [selectValueMonth, setSelectValueMonth] = useState();
  const optionsMonth = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
    { value: '06', label: '06' },
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
  ];

  const [selectValueYear, setSelectValueYear] = useState();
  const optionsYear = [
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: '30', label: '30' },
  ];
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    // Programmatically trigger the file input dialog
    fileInputRef.current.click();
  };
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/rewards/list">
          <CsLineIcons icon="chevron-left" size="13" />
          <span className="align-middle text-small ms-1">Reward List</span>
        </NavLink>
        <div className='d-flex justify-content-between'>
        <h1 className="mb-0 pb-0 display-4" id="title">
          {title}
        
        </h1>

        <Button variant="outline-primary" className="btn-icon btn-icon-start w-100 w-md-auto">
              <CsLineIcons icon="save" /> <span>Save</span>
            </Button>
        </div>
  
        
      </div>
      {/* Title End */}
  
      <Row>
        <Col xs="12" className="col-lg order-1 order-lg-0">
          {/* Address Start */}
          {/* <h2 className="small-title">Address</h2> */}
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="g-3">
                  <Col lg="6">
                    <Form.Label>Reward Name</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Reward Code</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="12">
                    <Form.Label>Reward Value ( AED )</Form.Label>
                    <Form.Control type="number" />
                  </Col>

                  <Col lg="4">
                    <Form.Label>Reward Type</Form.Label>
                    <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" />
                  </Col>
                  <Col lg="4">
                    <Form.Label>Coins</Form.Label>
                    <Form.Control type="number" />
                  </Col>
                  <Col lg="4">
                    <Form.Label>Availability</Form.Label>
                    <Form.Control type="number" />
                  </Col>

                  <Col lg="12">
                    <Form.Label>Reward Description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          {/* Address End */}

          {/* Shipment Start */}

          <Card className="mb-5">
            <Card.Body>
              <Form.Label>Associate this reward with a set</Form.Label>
              <div className="d-flex flex-column">
                <Row className="g-3">
                  <Col lg="4">
                    <Form.Check type="checkbox" label="This Reward valid for all sets" id="checkbox1" name="checkboxGroup" />
                  </Col>

                  <Col lg="4">
                    <Form.Check type="checkbox" label="Associate this reward with one or more sets" id="checkbox2" name="checkboxGroup" />
                  </Col>

                  <Col lg="4">
                    <Form.Check type="checkbox" label="Do not associate this reward with a set" id="checkbox3" name="checkboxGroup" />
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>

          {/* Shipment End */}

          {/* Payment Start */}

          {/* Payment End */}
        </Col>
        <Col lg="auto" className="order-0 order-lg-1">
        <Card className="mb-1 w-100 sw-lg-45">
      <Card.Body>
        <div className="text-center mb-5">
          <Form.Label className='mb-3'>Reward Picture</Form.Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="fileInput"
            onChange={handleImageUpload}
          />
       
          {profilePicture ? (
       <div>
       <img
         src={profilePicture}
         alt="Profile"
         width="120"
         height="120"
         style={{
           objectFit: 'cover',
   
           borderRadius: '10px',
         }}
       />
     </div>
     
          ) : (
            <div>
              <img
                src="https://catholiccharities.org/wp-content/uploads/no-image.png"
                alt="Default Profile"
                width="120"
                height="120"
                style={{borderRadius:"10px"}}
              />
            </div>
          )}
        </div>
        <div className="text-center"> {/* Add the text-center class to center its contents */}
  <Button
    className="btn-icon btn-icon-end w-70"
    variant="primary"
    onClick={handleUploadButtonClick}
  >
    <span>Upload</span>
  </Button>
</div>

      </Card.Body>
    </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddNewReward;
