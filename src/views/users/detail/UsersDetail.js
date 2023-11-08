import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Card, Col, Form, Row } from 'react-bootstrap';

import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';


const UsersDetail = () => {
  const location = useLocation();
  const { user } = location.state; 
  console.log(user);
  const title = `User ID #${user.id}`;
  const description = 'Ecommerce Storefront Checkout Page';


  return (
    <>
      <HtmlHead title={title} description={description} />

      <div className="page-title-container">
        <Row className="g-0">
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/users/list">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Users List</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
        </Row>
      </div>

      <Row>
        <Col xs="12" className="col-lg order-1 order-lg-0">
          <h2 className="small-title">Personal information</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="g-3">
                  <Col lg="6">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" defaultValue={`${user.name}`} readOnly />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" defaultValue={`${user.name}`} readOnly />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" defaultValue={`${user.phone}`} readOnly />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" defaultValue={`${user.email}`} readOnly />
                  </Col>
                </Row>
              </Form>
              <br />
            </Card.Body>
          </Card>
        </Col>

        <Col lg="auto" className="order-0 order-lg-1">
          <h2 className="small-title">&nbsp;</h2>
          <Card className="mb-3 w-100 sw-lg-35">
            <Card.Body>
              <Col lg="auto" className="order-0 order-lg-1">
                <div className="text-center">
                  <div className="text-center">
                    <div className="position-relative d-inline-block">
                      <img
                        src={user.userImage}
                        alt="Profile"
                        className="rounded-circle"
                        style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          border: '1px solid #fff',
                        }}
                      />
                      <div className="position-absolute bottom-0 end-0 bg-white rounded-circle" style={{ width: '25px', height: '25px' }}>
                        <div
                          className="position-absolute top-50 start-50 translate-middle"
                          style={{ width: '20px', height: '20px', background: user.loggedIn ? 'green' : 'grey', borderRadius: '50%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <text>&nbsp;</text>
              </Col>

              <h5 className="me-3 text-center">{`${user.name}`}</h5>
              <Form.Label style={{ display: 'block', margin: '0 auto', textAlign: 'center' }}>{`${user.email}`}</Form.Label>
            </Card.Body>
          </Card>
        </Col>
        {/*  */}
      </Row>

      <Row>
        {/* Address End */}
        <h2 className="small-title">Address Information</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form>
              <Row className="g-3">
                <Col lg="3">
                  <Form.Label>Address </Form.Label>
                  <Form.Control type="text" defaultValue={`${user.address}`} readOnly />
                </Col>
                <Col lg="3">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" defaultValue={`${user.city}`} readOnly />
                </Col>
                <Col lg="3">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control type="text" defaultValue={`${user.latitude}`} readOnly />
                </Col>
                <Col lg="3">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control type="text" defaultValue={`${user.longitude}`} readOnly />
                </Col>
              </Row>
            </Form>
            <br />
          </Card.Body>
        </Card>
        {/* Address End */}
        <h2 className="small-title">Account Information</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form>
              <Row className="g-3">
                <Col lg="3">
                  <Form.Label>Created Date </Form.Label>
                  <Form.Control type="text" defaultValue={`${user.createdDate}`} readOnly />
                </Col>
                <Col lg="3">
                  <Form.Label>Updated Date</Form.Label>
                  <Form.Control type="text" defaultValue={`${user.updatedDate}`} readOnly />
                </Col>
                <Col lg="3">
                  <Form.Label>Logged Time</Form.Label>
                  <Form.Control type="text" defaultValue={`${user.loginTime}`} readOnly />
                </Col>
                <Col lg="3">
                  <Form.Label>Logout Time</Form.Label>
                  <Form.Control type="text" defaultValue={`${user.logOutTime}`} readOnly />
                </Col>
              </Row>
            </Form>
            <br />
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default UsersDetail;
