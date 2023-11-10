import React, { useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { Card, Col, Form, Row } from 'react-bootstrap';

import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { connect, useDispatch, useSelector } from 'react-redux';
import { userById } from 'actions/user';
import moment from 'moment';

const UsersDetail = (props) => {
  const { userId } = useParams();
  console.log(userId);
  const title = `User ID # ${userId}`;
  const description = 'Ecommerce Storefront Checkout Page';

  const dispatch = useDispatch();

  const getUser = () => {
    console.log(userId);
    dispatch(userById({ id: userId }));
  };

  const { user, error, loading } = props;

  useEffect(() => {
    getUser();
    console.log(user);
    // setrestaurant(restaurant);
  }, []);

  const getImage = (image) => {
    return `${process.env.REACT_APP_BASE_URL}/${image}`;
  };

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
                    <Form.Control type="text" value={`${user?.firstName}`} readOnly />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={`${user?.lastName}`} readOnly />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" value={`${user?.mobile}`} readOnly />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={`${user?.email}`} readOnly />
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
                        src={getImage(user?.image)}
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
                          style={{ width: '20px', height: '20px', background: user?.loggedIn ? 'green' : 'grey', borderRadius: '50%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <text>&nbsp;</text>
              </Col>

              <h5 className="me-3 text-center">{`${user?.firstName} ${user?.lastName}`}</h5>
              <Form.Label style={{ display: 'block', margin: '0 auto', textAlign: 'center' }}>{`${user?.email}`}</Form.Label>
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
                <Col lg="4">
                  <Form.Label>Address </Form.Label>
                  <Form.Control type="text" value={`${user?.address}`} readOnly />
                </Col>

                <Col lg="4">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control type="text" value={`${user?.lat}`} readOnly />
                </Col>
                <Col lg="4">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control type="text" value={`${user?.long}`} readOnly />
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
                  <Form.Control type="text" value={`${moment(user?.createdAt).format('LLL')}`} readOnly />
                </Col>
                <Col lg="3">
                  <Form.Label>Updated Date</Form.Label>
                  <Form.Control type="text" value={`${moment(user?.updatedAt).format('LLL')}`} readOnly />
                </Col>
                <Col lg="3">
                  <Form.Label>Logged Time</Form.Label>
                  <Form.Control type="text" value={`${moment(user?.lastLoggedInTime).format('LLL')}`} readOnly />
                </Col>
                <Col lg="3">
                  <Form.Label>Logout Time</Form.Label>
                  <Form.Control type="text" value={`${moment(user?.lastLoggedOutTime).format('LLL')}`} readOnly />
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

function mapStateToProps(state) {
  console.log(state.user);
  return {
    user: state.user.userDetails,
    error: state.user.error,
    loading: state.user.loading,
    isAuthenticated: state.auth.isAuthenticated,
  };
}
export default connect(mapStateToProps)(UsersDetail);
