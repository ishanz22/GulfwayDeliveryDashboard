import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import defaultProfileImage from '../../../assets/DefaultUser.jpeg'; // Adjust the path as needed

const AddEmployee = () => {
  const title = 'Add Employee';
  const description = 'Ecommerce Storefront Checkout Page';
  const [profileImageSrc, setProfileImageSrc] = useState(defaultProfileImage);
  const [selectedEmiratesIDFile, setSelectedEmiratesIDFile] = useState(null);
  const fileInputRef = useRef(null);
  const mapStyles = {
    width: '100%', // Set the map width to 100% to fill the Card
    height: '100%', // Set the map height to 100% to fill the Card
  };

  // Function to handle file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setProfileImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  // Function to trigger file input
  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };
  const [selectValueState, setSelectValueState] = useState();
  const optionsState = [
    { value: 'Fougasse', label: 'Fougasse' },
    { value: 'Lefse', label: 'Lefse' },
  ];

  const OwnerInfoImages = {
    border: '1px dashed #ced4da', // Adjust the border color and style as needed
    backgroundImage:
      'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0.5) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.5) 75%, rgba(255, 255, 255, 0.5))',
    backgroundSize: '10px 10px',
    height: '120px',
    width: '200px',
    borderRadius: '10px',
  };
  const handleEmiratesIDFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedEmiratesIDFile(file);
  };

  return (
    <>
      <HtmlHead title={title} description={description} />

      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/storefront/home">
          <CsLineIcons icon="chevron-left" size="13" />
          <span className="align-middle text-small ms-1">Storefront</span>
        </NavLink>
        <h1 className="mb-0 pb-0 display-4" id="title">
          {title}
        </h1>
      </div>
      {/* Title End */}

      <Row>
        <Col xs="12" className="col-lg order-1 order-lg-0">
          {/* Address Start */}
          <h2 className="small-title">Personal information</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="g-3">
                  <Col lg="6">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" />
                  </Col>

                  <Col lg="6">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="text" />
                  </Col>

                  <Col lg="6">
                    <Form.Label>Gender</Form.Label>
                    <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" />
                  </Col>

                  {/* <Col lg="12">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Col> */}
                </Row>
              </Form>
              <br />
            </Card.Body>
          </Card>
        </Col>

        <Col lg="auto" className="order-0 order-lg-1">
          <h2 className="small-title">&nbsp;</h2>
          <Card className="mb-3 w-100 sw-lg-35" style={{ height: '310px' }}>
            <Card.Body>
              <Col lg="auto" className="order-0 order-lg-1">
                <div className="text-center mt-4">
                  <img
                    src={profileImageSrc || 'default-profile-image.jpg'}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #fff' }}
                  />
                </div>
                <text>&nbsp;</text>

                <div className="text-center upload-button mt-2">
                  {/* Hidden file input */}
                  <input type="file" id="profile-upload" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
                  {/* Custom button to trigger file input */}
                  <button type="button" className="btn btn-outline-primary upload-label" onClick={handleChooseFileClick}>
                    Upload Image
                  </button>
                </div>
              </Col>
            </Card.Body>
          </Card>
        </Col>
        {/*  */}
      </Row>

      <Row>
        {/* Address End */}
        <h2 className="small-title">Employment Information</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form>
              <Row className="g-3">
                <Col lg="4">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control type="text" />
                </Col>
                <Col lg="4">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control type="text" />
                </Col>
                <Col lg="4">
                  <Form.Label>Date of hire</Form.Label>
                  <Form.Control type="text" />
                </Col>
                <Col lg="4">
                  <Form.Label>Employment Status</Form.Label>
                  <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" />
                </Col>
                <Col lg="4">
                  <Form.Label>User Role</Form.Label>
                  <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" />
                </Col>
              </Row>
            </Form>
            <br />
          </Card.Body>
        </Card>

        {/* Contact Start */}
        <h2 className="small-title">Compensation and Benefits</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form>
              <Row className="g-3">
                <Col lg="4">
                  <Form.Label>IBAN Account Number</Form.Label>
                  <Form.Control type="text" />
                </Col>
                <Col lg="4">
                  <Form.Label>Bank Name</Form.Label>
                  <Form.Control type="text" />
                </Col>
                <Col lg="4">
                  <Form.Label>Holder Name</Form.Label>
                  <Form.Control type="text" />
                </Col>
                <Col lg="4">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control type="number" />
                </Col>
                <Col lg="4">
                  <Form.Label>Pay frequency </Form.Label>
                  <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" />
                </Col>

                {/* <Col lg="12">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Col> */}
              </Row>
              <br />
              {/* <button type="button" className="btn btn-icon btn-icon-start btn-outline-primary">
                  Update
                </button> */}
            </Form>
          </Card.Body>
        </Card>

        <h2 className="small-title">Other Relevant Information</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form>
              <Row className="g-3">
                <Col lg="4">
                  <Form.Label>Emirates ID (front)</Form.Label>
                  <div>
                    <label htmlFor="emiratesIdInput">
                      <div style={OwnerInfoImages}>
                        {selectedEmiratesIDFile ? (
                          <img src={URL.createObjectURL(selectedEmiratesIDFile)} alt="Selected" style={{ width: '100%', height: '100%' }} />
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
                            <div>{/* Icon or text for upload */}</div>
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
                      onChange={handleEmiratesIDFileChange}
                    />
                  </div>
                </Col>

                {/* <Col lg="12">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Col> */}
              </Row>
              <br />
              {/* <button type="button" className="btn btn-icon btn-icon-start btn-outline-primary">
                  Update
                </button> */}
            </Form>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <div className="container d-flex justify-content-end" style={{ margin: 0, padding: 0 }}>
          <button o type="button" className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold ">
            Reset
          </button>

          <button style={{ marginLeft: '15px', backgroundColor: '#5A94C8' }} type="button" className="btn btn-icon btn-icon-start btn-primary font-weight-bold">
            Add Employee
          </button>
        </div>
      </Row>
    </>
  );
};

export default AddEmployee
