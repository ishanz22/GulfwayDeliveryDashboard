import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { Row, Col, Button, Dropdown, Form, Card, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { utils, write } from 'xlsx';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { Table, Spin } from 'antd';
import UserLogsData from 'data/UserLogs';
import { useDispatch, connect } from 'react-redux';
import moment from 'moment';
import { getLogFile } from 'actions/admin';
import { LoadingOutlined } from '@ant-design/icons';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};
const ActivityLogs = (props) => {
  const title = 'Restaurant Activity Logs';
  const description = 'Ecommerce Customer List Page';
  const [selectionType, setSelectionType] = useState('checkbox');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  const [filteredData, setFilteredData] = useState(UserLogsData);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const dispatch = useDispatch();

  const { logs, loading, error } = props;
  const checkItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((x) => x !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    dispatch(getLogFile({ module: 'User' }));
    console.log(logs);
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
  const filterDataByStatus = (status) => {
    setSelectedStatus(status);

    // Filter data by status
    const filteredItems = UserLogsData.filter((item) => item.status === status);
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
    const dataToExport = UserLogsData.map((item) => ({
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

    const tableData = UserLogsData.map((item) => ({
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

  const columns = [
    {
      title: <span style={tableHeaderStyle}>IDENTIFIER</span>,
      dataIndex: 'identifier',
      key: 'identifier',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      // render: (text, record) => <NavLink to={`/vendors/SuperMarket/detail/${text}`}>{text}</NavLink>,
      render: (text, record) => <NavLink to="/vendors/Grocery/detail">{record?.identifier}</NavLink>,
    },
    {
      title: <span style={tableHeaderStyle}>ACTIVITY</span>,
      dataIndex: 'activity',
      key: 'activity',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => <div>{record?.activity}</div>,
    },
    {
      title: <span style={tableHeaderStyle}>MODULE</span>,
      dataIndex: 'module',
      key: 'module',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => <div>{record?.module}</div>,
    },
    {
      title: <span style={tableHeaderStyle}>DATE / TIME</span>,
      dataIndex: 'dateTime',
      key: 'dateTime',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text, record) => {
        const formattedDate = moment(record?.dateTime).format('MMM D, YYYY');
        const formattedTime = moment(record?.dateTime).format('h:mm A');

        return (
          <div>
            <div className="text-medium" style={{ display: 'flex', alignItems: 'center' }}>
              <CsLineIcons icon="clock" size="11" /> &nbsp;{formattedDate}
            </div>
            <div className="text-alternate text-small" style={{ display: 'flex', alignItems: 'center' }}>
              <CsLineIcons icon="calendar" size="11" /> &nbsp;{formattedTime}
            </div>
          </div>
        );
      },
    },
  ];
  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleDeleteConfirmed = () => {
    setIsDeleteDialogOpen(false);
  };

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

      <div>
        {loading ? (
          customLoader // Use the custom loader
        ) : (
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={logs}
          />
        )}
      </div>
    </>
  );
};

function mapStateToProps(state) {
  console.log(typeof state.admin.logs);
  return {
    error: state.admin.error,
    loading: state.admin.loading,
    isAuthenticated: state.auth.isAuthenticated,
    logs: state?.admin?.logs,
  };
}
export default connect(mapStateToProps)(ActivityLogs);
