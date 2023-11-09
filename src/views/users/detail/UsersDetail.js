import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import defaultProfileImage from '../../../assets/DefaultUser.jpeg'; 

const UsersDetail = () => {
  const title = 'User ID #5859412';
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
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/users/list">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Users List</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>



          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button  variant="outline-danger" className="btn-icon btn-icon-start w-100 w-md-auto" >
              <CsLineIcons icon="bin"  /> <span>Delete User</span>
            </Button>
            <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
              <CsLineIcons icon="sort" />
            </Button>
          </Col>
          {/* Title End */}
        </Row>
      </div>

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
                    <Form.Label>Address </Form.Label>
                    <Form.Control type="text" defaultValue="Oasis Center Mall"/>
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
        <h2 className="small-title">Account Information</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form>
              <Row className="g-3">
   
              <Col lg="4">
                    <Form.Label>Created Date </Form.Label>
                    <Form.Control type="text" defaultValue="June 4, 1999"/>
                  </Col>
                <Col lg="4">
                  <Form.Label>Updated Date</Form.Label>
                  <Form.Control type="text" defaultValue="June 4, 2024"/>
                </Col>
                <Col lg="4">
                  <Form.Label>Logged Time</Form.Label>
                  <Form.Control type="text" defaultValue="May 4, 2024" />
                </Col>
      
               
              </Row>
            </Form>
            <br />
          </Card.Body>
        </Card>


      </Row>
      <Row>
        {/* <div className="container d-flex justify-content-end" style={{ margin: 0, padding: 0 }}>
          <button o type="button" className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold ">
            Reset
          </button>

          <button style={{ marginLeft: '15px', backgroundColor: '#5A94C8' }} type="button" className="btn btn-icon btn-icon-start btn-primary font-weight-bold">
            Add Employee
          </button>
        </div> */}
      </Row>
    </>
  );
};

export default UsersDetail;
