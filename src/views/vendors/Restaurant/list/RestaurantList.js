import React, { useState, useEffect } from 'react';
import { NavLink,useParams } from 'react-router-dom';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { Row, Col, Button, Dropdown, Form, Card, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { utils, write } from 'xlsx';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { Table, Tag } from 'antd';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, connect } from 'react-redux';
import { getRestaurantDetails } from 'actions/restaurant';
import VendorListData from 'data/VendorListData';
import { gulfwayBlue } from 'layout/colors/Colors';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};
const RestaurantList = (props) => {
  const { userId } = useParams();
  const { restaurant, error, isAuthenticated, loading } = props;
  const dispatch = useDispatch();
  
  const title = 'Restaurant List';
  const description = 'Ecommerce Customer List Page';
  const [selectionType, setSelectionType] = useState('checkbox');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  // const [restaurant, setrestaurant] = useState(restaurant);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  // 1 step 🩸
  /*
  useEffect(() => {
    dispatch(getRestaurantDetails({}));
    console.log(restaurant);
    // setrestaurant(restaurant);
  }, []);
  */

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
    const filteredItems = VendorListData.filter((item) => item.status === status);
    // setrestaurant(filteredItems);
  };


  // 2 step 🩸


  const nextPage = () => {
    if (VendorListData && currentPage < Math.ceil(VendorListData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const exportToExcel = () => {
    const dataToExport = VendorListData.map((item) => ({
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

    const tableData = VendorListData.map((item) => ({
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

    const columns = ['ID', 'Name', 'Location', 'Earnings', 'LastOrder', 'Status'];

    // Create a header row
    const headerRow = columns.map((col) => ({ title: col, dataKey: col }));

    doc.autoTable({
      head: [headerRow],
      body: tableData.map((row) => Object.values(row)),
      theme: 'striped',
      margin: { top: 15 },
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
    // 3 step 🩸
    {
      title: <span style={tableHeaderStyle}>ID</span>,
      dataIndex: 'id',
      key: 'id',
      // render: (text, record) => <NavLink to={`/vendors/Restaurant/detail/${text}`}>{text}</NavLink>,
      render: (text, record) => <NavLink to={`/vendors/Restaurant/detail/${record?.VendorListData?.customId}`}>{record?.VendorListData?.customId}</NavLink>,
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
    },

    // 4 step
    {
      title: <span style={tableHeaderStyle}>NAME</span>,
      dataIndex: 'name',
      key: 'name',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      // render: (text, record) => <div style={{ wordBreak: ' break-all' }}>{record?.VendorListData?.name}</div>,
      render: (text, record) => <div style={{ wordBreak: ' break-all' }}>{record?.name}</div>,
    },

    // 5  step
    {
      title: <span style={tableHeaderStyle}>LOCATION</span>,
      dataIndex: 'location',
      key: 'location',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <div style={{ wordBreak: ' break-all' }}>
          {record?.restaurant?.zone}, {record?.restaurant?.city}
        </div>
      ),
    },
    {
      title: <span style={tableHeaderStyle}>EARNING</span>,
      dataIndex: 'earnings',
      key: 'earnings',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => <div>{record?.amount}</div>,
    },
    {
      title: <span style={tableHeaderStyle}>LAST ORDER</span>,
      dataIndex: 'lastOrder',
      key: 'lastOrder',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],


    // last step 🩸
      // render: (text, record) => <div>{record?.order[0]?.customId}</div>,
    },

    // 6 step 🩸
    {
      title: <span style={tableHeaderStyle}>STATUS</span>,
      dataIndex: 'status',
      key: 'status',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => {
        let color = 'default';

        if (record?.restaurant?.status === 'pending') {
          color = 'warning';
        } else if (record?.restaurant?.status === 'approved') {
          color = 'success';
        } else if (record?.restaurant?.status === 'declined') {
          color = 'error';
        }

        return <Tag color={color}>{record?.VendorListData?.status}</Tag>;
      },
    },
 // 7 step 🩸
    {
      title: <span style={tableHeaderStyle}>ACTION</span>,
      key: 'action',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => (
        <span className="d-flex">
                   <NavLink to={{ pathname: `/vendors/Restaurant/detail/${record.id}`, state: { record } }}>


          
          <div
            // onClick={() => handleView(record?.restaurant?.customId)}
            onClick={() => handleView(record.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', paddingRight: '10px', color: gulfwayBlue }}
          >
            <CsLineIcons icon="eye" />
          </div>
          </NavLink>

          <NavLink to={{ pathname: `/vendors/Restaurant/edit/${record.id}`, state: { record } }}>


          <div
            // onClick={() => handleEdit(record?.restaurant?.customId)}
            onClick={() => handleEdit(record.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', paddingRight: '10px', color: gulfwayBlue }}
          >
            <CsLineIcons icon="pen" />
          </div>
          </NavLink>
          <div onClick={() => handleDelete(record?.VendorListData?.customId)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4f' }}>
            <CsLineIcons icon="bin" />
          </div>
        </span>
      ),
    },
  ];

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };
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
    
          {/* Length End */}
        </Col>
      </Row>

      <div>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={VendorListData}

        />
      </div>
      
      {/* 8 step 🩸 */}


      <Dialog open={isDeleteDialogOpen} onClose={handleDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this item?</DialogContentText>
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
  console.log(state.restaurant);
  return {
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    restaurant: state?.restaurant?.restaurant,
  };
}
export default connect(mapStateToProps)(RestaurantList);
