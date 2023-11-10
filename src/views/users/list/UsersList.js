import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, Modal, OverlayTrigger } from 'react-bootstrap';
import { utils, write } from 'xlsx';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Select from 'react-select';
import CheckAll from 'components/check-all/CheckAll';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Table, Spin } from 'antd';
import UserAccountsData from 'data/EmployeeAccountsData';
import { gulfwayBlue } from 'layout/colors/Colors';
import { useDispatch, connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

import moment from 'moment';
import { deleteUser, getUserDetails } from 'actions/user';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

const UsersList = (props) => {
  const title = 'Users List';
  const description = 'Ecommerce Customer List Page';
  const { user, error, isAuthenticated, loading } = props;
  const [selectionType, setSelectionType] = useState('checkbox');
  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  const [filteredData, setFilteredData] = useState(user);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showModalNewUser, setShowModalNewUser] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [deletedId, setDeletedId] = useState('');

  const dispatch = useDispatch();

  const getImage = (image) => {
    return `${process.env.REACT_APP_BASE_URL}/${image}`;
  };

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
  useEffect(() => {
    dispatch(getUserDetails({}));
    console.log(user);
  }, []);
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
  const filterDataByStatus = (status) => {
    setSelectedStatus(status);

    // Filter data by status
    const filteredItems = user.filter((item) => item.status === status);
    setFilteredData(filteredItems);
  };

  const exportToExcel = () => {
    const dataToExport = UserAccountsData.map((item) => ({
      ID: item.id,
      Name: item.name,
      Location: item.location,
      Earnings: `$${item.earnings}`,
      LastOrder: item.lastOrder,
      Status: item.status
        .filter((statusItem) => !statusItem.disabled)
        .map((statusItem) => statusItem.name)
        .join(', '), // Join status names
    }));

    const ws = utils.json_to_sheet(dataToExport);

    // Set header row style with blue background color
    ws['!cols'] = [{ wch: 10 }, { wch: 20 }, { wch: 20 }, { wch: 15 }, { wch: 20 }, { wch: 30 }]; // Set column widths as needed
    ws['!header'] = [];
    ws['!header'][0] = {
      style: {
        fill: {
          fgColor: { rgb: '0000FF' },
        },
        font: {
          color: { rgb: 'FFFFFF' },
        },
      },
    };

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

    const tableData = UserAccountsData.map((item) => ({
      ID: item.id,
      Name: item.name,
      Location: item.location,
      Earnings: `$${item.earnings}`,
      LastOrder: item.lastOrder,
      Status: item.status
        .filter((statusItem) => !statusItem.disabled)
        .map((statusItem) => statusItem.name)
        .join(', '),
    }));

    const columns = ['ID', 'Name', 'Location', 'Earnings', 'LastOrder', 'Status'];

    const headerRow = columns.map((col) => ({ title: col, dataKey: col }));

    doc.autoTable({
      head: [headerRow],
      body: tableData.map((row) => Object.values(row)),
      theme: 'striped',
      margin: { top: 15 },
    });

    doc.save('RefundList.pdf');
  };

  function handleModifyUserClick(id) {
    console.log('Item ID clicked:', id);
  }

  function handleDeleteUserClick() {
    console.log('Delete user clicked');
    setIsDeleteDialogOpen(true);
  }

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setDeletedId('');
  };

  const handleSelectChange = () => {
    setShowModal(true);
  };
  const createUser = () => {
    setShowModalNewUser(true);
  };

  const [selectValueState, setSelectValueState] = useState();
  const userRoleOptions = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'MANAGER', label: 'Manager' },
    { value: 'AUDITOR', label: 'Auditor' },
  ];

  const [newStateName, setNewStateName] = useState([userRoleOptions[0], userRoleOptions[1]]);

  const handleView = (record) => {
    console.log('View User Details', record);
  };

  const handleEdit = (id) => {
    console.log(`Edit User ID ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete User ID ${id}`);
    setDeletedId(id);
    setIsDeleteDialogOpen(true);
  };

  const userDelete = () => {
    console.log(deletedId);
    dispatch(deleteUser({ id: deletedId }));
    setDeletedId('');
    setIsDeleteDialogOpen(false);
  };
  const columns = [
    {
      title: <span style={{ color: 'grey', fontSize: '10px' }}>ID</span>,
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <NavLink
          to={{
            pathname: `/users/detail/${record.customId}`,
          }}
        >
          {record?.customId}
        </NavLink>
      ),
    },
    {
      title: <span style={{ color: 'grey', fontSize: '10px' }}>USER</span>,
      dataIndex: 'user',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <div className="d-flex">
          <div className="round-image">
            <img style={smallImageStyle} src={getImage(record?.image)} alt={record.name} />
          </div>
          <div>
            <div className="ms-2">
              {record?.firstName} {record?.lastName}
            </div>
            <div className="text-alternate ms-2 text-medium">{record?.email}</div>
          </div>
        </div>
      ),
    },

    {
      title: <span style={tableHeaderStyle}>CREATED</span>,
      dataIndex: 'date',

      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <div className="text-medium" style={{ display: 'flex', alignItems: 'center' }}>
          {moment(record?.createdAt).format('h:mm A')}&nbsp;|&nbsp;{moment(record?.createdAt).format('MMM D, YYYY')}
        </div>
      ),
    },
    {
      title: <span style={tableHeaderStyle}>PHONE</span>,
      dataIndex: 'mobile',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => <div className="text-alternate ms-2 text-medium">{record?.mobile}</div>,
    },
    {
      title: <span style={tableHeaderStyle}>STATUS</span>,
      dataIndex: 'isActivated',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <div style={{ color: record?.isActivated ? '#B3B95A' : 'RGB(226, 182, 75)' }}>{record?.isActivated ? 'Active' : 'Inactive'}</div>
      ),
    },
    {
      title: <span style={tableHeaderStyle}>UPDATED</span>,
      dataIndex: 'updatedDate',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <div className="text-medium" style={{ display: 'flex', alignItems: 'center' }}>
          {moment(record?.updatedAt).format('h:mm A')}&nbsp;|&nbsp;{moment(record?.updatedAt).format('MMM D, YYYY')}
        </div>
      ),
    },
    {
      title: <span style={tableHeaderStyle}>LOGGED-IN</span>,
      dataIndex: 'loggedIn',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => {
        const textClass = record?.loggedIn ? 'text-alternate' : 'text-alternate';
        return <span className={textClass}>{record?.loggedIn ? 'Yes' : 'No'}</span>;
      },
    },
    {
      title: <span style={tableHeaderStyle}>LOG-IN TIME</span>,
      dataIndex: 'loginTime',

      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <div className="text-medium" style={{ display: 'flex', alignItems: 'center' }}>
          {record?.lastLoggedInTime === null ? '' : moment(record?.lastLoggedInTime).format('h:mm A')} {record?.lastLoggedInTime === null ? '' : ` | `}
          {record?.lastLoggedInTime === null ? '' : moment(record?.lastLoggedInTime).format('MMM D, YYYY')}{' '}
        </div>
      ),
    },
    {
      title: <span style={tableHeaderStyle}>LOG-OUT TIME</span>,
      dataIndex: 'logOutTime',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <div className="text-medium" style={{ display: 'flex', alignItems: 'center' }}>
          {record?.lastLoggedOutTime === null ? '' : moment(record?.lastLoggedOutTime).format('h:mm A')} {record?.lastLoggedOutTime === null ? '' : ` | `}
          {record?.lastLoggedOutTime === null ? '' : moment(record?.lastLoggedOutTime).format('MMM D, YYYY')}
        </div>
      ),
    },

    {
      title: <span style={tableHeaderStyle}>ACTION</span>,
      dataIndex: 'id',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <span className="d-flex">
          <NavLink
            to={{
              pathname: `/users/detail/${record?.customId}`,
            }}
          >
            <div
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                paddingRight: '10px',
                color: gulfwayBlue,
              }}
            >
              <CsLineIcons icon="eye" />
            </div>
          </NavLink>

          <NavLink
            to={{
              pathname: `/users/edit/${record?.customId}`,
            }}
          >
            <div
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                paddingRight: '10px',
                color: gulfwayBlue,
              }}
            >
              <CsLineIcons icon="pen" />
            </div>
          </NavLink>

          <div onClick={() => handleDelete(record?.customId)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4f' }}>
            <CsLineIcons icon="bin" />
          </div>
        </span>
      ),
    },
  ];

  const customLoader = (
    <div style={{ textAlign: 'center', margin: '50px auto' }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#1890ff' }} spin />} />
      <p style={{ marginTop: '10px' }}>Loading...</p>
    </div>
  );

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
      {loading ? (
        customLoader // Use the custom loader
      ) : (
        <Table
          columns={columns}
          dataSource={user}
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          // pagination={true}
        />
      )}

      {/* List Items End */}

      <Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this User ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button color="primary" onClick={() => userDelete()}>
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
export default connect(mapStateToProps)(UsersList);
