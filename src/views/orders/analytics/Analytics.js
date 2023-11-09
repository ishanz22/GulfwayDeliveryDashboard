import React, { useState, useEffect } from 'react';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import PerformanceChart from 'views/dashboard/components/PerformanceChart';
import BarChart from 'views/dashboard/components/BarChart';
import ExcelJS from 'exceljs';
import { Table, Tag, Checkbox } from 'antd';
import CheckAll from 'components/check-all/CheckAll';
import RecentOrders from '../../../data/RecentOrders';


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};
const Analytics = () => {
  const title = 'Orders Analytics';
  const description = 'Ecommerce Orders List Page';
  const [selectionType, setSelectionType] = useState('checkbox');
  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const checkItem = (item) => {
    console.log(`Selected card name: ${item.name}`);
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
    color: 'grey',fontSize:'10px'
  };
  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  const [filteredData, setFilteredData] = useState(RecentOrders);

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

  // Rest of your code remains unchanged
  const filterDataByStatus = (status) => {
    setSelectedStatus(status);
    if (status === 'Total Orders') {
      // Show all data
      setFilteredData(RecentOrders);
    } else {
      // Filter data by status
      const filteredItems = RecentOrders.filter((item) => item.status === status);
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





  const exportToExcel = () => {
  
  
    const dataToExport = RecentOrders.map((item) => ({
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
    const tableData = RecentOrders.map((item) => [item.id, item.name, `$${item.purchase}`, item.date, item.status]);
    const columns = ['ID', 'Name', 'Purchase', 'Date', 'Status'];

    doc.autoTable({
      head: [columns],
      body: tableData,
      theme: 'striped',
    });

    doc.save('OrderList.pdf');
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
  const columns = [
    {
      title: <span style={tableHeaderStyle}>ID</span>,
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <a href="/orders/detail">{text}
        </a>
      ),
    },
    {
      title:  <span style={tableHeaderStyle}>NAME</span>,
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
      title: <span style={tableHeaderStyle}>PURCHASE</span>,
      dataIndex: 'purchase',
      key: 'purchase',
      render: (text, record) => (
        <span>
          <span className="text-medium">AED </span>
          {formatNumberToKMB(text)}
        </span>
      ),
    },
    {
      title:<span style={tableHeaderStyle}>DATE</span> ,
      dataIndex: 'date',
      key: 'date',
    },
    {
      title:<span style={tableHeaderStyle}>STATUS</span>,
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let color = 'default';

        if (text === 'PENDING') {
          color = 'warning';
        } else if (text === 'PAID') {
          color = 'success';
        } else if (text === 'CANCELED') {
          color = 'error';
        }else if (text === 'REFUNDED') {
          color = 'blue';
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
  
  ];
  
  // Assuming displayedData is an array of your data
  const data = displayedData.map(item => ({
    key: item.id, 
    id: item.id,
    name: item.name,
    purchase: item.purchase,
    date: item.date,
    status: item.status,
    image: item.image, 
    email:item.email

  }));
  
  
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
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>
      <Row className="mb-5 g-2">
        <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="dollar" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">EARNINGS</div>
              <div className="text-primary cta-4">$ 315.20</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="cart" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">ORDERS</div>
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
                <CsLineIcons icon="user" className="text-primary" />
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
                <CsLineIcons icon="message" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">CANCELED</div>
              <div className="text-primary cta-4">5</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Recent Orders Start */}
        <Col xl="6" className="mb-5">
          <h2 className="small-title">Sales</h2>
       

  
            <Card className="sh-45 h-xl-100-card">
            <Card.Body className="h-100">
              <div className="h-100">
                <PerformanceChart />
              </div>
            </Card.Body>
          </Card>
       
        </Col>
        {/* Recent Orders End */}

        {/* Performance Start */}
        <Col xl="6" className="mb-5">
          <h2 className="small-title">Top Riders</h2>
            
                   <Card className="sh-45 h-xl-100-card">
            <Card.Body className="h-100">
              <div className="h-100">
                <BarChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* Performance End */}
      </Row>


        {/* Performance End */}
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
    {/* Recent Orders Start */}


      {/* List Header Start */}
     
      {/* List Header End */}

      {/* List Items Start */}
      <h2 className="small-title">Recent Orders</h2>
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


        {/* Recent Orders End */}


      {/* List Header Start */}
      {/* <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
        <Col md="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
          <div className="text-muted text-small cursor-pointer sort">ID</div>
        </Col>
        <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">NAME</div>
        </Col>
        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">PURCHASE</div>
        </Col>
        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">DATE</div>
        </Col>
        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">STATUS</div>
        </Col>
      </Row> */}
      {/* List Header End */}

      {/* List Items Start */}

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
      
    </>
  );
};

export default Analytics;
