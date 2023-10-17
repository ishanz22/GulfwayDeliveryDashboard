import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import defaultProfileImage from '../../assets/DefaultUser.jpeg'; // Adjust the path as needed
import MyLocationIcon from '../../assets/my-location.png'; // Replace with the actual path to your image

const Categories = ({ google }) => {
  const title = 'Admin Profile';
  const description = 'Ecommerce Storefront Checkout Page';
  const [profileImageSrc, setProfileImageSrc] = useState(defaultProfileImage);
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
          <h2 className="small-title">General information</h2>
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

                  {/* <Col lg="12">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Col> */}
                </Row>
              </Form>
              <br />
              <button type="button" className="btn btn-icon btn-icon-start btn-outline-primary">
                Update
              </button>
            </Card.Body>
          </Card>
          {/* Address End */}
          <h2 className="small-title">Billing Address</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="g-3">
                  <Col lg="6">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="4">
                    <Form.Label>State</Form.Label>
                    <Select classNamePrefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" />
                  </Col>

                  <Col lg="4">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  {/* <Col lg="12">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Col> */}
                </Row>
              </Form>
              <br />
              <button type="button" className="btn btn-icon btn-icon-start btn-outline-primary">
                Update
              </button>
            </Card.Body>
          </Card>

          {/* map start  */}
          <h2 className="small-title">Location</h2>

          <Card className="mb-5" style={{ borderRadius: '15px', height: '400px' }}>
            <Card.Body style={{ padding: 0 }}>
              <Row className="g-3">
                {/* Search Input on the Right */}

                <Col lg="6" className="p-5">
                  <Form>
                    <div style={{ display: 'flex' }}>
                      <Form.Group controlId="searchInput" className="input-group">
                        <Form.Control type="text" placeholder="Search location" />
                        <div className="input-group-append">
                          <Button variant="primary" type="submit">
                            <CsLineIcons icon="search" />
                          </Button>
                        </div>
                      </Form.Group>
                      <text>&nbsp; &nbsp;</text>
                      <Button variant="primary" type="submit">
                        <img src={MyLocationIcon} alt="My Location" style={{ width: '20px', height: '20px' }} />
                      </Button>
                    </div>

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

                    <Button variant="primary" type="submit">
                      Search
                    </Button>
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
          {/* map end  */}

          {/* Contact Start */}
          <h2 className="small-title">Contact information</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="g-3">
                  <Col lg="6">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Fax Number</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Email Address for Admin Services </Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Email Address for Support</Form.Label>
                    <Form.Control type="text" />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Email Address for Legal Services </Form.Label>
                    <Form.Control type="text" />
                  </Col>

                  {/* <Col lg="12">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Col> */}
                </Row>
                <br />
                <button type="button" className="btn btn-icon btn-icon-start btn-outline-primary">
                  Update
                </button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg="auto" className="order-0 order-lg-1">
          <h2 className="small-title">&nbsp;</h2>
          <Card className="mb-3 w-100 sw-lg-35">
            <Card.Body>
              <Col lg="auto" className="order-0 order-lg-1">
                <div className="text-center">
                  <img
                    src={profileImageSrc || 'default-profile-image.jpg'}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #fff' }}
                  />
                </div>
                <text>&nbsp;</text>
                <h2 className="small-title text-center">Admin</h2>
                <p className="text-center email" style={{ fontSize: '1rem' }}>
                  admin@example.com
                </p>

                <div className="text-center location">
                  <p>New York, USA</p>
                </div>
                <div className="text-center upload-button">
                  {/* Hidden file input */}
                  <input type="file" id="profile-upload" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
                  {/* Custom button to trigger file input */}
                  <button type="button" className="btn btn-primary upload-label" onClick={handleChooseFileClick}>
                    Upload Profile Image
                  </button>
                </div>
              </Col>
            </Card.Body>
          </Card>
        </Col>
        {/*  */}
      </Row>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDrI53GlC5-ymZmPKzJq11U36dheMGfeLU',
})(Categories);
