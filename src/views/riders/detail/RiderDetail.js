import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { utils, write } from 'xlsx';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Table, Tag, Image, Checkbox } from 'antd';
import { gulfwayBlue } from 'layout/colors/Colors';
import OrderDetailsData from 'data/OrderDetailsData';
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
const RiderDetail = ({ google }) => {
  const title = 'Rider ID #3848484';
  const description = 'Ecommerce Order Detail Page';

  const allItems = [1, 2, 3, 4];
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
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
  };

  const tableHeaderStyle = {
    color: 'grey',
    fontSize: '10px',
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
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: <span style={tableHeaderStyle}>NAME</span>,
      dataIndex: 'name',
      key: 'name',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <div className="d-flex">
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
      title: <span style={tableHeaderStyle}>PHONE</span>,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: <span style={tableHeaderStyle}>ASSIGNED ORDERS</span>,
      dataIndex: 'assignedOrders',
      key: 'assignedOrders',
      sorter: (a, b) => a.assignedOrders - b.assignedOrders,
    },
    {
      title: <span style={tableHeaderStyle}>STATUS</span>,
      dataIndex: 'status',
      key: 'status',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text) => {
        let color = 'default';

        if (text === 'AVAILABLE') {
          color = 'warning';
        } else if (text === 'SUCCESS') {
          color = 'success';
        } else if (text === 'NOT-AVAILABLE') {
          color = 'error';
        } else if (text === 'ON-TRAVEL') {
          color = 'blue';
        } else if (text === 'CANCELED') {
          color = 'orange';
        } else if (text === 'DELIVERED') {
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
                  <Tag color="blue">ON-TRAVEL</Tag>
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
                <div>Number</div>
                <div className=" text-alternate">CA-5A32353</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div>Type</div>
                <div className=" text-alternate">auto</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div>Lorem</div>
                <div className=" text-alternate">ipsum</div>
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
          <Card style={{ height: '400px' }}>
            <Card.Body>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div>Hours of Service</div>
                <div className="text-alternate">2 hr 15 min</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div>Hours of Break</div>
                <div className="text-alternate">1 hr 15 min</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div>Lorem ipsum</div>
                <div className="text-alternate">lorem ipsum</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div>Hours Available Today</div>
                <div className="text-alternate">CA-5A32353</div>
              </div>{' '}
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div>Lorem</div>
                <div className="text-alternate">Ipsum</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div>Total Lorem</div>
                <div className="text-alternate"> 2 hr 15 min</div>
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
      {/* <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
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
        
      </Row> */}

      <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => checkItem(record.key),
        })}
        pagination={false}
      />
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
})(RiderDetail);
