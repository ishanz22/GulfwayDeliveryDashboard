import React, { useState } from 'react';
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
import { Table, Tag, Image } from 'antd';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserAccountsData from 'data/EmployeeAccountsData';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};
const EmployeeAccounts = () => {
  const title = 'Employees Accounts';
  const description = 'Ecommerce Customer List Page';

  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  const [filteredData, setFilteredData] = useState(UserAccountsData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectionType, setSelectionType] = useState('checkbox');
  const [showModalNewUser, setShowModalNewUser] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const smallImageStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    overflow: 'hidden',
  };

  const tableHeaderStyle = {
    color: 'grey',
    fontSize: '10px',
  };
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
    const filteredItems = UserAccountsData.filter((item) => item.status === status);
    setFilteredData(filteredItems);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

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
  const columns = [
    {
      title:  <span style={tableHeaderStyle}>ID</span>,
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <NavLink to="/accounts/employee/detail">{text}</NavLink>,
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
    },
    {
      title:<span style={tableHeaderStyle}>EMPLOYEE</span>,
      dataIndex: 'name',
      key: 'name',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <div className="round-image">
            <img style={smallImageStyle} src={record.userImage} alt={text} />
          </div>
          <div>
            <div className="ms-2">{text}</div>
            <div className="text-alternate ms-2 text-medium">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: <span style={tableHeaderStyle}>CREATED</span>,
      dataIndex: 'date',
      key: 'date',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
    },
    {
      title:<span style={tableHeaderStyle}>STATUS</span> ,
      dataIndex: 'isActive',
      key: 'isActive',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (isActive) =>     <Tag color={isActive ? 'success' : 'default'} textColor={isActive ? 'white' : 'black'}>
      {isActive ? 'Active' : 'Inactive'}
    </Tag>
    

    ,
    },
    {
      title:<span style={tableHeaderStyle}>UPDATED</span> ,
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
    },
    {
      title: <span style={tableHeaderStyle}>SESSION</span>,
      dataIndex: 'status',
      key: 'status',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (status) => <Tag color={status === 'Not Logged in' ? 'warning' : 'success'}>{status}</Tag>,
    },
    {
      title: <span style={tableHeaderStyle}>USER ROLE</span>,
      dataIndex: 'userRole',
      key: 'userRole',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (userRole) => {
        const assignedRoles = userRole.filter((role) => role !== '');

        return (
          <div>
            {assignedRoles.slice(0, 2).map((role, index) => (
              <Tag key={index} color="blue" className="me-2">
                {role}
              </Tag>
            ))}
            {assignedRoles.length > 2 && <span className="ms-2 text-small text-danger">+ {assignedRoles.length - 2}</span>}
            {assignedRoles.length === 0 && <Tag color="warning">Not Assigned</Tag>}
          </div>
        );
      },
    },

    {
      title: <span style={tableHeaderStyle}>LOG-IN TIME</span> ,
      dataIndex: 'loginTime',
      key: 'loginTime',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
    },
    {
      title:  <span style={tableHeaderStyle}>LOG-OUT TIME</span>,
      dataIndex: 'logOutTime',
      key: 'logOutTime',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
    },
  ];
  const data = displayedData.map((item) => ({ ...item, key: item.id }));

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
            {/* <div className="btn-group ms-1 check-all-container">
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
            </div> */}

            <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
              <Button onClick={createUser} variant="outline-primary" className="btn-icon btn-icon-start w-100 w-md-auto">
                <CsLineIcons icon="plus" /> <span>Assign Employee</span>
              </Button>

              <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
                <CsLineIcons icon="sort" />
              </Button>
            </Col>
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
          <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Print</Tooltip>}>
            <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow">
              <CsLineIcons icon="print" />
            </Button>
          </OverlayTrigger>
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
                10 Items
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

      <Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this Employee ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button color="primary">Yes</Button>
        </DialogActions>
      </Dialog>

      {/* modify user modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered // Add this prop to center the modal
      >
        <Modal.Header closeButton>
          <Modal.Title>Modify User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
            <Col lg="6">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue="
John Doe"
              />
            </Col>
            <Col lg="6">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue="
 Doe"
              />
            </Col>
            <Col lg="12">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                defaultValue="
 JohnDoe@gmail.com"
              />
            </Col>

            <Col lg="12">
              <Form.Label>User Role</Form.Label>
              <Select classNamePrefix="react-select" options={userRoleOptions} value={newStateName} onChange={setNewStateName} placeholder="" isMulti />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">Modify</Button>
        </Modal.Footer>
      </Modal>

      {/* create new user modal */}
      <Modal
        show={showModalNewUser}
        onHide={() => setShowModalNewUser(false)}
        centered // Add this prop to center the modal
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
            <Col lg="12">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" />
            </Col>
            <Col lg="12">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" />
            </Col>

            <Col lg="12">
              <Form.Label>User Role</Form.Label>
              <Select classNamePrefix="react-select" options={userRoleOptions} value={selectValueState} onChange={setSelectValueState} placeholder="" isMulti />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalNewUser(false)}>
            Cancel
          </Button>
          <Button variant="primary">Assign Role</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeAccounts;
