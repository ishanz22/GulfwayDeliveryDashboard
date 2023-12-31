import React, { useState,useEffect } from 'react';
import { Row, Col, Button, Dropdown, Form, Card,Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Rating from 'react-rating';
import JsPDF from 'jspdf';
import { NavLink } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import PerformanceChart from 'views/dashboard/components/PerformanceChart';
import ExcelJS from 'exceljs';
import RewardData from '../../../data/RewardData';

const Dashboard = () => {
  const title = 'Reward Details';
  const description = 'Ecommerce Dashboard Page';

  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
  const [filteredData, setFilteredData] = useState(RewardData);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

 // Track the selected section

  const smallImageStyle = {
    width: '30px', // Adjust the width as needed
    height: '30px', // Adjust the height as needed
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
  
  
    const dataToExport = RewardData.map((item) => ({
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
      a.download = 'RewardData.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });
  };
  
  const exportToPDF = () => {
    const doc = new JsPDF();
    const tableData = RewardData.map((item) => [item.id, item.name, `$${item.phone}`, item.assignedOrders, item.status]);
    const columns = ['ID', 'Name', 'Phone', 'Assigned Orders', 'Status'];

    doc.autoTable({
      head: [columns],
      body: tableData,
      theme: 'striped',
    });

    doc.save('RewardData.pdf');
  };
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/rewards/list">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Rewards.
              </span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          {/* <Col xs="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
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
    
          
          */}
          {/* Top Buttons End */}
          
        </Row>
      </div>
      {/* Title End */}

      {/* Stats Start */}
      {/* <div className="d-flex">
        <Dropdown>
          <Dropdown.Toggle className="small-title p-0 align-top h-auto me-2" variant="link">
            Today's
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Weekly</Dropdown.Item>
            <Dropdown.Item>Monthly</Dropdown.Item>
            <Dropdown.Item>Yearly</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h2 className="small-title">Stats</h2>
      </div> */}

      
      <Row className="mb-5 g-2">
        
      
        <Col xs="3" md="3" lg="3">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="server" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">TOTAL POINTS</div>
              <div className="text-primary cta-4">463</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="6" md="4" lg="3">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="user" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">USED POINTS</div>
              <div className="text-primary cta-4">17</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="6" md="4" lg="3">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="arrow-top-left" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">REMAINING POINTS</div>
              <div className="text-primary cta-4">2</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="6" md="4" lg="3">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="message" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">PENDING POINTS</div>
              <div className="text-primary cta-4">5</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Stats End */}
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
      <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
        
        <Col md="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
          <div className="text-muted text-small cursor-pointer sort">ID</div>
        </Col>
        <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">DESCRIPTION</div>
        </Col>
        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">DEBIT POINTS</div>
        </Col>
        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">CREDIT POINTS</div>
        </Col>
        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">STATUS</div>
        </Col>
        
      </Row>
      {displayedData.map((item) => (
        <Card key={item.id} className={`mb-2 ${selectedItems.includes(item.id) && 'selected'}`}>
          <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
            <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(item.id)}>
              <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                <div className="text-muted text-small d-md-none">Id</div>
                <NavLink to="/riders/detail" className="text-truncate h-100 d-flex align-items-center">
                  {item.id}
                </NavLink>
              </Col>

              
              <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                <div className="text-muted text-small d-md-none">Description</div>
                <div className="d-flex align-items-center">
                  <div className="round-image">
                    <text>{item.description}</text>
                  </div>
       
                </div>
              </Col>
              
              <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                <div className="text-muted text-small d-md-none">Debit Points</div>
                <div className="text-alternate">
                  <span>
                    
                    {item.debitPoints}
                  </span>
                </div>
              </Col>
              <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                <div className="text-muted text-small d-md-none">Credit Details</div>
                <div className="text-alternate">{item.creditPoints}</div>
              </Col>
              
              <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                <div className="text-muted text-small d-md-none">Status</div>
                <div>
                  <Badge bg="outline-primary">{item.status}</Badge>
                </div>
              </Col>

              
              <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => {}} />
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
    
    </>
  );
};

export default Dashboard;
