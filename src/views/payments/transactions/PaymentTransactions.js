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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RefundList from '../../../data/RefundList';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};
const PaymentTransactions = () => {
  const title = 'Transactions';
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

  const tableHeaderStyle = {
    color: 'grey',
    fontSize: '10px',
  };
  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  const [filteredData, setFilteredData] = useState(RefundList);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  // Track the selected section

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
    const dataToExport = RefundList.map((item) => ({
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
    a.download = 'RefundList.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };
  const exportToPDF = () => {
    const doc = new JsPDF();
    const tableData = RefundList.map((item) => [item.id, item.name, `$${item.purchase}`, item.date, item.status]);
    const columns = ['ID', 'Name', 'Purchase', 'Date', 'Status'];

    doc.autoTable({
      head: [columns],
      body: tableData,
      theme: 'striped',
    });

    doc.save('RefundList.pdf');
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
      title: <span style={tableHeaderStyle}>INVOICE ID</span>,
      dataIndex: 'id',
      key: 'id',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => <NavLink to={`/payments/transactions/detail/${record.id}`}>{record.id}</NavLink>,
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
      title: <span style={tableHeaderStyle}>REMAINING AMOUNT</span>,
      dataIndex: 'purchase',
      key: 'purchase',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => <span className="text-medium">AED {formatNumberToKMB(record.purchase)}</span>,
    },
    {
      title: <span style={tableHeaderStyle}>DATE</span>,
      dataIndex: 'date',
      key: 'date',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
    },
    {
      title: <span style={tableHeaderStyle}>STATUS</span>,
      dataIndex: 'status',
      key: 'status',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text) => {
        let color = 'default';

        if (text === 'PENDING') {
          color = 'warning';
        } else if (text === 'PAID') {
          color = 'success';
        } else if (text === 'CANCELED') {
          color = 'error';
        } else if (text === 'REFUNDED') {
          color = 'blue';
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
  const data = displayedData.map((item) => ({
    key: item.id,
    id: item.id,
    name: item.name,
    purchase: item.purchase,
    date: item.date,
    status: item.status,
    image: item.image,
    email: item.email,
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
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this Transaction?</DialogContentText>
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

export default PaymentTransactions;
