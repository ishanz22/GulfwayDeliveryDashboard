import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { Row, Col, Button, Dropdown, Form, Card, Pagination, Tooltip, OverlayTrigger, Badge } from 'react-bootstrap';
import { utils, write } from 'xlsx';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Select from 'react-select';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const AddNewRestaurant = ({ google }) => {
  const title = 'Add New Restaurant';
  const description = 'Ecommerce Customer List Page';

  // Rest of your code remains unchanged
  const coverImageStyle = {
    border: '1px dashed #ced4da', // Adjust the border color and style as needed
    backgroundImage:
      'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0.5) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.5) 75%, rgba(255, 255, 255, 0.5))',
    backgroundSize: '10px 10px',
    height: '120px',
    width: '200px',
    borderRadius: '10px',
  };
  const logoStyle = {
    border: '1px dashed #ced4da', // Adjust the border color and style as needed
    backgroundImage:
      'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0.5) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.5) 75%, rgba(255, 255, 255, 0.5))',
    backgroundSize: '10px 10px',
    width: '120px',
    height: '120px',
    borderRadius: '10px',
  };
  const OwnerInfoImages = {
    border: '1px dashed #ced4da', // Adjust the border color and style as needed
    backgroundImage:
      'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0.5) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.5) 75%, rgba(255, 255, 255, 0.5))',
    backgroundSize: '10px 10px',
    height: '120px',
    width: '200px',
    borderRadius: '10px',
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [selectedLicensedImage, setSelectedLicensedImage] = useState(null);
  const [selectedEmiratesID, setSelectedEmiratesID] = useState(null);
  const [selectedPassport, setSelectedPassport] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [selectValueCity, setSelectValueCity] = useState();
  const optionsCity = [
    { value: 'Italian', label: 'Italian' },
    { value: 'French', label: 'French' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'American', label: 'American' },
  ];

  const [selectZone, setSelectZone] = useState()
  const optionsZone = [
    { value: 'North', label: 'North' },
    { value: 'South', label: 'South' },
    { value: 'East', label: 'East' },
    { value: 'West', label: 'West' },
    { value: 'Central', label: 'Central' },
    { value: 'Downtown', label: 'Downtown' },
   
  ];

  const [selectedFile, setSelectedFile] = useState(null);
  const [license, setLicense] = useState(null);
const [emiratesID, setEmiratesID] = useState(null);
const [passport, setPassport] = useState(null)

const handleLicenseUpload = (e) => {
  const file = e.target.files[0];
  setSelectedLicensedImage(file);
};

const handleEmiratesIdUpload = (e) => {
  const file = e.target.files[0];
  setSelectedEmiratesID(file);
};

const handlePassportUpload = (e) => {
  const file = e.target.files[0];
  setSelectedPassport(file);
};




  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Home</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
        </Row>
      </div>

      <Row className="row-cols-1 row-cols-md-2 g-2">
        <Col>
          <h2 className="small-title">Details</h2>
          <Card className=" h-100">
            <Card.Body>
              <Form className="mb-n3">
                <div className="mb-3">
                  <Form.Label>Restaurant Name</Form.Label>
                  <Form.Control type="text" defaultValue="My Awesome Corp." />
                </div>
                <div className="mb-3">
                  <Form.Label>Restaurant Address</Form.Label>
                  <Form.Control type="text" defaultValue="4 Chome-38-5 Nishishinjuku, Shinjuku City" />
                </div>
                <div className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" defaultValue="+643451134" />
                </div>
                <div className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" defaultValue="restaurant@gmail.com" />
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h2 className="small-title">Restaurant Logo & Covers</h2>
          <Card className=" h-100">
            <Card.Body>
              <Row>
                <Col className="col-auto mb-3 mb-sm-0 me-auto">
                  <Form.Label>Logo</Form.Label>
                  <div>
                    <label htmlFor="imageInput">
                      <div style={logoStyle}>
                        {selectedImage ? (
                          <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%' }} />
                        ) : (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column', // Display children in a column
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              height: '100%',
                              color: '#ced4da',
                            }}
                          >
                            <CsLineIcons icon="cloud-upload" size={30} />
                            <div style={{ textAlign: 'center' }}>Upload Image</div>
                          </div>
                        )}
                      </div>
                    </label>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      className="form-control-file"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                  </div>
                </Col>
                <Col>
                  <Form.Label>Cover Image</Form.Label>
                  <div>
                    <label htmlFor="coverImageInput">
                      <div style={coverImageStyle}>
                        {selectedCoverImage ? (
                          <img src={selectedCoverImage} alt="Selected Cover" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                        ) : (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column', // Display children in a column
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              height: '100%',
                              color: '#ced4da',
                            }}
                          >
                            <CsLineIcons icon="cloud-upload" size={30} />
                            <div style={{ textAlign: 'center' }}>Upload Cover Image</div>
                          </div>
                        )}
                      </div>
                    </label>
                    <input
                      type="file"
                      id="coverImageInput"
                      accept="image/*"
                      className="form-control-file"
                      style={{ display: 'none' }}
                      onChange={handleCoverImageChange}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div style={{ paddingTop: '60px' }}>
        <h2 className="small-title">Restaurant Info</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form>
              <Row className="g-3">
                <Col lg="6">
                  <Form.Label>Vat/Tax (%)</Form.Label>
                  <Form.Control type="text" />
                </Col>
                <Col lg="6">
                  <Form.Label>Estimated Delivery Time ( Min & Maximum Time)</Form.Label>
                  <Form.Control type="text" />
                </Col>

                <Col lg="6">
                  <Form.Label>Open Time</Form.Label>
                  <Form.Control type="text" />
                </Col>
                <Col lg="6">
                  <Form.Label>Close Time</Form.Label>
                  <Form.Control type="text" />
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>

      <h2 className="small-title">Location</h2>

      <Card style={{ borderRadius: '15px', height: '400px' }}>
        <Card.Body style={{ padding: 0 }}>
          <Row className="g-3">
            {/* Search Input on the Right */}

            <Col lg="6" className="p-5">
              <Form>
                <Form.Group controlId="textInput1">
                  <Form.Label>Cuisine</Form.Label>
                  <Select classNamePrefix="react-select" options={optionsCity} value={selectValueCity} onChange={setSelectValueCity} placeholder="" />
                </Form.Group>
                <text>&nbsp; &nbsp;</text>
                <Form.Group controlId="textInput1">
                  <Form.Label>Zone</Form.Label>
                  <Select classNamePrefix="react-select" options={optionsZone} value={selectZone} onChange={setSelectZone} placeholder="" />
                </Form.Group>
         
                {/* Add more text inputs here */}
                <text>&nbsp; &nbsp;</text>
                <Form.Group controlId="textInput1">
                  <Form.Label>Latitude </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>

                <text>&nbsp; &nbsp;</text>
                <Form.Group controlId="textInput2">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control type="text" />
                  <text>&nbsp; &nbsp;</text>
                </Form.Group>
                {/* Add more text inputs as needed */}

           
              </Form>
            </Col>

            {/* Smaller Map on the Left */}
            <Col lg="6" className="p-0">
              <div style={{ width: '10px', borderRadius: '15px', border: '1px solid #ccc' }}>
                <Map
                  google={google}
                  initialCenter={{ lat: 25.1838, lng: 55.36587 }}
                  zoom={14}
                  className="w-50 rounded"
                  style={{ height: '100%', borderRadius: '15px', borderBottomLeftRadius: '0px', borderTopLeftRadius: '0px' }}
                >
                  <Marker position={{ lat: 25.1838, lng: 55.36587 }} />
                </Map>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/* Pagination End */}


      <div style={{ paddingTop: '40px' }}>
        <h2 className="small-title">Owner Info</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form>
              <Row className="g-4">
                <Col lg="4">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" />
                </Col>
                <Col lg="4">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" />
                </Col>
                 <Col lg="4">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" />
                </Col>
                
                <Col lg="4">
                <Form.Label>license</Form.Label>
      <div>
        <label htmlFor="imageInput">
        <div>
          <label htmlFor="licenseInput">
            <div style={OwnerInfoImages}>
              {selectedLicensedImage ? (
                <img src={URL.createObjectURL(selectedLicensedImage)} alt="Selected" style={{ width: '100%', height: '100%' }} />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    color: '#ced4da',
                  }}
                >
                  <div>
                    {/* Icon or text for upload */}
                  </div>
                  <div style={{ textAlign: 'center' }}>Upload Image</div>
                </div>
              )}
            </div>
          </label>
          <input
            type="file"
            id="licenseInput"
            accept="image/*"
            className="form-control-file"
            style={{ display: 'none' }}
            onChange={handleLicenseUpload}
          />
        </div>
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          className="form-control-file"
          style={{ display: 'none' }}
          onChange={handleLicenseUpload}
        />
      </div>
    </Col>

    <Col lg="4">
                <Form.Label>Emirates ID</Form.Label>
                <div>
          <label htmlFor="emiratesIdInput">
            <div style={OwnerInfoImages}>
              {selectedEmiratesID ? (
                <img src={URL.createObjectURL(selectedEmiratesID)} alt="Selected" style={{ width: '100%', height: '100%' }} />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    color: '#ced4da',
                  }}
                >
                  <div>
                    {/* Icon or text for upload */}
                  </div>
                  <div style={{ textAlign: 'center' }}>Upload Image</div>
                </div>
              )}
            </div>
          </label>
          <input
            type="file"
            id="emiratesIdInput"
            accept="image/*"
            className="form-control-file"
            style={{ display: 'none' }}
            onChange={handleEmiratesIdUpload}
          />
        </div>
    </Col>



    <Col lg="4">
                <Form.Label>Passport</Form.Label>
                <div>
          <label htmlFor="passportInput">
            <div style={OwnerInfoImages}>
              {selectedPassport ? (
                <img src={URL.createObjectURL(selectedPassport)} alt="Selected" style={{ width: '100%', height: '100%' }} />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    color: '#ced4da',
                  }}
                >
                  <div>
                    {/* Icon or text for upload */}
                  </div>
                  <div style={{ textAlign: 'center' }}>Upload Image</div>
                </div>
              )}
            </div>
          </label>
          <input
            type="file"
            id="passportInput"
            accept="image/*"
            className="form-control-file"
            style={{ display: 'none' }}
            onChange={handlePassportUpload}
          />
        </div>
    </Col>
              </Row>
            </Form>
          </Card.Body>

          
        </Card>

        
      </div>
      <div   className=" d-flex justify-content-end">
          <button type="button" className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold ">
            Reset
          </button>

          <button
           
            style={{ marginLeft: '15px', backgroundColor: '#5A94C8',fontWeight:'bold' }}
            type="button"
            className="btn btn-icon btn-icon-start btn-primary"
          >
          Add Restaurant
          </button>
        </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDrI53GlC5-ymZmPKzJq11U36dheMGfeLU',
})(AddNewRestaurant);
