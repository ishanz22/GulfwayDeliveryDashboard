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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserAccountsData from 'data/EmployeeAccountsData';

const UsersList = () => {
  const title = 'Users List';
  const description = 'Ecommerce Customer List Page';

  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  const [filteredData, setFilteredData] = useState(UserAccountsData);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showModalNewUser, setShowModalNewUser] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const smallImageStyle = {
    width: '30px', 
    height: '30px', 
    borderRadius: '50%', 
    overflow: 'hidden', 
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

  const [newStateName, setNewStateName] = useState([
    userRoleOptions[0], 
    userRoleOptions[1], 
  ]);

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

      {/* List Header Start */}
      <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
        <Col lg="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
          <div className="text-muted text-small cursor-pointer sort">ID</div>
        </Col>
        <Col lg="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">User</div>
        </Col>
        <Col lg="1" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">CREATED</div>
        </Col>
        <Col lg="1" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">STATUS</div>
        </Col>
        <Col lg="1" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">UPDATED</div>
        </Col>
        <Col lg="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">SESSION</div>
        </Col>
    
        <Col lg="1" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">LOG-IN TIME</div>
        </Col>
        <Col lg="1" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">LOG-OUT TIME</div>
        </Col>
        <Col lg="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">ACTIONS</div>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}
      {displayedData.map((item) => (
        <Card key={item.id} className={`mb-2 ${selectedItems.includes(item.id) && 'selected'}`}>
          {/* Rest of your JSX code for rendering a single item */}
          {/* You can use 'item' to access data properties */}
          <Card.Body className="pt-0 pb-0 sh-30 sh-lg-8">
            <Row className="g-0 h-100 align-content-center" onClick={() => checkItem(item.id)}>
              <Col xs="11" lg="1" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-1 order-lg-1 h-lg-100 position-relative">
                <div className="text-muted text-small d-lg-none">Id</div>
                <NavLink to="/accounts/employee/detail" className="text-truncate h-100 d-flex align-items-center">
                  {item.id}
                </NavLink>
              </Col>

              <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                <div className="text-muted text-small d-md-none">Name</div>
                <div className="d-flex align-items-center">
                  <div className="round-image">
                    <img style={smallImageStyle} src={item.userImage} alt={item.name} />
                  </div>
                  <div>
                    <div className=" ms-2">{item.name}</div>
                    <div className="text-alternate ms-2 text-medium">{item.email}</div>
                  </div>
                </div>
              </Col>

              <Col xs="6" lg="1" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-3 order-lg-2">
                <div className="text-muted text-small d-lg-none">Created Date</div>
                <div>
           
                       <div>
                  <div>{item.date}</div>
                </div>
                </div>
              </Col>
              <Col xs="6" lg="1" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-3 order-lg-2">
                <div className="text-muted text-small d-lg-none">isActive</div>
                <div>
                  <div>
                    <div style={{ color: item.isActive ? '#B3B95A' : ' RGB(226, 182, 75)' }}>{item.isActive ? 'Active' : 'Inactive'}</div>
                  </div>
                </div>
              </Col>

              
              <Col xs="6" lg="1" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-3 order-lg-2">
                <div className="text-muted text-small d-lg-none">Updated Date</div>

                <div>
                  <div>{item.updatedDate}</div>
                </div>
              </Col>

              <Col xs="6" lg="2" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-3 order-lg-2">
                <div className="text-muted text-small d-lg-none">Updated Date</div>
                <div>
                  <div style={{ color: item.status === 'Not Logged in' ? '#ebb71a' : '#B3B95A' }}>{item.status}</div>
                </div>
             
              </Col>

              <Col xs="6" lg="1" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-4 order-lg-4">
                <div className="text-muted text-small d-lg-none">User Logout Time</div>
                <div>
                  <div className='text-alternate'>{item.logOutTime}</div>
                </div>
              </Col>
               <Col xs="6" lg="1" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-4 order-lg-4">
                <div className="text-muted text-small d-lg-none">User Login Time</div>
                <div>
                  <div className='text-alternate'>{item.loginTime}</div>
                </div>
              </Col>

             

              <Col xs="6" lg="1" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-last order-lg-5">
                <div className="text-muted text-small d-lg-none mb-1">Action</div>
                <div className="text-primary d-flex">
                  <div
                    className="d-flex"
                    style={{ cursor: 'pointer' }}
         
                    onClick={handleSelectChange}
                  >
                    <CsLineIcons icon="edit" />
                    &nbsp;
                  </div>
                  &nbsp; &nbsp;
                  <div className="d-flex" style={{ cursor: 'pointer' }} onClick={handleDeleteUserClick}>
         
                    <CsLineIcons icon="bin" />
                    &nbsp;
                  </div>
                </div>
              </Col>

              <Col xs="1" lg="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                <div className="d-flex">
                  <div>
                    <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => {}} />
                  </div>
                </div>
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

export default UsersList;
