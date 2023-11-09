import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ReactTags from 'react-tag-autocomplete';
import { Row, Col, Button, Dropdown, Card, Badge, Form } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { restaurantById } from 'actions/restaurant';

import cashImage from '../../../../assets/money.png';
import withdrawImage from '../../../../assets/money-withdrawal.png';
import withdrawBalanceImage from '../../../../assets/withdrawal.png';
import totalEarningImage from '../../../../assets/salary.png';

const CustomersDetail = ({ google }) => {
  const title = 'Restaurant Detail';
  const description = 'Ecommerce Customer Detail Page';

  const { restaurantId } = useParams();
  const dispatch = useDispatch();

  console.log(restaurantId);

  const getRestaurantbyId = () => {
    console.log(restaurantId);
    dispatch(restaurantById({ id: restaurantId }));
  };

  const { restaurant } = useSelector((state) => state.restaurant);

  useEffect(() => {
    getRestaurantbyId();
    console.log(restaurant);
    // setrestaurant(restaurant);
  }, []);

  // Tags
  const [tags, setTags] = useState([
    { id: 0, name: 'Rates' },
    { id: 1, name: 'Sales Shopper' },
    { id: 2, name: 'Newsletter' },
  ]);
  const onTagDelete = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };
  const onTagAddition = (tag) => {
    setTags(() => {
      return [...tags, tag];
    });
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
          {/* Title End */}

          {/* Top Buttons Start */}

          {/* Top Buttons End */}
        </Row>
      </div>

      <Row className="g-2 row-cols-1 row-cols-md-2 row-cols-xl-2 row-cols-xxl-3">
        {/* Merged Cards on the Left */}
        <Col md={6}>
          <Card style={{ backgroundColor: '#E0F0FF' }} className="mb-0 flex-fill custom-card h-100">
            <Row className="g-0 custom-card-body">
              <Col className="text-center">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <div className="mb-3">Collected cash by restaurant</div>
                  <div className="d-flex h6">
                    <img src={cashImage} alt="Image Description" style={{ maxWidth: 'auto', height: '35px', marginRight: '10px' }} />

                    <div className="mb-3 fw-bold fs-0" style={{ fontWeight: 'bold', fontSize: '24px', color: '#47566B' }}>
                      1000 AED
                    </div>
                  </div>
                  <NavLink to="/vendors/Restaurant/collection" className="w-100">
                    <button type="submit" className="btn btn-primary w-100 btn-block">
                      Collect cash from restaurant
                    </button>
                  </NavLink>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Two Flex Cards on the Right */}
        <Col md={6}>
          {/* Card 1 */}
          <Card style={{ backgroundColor: '#E1F2E8' }} className="mb-2 flex-fill custom-card">
            <Row className="g-0 custom-card-body">
              <Col>
                <Card.Body className="d-flex align-items-center py-3">
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div className="mb-2 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <div className="fw-bold fs-6" style={{ color: '#388F6D' }}>
                          2300 AED
                        </div>
                      </div>

                      <div>
                        <div className=" d-inline-block  align-text-top">Pending withdraw</div>
                      </div>
                    </div>
                    <div className="mb-0 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <img src={withdrawImage} alt="Image Description" style={{ maxWidth: '30px', height: 'auto' }} />
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          {/* Card 2 */}
          <Card style={{ backgroundColor: '#FEF4EB' }} className="mb-2 flex-fill custom-card">
            <Row className="g-0 custom-card-body">
              <Col>
                <Card.Body className="d-flex align-items-center py-3">
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div className="mb-2 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <div className="fw-bold fs-6" style={{ color: '#394052' }}>
                          2300 AED
                        </div>
                      </div>
                      <div>
                        <div className=" d-inline-block  align-text-top">Withdraw able balance</div>
                      </div>
                    </div>
                    <div className="mb-0 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <img src={withdrawBalanceImage} alt="Image Description" style={{ maxWidth: '30px', height: 'auto' }} />
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Two Fixed-Height Cards on the Right */}
        <Col md={6}>
          {/* Card 3 */}
          <Card style={{ backgroundColor: '#FFEDED' }} className="mb-2 custom-card">
            <Row className="g-0 custom-card-body">
              <Col>
                <Card.Body className="d-flex align-items-center py-3">
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div className="mb-2 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <div className="fw-bold fs-6" style={{ color: '#F39067' }}>
                          2300 AED
                        </div>
                      </div>
                      <div>
                        <div className=" d-inline-block  align-text-top">Total withdrawn amount</div>
                      </div>
                    </div>
                    <div className="mb-0 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <img src={withdrawBalanceImage} alt="Image Description" style={{ maxWidth: '30px', height: 'auto' }} />
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          {/* Card 4 */}
          <Card style={{ backgroundColor: '#E0F0FF' }} className="mb-2 custom-card">
            <Row className="g-0 custom-card-body">
              <Col>
                <Card.Body className="d-flex align-items-center py-3">
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div className="mb-2 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-medium sh-2" />
                        <div className="fw-bold fs-6" style={{ color: '#106BA4' }}>
                          2300 AED
                        </div>
                      </div>
                      <div>
                        <div className=" d-inline-block  align-text-top">Total earning</div>
                      </div>
                    </div>
                    <div className="mb-0 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <img src={totalEarningImage} alt="Image Description" style={{ maxWidth: '30px', height: 'auto' }} />
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <h2 className="small-title mt-5">Restaurant Info</h2>

      {/* Restaurant Info section */}
      <Card className="mb-5" style={{ borderRadius: '15px', height: '200px' }}>
        <Card.Body style={{ padding: 0 }}>
          <Form>
            <Row className="g-3">
              {/* Search Input on the Right */}

              <Col lg="6" className="p-5">
                <Row className="g-3">
                  <Col lg="15">
                    <div>
                      <div style={{ display: 'flex' }}>
                        <div className="profile-box" style={{ paddingRight: '10px' }}>
                          {/* Add your box image for the profile here */}
                          <img
                            src="https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg"
                            alt="Profile Box"
                            className="profile-box-image "
                            width="120"
                            height="120"
                            style={{ borderRadius: '10px' }}
                          />
                        </div>

                        <div>
                          <p className="text-small text-muted mb-2">SHIPPING ADDRESS</p>
                          <Row className="g-0 mb-2">
                            <Col xs="auto">
                              <div className="sw-3 me-1">
                                <CsLineIcons icon="user" size="17" className="text-primary" />
                              </div>
                            </Col>
                            <Col className="text-alternate">Blaine Cottrell</Col>
                          </Row>
                          <Row className="g-0 mb-2">
                            <Col xs="auto">
                              <div className="sw-3 me-1">
                                <CsLineIcons icon="pin" size="17" className="text-primary" />
                              </div>
                            </Col>
                            <Col className="text-alternate">4 Glamis Avenue, Strathmore Park, Wellington 6022, New Zealand</Col>
                          </Row>
                          <Row className="g-0 mb-2">
                            <Col xs="auto">
                              <div className="sw-3 me-1">
                                <CsLineIcons icon="phone" size="17" className="text-primary" />
                              </div>
                            </Col>
                            <Col className="text-alternate">+6443884455</Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
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
          </Form>
        </Card.Body>
      </Card>

      <Row className="row-cols-1 row-cols-md-2 g-2 mb-5">
        <Col>
          <h2 className="small-title">Owner Info</h2>
          <Card className=" h-100">
            <Card.Body>
              <Form>
                <Row className="g-3">
                  {/* Search Input on the Right */}

                  <Col className="p-0">
                    <Row className="g-3">
                      <Col lg="15">
                        <div>
                          <div style={{ display: 'flex' }}>
                            <div className="profile-box" style={{ paddingRight: '10px' }}>
                              {/* Add your box image for the profile here */}
                              <img
                                src="https://i0.wp.com/florrycreativecare.com/wp-content/uploads/2020/08/blank-profile-picture-mystery-man-avatar-973460.jpg?ssl=1"
                                alt="Profile Box"
                                className="profile-box-image rounded-circle"
                                width="120"
                                height="120"
                                style={{ borderRadius: '10px' }}
                              />
                            </div>

                            <div>
                              <p className="text-small text-muted mb-2">SHIPPING ADDRESS</p>
                              <Row className="g-0 mb-2">
                                <Col xs="auto">
                                  <div className="sw-3 me-1">
                                    <CsLineIcons icon="user" size="17" className="text-primary" />
                                  </div>
                                </Col>
                                <Col className="text-alternate">Blaine Cottrell</Col>
                              </Row>
                              <Row className="g-0 mb-2">
                                <Col xs="auto">
                                  <div className="sw-3 me-1">
                                    <CsLineIcons icon="pin" size="17" className="text-primary" />
                                  </div>
                                </Col>
                                <Col className="text-alternate">4 Glamis Avenue, Strathmore Park, Wellington 6022, New Zealand</Col>
                              </Row>
                              <Row className="g-0 mb-2">
                                <Col xs="auto">
                                  <div className="sw-3 me-1">
                                    <CsLineIcons icon="phone" size="17" className="text-primary" />
                                  </div>
                                </Col>
                                <Col className="text-alternate">+6443884455</Col>
                              </Row>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h2 className="small-title">Bank Info</h2>
          <Card className="h-100">
            <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <text style={{ color: 'grey' }}>NO DATA FOUND</text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="row-cols-1 row-cols-md-2 g-2 pt-5 mb-6">
        <Col>
          <h2 className="small-title">Restaurant Modal</h2>
          <Card className=" h-100">
            <Card.Body>
              <Form className="mb-n3">
                <></>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDrI53GlC5-ymZmPKzJq11U36dheMGfeLU',
})(CustomersDetail);
