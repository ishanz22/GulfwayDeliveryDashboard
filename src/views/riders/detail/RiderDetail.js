import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge,Pagination, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { utils, write } from 'xlsx';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import OrderDetailsData from 'data/OrderDetailsData';
import RiderListData from '../../../data/RiderListData';

const RiderDetail = ({ google }) => {
  const title = 'Rider ID #3848484';
  const description = 'Ecommerce Order Detail Page';

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

  const [discountModal, setDiscountModal] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  const [discountType, setDiscountType] = useState({ value: 'Fixed Amount', label: 'Fixed Amount' });
  const options = [
    { value: 'Fixed Amount', label: 'Fixed Amount' },
    { value: 'Free Shipping', label: 'Free Shipping' },
    { value: 'Percentage', label: 'Percentage' },
  ];

  const [startDate, setStartDate] = useState(Date.parse('04 Dec 2021 00:12:00 GMT'));
  const [endDate, setEndDate] = useState(Date.parse('11 Dec 2021 00:12:00 GMT'));

  const [filteredData, setFilteredData] = useState(RiderListData);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

 // Track the selected section

  const smallImageStyle = {
    width: '30px', 
    height: '30px', 
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

  // Rest of your code remains unchanged
  const filterDataByStatus = (status) => {
    setSelectedStatus(status);
    if (status === 'Total Orders') {
      // Show all data
      setFilteredData(RiderListData);
    } else {
      // Filter data by status
      const filteredItems = RiderListData.filter((item) => item.status === status);
      setFilteredData(filteredItems);
    }
  };

  const TotalOrders = () => {
    filterDataByStatus('Total Orders');
  };

  const logNewOrders = () => {
    filterDataByStatus('PENDING');
  };

  const logRefundedOrders = () => {
    filterDataByStatus('REFUNDED');
  };
  const canceledOrders = () => {
    filterDataByStatus('CANCELED');
  };
  const paidOrders = () => {
    filterDataByStatus('PAID');
  };
  useEffect(() => {
    filterDataByStatus('Total Orders');
  }, []);
  const formatNumberToKMB = (number) => {
    if (number < 1e3) {
      return number.toString();
    }

    if (number < 1e6) {
      return `${(number / 1e3).toFixed(1)}k`;
    }

    if (number < 1e9) {
      return `${(number / 1e6).toFixed(1)}M`;
    }

    return `${(number / 1e9).toFixed(1)}B`;
  };
  const exportToExcel = () => {
    const dataToExport = RiderListData.map((item) => ({
      ID: item.id,
      Name: item.name,
      Purchase: `$${item.purchase}`,
      Date: item.date,
      Status: item.status,
    }));

    const ws = utils.json_to_sheet(dataToExport);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Orders');
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'RiderListData.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };
  const exportToPDF = () => {
    const doc = new JsPDF();
    const tableData = RiderListData.map((item) => [item.id, item.name, `$${item.purchase}`, item.date, item.status]);
    const columns = ['ID', 'Name', 'Purchase', 'Date', 'Status'];

    doc.autoTable({
      head: [columns],
      body: tableData,
      theme: 'striped',
    });

    doc.save('RiderListData.pdf');
  };


  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/riders">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Riders</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          {/* <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Dropdown className="w-100 w-md-auto">
              <Dropdown.Toggle className="w-100 w-md-auto" variant="outline-primary">
                Status: Delivered
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Status: Pending</Dropdown.Item>
                <Dropdown.Item>Status: Shipped</Dropdown.Item>
                <Dropdown.Item>Status: Delivered</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="ms-1">
              <Dropdown.Toggle className="btn-icon btn-icon-only dropdown-toggle-no-arrow" variant="outline-primary">
                <CsLineIcons icon="more-horizontal" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Edit</Dropdown.Item>
                <Dropdown.Item>View Invoice</Dropdown.Item>
                <Dropdown.Item>Track Package</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col> */}
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row>
        <Col xl="8" xxl="9">
          {/* Status Start */}

          {/* Status End */}

          {/* Cart Start */}

          {/* Cart End */}

          {/* Activity Start */}
          <h5 className="me-3">Rider Details</h5>
          <Card className="mb-4 flex-grow-1">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div style={{ display: 'flex' }}>
                  {/* Profile Image */}
                  <div className="rounded-circle overflow-hidden" style={{ width: '60px', height: '60px' }}>
                    <div>
                      <img
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                        alt="Profile"
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </div>

                  {/* Profile Name */}
                  <div>
                    <p className="fw-bold fs-5" style={{ paddingLeft: '20px' }}>
                      Robert Suvent
                    </p>

                    <div>
                      <div className="d-flex flex-column flex-md-row">
                        {/* Name and Email */}
                        <div style={{ paddingLeft: '20px' }} className="d-flex flex-column flex-md-row">
                          <div className="me-4">
                            <p className="fw-bold text-muted">
                              <CsLineIcons icon="credit-card" className="me-2" />
                              #C002
                            </p>
                            <p className="fw-bold text-muted">
                              <CsLineIcons icon="compass" className="me-2" />
                              46, Al Maktoum Airport Street
                            </p>
                          </div>
                          <div className="ms-md-5">
                            {' '}
                            {/* Add margin-left for spacing */}
                            <p className="fw-bold text-muted">
                              <CsLineIcons icon="email" className="me-2" />
                              Robert@gmail.com
                            </p>
                            <p className="fw-bold text-muted">
                              <CsLineIcons icon="clock" className="me-2" />
                              lorem ipsum
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge in top right corner */}
                <div className="position-relative">
                  <Badge bg="outline-primary" className="position-absolute top-0 end-0">
                    ON-TRAVEL
                  </Badge>
                </div>
              </div>

              {/* Information Section */}
            </Card.Body>
          </Card>

          {/* Activity End */}
        </Col>

        <Col xl="4" xxl="3">
          {/* Address Start */}
          <h5 className="me-3">Vehicle Details</h5>
          <Card className="mb-5">
            <Card.Body>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Number</div>
                <div>CA-5A32353</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Type</div>
                <div>auto</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div style={{ fontWeight: '700', paddingBottom: '10px' }}>Lorem</div>
                <div>ipsum</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5 g-2">
        <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="dollar" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">TOTAL ORDERS</div>
              <div className="text-primary cta-4">120</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="cart" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">PAID ORDERS</div>
              <div className="text-primary cta-4">16</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="server" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">SESSIONS</div>
              <div className="text-primary cta-4">463</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="luggage" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">PENDING</div>
              <div className="text-primary cta-4">17</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="arrow-top-left" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">RETURNS</div>
              <div className="text-primary cta-4">2</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="close" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">CANCELED</div>
              <div className="text-primary cta-4">5</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="row-cols-1 row-cols-md-2 g-2">
        <Col>
          <Card style={{height:'400px'}} >
          <Card.Body>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Hours of Service</div>
                <div>2 hr 15 min</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Hours of Break</div>
                <div>1 hr 15 min</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Lorem ipsum</div>
                <div>lorem ipsum</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Hours Available Today</div>
                <div>CA-5A32353</div>
              </div>    <div className="mb-n0 p-3 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Lorem</div>
                <div>Ipsum</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Total Lorem</div>
                <div>2 hr 15 min</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="mb-5" style={{ height: '400px' }}>
            <Card.Body style={{ padding: 0 }}>
              <Row className="g-3">
                {/* Search Input on the Right */}

                {/* Full-Screen Map on the Left */}
                <Col>
                  <Map
                    google={google}
                    initialCenter={{ lat: 25.1838, lng: 55.36587 }}
                    zoom={14}
                    className="w-100 h-100"
                    style={{ height: '100%', borderRadius: '15px' }}
                  >
                    <Marker position={{ lat: 25.1838, lng: 55.36587 }} />
                  </Map>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h2 className="small-title">Recent Orders</h2>
      <Row className="mb-3">
        <Col md="5" lg="3" xxl="2" className="mb-1">
          {/* Search Start */}
          <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
            <Form.Control type="text" placeholder="Search" />
            <span className="search-magnifier-icon">
              <CsLineIcons icon="search" />
            </span>
            <span className="search-delete-icon d-none">
              <CsLineIcons icon="close" />
            </span>
          </div>
          {/* Search End */}
        </Col>
        
        <Col md="7" lg="9" xxl="10" className="mb-1 text-end">
          {/* Print Button Start */}
          {/* <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Print</Tooltip>}>
            <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow">
              <CsLineIcons icon="print" />
            </Button>
          </OverlayTrigger> */}
          {/* Print Button End */}
          

          {/* Export Dropdown Start */}
          <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Export</Tooltip>}>
              <Dropdown.Toggle variant="foreground-alternate" className="dropdown-toggle-no-arrow btn btn-icon btn-icon-only shadow">
                <CsLineIcons icon="download" />
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item onClick={exportToExcel}>Excel</Dropdown.Item>

              <Dropdown.Item onClick={exportToPDF}>PDF</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* Export Dropdown End */}

          {/* Length Start */}
          <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
  <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Item Count</Tooltip>}>
    <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-13">
      {itemsPerPage} Items
    </Dropdown.Toggle>
  </OverlayTrigger>
  <Dropdown.Menu className="shadow dropdown-menu-end">
    <Dropdown.Item onClick={() => setItemsPerPage(5)}>5 Items</Dropdown.Item>
    <Dropdown.Item onClick={() => setItemsPerPage(10)}>10 Items</Dropdown.Item>
    <Dropdown.Item onClick={() => setItemsPerPage(20)}>20 Items</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

<div className="btn-group ms-1 check-all-container">
      <CheckAll
        allItems={allItems}
        selectedItems={selectedItems}
        onToggle={toggleCheckAll}
        inputClassName="form-check"
        className="btn btn-outline-primary btn-custom-control py-0"
      />
      <Dropdown align="end">
        <Dropdown.Toggle className="dropdown-toggle dropdown-toggle-split" variant="outline-primary" />
        <Dropdown.Menu>
          <Dropdown.Item>Move</Dropdown.Item>
          <Dropdown.Item>Archive</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
          {/* Length End */}
        </Col>
      </Row>

      {/* List Header Start */}
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
                  <span>
                    
                    {item.phone}
                  </span>
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

      {/* List Items End */}

      {/* Pagination Start */}
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
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDrI53GlC5-ymZmPKzJq11U36dheMGfeLU',
})(RiderDetail);
