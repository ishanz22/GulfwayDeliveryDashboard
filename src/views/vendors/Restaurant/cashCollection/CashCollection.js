import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Rating from 'react-rating';
import Select from 'react-select';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import Lightbox from 'react-image-lightbox';
import { Row, Col, Button, Dropdown, Card, Form, Spinner, ProgressBar, Badge, OverlayTrigger, Tooltip, Pagination } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import GlideGallery from 'components/carousel/GlideGallery';
import CheckAll from 'components/check-all/CheckAll';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ButtonMui from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Clamp from 'components/clamp';
import 'react-image-lightbox/style.css';
import ExcelJS from 'exceljs';
import CollectionTableData from 'data/CollectionTableData';

const CashCollection = () => {
  const title = 'Cash Collection Transaction';
  const description = 'Ecommerce Storefront Detail Page';
  const [isValid, setIsValid] = useState(true);
  const [openToast, setOpenToast] = useState(false);
  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false);
  const [buttonText, setButtonText] = useState('Collect Cash');
  const [toast, setToast] = useState('');
  const [formData, setFormData] = useState({
    id: '', // You might have more fields here

    method: '',
    amount: '',
    restaurant: '',
    reference: '',
    type: '',
    deliveryman: '',
  });
  const checkItem = (item) => {
    setSelectedItems([item.id]);

    console.log('Selected Item:', item);


    setButtonText('Update Collected Cash');

    setFormData({
   
      id: item.id,
      
      phone: item.phone,

      method: item.method,
      restaurant: item.restaurant,
      amount: item.amount,
      reference: item.reference,
      type: item.type,
      deliveryman: item.deliveryman,
    });
  };

  const toggleCheckAll = (allSelect) => {
    if (allSelect) {
      setSelectedItems(allItems);
    } else {
      setSelectedItems([]);
    }
  };



  const [selectType, setSelectType] = useState();
  const optionsType = [
    { value: 'Delivery man', label: 'Delivery man' },
    { value: 'Driver', label: 'Driver' },
  ];

  const [selectDeliveryman, setSelectDeliveryman] = useState();
  const deliveryman = [
    { value: 'John', label: 'John', profilePic: 'https://st4.depositphotos.com/1857171/41586/i/450/depositphotos_415860976-stock-photo-profile-portrait-delivery-man-uniform.jpg' },
    { value: 'Mary', label: 'Mary', profilePic: 'https:https://media.istockphoto.com/id/1159791528/photo/close-up-side-profile-photo-amazing-stupor-specialist-he-him-his-delivery-boy-hold-arms-many.jpg?s=612x612&w=0&k=20&c=u8_QUeRLhjtXKejCa9O6upXn-pvtFlfMLK9x6maqbd8=' },
  ];

  const deliveryman1 = {
    'John' : 'https://st4.depositphotos.com/1857171/41586/i/450/depositphotos_415860976-stock-photo-profile-portrait-delivery-man-uniform.jpg',
    'Mary': 'https://img.freepik.com/free-photo/delivery-concept-portrait-happy-african-american-delivery-man-red-cloth-holding-box-package-isolated-grey-studio-background-copy-space_1258-1261.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696809600&semt=ais'
  }

  const [selectMethod, setSelectMethod] = useState();
  const method = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Card', label: 'Card' },
  ];

  const [selectVehicle, setSelectVehicle] = useState();
  const optionsVehicle = [
    { value: 'Car', label: 'Car' },
    { value: 'Bike', label: 'Bike' },
  ];

  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  const [filteredData, setFilteredData] = useState(CollectionTableData);

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
    const dataToExport = CollectionTableData.map((item) => ({
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
      a.download = 'CollectionTableData.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const exportToPDF = () => {
    const doc = new JsPDF();
    const tableData = CollectionTableData.map((item) => [item.id, item.name, `$${item.phone}`, item.assignedOrders, item.status]);
    const columns = ['ID', 'Name', 'Phone', 'Assigned Orders', 'Status'];

    doc.autoTable({
      head: [columns],
      body: tableData,
      theme: 'striped',
    });

    doc.save('CollectionTableData.pdf');
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeDelivery = (selectedOption) => {
    setSelectType(selectedOption);
    setFormData({ ...formData, deliveryman: selectedOption ? selectedOption.value : '' }); // Update identity type in form data
  };

  const handleChangeMethod = (selectedOption) => {
    setSelectMethod(selectedOption);
    setFormData({ ...formData, method: selectedOption ? selectedOption.value : '' }); // Update identity type in form data
  };

  const handleChangeType = (selectedOption) => {
    setSelectVehicle(selectedOption);
    setFormData({ ...formData, type: selectedOption ? selectedOption.value : '' }); // Update vehicle type in form data
  };
  const handleOpenToast = (message) => {
    setToast(message);
    setOpenToast(true);
    setTimeout(() => {
      setOpenToast(false);
    }, 3000);
  };
  const handleAddRiderClick = () => {
    let toastMessage = '';
    if (!formData.id) {
      // This means we are adding a new rider

      // Check if any required fields are empty
      if (
        formData.method === '' ||
        formData.restaurant === '' ||
        formData.amount === '' ||
        formData.reference === '' ||
        formData.deliveryman === '' ||
        formData.image === null
      ) {
        console.log(formData);
        setIsValid(false); // Form is invalid

        // console.log(defaultUser);
      } else {
        setIsValid(true); // Form is valid
        console.log(formData);
        // Create a new rider object
        const newRider = {
          id: CollectionTableData.length + 1, // Generate a unique ID (you may need to adjust this logic)

          phone: formData.phone,

          method: formData.method,
          restaurant: formData.restaurant,
          amount: formData.amount,
          reference: formData.reference,
          type: formData.type,
          deliveryman: formData.deliveryman,
        };

        // Add the new rider to the RiderListData array
        CollectionTableData.push(newRider);

        // Clear the form data for the next entry

        setFormData({
          type: '',
          deliveryman: '',
          method: '',
          amount: '',
          restaurant: '',
          reference: '',
        });

        // setSelectedFile('');
        // setSelectType(null);
        // setSelectDeliveryman(null);
        // setSelectMethod(null);
        // setSelectType(null);
        // setSelectValueCity(null);
        // setSelectRider(null);
        // setSelectIdentityType(null);
        // setSelectVehicle(null);
        // setSelectZone(null);
        setSelectDeliveryman(null);
        setSelectMethod(null);
        setSelectVehicle(null);
        // console.log('Rider added:', newRider);
        // console.log('Form data:', formData);
        toastMessage = 'Rider added successfully!';
      }
    } else {
      // This means we are updating an existing rider
      // Find the rider in the AddNewRidersData array by their ID
      const riderToUpdateIndex = CollectionTableData.findIndex((rider) => rider.id === formData.id);
      if (riderToUpdateIndex !== -1) {
        // Create an updated rider object
        const updatedRider = {
          id: formData.id,
      
          phone: formData.phone,

          method: formData.method,
          restaurant: formData.restaurant,
          amount: formData.amount,
          reference: formData.reference,
          type: formData.type,
          deliveryman: formData.deliveryman,
        };
        // Update the rider in the RiderListData array
        CollectionTableData[riderToUpdateIndex] = updatedRider;
        // Clear the form data
        setFormData({
          type: '',
          deliveryman: '',
          method: '',
          amount: '',
          restaurant: '',
          reference: '',
        });
        setSelectDeliveryman(null);
        setSelectMethod(null);
        setSelectVehicle(null);
        console.log('Rider updated:', updatedRider);
        toastMessage = 'Rider updated successfully!';
      } else {
        console.error('Rider not found for update.');
      }
    }
    if (isValid) {
      handleOpenToast(toastMessage);
    }
  };

  const handleAddResetClick = () => {
    setFormData({
      type: '',
      deliveryman: '',
      method: '',
      amount: '',
      restaurant: '',
      reference: '',
    });

    setSelectDeliveryman(null);
    setSelectMethod(null);
    setSelectVehicle(null);
    // setButtonText('Add Rider');
  };

  const handleSelectChange = (itemToRemove) => {
    setSelectedItem(itemToRemove);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (selectedItem) {
      const indexToRemove = CollectionTableData.findIndex((rider) => rider.id === selectedItem.id);
      if (indexToRemove !== -1) {
        CollectionTableData.splice(indexToRemove, 1);

        setShowDeleteSuccessToast(true);
        setToast('Rider deleted successfully');
      }
      setFormData({
        type: '',
        deliveryman: '',
        method: '',
        amount: '',
        restaurant: '',
        reference: '',
      });

      setSelectDeliveryman(null);
      setSelectMethod(null);
      setSelectVehicle(null);

    
    }
    setIsDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };
  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/vendors/Restaurant/detail">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Details</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          <div style={{ paddingTop: '40px' }}>
            <Card className="mb-2">
              <Card.Body>
                <Form>
                  <Row className="g-4">
                    <Col lg="4">
                      <Form.Label>Type</Form.Label>
                      <Select
                        classNamePrefix="react-select"
                        className={`mb-3 ${!formData.type && !isValid ? 'is-invalid' : ''}`}
                        options={optionsVehicle}
                        value={{ label: formData.type, value: formData.type }}
                        onChange={handleChangeType}
                        placeholder=""
                      />
                    </Col>

                    <Col lg="4">
                      <Form.Label>Restaurant</Form.Label>
                      <Form.Control
                        name="restaurant"
                        type="text"
                        className={`mb-3 ${!formData.restaurant && !isValid ? 'is-invalid' : ''}`}
                        onChange={handleInputChange}
                        value={formData.restaurant}
                      />
                    </Col>
                    <Col lg="4">
                      <Form.Label>Deliveryman</Form.Label>
                      <Select
                        classNamePrefix="react-select"
                        className={`mb-3 ${!formData.deliveryman && !isValid ? 'is-invalid' : ''}`}
                        options={deliveryman}
                        value={{ label: formData.deliveryman, value: formData.deliveryman ,}}
                        onChange={handleChangeDelivery}
                        placeholder=""
                      />
                    </Col>
                  </Row>
                  <Row className="g-4">
                    <Col lg="4">
                      <Form.Label>Method</Form.Label>
                      <Select
                        classNamePrefix="react-select"
                        className={`mb-3 ${!formData.method && !isValid ? 'is-invalid' : ''}`}
                        options={method}
                        value={{ label: formData.method, value: formData.method }}
                        onChange={handleChangeMethod}
                        placeholder=""
                      />
                    </Col>
                    <Col lg="4">
                      <Form.Label>Reference</Form.Label>
                      <Form.Control
                        name="reference"
                        type="text"
                        className={`mb-3 ${!formData.reference && !isValid ? 'is-invalid' : ''}`}
                        onChange={handleInputChange}
                        value={formData.reference}
                      />
                    </Col>
                    <Col lg="4">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        name="amount"
                        type="number"
                        className={`mb-3 ${!formData.amount && !isValid ? 'is-invalid' : ''}`}
                        onChange={handleInputChange}
                        value={formData.amount}
                      />
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </div>
          {/* Top Buttons End */}
        </Row>
      </div>
      <div className=" d-flex justify-content-end mb-4">
        <button onClick={handleAddResetClick} type="button" className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold ">
          Reset
        </button>

        <button
          style={{ marginLeft: '15px', backgroundColor: '#5A94C8', fontWeight: 'bold' }}
          type="button"
          className="btn btn-icon btn-icon-start btn-primary"
          onClick={handleAddRiderClick}
        >
             {buttonText}
        </button>
      </div>
      {/* Product Start */}
      {displayedData.length > 0 ? (
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
      ): (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <p style={{ textAlign: 'center', fontSize: '18px' }}>No data available!</p>
        </div>
      )}
      {/* Lightbox End */}

      {displayedData.length > 0 && (
        <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
          <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
            <div className="text-muted text-small cursor-pointer sort">SL</div>
          </Col>
          <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
            <div className="text-muted text-small cursor-pointer sort">Delivery Man</div>
          </Col>
          <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
            <div className="text-muted text-small cursor-pointer sort">Type</div>
          </Col>
          <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
            <div className="text-muted text-small cursor-pointer sort">Method</div>
          </Col>
          <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
            <div className="text-muted text-small cursor-pointer sort">Restaurant</div>
          </Col>
          <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end">
            <div className="text-muted text-small cursor-pointer sort">Amount</div>
          </Col>
        </Row>
      )}
      {/* List Header End */}

      {/* List Items Start */}

      {/* List Items Start */}
      {displayedData.map((item) => (
        <Card key={item.id} className={`mb-2 ${selectedItems.includes(item.id) && 'selected'}`}>
          <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
            <Row className="g-0 h-100 align-content-center cursor-default justify-content-between" onClick={() => checkItem(item)}>
              <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
                <div className="text-muted text-small d-md-none">Id</div>
                <NavLink to="/riders/detail" className="text-truncate h-100 d-flex align-items-center">
                  {item.id}
                </NavLink>
              </Col>

              <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
                <div className="text-muted text-small d-md-none">Name</div>
                <div className="d-flex align-items-center">
                  <div className="round-image">
                    <img style={smallImageStyle} src={deliveryman1[item?.deliveryman]} alt={item.deliveryman} />
                  </div>
                  <div className="text-alternate ms-2">
                    {item.deliveryman} 
                  </div>
                </div>
              </Col>

              <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
                <div className="text-muted text-small d-md-none">Purchase</div>
                <div className="text-alternate">
                  <span>{item.type}</span>
                </div>
              </Col>

              <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
                <div className="text-muted text-small d-md-none">Email</div>
                <div className="text-alternate">{item.method}</div>
              </Col>

              <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
                {/* New Column 1 */}
                <div className="text-muted text-small d-md-none">City</div>
                <div className="text-alternate">{item.restaurant}</div>
              </Col>

              <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end">
                <div className="text-muted text-small d-md-none">Amount</div>
                <div>
                <div className="text-alternate">AED {`${item.amount}`}</div>
                </div>
              </Col>

              <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end">
                <div className="text-muted text-small d-md-none">Select</div>
                <div className="form-check mt-2" onClick={() => handleSelectChange(item)}>
                  <CsLineIcons icon="bin" className="text-danger" />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      {/* List Items End */}

      {/* Pagination Start */}
      {displayedData.length > 0 && (
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

        <Snackbar
            open={openToast}
            autoHideDuration={3000}
            onClose={() => setOpenToast(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
          >
            <Alert severity="success" onClose={() => setOpenToast(false)}>
              {toast}
            </Alert>
          </Snackbar>
      </div>
            )}

<Snackbar
        open={showDeleteSuccessToast}
        autoHideDuration={3000}
        onClose={() => setShowDeleteSuccessToast(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setShowDeleteSuccessToast(false)}>
          {' '}
          {/* Use "error" for danger color */}
          {toast}
        </Alert>
      </Snackbar>

      <Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
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

export default CashCollection;
