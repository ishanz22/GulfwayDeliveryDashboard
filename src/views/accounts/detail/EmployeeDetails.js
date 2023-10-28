import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import defaultProfileImage from '../../../assets/DefaultUser.jpeg'; 

const EmployeeDetails = () => {
  const title = 'Employee ID #5859412';
  const description = 'Ecommerce Storefront Checkout Page';
  const [profileImageSrc, setProfileImageSrc] = useState(defaultProfileImage);
  const [selectedEmiratesIDFile, setSelectedEmiratesIDFile] = useState(null);
  const [selectEmiratesIDBack, setSelectEmiratesIDBack] = useState(null)
  const fileInputRef = useRef(null);
  const mapStyles = {
    width: '100%', 
    height: '100%', 
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


  const optionsState = [
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
  ];
  const [selectValueState, setSelectValueState] = useState(optionsState[1]);


  const optionsGender = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];
  const [selectGender, setSelectGender] = useState(optionsGender[1]);


  const optionsEmployment = [
    { value: 'Full time', label: 'Full time' },
    { value: 'Part time', label: 'Part time' },
  ];
  const [selectEmploymentStatus, setSelectEmploymentStatus] = useState(optionsEmployment[1]);



  const optionsUserRole = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Auditor', label: 'Auditor' },
    { value: 'Manager', label: 'Manager' },
  ];
  const [selectUserRole, setSelectUserRole] = useState(optionsUserRole[1]);
 

  const [selectPayFrequency, setSelectPayfrequency] = useState();
  const optionsPayFrequency = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Weekly', label: 'Weekly' },

  ];



  const OwnerInfoImages = {
    border: '1px dashed #ced4da',
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
  const handleEmiratesIDFileBack = (event) => {
    const file = event.target.files[0];
    setSelectEmiratesIDBack(file);
  };

  return (
    <>
      <HtmlHead title={title} description={description} />

      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/accounts/employee">
          <CsLineIcons icon="chevron-left" size="13" />
          <span className="align-middle text-small ms-1">Employees</span>
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
                    <Form.Control type="text" defaultValue="Martine" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text"   defaultValue="Swaniawski"/>
                  </Col>
                  <Col lg="6">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" defaultValue="+971 56 762 4176" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" defaultValue="Martine@gmail.com"/>
                  </Col>

                  <Col lg="6">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="text" defaultValue="June 4, 1999"/>
                  </Col>

                  <Col lg="6">
                    <Form.Label>Gender</Form.Label>
                    <Select classNamePrefix="react-select" options={optionsGender} value={selectGender} onChange={setSelectGender} placeholder="" />
                  </Col>

     
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
                  <Form.Control type="text" defaultValue="Manager" />
                </Col>
                <Col lg="4">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control type="text" defaultValue="C0010" />
                </Col>
                <Col lg="4">
                  <Form.Label>Date of hire</Form.Label>
                  <Form.Control type="text" defaultValue="May 4, 2024" />
                </Col>
                <Col lg="4">
                  <Form.Label>Employment Status</Form.Label>
                  <Select
                    classNamePrefix="react-select"
                    options={optionsEmployment}
                    value={selectEmploymentStatus}
                    onChange={setSelectEmploymentStatus}
                    placeholder=""
                  />
                </Col>
                <Col lg="4">
                  <Form.Label>User Role</Form.Label>
                  <Select classNamePrefix="react-select" options={optionsUserRole} value={selectUserRole} onChange={setSelectUserRole} placeholder="" />
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
                  <Form.Control type="text" defaultValue="NL38ABNA4026824314"  />
                </Col>
                <Col lg="4">
                  <Form.Label>Bank Name</Form.Label>
                  <Form.Control type="text"  defaultValue="Abu Dhabi Commercial Bank"/>
                </Col>
                <Col lg="4">
                  <Form.Label>Holder Name</Form.Label>
                  <Form.Control type="text" defaultValue="Martine Swaniawski" />
                </Col>
                <Col lg="4">
                  <Form.Label>Salary (AED)</Form.Label>
                  <Form.Control type="text" defaultValue="20,000 "  />
                </Col>
                <Col lg="4">
                  <Form.Label>Pay frequency </Form.Label>
                  <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" />
                </Col>

              </Row>
     
            </Form>
          </Card.Body>
        </Card>

        <h2 className="small-title">Other Relevant Information</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form>
              <Row className="g-0">
                <Col lg="2">
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

                <Col lg="2">
                  <Form.Label>Emirates ID (back)</Form.Label>
                  <div>
                    <label htmlFor="emiratesIdInputBack">
                      <div style={OwnerInfoImages}>
                        {selectEmiratesIDBack ? (
                          <img src={URL.createObjectURL(selectEmiratesIDBack)} alt="Selected" style={{ width: '100%', height: '100%' }} />
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
                      id="emiratesIdInputBack"
                      accept="image/*"
                      className="form-control-file"
                      style={{ display: 'none' }}
                      onChange={handleEmiratesIDFileBack}
                    />
                  </div>
                </Col>
              </Row>
              <br />
             
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

export default EmployeeDetails;
