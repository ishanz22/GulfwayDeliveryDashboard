import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { utils, write } from 'xlsx';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import ExcelJS from 'exceljs';
import { gulfwayBlue } from 'layout/colors/Colors';
import { Table, Tag, Image } from 'antd';
import moment from 'moment';
import { getUserDetails } from 'actions/user';
import { connect, useDispatch } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RewardListData from '../../../data/RewardListData';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.firstName === 'Disabled User',
    firstName: record.firstName,
  }),
};
const LoginRewards = (props) => {
  const title = 'Login Rewards';
  const description = 'Ecommerce Customer List Page';
  const dispatch = useDispatch();
  const [selectionType, setSelectionType] = useState('checkbox');
  const { user, error, isAuthenticated, loading } = props;
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

  useEffect(() => {
    dispatch(getUserDetails({}));
    console.log(user);
  }, []);

  const tableHeaderStyle = {
    color: 'grey',
    fontSize: '10px',
  };
  const toggleCheckAll = (allSelect) => {
    if (allSelect) {
      setSelectedItems(allItems);
    } else {
      setSelectedItems([]);
    }
  };

  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  const [filteredData, setFilteredData] = useState(user);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  // Track the selected section

  const smallImageStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
  };

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
    const dataToExport = user.map((item) => ({
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
    const tableData = user.map((item) => [item.id, item.name, `$${item.phone}`, item.assignedOrders, item.status]);
    const columns = ['ID', 'Name', 'Phone', 'Assigned Orders', 'Status'];

    doc.autoTable({
      head: [columns],
      body: tableData,
      theme: 'striped',
    });

    doc.save('RewardListData.pdf');
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

  const getImage = (image) => {
    return `${process.env.REACT_APP_BASE_URL}/${image}`;
  };

  const columns = [
    {
      title: <span style={tableHeaderStyle}>ID</span>,
      dataIndex: 'id',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <a href={`/riders/detail/${record.customId}`}>{record.customId}</a>,
    },
    {
      title: <span style={tableHeaderStyle}>USER</span>,
      dataIndex: 'name',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <div className="d-flex">
          <div className="round-image">
            <img style={smallImageStyle} src={getImage(record?.image)} alt={record.firstName} />
          </div>
          <div>
            <div className="ms-2">
              {' '}
              {record?.firstName} {record?.lastName}
            </div>
            <div className="text-alternate ms-2 text-medium">{record.email}</div>
          </div>
        </div>
      ),
    },

    {
      title: <span style={tableHeaderStyle}>POINTS</span>,
      dataIndex: 'points',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => <span className="text-alternate ms-2 text-medium">{record.touchPoint}</span>,
    },
    {
      title: <span style={tableHeaderStyle}>RECEIVED</span>,
      dataIndex: 'received',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => <span className="text-alternate ms-2 text-medium">1</span>,
    },

    {
      title: <span style={tableHeaderStyle}>LOGIN TIME</span>,
      dataIndex: 'loginTime',

      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <div className="text-medium" style={{ display: 'flex', alignItems: 'center' }}>
          {record?.lastLoggedInTime === null ? '' : moment(record?.lastLoggedInTime).format('MMM D, YYYY')} {record?.lastLoggedInTime === null ? '' : `  `}
          <br />
          {record?.lastLoggedInTime === null ? '' : moment(record?.lastLoggedInTime).format('h:mm A')}{' '}
        </div>
      ),
    },
    {
      title: <span style={tableHeaderStyle}>LOGOUT TIME</span>,
      dataIndex: 'logOutTime',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <div className="text-medium" style={{ display: 'flex', alignItems: 'center' }}>
          {record?.lastLoggedOutTime === null ? '' : moment(record?.lastLoggedOutTime).format('MMM D, YYYY')} {record?.lastLoggedOutTime === null ? '' : `  `}
          <br />
          {record?.lastLoggedOutTime === null ? '' : moment(record?.lastLoggedOutTime).format('h:mm A')}{' '}
        </div>
      ),
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
  const data = user && user.map((item) => ({ ...item, key: item.id }));
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
      />

      {/* List Items End */}

      <Dialog open={isDeleteDialogOpen} onClose={handleDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this login reward?</DialogContentText>
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

function mapStateToProps(state) {
  console.log(state.user);
  return {
    error: state.user.error,
    loading: state.user.loading,
    isAuthenticated: state.auth.isAuthenticated,
    user: state?.user?.user,
  };
}
export default connect(mapStateToProps)(LoginRewards);
