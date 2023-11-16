import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Tooltip, OverlayTrigger, Modal, Container } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import OrderDetailsData from 'data/OrderDetailsData';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Divider from '@mui/material/Divider';
import AllRidersDataMap from 'data/AllRidersDataMap';
import RiderList from 'views/riders/list/RiderList';
import { Table } from 'antd';

const OrderEdit = ({ google }) => {
  const location = useLocation();
  const { user } = location.state;
  console.log(user);
  const title = `Order #${user.id}`;
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

      console.log('Image:', image);
      console.log('Name:', name);
    }

    handleCloseModal();
  };

  const dataSource = user.items.map((item, index) => ({
    key: index,
    itemName: item.itemName,
    quantity: item.quantity,
    itemPrice: item.itemPrice,
    totalPrice: item.quantity * item.itemPrice,
  }));
  const tableHeaderStyle = {
    color: 'grey',
    fontSize: '10px',
  };

  const columns = [
    {
      title: <span style={tableHeaderStyle}>ITEMS SUMMARY</span>,
      dataIndex: 'itemName',
      key: 'itemName',
    },
    {
      title: <span style={tableHeaderStyle}>QTY</span>,
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: <span style={tableHeaderStyle}>PRICE</span>,
      dataIndex: 'itemPrice',
      key: 'itemPrice',
    },
    {
      title: <span style={tableHeaderStyle}>TOTAL PRICE</span>,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
  ];
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
                                      <p style={{ paddingLeft: '10px' }} className=" fs-5">
                                        {selectedRider.profileName}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Badge in top right corner */}
                                  <div>
                    <div
                      style={{
                        padding: 5,
                        borderRadius: 5,

                        backgroundColor: (() => {
                          switch (user.status) {
                            case 'PAID':
                              return '#f6ffed';
                            case 'PENDING':
                              return '#fffbe6';
                    
                            case 'REFUNDED':
                              return '#e6f7ff';
                              case 'CANCELED':
                                return '#fff2f0';
                            default:
                              return '';
                          }
                        })(),

                        color: (() => {
                          switch (user.status) {
                            case 'PAID':
                              return '#52c41a';
                            case 'ON-TRAVEL':
                              return '#388F6D';
                            case 'PENDING':
                              return '#faad14';
                            case 'DECLINED':
                              return '#FF4D4F';
                            case 'REFUNDED':
                              return '#096dd9';
                              case 'CANCELED':
                                return '#ff4d4f';
                       
                            default:
                              return '';
                          }
                        })(),
                        borderColor: (() => {
                          switch (user.status) {
                            case 'PAID':
                              return '#b7eb8f';
                            case 'ON-TRAVEL':
                              return '#388F6D';
                            case 'PENDING':
                              return '#ffe58f';
                           
                            case 'REFUNDED':
                              return '#91d5ff';
                              case 'CANCELED':
                                return '#ffccc7';
                      
                            default:
                              return '';
                          }
                        })(),
                        borderWidth: 1, // You can adjust the border width as needed
                        borderStyle: 'solid',
                      }}
                      className="text-small"
                    >
                      {' '}
                      {user.status}
                    </div>
                  </div>
                                </div>

                                <div style={{ height: '20px' }} />

                                <div className="d-flex flex-column flex-md-row">
                                  {/* Name and Email */}
                                  <div className="d-flex flex-column flex-md-row">
                                    <div className="me-4">
                                      <p className=" text-muted">
                                        <CsLineIcons icon="credit-card" className="me-2" />
                                        {selectedRider.creditCard}
                                      </p>
                                      <p className=" text-muted">
                                        <CsLineIcons icon="compass" className="me-2" />
                                        {selectedRider.location}
                                      </p>
                                    </div>
                                    <div className="ms-md-5">
                                      {' '}
                                      <p className=" text-muted">
                                        <CsLineIcons icon="email" className="me-2" />
                                        {selectedRider.email}
                                      </p>
                                      <p className=" text-muted">
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
                                  <div className="d-flex flex-column flex-md-row">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '300' }} className="d-flex flex-column flex-md-row">
                                      <div className="me-4">
                                        <p className=" text-normal">Vehicle Type</p>
                                        <p className=" text-normal">Vehicle Number</p>
                                        <p className=" text-normal">Vehicle Extra Charges</p>
                                        <p className=" text-normal">Vehicle Min Coverage</p>
                                        <p className=" text-normal">Vehicle Max Coverage</p>
                                      </div>
                                      <div className="ms-md-5">
                                        <p className=" text-alternate">{selectedRider.vehicleType}</p>
                                        <p className=" text-alternate">{selectedRider.vehicleNumber}</p>
                                        <p className=" text-alternate">{selectedRider.vehicleExtraCharges}</p>
                                        <p className=" text-alternate">{selectedRider.vehicleMinCoverage}</p>
                                        <p className=" text-alternate">{selectedRider.vehicleMaxCoverage}</p>
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
                                        <p className=" text-normal">Identity Type</p>
                                        <p className=" text-normal">Identity Number</p>
                                      </div>
                                      <div className="ms-md-5">
                                        {/* Add margin-left for spacing */}
                                        <p className=" text-alternate">{selectedRider.identityType}</p>
                                        <p className=" text-alternate">{selectedRider.identityNumber}</p>
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
              <Button variant="primary" onClick={handleChangeRider}>
                Change Rider
              </Button>
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

          <Table dataSource={dataSource} columns={columns} pagination={false} className="mb-5" />
          {/* Activity End */}
          <h2 className="small-title">Customer and Order Details</h2>
          <Card className="mb-10">
            <Card.Body>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div> Customer Name</div>
                <div className="text-alternate">{user.customerName}</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between border-top">
                <div>Email</div>
                <div className="text-alternate">{user.customerEmail}</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between border-top">
                <div>Phone Number</div>
                <div className="text-alternate">{user.customerPhone}</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between border-top">
                <div>Date</div>
                <div className="text-alternate">{user.customerDate}</div>
              </div>

              <div className="mb-n0 p-3 d-flex justify-content-between border-top">
                <div>Note</div>
                <div className="text-alternate">{user.note}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl="4" xxl="3">
          {/* Address Start */}
          <h2 className="small-title">Rider Details</h2>
          <Card className="mb-5">
            <Card.Body>
              <>
                <div className="d-flex justify-content-between align-items-start">
                  <div style={{ display: 'flex' }}>
                    {/* Profile Image */}
                    <div className="rounded-circle overflow-hidden" style={{ width: '55px', height: '55px' }}>
                      <div>
                        <img src={user.riderImage} alt="Profile" className="w-100 h-100 object-fit-cover" />
                      </div>
                    </div>

                    {/* Profile Name */}
                    <div>
                      <p style={{ paddingLeft: '10px' }} className=" fs-5">
                        {/* {selectedRider.profileName} */}
                        {user.profileName}
                      </p>
                    </div>
                  </div>

                  {/* Badge in top right corner */}
                  <div>
                    <div
                      style={{
                        padding: 5,
                        borderRadius: 5,

                        backgroundColor: (() => {
                          switch (user.status) {
                            case 'PAID':
                              return '#f6ffed';
                            case 'PENDING':
                              return '#fffbe6';
                    
                            case 'REFUNDED':
                              return '#e6f7ff';
                              case 'CANCELED':
                                return '#fff2f0';
                            default:
                              return '';
                          }
                        })(),

                        color: (() => {
                          switch (user.status) {
                            case 'PAID':
                              return '#52c41a';
                            case 'ON-TRAVEL':
                              return '#388F6D';
                            case 'PENDING':
                              return '#faad14';
                            case 'DECLINED':
                              return '#FF4D4F';
                            case 'REFUNDED':
                              return '#096dd9';
                              case 'CANCELED':
                                return '#ff4d4f';
                       
                            default:
                              return '';
                          }
                        })(),
                        borderColor: (() => {
                          switch (user.status) {
                            case 'PAID':
                              return '#b7eb8f';
                            case 'ON-TRAVEL':
                              return '#388F6D';
                            case 'PENDING':
                              return '#ffe58f';
                           
                            case 'REFUNDED':
                              return '#91d5ff';
                              case 'CANCELED':
                                return '#ffccc7';
                      
                            default:
                              return '';
                          }
                        })(),
                        borderWidth: 1, // You can adjust the border width as needed
                        borderStyle: 'solid',
                      }}
                      className="text-small"
                    >
                      {' '}
                      {user.status}
                    </div>
                  </div>
                </div>

                <div style={{ height: '20px' }} />

                <div className="d-flex flex-column flex-md-row">
                  {/* Name and Email */}
                  <div className="d-flex flex-column flex-md-row">
                    <div className="me-4">
                      <p className=" text-muted">
                        <CsLineIcons icon="credit-card" className="me-2" />
                        {/* {selectedRider.creditCard} */}
                        {user.riderPhone}
                      </p>
                      <p className=" text-muted">
                        <CsLineIcons icon="compass" className="me-2" />
                        {user.location}
                      </p>
                    </div>
                    <div className="ms-md-4">
                      <p className=" text-muted">
                        <CsLineIcons icon="email" className="me-2" />

                        {user.riderEmail}
                      </p>
                      <p className=" text-muted">
                        <CsLineIcons icon="clock" className="me-2" />
                        {/* {selectedRider.clockIconText} */}
                        {user.riderTime}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            </Card.Body>
          </Card>
          <h2 className="small-title">Order Summary</h2>
          <Card className="mb-0">
            <Card.Body>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div>Order Created</div>
                <div className="text-alternate">{user.orderCreated}</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div>Order Time</div>
                <div className="text-alternate">{user.orderTime}</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div>Sub Total</div>
                <div className="text-alternate">AED {user.subTotal}</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div>Delivery Fee</div>
                <div className="text-alternate">{user.deliveryFee}</div>
              </div>
            </Card.Body>
          </Card>
          &nbsp;
          <Card className="mb-0">
            <Card.Body>
              <div className=" p-0 d-flex justify-content-between">
                <div>
                  <text>Total</text>
                </div>
                <div className="text-alternate">{user.total}</div>
              </div>
            </Card.Body>
          </Card>
          {/* Address End */}
          &nbsp;
          <h2 className="small-title">Delivery Address</h2>
          <Card className="mb-0">
            <Card.Body>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div>Address</div>
                <div className="text-alternate">{user.total}</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div>Flat Building Name</div>
                <div className="text-alternate">{user.flatBuildingName}</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div>Street Name</div>
                <div className="text-alternate">{user.street}</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div>PostCode</div>
                <div className="text-alternate">{user.postcode}</div>
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
})(OrderEdit);
