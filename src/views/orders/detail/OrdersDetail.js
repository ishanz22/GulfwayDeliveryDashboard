import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Tooltip, OverlayTrigger, Modal, Container } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import OrderDetailsData from 'data/OrderDetailsData';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import AllRidersDataMap from 'data/AllRidersDataMap';
import RiderList from 'views/riders/list/RiderList';

const OrdersDetail = ({ google }) => {
  const title = 'Order Number #3848484';
  const description = 'Ecommerce Order Detail Page';
  const [showModal, setShowModal] = useState(false); 
  const [selectedRider, setSelectedRider] = useState(null);
  const customMarkerIcons = {};

  
  const [value, setValue] = useState('1');
  AllRidersDataMap.forEach((rider) => {
    customMarkerIcons[rider.id] = {
      url: rider.profileImage, 
      scaledSize: new google.maps.Size(40, 40),
    };
  });
  const handleMarkerClick = (rider) => {
    setSelectedRider(rider);
  };
  const handleShowModal = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };
  const allItems = [1, 2, 3, 4];
  const [selectedItems, setSelectedItems] = useState([]);
  const checkItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((x) => x !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const toggleCheckAll = (allSelect) => {
    if (allSelect) {
      setSelectedItems(allItems);
    } else {
      setSelectedItems([]);
    }
  };
  const handleChangeRider = () => {
    if (selectedRider) {
      const image = selectedRider.profileImage;
      const name = selectedRider.profileName;
  
      console.log("Image:", image);
      console.log("Name:", name);
    }
  
    // Add any additional functionality you need when the button is clicked.
    // For example, you can close the modal here.
    handleCloseModal();
  };
  
    
  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/orders">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Orders</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button variant="outline-primary" className="btn-icon btn-icon-start w-100 w-md-auto" onClick={handleShowModal}>
              <CsLineIcons icon="destination" /> <span>Change Rider</span>
            </Button>
            <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
              <CsLineIcons icon="sort" />
            </Button>
          </Col>
          {/* Top Buttons End */}
          <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
            <Modal.Header closeButton>
              <Modal.Title>Change Rider</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container fluid>
                <Row>
                  <Col xs={20} lg={20}>
                    <Row>
                      <Col className="col-lg order-0 order-lg-0">
                        <h2 className="small-title">Map</h2>
                        <Card className="mb-5" style={{ height: '725px' }}>
                          <Card.Body style={{ padding: 0 }}>
                            <Row className="g-3">
                              <Col>
                                <Map google={google} initialCenter={{ lat: 25.1838, lng: 55.36587 }} zoom={14} style={{ height: '100%', borderRadius: '15px' }}>
                                  {AllRidersDataMap.map((rider) => (
                                    <Marker
                                      key={rider.id}
                                      position={{ lat: rider.latitude, lng: rider.longitude }}
                                      icon={customMarkerIcons[rider.id]}
                                      onClick={() => handleMarkerClick(rider)} // Add click event handler
                                      style={{ borderRadius: '10px' }}
                                    />
                                  ))}
                                </Map>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col lg="auto" className="order-0 order-lg-1">
                        <h2 className="small-title"> Rider Details</h2>
                        <Card className="mb-5 w-100 sw-lg-45">
                          <Card.Body>
                            {selectedRider ? (
                              <>
                                <div className="d-flex justify-content-between align-items-start">
                                  <div style={{ display: 'flex' }}>
                                    {/* Profile Image */}
                                    <div className="rounded-circle overflow-hidden" style={{ width: '55px', height: '55px' }}>
                                      <div>
                                        <img src={selectedRider.profileImage} alt="Profile" className="w-100 h-100 object-fit-cover" />
                                      </div>
                                    </div>

                                    {/* Profile Name */}
                                    <div>
                                      <p style={{ paddingLeft: '10px' }} className="fw-bold fs-5">
                                        {selectedRider.profileName}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Badge in top right corner */}
                                  <div className="position-relative " style={{ marginTop: '5px' }}>
                                    <Badge bg="outline-primary" className="position-absolute top-0 end-0">
                                      {selectedRider.badge}
                                    </Badge>
                                  </div>
                                </div>

                                <div style={{ height: '20px' }} />

                                <div className="d-flex flex-column flex-md-row">
                                  {/* Name and Email */}
                                  <div className="d-flex flex-column flex-md-row">
                                    <div className="me-4">
                                      <p className="fw-bold text-muted">
                                        <CsLineIcons icon="credit-card" className="me-2" />
                                        {selectedRider.creditCard}
                                      </p>
                                      <p className="fw-bold text-muted">
                                        <CsLineIcons icon="compass" className="me-2" />
                                        {selectedRider.location}
                                      </p>
                                    </div>
                                    <div className="ms-md-5">
                                      {' '}
                                      {/* Add margin-left for spacing */}
                                      <p className="fw-bold text-muted">
                                        <CsLineIcons icon="email" className="me-2" />
                                        {selectedRider.email}
                                      </p>
                                      <p className="fw-bold text-muted">
                                        <CsLineIcons icon="clock" className="me-2" />
                                        {selectedRider.clockIconText}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <p>Select a rider on the map to view details.</p>
                            )}
                          </Card.Body>
                        </Card>

                        <h2 className="small-title">Vehicle Information</h2>
                        <Card className="mb-5 w-100 sw-lg-45">
                          <Card.Body>
                            {selectedRider ? (
                              <>
                                <div className="d-flex flex-column flex-md-row">
                                  {/* Name and Email */}
                                  <div className="d-flex flex-column flex-md-row">
                                    {/* Name and Email */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '300' }} className="d-flex flex-column flex-md-row">
                                      <div className="me-4">
                                        <p className="fw-bold text-normal">Vehicle Type</p>
                                        <p className="fw-bold text-normal">Vehicle Number</p>
                                        <p className="fw-bold text-normal">Vehicle Extra Charges</p>
                                        <p className="fw-bold text-normal">Vehicle Min Coverage</p>
                                        <p className="fw-bold text-normal">Vehicle Max Coverage</p>
                                      </div>
                                      <div className="ms-md-5">
                                        {/* Add margin-left for spacing */}
                                        <p className="fw-bold text-alternate">{selectedRider.vehicleType}</p>
                                        <p className="fw-bold text-alternate">{selectedRider.vehicleNumber}</p>
                                        <p className="fw-bold text-alternate">{selectedRider.vehicleExtraCharges}</p>
                                        <p className="fw-bold text-alternate">{selectedRider.vehicleMinCoverage}</p>
                                        <p className="fw-bold text-alternate">{selectedRider.vehicleMaxCoverage}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <p>Select a rider on the map to view details.</p>
                            )}
                          </Card.Body>
                        </Card>

                        <h2 className="small-title">Identity Information</h2>
                        <Card className="mb-5 w-100 sw-lg-45">
                          <Card.Body>
                            {selectedRider ? (
                              <>
                                <div className="d-flex flex-column flex-md-row">
                                  {/* Name and Email */}
                                  <div className="d-flex flex-column flex-md-row">
                                    {/* Name and Email */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '300' }} className="d-flex flex-column flex-md-row">
                                      <div className="me-4">
                                        <p className="fw-bold text-normal">Identity Type</p>
                                        <p className="fw-bold text-normal">Identity Number</p>
                                      </div>
                                      <div className="ms-md-5">
                                        {/* Add margin-left for spacing */}
                                        <p className="fw-bold text-alternate">{selectedRider.identityType}</p>
                                        <p className="fw-bold text-alternate">{selectedRider.identityNumber}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <p>Select a rider on the map to view details.</p>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              {/* You can add additional functionality when the modal closes */}
              <Button variant="primary" onClick={handleChangeRider}>Change Rider</Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </div>

      <Row>
        <Col xl="8" xxl="9">
          {/* Status Start */}

          {/* Status End */}

          {/* Cart Start */}

          {/* Cart End */}

          {/* Activity Start */}

          <Card className="mb-5">
            <Card.Body>
              <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
                <Col md="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                  <div className="text-muted text-small cursor-pointer sort">ITEMS SUMMARY</div>
                </Col>
                <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                  <div className="text-muted text-small cursor-pointer sort">QTY</div>
                </Col>
                <Col md="4" className="d-flex flex-column pe-1 justify-content-center">
                  <div className="text-muted text-small cursor-pointer sort">PRICE</div>
                </Col>
                <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                  <div className="text-muted text-small cursor-pointer sort">TOTAL PRICE</div>
                </Col>
              </Row>

              {OrderDetailsData.map((orderDetail) => (
                <Card key={orderDetail.id} className={`mb-2 ${selectedItems.includes(orderDetail.id) && 'selected'}`}>
                  <Card.Body className="pt-0 pb-0 sh-21 sh-md-6">
                    <Row className="g-0 h-100 align-content-center cursor-default">
                      <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                        <div className="text-muted text-small d-md-none">Code</div>
                        {/* <Button variant="link" className="p-0 text-alternate h-100 d-flex align-items-center">
                          {orderDetail.itemName}
                        </Button> */}
                        <div className="text-alternate">{` ${orderDetail.itemName}`}</div>
                      </Col>
                      <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                        <div className="text-muted text-small d-md-none">Type</div>
                        <div className="text-alternate">{`x ${orderDetail.quantity}`}</div>
                      </Col>
                      <Col xs="6" md="4" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                        <div className="text-muted text-small d-md-none">Date</div>
                        <div className="text-alternate">{orderDetail.price}</div>
                      </Col>
                      <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                        <div className="text-muted text-small d-md-none">Usage</div>
                        <div className="text-alternate">{orderDetail.totalPrice}</div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
          {/* Activity End */}
          <h2 className="small-title">Customer and Order Details</h2>
          <Card className="mb-10">
            <Card.Body>
              <div className="mb-5">
                <Row className="g-0 sh-0 mb-0">
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-0 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className=" d-flex flex-row pe-2 align-items-end text-alternate">
                              <text style={{ color: '#4E4E4E' }}> Customer Name</text>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>Harun Billi</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="mb-5">
                <Row className="g-0 sh-0 mb-0">
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-0 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <text style={{ color: '#4E4E4E' }}> Phone Number</text>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>05064738383</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="mb-5">
                <Row className="g-0 sh-0 mb-0">
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-0 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <text style={{ color: '#4E4E4E' }}> Bag Option</text>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>No Blog</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="mb-5">
                <Row className="g-0 sh-0 mb-0">
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-0 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <text style={{ color: '#4E4E4E' }}> Type</text>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>Delivery</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="mb-5">
                <Row className="g-0 sh-0 mb-0">
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-0 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <text style={{ color: '#4E4E4E' }}> Note</text>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>N/A</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl="4" xxl="3">
          {/* Address Start */}
          <h5 className="me-3">Rider Details</h5>
          <Card className="mb-5">
            <Card.Body>
              <div className="d-flex align-items-center">
                <br />
                <div className="rounded-circle overflow-hidden w-20 h-20">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" 
                      alt="Profile"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                </div>
                <div className="ms-3" style={{ paddingTop: 15 }}>
                  <p>Robert Suvent</p>
                </div>
                &ensp; &ensp;
                <button type="button" className="btn btn-primary upload-label">
                  Track Rider
                </button>
              </div>
            </Card.Body>
          </Card>
          <h5 className="me-3">Order Summary</h5>
          <Card className="mb-0">
            <Card.Body>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Order Created</div>
                <div>Sun, Sep 7 2023</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Order Time</div>
                <div>06.24 AM</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Sub Total</div>
                <div>AED 375</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Delivery Fee</div>
                <div>0.00</div>
              </div>
            </Card.Body>
          </Card>
          &nbsp;
          <Card className="mb-0">
            <Card.Body>
              <div className=" p-0 d-flex justify-content-between">
                <div>
                  <text style={{ fontWeight: '700' }}>Total</text>
                </div>
                <div>AED 375</div>
              </div>
            </Card.Body>
          </Card>
          {/* Address End */}
          &nbsp;
          <h5 className="me-3">Delivery Address</h5>
          <Card className="mb-0">
            <Card.Body>
              <div className=" mb-n0 p-2 d-flex ">
                <div>
                  <text style={{ fontWeight: '700' }}>Address line:</text>
                </div>
                <text>&nbsp;&nbsp;</text>
                <text>Port Saeed, Deira Dubai</text>
              </div>

              <div className="mb-n0 p-2 p-0 d-flex ">
                <div>
                  <text style={{ fontWeight: '700' }}>Flat Building Name:</text>
                </div>
                <text>&nbsp;&nbsp;</text>
                <text>SBK</text>
              </div>

              <div className="mb-n0 p-2 p-0 d-flex ">
                <div>
                  <text style={{ fontWeight: '700' }}>Street Name:</text>
                </div>
                <text>&nbsp;&nbsp;</text>
                <text>Deira</text>
              </div>

              <div className="mb-n0 p-2 p-0 d-flex ">
                <div>
                  <text style={{ fontWeight: '700' }}>PostCode:</text>
                </div>
                <text>&nbsp;&nbsp;</text>
                <text>en34hy</text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDrI53GlC5-ymZmPKzJq11U36dheMGfeLU',
})(OrdersDetail);
