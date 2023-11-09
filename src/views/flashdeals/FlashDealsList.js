import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { utils, write } from 'xlsx';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { Table, Tag, Checkbox } from 'antd';
import { gulfwayBlue } from 'layout/colors/Colors';
import CheckAll from 'components/check-all/CheckAll';
import ExcelJS from 'exceljs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RewardListData  from 'data/RewardListData';


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

const FlashDealsList = () => {
  const title = 'Flash Deals';
  const description = 'Ecommerce Customer List Page';
  const [selectionType, setSelectionType] = useState('checkbox');
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

  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  const [filteredData, setFilteredData] = useState(RewardListData);

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
    color: 'grey',fontSize:'10px'
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

  // making K,M,B Format
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
    const dataToExport = RewardListData.map((item) => ({
      ID: item.id,
      Name: item.name,
      Purchase: `$${item.purchase}`,
      Date: item.date,
      Status: item.status,
    }));

    // Create a new Excel workbook and worksheet
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Orders');

    // Define the column headers
    ws.columns = [
      { header: 'ID', key: 'ID', width: 10 },
      { header: 'Name', key: 'Name', width: 20 },
      { header: 'Purchase', key: 'Purchase', width: 15 },
      { header: 'Date', key: 'Date', width: 15 },
      { header: 'Status', key: 'Status', width: 15 },
    ];

    // Set the header row background color to blue
    ws.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5A94C8' }, // Blue color
      };
    });

    // Populate the worksheet with data
    dataToExport.forEach((item) => {
      ws.addRow(item);
    });

    // Create a buffer for the Excel file
    wb.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'RiderListData.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const exportToPDF = () => {
    const doc = new JsPDF();
    const tableData = RewardListData.map((item) => [item.id, item.name, `$${item.phone}`, item.assignedOrders, item.status]);
    const columns = ['ID', 'Name', 'Phone', 'Assigned Orders', 'Status'];

    doc.autoTable({
      head: [columns],
      body: tableData,
      theme: 'striped',
    });

    doc.save('RewardListData.pdf');
  };

  const handleView = (id) => {
    console.log(`View User ID ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit User ID ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete User ID ${id}`);
    setIsDeleteDialogOpen(true);
  };
  const columns = [
    {
      title: <span style={{ color: 'grey',fontSize:'10px' }}>INVOICE ID</span>,
      dataIndex: 'id',
      key: 'id',
      responsive: ['xs','md','lg','sm','xl'],
      render: (text, record) => (
        <a href="/riders/detail">{text}</a>
      ),
    },
    {
      title: <span style={{ color: 'grey',fontSize:'10px' }}>NAME</span>,
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
      title:<span style={{ color: 'grey',fontSize:'10px' }}>TOTAL AMOUNT</span> ,
      dataIndex: 'transactionAmount',
      key: 'transactionAmount',
      responsive: ['xs','md','lg','sm','xl'],
    },
    {
      title: <span style={{ color: 'grey',fontSize:'10px' }}>DISCOUNTED AMOUNT</span> ,
      dataIndex: 'discountedAmount',
      key: 'discountedAmount',
      responsive: ['xs','md','lg','sm','xl'],
    },
    {
      title: <span style={{ color: 'grey',fontSize:'10px' }}>POINTS</span> ,
      dataIndex: 'points',
      key: 'points',
      responsive: ['xs','md','lg','sm','xl'],
    },
    {
      title: <span style={{ color: 'grey',fontSize:'10px' }}>RECEIVED</span>,
      dataIndex: 'received',
      key: 'received',
      responsive: ['xs','md','lg','sm','xl'],
    },
    {
      title:  <span style={tableHeaderStyle}>ACTION</span>,
      dataIndex: 'id',
      responsive: ['xs','md','lg','sm','xl'],
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
  const data = displayedData.map(item => ({
    key: item.id, 
    id: item.id,
    name: item.name,
    transactionAmount: item.transactionAmount,
    discountedAmount: item.discountedAmount,
    points: item.points,
    received: item.received, 
    email:item.email,
    image:item.image

  }));
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
          <Col xs="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
              <CsLineIcons icon="sort" />
            </Button>
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
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>

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

          {/* Length End */}
        </Col>
      </Row>

      {/* List Header Start */}
      <Table
    columns={columns}
    dataSource={data}
    rowSelection={{
      type: selectionType,
      ...rowSelection,     
    }}
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
      {/* Pagination End */}

      <Dialog open={isDeleteDialogOpen} onClose={handleDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this flash Deal?</DialogContentText>
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

export default FlashDealsList;
