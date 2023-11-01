import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'hooks/useWindowSize';
import Rating from 'react-rating';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import Clamp from 'components/clamp';
import ExcelJS from 'exceljs';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import CashDetails from 'views/storefront/filters/components/CashDetails';
import FeedbackSubmission from 'views/storefront/filters/components/FeedbackSubmission';
import { gulfwayBlue } from 'layout/colors/Colors';
import { Table, Tag, Checkbox } from 'antd';
import DoughnutChart from 'components/chart/DoughnutChart';
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
const RewardOverview = () => {
  const title = 'Rewards Dashboard';
  const description = 'Ecommerce Storefront Filters Page';
  const [selectionType, setSelectionType] = useState('checkbox');

  const { themeValues } = useSelector((state) => state.settings);
  const lgBreakpoint = parseInt(themeValues.lg.replace('px', ''), 10);
  const { width } = useWindowSize();
  const [isLgScreen, setIsLgScreen] = useState(false);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = useState(false);
  const tableHeaderStyle = {
    color: 'grey',
    fontSize: '10px',
  };
  useEffect(() => {
    if (width) {
      if (width >= lgBreakpoint) {
        if (!isLgScreen) setIsLgScreen(true);
        if (isOpenFiltersModal) setIsOpenFiltersModal(false);
      } else if (isLgScreen) setIsLgScreen(false);
    }
    return () => {};
    // eslint-disable-next-line
  }, [width]);

  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
  const [filteredData, setFilteredData] = useState(RiderListData);

  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [currentPage, setCurrentPage] = useState(1);

  // Track the selected section

  const smallImageStyle = {
    width: '40px', // Adjust the width as needed
    height: '40px', // Adjust the height as needed
    borderRadius: '50%', // Makes the image round
    overflow: 'hidden', // Ensures the image stays within the round shape
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
    const dataToExport = RiderListData.map((item) => ({
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
    const tableData = RiderListData.map((item) => [item.id, item.name, `$${item.phone}`, item.assignedOrders, item.status]);
    const columns = ['ID', 'Name', 'Phone', 'Assigned Orders', 'Status'];

    doc.autoTable({
      head: [columns],
      body: tableData,
      theme: 'striped',
    });

    doc.save('RiderListData.pdf');
  };



  const columns = [
    {
      title: <span style={tableHeaderStyle}>ID</span>,
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <a href="/riders/detail">{text}</a>
      ),
    },
    {
      title: <span style={tableHeaderStyle}>NAME</span>,
      dataIndex: 'name',
      key: 'name',
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
      title: <span style={tableHeaderStyle}>PHONE</span>,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: <span style={tableHeaderStyle}>ASSIGNED ORDERS</span>,
      dataIndex: 'assignedOrders',
      key: 'assignedOrders',
    },
    {
      title: <span style={tableHeaderStyle}>STATUS</span>,
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let color = 'default';

        if (text === 'PENDING') {
          color = 'warning';
        } else if (text === 'SUCCESS') {
          color = 'success';
        } else if (text === 'Declined') {
          color = 'error';
        }else if (text === 'ON-TRAVEL') {
          color = 'blue';
        }else if (text === 'REDEEMED') {
          color = 'orange';
        }else if (text === 'EARNED') {
          color = 'pink';
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },

  ];
  
  // Assuming displayedData is an array of your data
  const data = displayedData.map(item => ({
    key: item.id, // Make sure to set a unique key for each row
    id: item.id,
    name: item.name,
    phone: item.phone,
    assignedOrders: item.assignedOrders,
    status: item.status,
    image:item.image,
    email:item.email
  }));
  
  
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            {/* <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/storefront/home">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Storefront</span>
            </NavLink> */}
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none" onClick={() => setIsOpenFiltersModal(true)}>
              <CsLineIcons icon="filter" />
            </Button>
            {/* <Dropdown className="ms-1 w-100 w-md-auto" align="end">
              <Dropdown.Toggle variant="outline-primary" className="w-100 w-md-auto">
                Order: Default
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="w-100 w-md-auto">
                <Dropdown.Item>Default</Dropdown.Item>
                <Dropdown.Item>Price Asc</Dropdown.Item>
                <Dropdown.Item>Price Desc</Dropdown.Item>
                <Dropdown.Item>Rating</Dropdown.Item>
                <Dropdown.Item>Newest</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>
      {/* Title End */}

      <Row>
        <Col lg="8" xl="9">
          {/* Product Thumbnails Start */}
          <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-2 row-cols-xl-3 g-2 mb-5">
            <Col>
            <Card className={`h-100 mb-2 ${selectedItems.includes(2) && 'selected'}`}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>Rewards Claimed</div>
                    <div style={{ cursor: 'pointer', color: gulfwayBlue }}>View all</div>
                  </div>
                  <div className="d-flex justify-content-between ">
                    <div style={{ paddingTop: '50px' }}>
                      <span style={{ fontSize: '24px' }}>13</span>
                      <div className='text-muted' style={{ fontSize: '12px', fontWeight: 'bold' }}>This month</div>

                      <div className='text-primary'style={{ fontSize: '14px', fontWeight: 'bold', paddingTop: '20px',  }}>AED 600 Rewarded</div>
                    </div>

                    <div style={{ width: '50%' }}>
                      <DoughnutChart />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className={`h-100 mb-2 ${selectedItems.includes(2) && 'selected'}`}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>Completed Surveys</div>
                    <div style={{ cursor: 'pointer', color: gulfwayBlue }}>View all</div>
                  </div>
                  <div className="d-flex justify-content-between ">
                    <div style={{ paddingTop: '50px' }}>
                      <span style={{ fontSize: '24px' }}>13</span>
                      <div className='text-muted' style={{ fontSize: '12px', fontWeight: 'bold' }}>This month</div>

                      <div className='text-primary'style={{ fontSize: '14px', fontWeight: 'bold', paddingTop: '20px',  }}>AED 600 Rewarded</div>
                    </div>

                    <div style={{ width: '50%' }}>
                      <DoughnutChart />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
            <Card className={`h-100 mb-2 ${selectedItems.includes(2) && 'selected'}`}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>Feedback</div>
                    <div style={{ cursor: 'pointer', color: gulfwayBlue }}>View all</div>
                  </div>
                  <div className="d-flex justify-content-between ">
                    <div style={{ paddingTop: '50px' }}>
                      <span style={{ fontSize: '24px' }}>13</span>
                      <div className='text-muted' style={{ fontSize: '12px', fontWeight: 'bold' }}>This month</div>

                      <div className='text-primary'style={{ fontSize: '14px', fontWeight: 'bold', paddingTop: '20px',  }}>AED 600 Rewarded</div>
                    </div>

                    <div style={{ width: '50%' }}>
                      <DoughnutChart />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
         
          <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
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
          {/* Pagination Start */}

          {/* Pagination End */}
        </Col>

        <Col lg="4" xl="3" className="d-none d-lg-block">
          {/* Filters Start */}
          <Card className="mb-5">
            <Card.Body>
              <CashDetails />
            </Card.Body>
          </Card>
          <Card className="mb-5">
            <Card.Body>
              <FeedbackSubmission />
            </Card.Body>
          </Card>

          {/* Filters End */}
        </Col>
      </Row>

      {/* Filters Modal Start */}

      {/* Filters Modal End */}
    </>
  );
};

export default RewardOverview;
