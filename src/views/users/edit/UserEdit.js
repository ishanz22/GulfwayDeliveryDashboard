/* eslint-disable no-nested-ternary */
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { connect, useDispatch, useSelector } from 'react-redux';
import { editUser, userById } from 'actions/user';
import moment from 'moment';
import { toast } from 'react-toastify';

// import { profile } from '../../../../public/img/profile/profile-11.webp';

const UserEdit = (props) => {
  const [isFormModified, setIsFormModified] = useState(false);
  const [edited, setEdited] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const { userDetails, error, success, loading } = props;

  const { userId } = useParams();
  console.log(userId);

  const dispatch = useDispatch();

  const getUser = () => {
    console.log(userId);
    dispatch(userById({ id: userId }));
    setEdited(true);
  };

  // const { user } = useSelector((state) => state.user);

  const title = 'Edit User';
  const description = 'Ecommerce Storefront Checkout Page';
  const fileInputRef = useRef(null);
  const [profileImageSrc, setProfileImageSrc] = useState('');

  const getImage = (image) => {
    return `${process.env.REACT_APP_BASE_URL}/${image}`;
  };

  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,

      [name]: value,
    });
    console.log(formData);
    setIsFormModified(true);
  };

  const handleUpdateClick = () => {
    const updatedFormData = {
      ...formData,
      image: profileImageSrc,
    };
    const formdata = new FormData();

    Object.entries(updatedFormData).forEach(([key, value]) => {
      formdata.append(key, value);
    });

    console.log('Updated formData:', updatedFormData);

    dispatch(editUser({ data: formdata, id: userId }));

    setIsFormModified(false);
    setIsImageUploaded(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProfileImageSrc(file);

    setFormData({
      ...formData,
      image: profileImageSrc,
    });

    console.log(formData);
  };
  const handleChooseFileClick = () => {
    fileInputRef.current.click();

    setFormData({
      ...formData,
      image: profileImageSrc,
    });

    console.log(formData);
  };
  const handleResetClick = () => {
    setFormData({
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      address: userDetails?.address,
      lat: userDetails?.lat,
      long: userDetails?.long,
    });
    setProfileImageSrc(userDetails?.image || null);
    setIsFormModified(false);
    setIsImageUploaded(false);
  };

  useEffect(() => {
    getUser();
    console.log(userDetails);
    setFormData(userDetails);

    // setrestaurant(restaurant);
  }, [formData]);

  const result = profileImageSrc
    ? URL.createObjectURL(profileImageSrc)
    : userDetails?.image !== ''
    ? getImage(userDetails?.image)
    : '/img/profile/profile-11.webp';

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
                    <Form.Control type="text" name="firstName" value={formData?.firstName} onChange={handleInputChange} />
                    {/* <input className="form-control" type="text" id="firstName" name="firstName" value={formData?.firstName} onChange={handleInputChange} /> */}
                  </Col>
                  <Col lg="6">
                    <Form.Label>Last Name</Form.Label>

                    <Form.Control type="text" name="lastName" value={formData?.lastName} onChange={handleInputChange} />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" value={`${userDetails?.mobile}`} readOnly />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={`${userDetails?.email}`} readOnly />
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
                <div className="text-center ">
                  <div className="text-center">
                    <div className="position-relative d-inline-block">
                      <img
                        src={result}
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
                          style={{ width: '20px', height: '20px', background: userDetails?.loggedIn ? 'green' : 'grey', borderRadius: '50%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <text>&nbsp;</text>
              </Col>

              <div className="text-center upload-button mt-2">
                {/* Hidden file input */}
                <input type="file" id="profile-upload" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
                <button type="button" className="btn btn-outline-primary upload-label" onClick={handleChooseFileClick}>
                  Upload Image
                </button>
              </div>
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
                  <Form.Control type="text" name="address" value={formData?.address} onChange={handleInputChange} />
                </Col>

                <Col lg="4">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control name="lat" value={formData?.lat} onChange={handleInputChange} />
                </Col>
                <Col lg="4">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control type="text" name="long" value={formData?.long} onChange={handleInputChange} />
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
                  <Form.Control type="text" value={`${moment(userDetails?.createdAt).format('LLL')}`} readOnly />
                </Col>
                <Col lg="3">
                  <Form.Label>Updated Date</Form.Label>
                  <Form.Control type="text" value={`${moment(userDetails?.updatedAt).format('LLL')}`} readOnly />
                </Col>
                <Col lg="3">
                  <Form.Label>Logged Time</Form.Label>
                  <Form.Control type="text" value={`${moment(userDetails?.lastLoggedInTime).format('LLL')}`} readOnly />
                </Col>
                <Col lg="3">
                  <Form.Label>Logout Time</Form.Label>
                  <Form.Control type="text" value={`${moment(userDetails?.lastLoggedOutTime).format('LLL')}`} readOnly />
                </Col>
              </Row>
            </Form>
            <br />
          </Card.Body>
        </Card>
      </Row>

      <Row>
        <div className="container d-flex justify-content-end" style={{ margin: 0, padding: 0 }}>
          <button type="button" onClick={handleResetClick} className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold">
            Reset
          </button>

          <Button
            style={{ marginLeft: '15px' }}
            type="button"
            variant="primary"
            onClick={handleUpdateClick}
            // disabled={!isFormModified || (!isImageUploaded && !userDetails?.image)}
          >
            Update
          </Button>
        </div>
      </Row>
    </>
  );
};
function mapStateToProps(state) {
  console.log(state.user);
  return {
    userDetails: state.user.userDetails,
    error: state.auth.error,
    loading: state.auth.loading,
    success: state.user.success,
  };
}
export default connect(mapStateToProps)(UserEdit);
