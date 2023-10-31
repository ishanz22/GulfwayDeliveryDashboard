import React, { useState, useEffect } from 'react';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { utils, write } from 'xlsx';
import CheckAll from 'components/check-all/CheckAll';
import PerformanceChart from 'views/dashboard/components/PerformanceChart';
import DateRange from 'views/dashboard/components/DateRange';
import ExcelJS from 'exceljs';
import { Table, Tag, Image } from 'antd';
import { gulfwayBlue } from 'layout/colors/Colors';
import ArrowUpIcon from '../../../assets/arrowwi.png';
import OrderList from '../../../data/OrderList';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

const OrdersList = () => {
  const title = 'Orders List';
  const description = 'Ecommerce Orders List Page';
  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  const [filteredData, setFilteredData] = useState(OrderList);
  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectionType, setSelectionType] = useState('checkbox');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedSection, setSelectedSection] = useState('Total Orders'); // Track the selected section

  const smallImageStyle = {
    width: '30px',
    height: '30px', 
    borderRadius: '50%', 
    overflow: 'hidden',
  };
  const tableHeaderStyle = {
    color: 'grey',fontSize:'10px'
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
      setFilteredData(OrderList);
    } else {
      // Filter data by status
      const filteredItems = OrderList.filter((item) => item.status === status);
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
  const calculateRevenuePercentage = (status) => {
    // Filter data by status
    const filteredItems = OrderList.filter((item) => item.status === status);

    // Calculate Total Revenue for the filtered items
    const totalRevenue = filteredItems.reduce((total, item) => total + item.purchase, 0);

    // Calculate Revenue Percentage for each item in the filtered data
    const dataWithPercentage = filteredItems.map((item) => {
      const revenuePercentage = ((item.purchase / totalRevenue) * 100).toFixed(2);
      return {
        ...item,
        revenuePercentage: `${revenuePercentage}%`, // Include the percentage symbol in the value
      };
    });

    return dataWithPercentage;
  };

  // Calculate revenue percentages for each status
  const pendingRevenue = calculateRevenuePercentage('PENDING');
  const canceledRevenue = calculateRevenuePercentage('CANCELED');
  const paidRevenue = calculateRevenuePercentage('PAID');
  const refundedRevenue = calculateRevenuePercentage('REFUNDED');
  const totalRevenues = OrderList.reduce((total, item) => total + item.purchase, 0);
  const totalPurchaseAmount = OrderList.reduce((total, item) => total + item.purchase, 0);

  const totalRevenuePercentage = ((totalRevenues / totalPurchaseAmount) * 100).toFixed(2); // Calculate and round to 2 decimal places

  // You can now use these revenue arrays in your component where needed.

  const exportToExcel = () => {
  
  
    const dataToExport = OrderList.map((item) => ({
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
    const tableData = OrderList.map((item) => [item.id, item.name, `$${item.purchase}`, item.date, item.status]);
    const columns = ['ID', 'Name', 'Purchase', 'Date', 'Status'];

    doc.autoTable({
      head: [columns],
      body: tableData,
      theme: 'striped',
    });

    doc.save('OrderList.pdf');
  };

  const totalOrdersCount = OrderList.length;
  const newOrdersCount = OrderList.filter((item) => item.status === 'PENDING').length;
  const refundOrdersCount = OrderList.filter((item) => item.status === 'REFUNDED').length;
  const cenceledOrdersCount = OrderList.filter((item) => item.status === 'CANCELED').length;
  const paidOrdersCount = OrderList.filter((item) => item.status === 'PAID').length;

  const totalRevenue = OrderList.reduce((sum, user) => {
    if (user.status === 'PAID') {
      return sum + user.purchase;
    }
    return sum;
  }, 0);
  const totalRevenueAll = OrderList.reduce((total, user) => total + user.purchase, 0);
  const totalPurchaseAmountAll = ((totalRevenue / totalRevenueAll) * 100).toFixed(2);

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
  const handleView = (id) => {
    console.log(`View Item ID ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit Item ID ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete Item ID ${id}`);
  };
  const columns = [
    {
      title: <span style={tableHeaderStyle}>ID</span>,
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: <span style={tableHeaderStyle}>NAME</span>,
      dataIndex: 'name',
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <Image style={smallImageStyle} src={record.image} alt={record.name} />
          <span className="text-alternate ms-2">{text}</span>
        </div>
      ),
    },
    {
      title:  <span style={tableHeaderStyle}>PURCHASE</span>,
      dataIndex: 'purchase',
      render: (text) => (
        <span className="text-alternate">
          <span className="text-medium">AED </span>
          {formatNumberToKMB(text)}
        </span>
      ),
      sorter: (a, b) => a.purchase - b.purchase,
    },
    {
      title: <span style={tableHeaderStyle}>DATE</span>, 
      dataIndex: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title:<span style={tableHeaderStyle}>STATUS</span> ,
      dataIndex: 'status',
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
    {
      title: <span style={tableHeaderStyle}>ACTION</span> ,
      key: 'action',
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
            <DateRange />
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
      <Card className="sh-45 h-xl-100-card">
        <Card.Body className="h-100">
          <div className="h-100">
            <PerformanceChart />
          </div>
        </Card.Body>
      </Card>
      <br />
      <div className="d-flex" style={{ justifyContent: 'space-between' }}>
        <Card className="sh-45 h-xl-100-card w-80 " style={{ padding: '7px' }}>
          <Card.Body className="h-100 d-flex">
           
            <div
              className="flex-fill m-1 d-flex flex-column align-items-center justify-content-center"
              style={{ borderRight: '0.1px solid #B5AFAF', cursor: 'pointer' }}
              onClick={() => TotalOrders('Total Orders')}
            >
              <div style={{ display: 'flex' }}>
                
                <div>
                  <div style={{ display: 'flex' }}>
                    <text>{totalOrdersCount}</text>
                    <text>&nbsp;</text>
                    <text>&nbsp;</text>
                    &nbsp; (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={ArrowUpIcon} alt="Up Arrow Icon" style={{ width: '17px' }} />
                      <span style={{ color: '#90EE90' }}> {totalPurchaseAmountAll}%&thinsp;</span>
                    </div>
                    )
                  </div>
                  <br />

                  <div className="small">Total Orders</div>
                </div>
              </div>
            </div>

{/* paid orders */}
            <div
              className="flex-fill m-1 d-flex flex-column align-items-center justify-content-center"
              style={{ borderRight: '0.1px solid #B5AFAF', cursor: 'pointer' }}
              onClick={() => paidOrders('Total Orders')}
            >
              <div style={{ display: 'flex' }}>
                <div>
                  <div style={{ display: 'flex' }}>
                    <text>{paidOrdersCount}</text>
                    <text>&nbsp;</text>
                    <text>&nbsp;</text>
                    &nbsp; (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={ArrowUpIcon} alt="Up Arrow Icon" style={{ width: '17px' }} />
                      <span style={{ color: '#90EE90' }}>{paidRevenue[0] && paidRevenue[0].revenuePercentage}&thinsp;</span>
                    </div>
                    )
                  </div>
                  <br />

                  <div className="small">Paid Orders</div>
                </div>
              </div>
            </div>

{/* canceled orders */}
            <div
              className="flex-fill m-1 d-flex flex-column align-items-center justify-content-center"
              style={{ borderRight: '0.1px solid #B5AFAF', cursor: 'pointer' }}
              onClick={logNewOrders}
            >
              <div style={{ display: 'flex' }}>
                <div>
                  <div style={{ display: 'flex' }}>
                    <text>{newOrdersCount}</text>
                    <text>&nbsp;</text>
                    <text>&nbsp;</text>
                    &nbsp; (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={ArrowUpIcon} alt="Up Arrow Icon" style={{ width: '17px' }} />
                      <span style={{ color: '#90EE90' }}>{pendingRevenue[0] && pendingRevenue[0].revenuePercentage}&thinsp;</span>
                    </div>
                    )
                  </div>
                  <br />

                  <div className="small">Pending Orders</div>
                </div>
              </div>
            </div>

            <div
              className="flex-fill m-1 d-flex flex-column align-items-center justify-content-center"
              style={{ borderRight: '0.1px solid #B5AFAF', cursor: 'pointer' }}
              onClick={canceledOrders}
            >
              <div style={{ display: 'flex' }}>
                <div>
                  <div style={{ display: 'flex' }}>
                    <text>{cenceledOrdersCount}</text>
                    <text>&nbsp;</text>
                    <text>&nbsp;</text>
                    &nbsp; (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={ArrowUpIcon} alt="Up Arrow Icon" style={{ width: '17px' }} />
                      <span style={{ color: '#90EE90' }}>{canceledRevenue[0] && canceledRevenue[0].revenuePercentage}&thinsp; </span>
                    </div>
                    )
                  </div>
                  <br />

                  <div className="small">Canceled Orders</div>
                </div>
              </div>
            </div>

            <div
              className="flex-fill m-1 d-flex flex-column align-items-center justify-content-center"
              style={{ cursor: 'pointer' }}
              onClick={logRefundedOrders}
            >
              <div style={{ display: 'flex' }}>
                <div>
                  <div style={{ display: 'flex' }}>
                    <text>{refundOrdersCount}</text>
                    <text>&nbsp;</text>
                    <text>&nbsp;</text>
                    &nbsp; (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={ArrowUpIcon} alt="Up Arrow Icon" style={{ width: '17px' }} />
                      <span style={{ color: '#90EE90' }}>{refundedRevenue[0] && refundedRevenue[0].revenuePercentage}&thinsp;</span>
                    </div>
                    )
                  </div>
                  <br />

                  <div className="small">Refunded Orders</div>
                </div>
              </div>
            </div>
            {/* Total Revenue */}
          </Card.Body>
        </Card>
        <text>&nbsp;</text>
        <text>&nbsp;</text>
        <Card className="sh-45 h-xl-100-card w-20 ">
          <Card.Body className="h-100 d-flex">
            <div className="flex-fill m-1 d-flex flex-column align-items-center justify-content-center" style={{ cursor: 'pointer', padding: '10px' }}>
              <div className="mb-2">
                <p className="text-small text-muted mb-1">TOTAL REVENUE</p>
                <div className="cta-2">
                  <span>
                    <span className="text-small text-muted cta-2">AED</span> {formatNumberToKMB(totalRevenue)}
                  </span>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      <br />

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
    </>
  );
};

export default OrdersList;
