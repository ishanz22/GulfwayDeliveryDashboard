import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AllRidersDataMap from 'data/AllRidersDataMap';
import RiderListData from '../../../data/RiderListData';

const AllRidersMap = ({ google }) => {
  const title = 'All Riders';
  const description = 'Ecommerce Storefront Checkout Page';

  // Define dummy rider data with coordinates

  const customMarkerIcons = {}; // Object to store custom marker icons
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [filteredData, setFilteredData] = useState(RiderListData);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedStatus, setSelectedStatus] = useState('All');

  // Create a custom marker icon for each rider
  AllRidersDataMap.forEach((rider) => {
    customMarkerIcons[rider.id] = {
      url: rider.profileImage, // Use the rider's profile image URL
      scaledSize: new google.maps.Size(40, 40),
    };
  });

  // State to store the selected rider's details
  const [selectedRider, setSelectedRider] = useState(null);

  // Function to handle marker click
  const handleMarkerClick = (rider) => {
    setSelectedRider(rider);
  };
  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

  const smallImageStyle = {
    width: '30px', // Adjust the width as needed
    height: '30px', // Adjust the height as needed
    borderRadius: '50%', // Makes the image round
    overflow: 'hidden', // Ensures the image stays within the round shape
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  const filterDataByStatus = (status) => {
    setSelectedStatus(status);
    if (status === 'All') {
      // Show all data
      setFilteredData(RiderListData);
    } else {
      // Filter data by status
      const filteredItems = RiderListData.filter((item) => item.status === status);
      setFilteredData(filteredItems);
    }
  };
  const allRiders = () => {
    filterDataByStatus('All');
  };

  const availableRiders = () => {
    filterDataByStatus('AVAILABLE');
  };

  const onTravelRiders = () => {
    filterDataByStatus('ON-TRAVEL');
  };

  const deliveredRiders = () => {
    filterDataByStatus('DELIVERED');
  };
  const canceledRiders = () => {
    filterDataByStatus('CANCELED');
  };
  const notAvailableRiders = () => {
    filterDataByStatus('NOT-AVAILABLE');
  };
  useEffect(() => {
    filterDataByStatus('All');
  }, []);
  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/riders">
          <CsLineIcons icon="chevron-left" size="13" />
          <span className="align-middle text-small ms-1">Riders</span>
        </NavLink>
        <h1 className="mb-0 pb-0 display-4" id="title">
          {title}
        </h1>
      </div>
      <Row>
        <Col xs="12" className="col-lg order-1 order-lg-0">
          <h2 className="small-title">Map</h2>
          <Card className="mb-5" style={{ height: '725px' }}>
            <Card.Body style={{ padding: 0 }}>
              <Row className="g-3">
                <Col>
                  <Map
                    google={google}
                    initialCenter={{ lat: 25.1838, lng: 55.36587 }}
                    zoom={14}
                    className="w-100 h-100"
                    style={{ height: '100%', borderRadius: '15px' }}
                  >
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

      {/*   */}

      <Card className="mb-2">
        <Card.Body>
          <Box sx={{ width: '100%', backgroundColor: 'white' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="ALL" value="1" onClick={allRiders} />
                  <Tab label="Available" value="2" onClick={availableRiders} />
                  <Tab label="In-Progress" value="3" onClick={onTravelRiders} />
                  <Tab label="Delivered" value="4" onClick={deliveredRiders} />
                  <Tab label="Canceled" value="5" onClick={canceledRiders}/>
                  <Tab label="Not Available" value="6"  onClick={notAvailableRiders}/>
                </TabList>
              </Box>
              <TabPanel value="1">
                <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
                  <Col md="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                    <div className="text-muted text-small cursor-pointer sort">ID</div>
                  </Col>
                  <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer sort">NAME</div>
                  </Col>
                  <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer sort">PHONE</div>
                  </Col>
                  <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer sort">ASSIGNED ORDERS</div>
                  </Col>
                  <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                    <div className="text-muted text-small cursor-pointer sort">STATUS</div>
                  </Col>
                </Row>
                {/* List Header End */}

                {/* List Items Start */}
                {/* List Items Start */}
                {displayedData.map((item) => (
                  <Card key={item.id} className={`mb-2 ${selectedItems.includes(item.id) && 'selected'}`}>
                    <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                      <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(item.id)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                          <div className="text-muted text-small d-md-none">Id</div>
                          <NavLink to="/riders/detail" className="text-truncate h-100 d-flex align-items-center">
                            {item.id}
                          </NavLink>
                        </Col>

                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                          <div className="text-muted text-small d-md-none">Name</div>
                          <div className="d-flex align-items-center">
                            <div className="round-image">
                              <img style={smallImageStyle} src={item.image} alt={item.name} />
                            </div>
                            <div className="text-alternate ms-2">{item.name}</div>
                          </div>
                        </Col>

                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                          <div className="text-muted text-small d-md-none">Purchase</div>
                          <div className="text-alternate">
                            <span>{item.phone}</span>
                          </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                          <div className="text-muted text-small d-md-none">Assigned Orders</div>
                          <div className="text-alternate">{item.assignedOrders}</div>
                        </Col>

                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                          <div className="text-muted text-small d-md-none">Status</div>
                          <div>
                            <Badge bg="outline-primary">{item.status}</Badge>
                          </div>
                        </Col>

                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                          <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => {}} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </TabPanel>
              <TabPanel value="2">
                {displayedData.map((item) => (
                  <Card key={item.id} className={`mb-2 ${selectedItems.includes(item.id) && 'selected'}`}>
                    <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                      <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(item.id)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                          <div className="text-muted text-small d-md-none">Id</div>
                          <NavLink to="/riders/detail" className="text-truncate h-100 d-flex align-items-center">
                            {item.id}
                          </NavLink>
                        </Col>

                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                          <div className="text-muted text-small d-md-none">Name</div>
                          <div className="d-flex align-items-center">
                            <div className="round-image">
                              <img style={smallImageStyle} src={item.image} alt={item.name} />
                            </div>
                            <div className="text-alternate ms-2">{item.name}</div>
                          </div>
                        </Col>

                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                          <div className="text-muted text-small d-md-none">Purchase</div>
                          <div className="text-alternate">
                            <span>{item.phone}</span>
                          </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                          <div className="text-muted text-small d-md-none">Assigned Orders</div>
                          <div className="text-alternate">{item.assignedOrders}</div>
                        </Col>

                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                          <div className="text-muted text-small d-md-none">Status</div>
                          <div>
                            <Badge bg="outline-primary">{item.status}</Badge>
                          </div>
                        </Col>

                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                          <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => {}} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </TabPanel>
              <TabPanel value="3">
              {displayedData.map((item) => (
                  <Card key={item.id} className={`mb-2 ${selectedItems.includes(item.id) && 'selected'}`}>
                    <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                      <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(item.id)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                          <div className="text-muted text-small d-md-none">Id</div>
                          <NavLink to="/riders/detail" className="text-truncate h-100 d-flex align-items-center">
                            {item.id}
                          </NavLink>
                        </Col>

                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                          <div className="text-muted text-small d-md-none">Name</div>
                          <div className="d-flex align-items-center">
                            <div className="round-image">
                              <img style={smallImageStyle} src={item.image} alt={item.name} />
                            </div>
                            <div className="text-alternate ms-2">{item.name}</div>
                          </div>
                        </Col>

                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                          <div className="text-muted text-small d-md-none">Purchase</div>
                          <div className="text-alternate">
                            <span>{item.phone}</span>
                          </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                          <div className="text-muted text-small d-md-none">Assigned Orders</div>
                          <div className="text-alternate">{item.assignedOrders}</div>
                        </Col>

                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                          <div className="text-muted text-small d-md-none">Status</div>
                          <div>
                            <Badge bg="outline-primary">{item.status}</Badge>
                          </div>
                        </Col>

                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                          <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => {}} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </TabPanel>

              <TabPanel value="5">
              {displayedData.map((item) => (
                  <Card key={item.id} className={`mb-2 ${selectedItems.includes(item.id) && 'selected'}`}>
                    <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                      <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(item.id)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                          <div className="text-muted text-small d-md-none">Id</div>
                          <NavLink to="/riders/detail" className="text-truncate h-100 d-flex align-items-center">
                            {item.id}
                          </NavLink>
                        </Col>

                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                          <div className="text-muted text-small d-md-none">Name</div>
                          <div className="d-flex align-items-center">
                            <div className="round-image">
                              <img style={smallImageStyle} src={item.image} alt={item.name} />
                            </div>
                            <div className="text-alternate ms-2">{item.name}</div>
                          </div>
                        </Col>

                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                          <div className="text-muted text-small d-md-none">Purchase</div>
                          <div className="text-alternate">
                            <span>{item.phone}</span>
                          </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                          <div className="text-muted text-small d-md-none">Assigned Orders</div>
                          <div className="text-alternate">{item.assignedOrders}</div>
                        </Col>

                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                          <div className="text-muted text-small d-md-none">Status</div>
                          <div>
                            <Badge bg="outline-primary">{item.status}</Badge>
                          </div>
                        </Col>

                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                          <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => {}} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </TabPanel>
              <TabPanel value="4">
              {displayedData.map((item) => (
                  <Card key={item.id} className={`mb-2 ${selectedItems.includes(item.id) && 'selected'}`}>
                    <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                      <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(item.id)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                          <div className="text-muted text-small d-md-none">Id</div>
                          <NavLink to="/riders/detail" className="text-truncate h-100 d-flex align-items-center">
                            {item.id}
                          </NavLink>
                        </Col>

                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                          <div className="text-muted text-small d-md-none">Name</div>
                          <div className="d-flex align-items-center">
                            <div className="round-image">
                              <img style={smallImageStyle} src={item.image} alt={item.name} />
                            </div>
                            <div className="text-alternate ms-2">{item.name}</div>
                          </div>
                        </Col>

                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                          <div className="text-muted text-small d-md-none">Purchase</div>
                          <div className="text-alternate">
                            <span>{item.phone}</span>
                          </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                          <div className="text-muted text-small d-md-none">Assigned Orders</div>
                          <div className="text-alternate">{item.assignedOrders}</div>
                        </Col>

                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                          <div className="text-muted text-small d-md-none">Status</div>
                          <div>
                            <Badge bg="outline-primary">{item.status}</Badge>
                          </div>
                        </Col>

                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                          <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => {}} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </TabPanel>

              <TabPanel value="5"/>
 

               <TabPanel value="6">
              {displayedData.map((item) => (
                  <Card key={item.id} className={`mb-2 ${selectedItems.includes(item.id) && 'selected'}`}>
                    <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                      <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(item.id)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                          <div className="text-muted text-small d-md-none">Id</div>
                          <NavLink to="/riders/detail" className="text-truncate h-100 d-flex align-items-center">
                            {item.id}
                          </NavLink>
                        </Col>

                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                          <div className="text-muted text-small d-md-none">Name</div>
                          <div className="d-flex align-items-center">
                            <div className="round-image">
                              <img style={smallImageStyle} src={item.image} alt={item.name} />
                            </div>
                            <div className="text-alternate ms-2">{item.name}</div>
                          </div>
                        </Col>

                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                          <div className="text-muted text-small d-md-none">Purchase</div>
                          <div className="text-alternate">
                            <span>{item.phone}</span>
                          </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                          <div className="text-muted text-small d-md-none">Assigned Orders</div>
                          <div className="text-alternate">{item.assignedOrders}</div>
                        </Col>

                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                          <div className="text-muted text-small d-md-none">Status</div>
                          <div>
                            <Badge bg="outline-primary">{item.status}</Badge>
                          </div>
                        </Col>

                        <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                          <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => {}} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </TabPanel>
            </TabContext>
          </Box>

          <div className="d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev className="shadow" onClick={prevPage} disabled={currentPage === 1}>
                <CsLineIcons icon="chevron-left" />
              </Pagination.Prev>
              {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
                <Pagination.Item key={i} className={`shadow ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next className="shadow" onClick={nextPage} disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}>
                <CsLineIcons icon="chevron-right" />
              </Pagination.Next>
            </Pagination>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDrI53GlC5-ymZmPKzJq11U36dheMGfeLU',
})(AllRidersMap);
