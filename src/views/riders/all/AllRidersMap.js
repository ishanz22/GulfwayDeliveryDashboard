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
import { Table,Tag,Image } from 'antd';
import { gulfwayBlue } from 'layout/colors/Colors';
import TabPanel from '@mui/lab/TabPanel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AllRidersDataMap from 'data/AllRidersDataMap';
import RiderListData from '../../../data/RiderListData';



const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};
const AllRidersMap = ({ google }) => {
  const title = 'All Riders';
  const description = 'Ecommerce Storefront Checkout Page';

  // Define dummy rider data with coordinates

  const customMarkerIcons = {}; // Object to store custom marker icons
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tableHeaderStyle = {
    color: 'grey',
    fontSize: '10px',
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
    width: '40px', 
    height: '40px', 
    borderRadius: '50%', 
    overflow: 'hidden', 
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


  const handleView = (id) => {
    console.log(`View Item ID ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit Item ID ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete Item ID ${id}`);
    setIsDeleteDialogOpen(true);
  };

  const columns = [
    {
      title: <span style={tableHeaderStyle}>ID</span>,
      dataIndex: 'id',
      key: 'id',
      responsive: ['xs','md','lg','sm','xl'],
      render: (text, record) => (
        <NavLink to="/riders/detail">{record.id}</NavLink>
      ),
    },
    {
      title:  <span style={tableHeaderStyle}>NAME</span>,
      dataIndex: 'name',
      key: 'name',
      responsive: ['xs','md','lg','sm','xl'],
      render: (text, record) => (
        <div className='d-flex'>
          <div className="round-image">
            <img style={smallImageStyle} src={record.image} alt={record.name} />
          </div>
          <div>
            <div className="ms-2">{record.name}</div>
            <div className="text-alternate ms-2 text-medium">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: <span style={tableHeaderStyle}>PHONE</span> ,
      dataIndex: 'phone',
      key: 'phone',
      responsive: ['xs','md','lg','sm','xl'],
      render: (text, record) => (
        <span>{record.phone}</span>
      ),
    },
    {
      title: <span style={tableHeaderStyle}>ASSIGNED ORDERS</span>,
      dataIndex: 'assignedOrders',
      key: 'assignedOrders',
      responsive: ['xs','md','lg','sm','xl'],
    },
    {
      title: <span style={tableHeaderStyle}>STATUS</span>,
      dataIndex: 'status',
      key: 'status',
      responsive: ['xs','md','lg','sm','xl'],
      render: (text) => {
        let color = 'default';

        if (text === 'AVAILABLE') {
          color = 'warning';
        } else if (text === 'SUCCESS') {
          color = 'success';
        } else if (text === 'NOT-AVAILABLE') {
          color = 'error';
        }else if (text === 'ON-TRAVEL') {
          color = 'blue';
        }else if (text === 'CANCELED') {
          color = 'orange';
        }else if (text === 'DELIVERED') {
          color = 'pink';
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: <span style={tableHeaderStyle}>ACTION</span>,
      key: 'action',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <span className="d-flex">
          <div
            onClick={() => handleView(record.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', paddingRight: '10px', color: gulfwayBlue }}
          >
            <CsLineIcons icon="eye" />
          </div>
          <div
            onClick={() => handleEdit(record.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', paddingRight: '10px', color: gulfwayBlue }}
          >
            <CsLineIcons icon="pen" />
          </div>
          <div onClick={() => handleDelete(record.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4f' }}>
            <CsLineIcons icon="bin" />
          </div>
        </span>
      ),
    },
  ];
  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };
  const data = displayedData.map((item) => ({ ...item, key: item.id }));

  const handleDeleteConfirmed = () => {    
    setIsDeleteDialogOpen(false);
  };
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
              <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => checkItem(record.key),
        })}
        pagination={false}
      />
              </TabPanel>
              <TabPanel value="2">
              <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => checkItem(record.key),
        })}
        pagination={false}
      />
              </TabPanel>
              <TabPanel value="3">
              <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => checkItem(record.key),
        })}
        pagination={false}
      />
              </TabPanel>

              <TabPanel value="5">
              <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => checkItem(record.key),
        })}
        pagination={false}
      />
              </TabPanel>
              <TabPanel value="4">
              <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => checkItem(record.key),
        })}
        pagination={false}
      />
              </TabPanel>

              <TabPanel value="5"/>
 

               <TabPanel value="6">
               <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => checkItem(record.key),
        })}
        pagination={false}
      />
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



      <Dialog open={isDeleteDialogOpen} onClose={handleDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this Rider?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteConfirmed} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDrI53GlC5-ymZmPKzJq11U36dheMGfeLU',
})(AllRidersMap);
