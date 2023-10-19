import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import JsPDF from 'jspdf';
import { Row, Col, Dropdown, Button, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CheckAll from 'components/check-all/CheckAll';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ExcelJS from 'exceljs';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ButtonMui from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import defaultUser from '../../../assets/DefaultUser.jpeg';
import AddNewRidersData from '../../../data/AddNewRiderData';

const AddNewRider = () => {
  const title = 'Add New Rider';
  const description = 'Ecommerce Storefront Checkout Page';
  const [selectedFile, setSelectedFile] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [openToast, setOpenToast] = useState(false);
  const [toast, setToast] = useState('');
  const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false);

  const [imageSource, setImageSource] = useState(defaultUser);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [buttonText, setButtonText] = useState('Add Rider');

  const [selectedEmiratesIDFile, setSelectedEmiratesIDFile] = useState(null);
  const [selectedLicenseFile, setSelectedLicenseFile] = useState(null);
  const [selectedPassportFile, setSelectedPassportFile] = useState(null);

  const [newRiders, setNewRiders] = useState([]); // Store newly added riders here
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    riderType: '',
    identityType: '',
    identityNumber: '',
    vehicle: '',
    vehicleNumber: '',
    emergencyContactNumber: '',
    image: '',
    zone: '',
    emiratesID: null, // For Emirates ID
    license: null, // For License
    passport: null, // For Passport
  });

  const [selectValueCity, setSelectValueCity] = useState();
  const optionsCity = [
    { value: 'Dubai', label: 'Dubai' },
    { value: 'Abu Dhabi', label: 'Abu Dhabi' },
    { value: 'Sharjah', label: 'Sharjah' },
    { value: 'Al Ain', label: 'Al Ain' },
    { value: 'Ajman', label: 'Ajman' },
    { value: 'Ras Al Khaimah', label: 'Ras Al Khaimah' },
    { value: 'Fujairah', label: 'Fujairah' },
    { value: 'Umm Al-Quwain', label: 'Umm Al-Quwain' },
  ];

  const [selectVehicle, setSelectVehicle] = useState();
  const optionsVehicle = [{ value: 'Bike', label: 'Bike' }];

  const [selectRider, setSelectRider] = useState();
  const optionsRiders = [
    { value: 'Full Time', label: 'Full Time' },
    { value: 'Part Time', label: 'Part Time' },
  ];

  const [selectZone, setSelectZone] = useState();
  const optionsZones = [
    { value: 'Dubai Marina', label: 'Dubai Marina' },
    { value: 'Downtown Dubai', label: 'Downtown Dubai' },
    { value: 'Jumeirah', label: 'Jumeirah' },
    { value: 'Palm Jumeirah', label: 'Palm Jumeirah' },
    { value: 'Deira', label: 'Deira' },
    { value: 'Al Barsha', label: 'Al Barsha' },
    { value: 'Jumeirah Beach Residence (JBR)', label: 'Jumeirah Beach Residence (JBR)' },
    { value: 'Business Bay', label: 'Business Bay' },
    { value: 'Dubai Silicon Oasis', label: 'Dubai Silicon Oasis' },
  ];

  const [selectIdentityType, setSelectIdentityType] = useState();
  const optionsIdentityType = [
    { value: 'Identity', label: 'Identity' },
    { value: 'License', label: 'License' },
  ];

  const imageStyle = {
    width: '90px',
    height: '90px',
  };

  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);

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
        formData.firstName === '' ||
        formData.lastName === '' ||
        formData.email === '' ||
        formData.phone === '' ||
        formData.zone === '' ||
        formData.city === '' ||
        formData.riderType === '' ||
        formData.identityType === '' ||
        formData.identityNumber === '' ||
        formData.vehicle === '' ||
        formData.vehicleNumber === '' ||
        formData.emergencyContactNumber === '' ||
        !formData.image ||
        formData.image === defaultUser || // Profile image is required
        !formData.emiratesID ||
        formData.emiratesID === defaultUser || // Emirates ID is required
        !formData.license ||
        formData.license === defaultUser || // license  is required
        !formData.passport ||
        formData.passport === defaultUser // passport  is required
      ) {
        setIsValid(false); // Form is invalid
        console.log(formData);
        console.log(defaultUser);
      } else {
        setIsValid(true); // Form is valid

        // Create a new rider object
        const newRider = {
          id: AddNewRidersData.length + 1, // Generate a unique ID (you may need to adjust this logic)
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          image: formData?.image?.name ? URL.createObjectURL(formData?.image) : defaultUser,
          location: formData.city,
          email: formData.email,
          vehicleNumber: formData.vehicleNumber,
          city: formData.city,
          identityNumber: formData.identityNumber,
          emergencyContactNumber: formData.emergencyContactNumber,
          riderType: formData.riderType,
          identityType: formData.identityType,
          vehicle: formData.vehicle,
          zone: formData.zone,
          emiratesID: formData.emiratesID,
          license: formData.license,
          passport: formData.passport,
        };

        // Add the new rider to the RiderListData array
        AddNewRidersData.push(newRider);

        // Clear the form data for the next entry

        setFormData({
          id: null, // Reset the ID field to null to indicate we're in "add" mode
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          riderType: '',
          identityType: '',
          identityNumber: '',
          vehicle: '',
          vehicleNumber: '',
          emergencyContactNumber: '',
          image: defaultUser,
          zone: '',
          emiratesID: null, // Reset the Emirates ID

          license: null, // For License
          passport: null, // For Passport
        });

        setSelectedFile('');
        setSelectedEmiratesIDFile(null); // Reset the selected Emirates ID file
        setSelectedLicenseFile(null);
        setSelectedPassportFile(null)
        setSelectValueCity(null);
        setSelectRider(null);
        setSelectIdentityType(null);
        setSelectVehicle(null);
        setSelectZone(null);

        console.log('Rider added:', newRider);
        console.log('Form data:', formData);
        toastMessage = 'Rider added successfully!';
      }
    } else {
      // This means we are updating an existing rider

      // Find the rider in the AddNewRidersData array by their ID
      const riderToUpdateIndex = AddNewRidersData.findIndex((rider) => rider.id === formData.id);

      if (riderToUpdateIndex !== -1) {
        // Create an updated rider object
        console.log(formData);
      
        const updatedRider = {
          id: formData.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          image: formData?.image?.name ? URL.createObjectURL(formData?.image) : defaultUser,
          location: formData.city,
          email: formData.email,
          vehicleNumber: formData.vehicleNumber,
          city: formData.city,
          identityNumber: formData.identityNumber,
          emergencyContactNumber: formData.emergencyContactNumber,
          riderType: formData.riderType,
          identityType: formData.identityType,
          vehicle: formData.vehicle,
          zone: formData.zone,
          emiratesID:formData?.emiratesID?.name ? URL.createObjectURL(formData?.emiratesID) : defaultUser,
          license: formData.license,
          passport: formData.passport,
        };

        // Update the rider in the RiderListData array
        AddNewRidersData[riderToUpdateIndex] = updatedRider;

        // Clear the form data
        setFormData({
          id: null,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          riderType: '',
          identityType: '',
          identityNumber: '',
          vehicle: '',
          vehicleNumber: '',
          emergencyContactNumber: '',
          image: defaultUser,
          zone: '',
        });

        setSelectedFile('');

        setSelectValueCity(null);
        setSelectRider(null);
        setSelectIdentityType(null);
        setSelectVehicle(null);
        setSelectZone(null);

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
      id: null, // Reset the ID field to null to indicate we're in "add" mode
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      riderType: '',
      identityType: '',
      identityNumber: '',
      vehicle: '',
      vehicleNumber: '',
      emergencyContactNumber: '',
      image: defaultUser,
      zone: '',
    });

    setSelectedFile('');

    setSelectValueCity(null);
    setSelectRider(null);
    setSelectIdentityType(null);
    setSelectVehicle(null);
    setSelectZone(null);
    setSelectedItems([]);
    setButtonText('Add Rider');
  };

  const checkItem = (item) => {
    setSelectedItems([item.id]);

    console.log('Selected Item:', item);
    console.log('formData.image:', item.image);
   
    setButtonText('Update Rider');

    setFormData({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      phone: item.phone,
      city: item.city,
      riderType: item.riderType,
      identityType: item.identityType,
      identityNumber: item.identityNumber,
      vehicle: item.vehicle,
      vehicleNumber: item.vehicleNumber,
      emergencyContactNumber: item.emergencyContactNumber,
      image: item.image,
      zone: item.zone,
      emiratesID:item.emiratesID
    });
    
  };

  const toggleCheckAll = (allSelect) => {
    if (allSelect) {
      setSelectedItems(allItems);
    } else {
      setSelectedItems([]);
    }
  };

  const [selectedStatus, setSelectedStatus] = useState('Total Orders');
  const [filteredData, setFilteredData] = useState(AddNewRidersData);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const smallImageStyle = {
    width: '30px',
    height: '30px',
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
  const [displayData, setDisplayData] = useState(displayedData);

  const exportToExcel = () => {
    const dataToExport = AddNewRidersData.map((item) => ({
      ID: item.id,
      Name: item.name,
      Purchase: `$${item.purchase}`,
      Date: item.date,
      Status: item.status,
    }));

    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Orders');

    ws.columns = [
      { header: 'ID', key: 'ID', width: 10 },
      { header: 'Name', key: 'Name', width: 20 },
      { header: 'Purchase', key: 'Purchase', width: 15 },
      { header: 'Date', key: 'Date', width: 15 },
      { header: 'Status', key: 'Status', width: 15 },
    ];

    ws.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5A94C8' },
      };
    });

    dataToExport.forEach((item) => {
      ws.addRow(item);
    });

    wb.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'AddNewRidersData.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const exportToPDF = () => {
    const doc = new JsPDF();
    const tableData = AddNewRidersData.map((item) => [item.id, item.name, `$${item.phone}`, item.assignedOrders, item.status]);
    const columns = ['ID', 'Name', 'Phone', 'Assigned Orders', 'Status'];

    doc.autoTable({
      head: [columns],
      body: tableData,
      theme: 'striped',
    });

    doc.save('AddNewRidersData.pdf');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelectCityChange = (selectedOption) => {
    setSelectValueCity(selectedOption);
    setFormData({ ...formData, city: selectedOption ? selectedOption.value : '' });
  };

  const handleSelectRiderChange = (selectedOption) => {
    setSelectRider(selectedOption);
    setFormData({ ...formData, riderType: selectedOption ? selectedOption.value : '' }); // Update rider type in form data
  };
  const handleSelectIdentityTypeChange = (selectedOption) => {
    setSelectIdentityType(selectedOption);
    setFormData({ ...formData, identityType: selectedOption ? selectedOption.value : '' }); // Update identity type in form data
  };

  const handleSelectVehicleChange = (selectedOption) => {
    setSelectVehicle(selectedOption);
    setFormData({ ...formData, vehicle: selectedOption ? selectedOption.value : '' }); // Update vehicle type in form data
  };
  const handleSelecZone = (selectedOption) => {
    setSelectVehicle(selectZone);
    setFormData({ ...formData, zone: selectedOption ? selectedOption.value : '' });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFormData({ ...formData, image: file });
  };

  const handleEmiratesIDFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedEmiratesIDFile(file);
    setFormData({ ...formData, emiratesID: file });
  };

  const handleLicenseFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedLicenseFile(file);
    setFormData({ ...formData, license: file });
  };
  const handlePassportFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedPassportFile(file);
    setFormData({ ...formData, passport: file });
  };

  const handleSelectChange = (itemToRemove) => {
    setSelectedItem(itemToRemove);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (selectedItem) {
      const indexToRemove = AddNewRidersData.findIndex((rider) => rider.id === selectedItem.id);
      if (indexToRemove !== -1) {
        AddNewRidersData.splice(indexToRemove, 1);

        setShowDeleteSuccessToast(true);
        setToast('Rider deleted successfully');
      }
      setFormData({
        id: null, // Reset the ID field to null to indicate we're in "add" mode
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        riderType: '',
        identityType: '',
        identityNumber: '',
        vehicle: '',
        vehicleNumber: '',
        emergencyContactNumber: '',
        image: defaultUser,
        zone: '',
      });

      setSelectedFile('');

      setSelectValueCity(null);
      setSelectRider(null);
      setSelectIdentityType(null);
      setSelectVehicle(null);
      setSelectZone(null);
      setSelectedItems([]);
      setButtonText('Add Rider');
    }
    setIsDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };
  const OwnerInfoImages = {
    border: '1px dashed #ced4da', // Adjust the border color and style as needed
    backgroundImage:
      'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0.5) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.5) 75%, rgba(255, 255, 255, 0.5))',
    backgroundSize: '10px 10px',
    height: '120px',
    width: '200px',
    borderRadius: '10px',
  };
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/">
          <CsLineIcons icon="chevron-left" size="13" />
          <span className="align-middle text-small ms-1">Home</span>
        </NavLink>
        <h1 className="mb-0 pb-0 display-4" id="title">
          {title}
        </h1>
      </div>
      {/* Title End */}

      <Row>
        <Col xs="12" className="col-lg order-1 order-lg-0">
          {/* Address Start */}
          <div className="icon-title" style={{ display: 'flex' }}>
            <CsLineIcons icon="user" size="16" />
            <h2 className="small-title" style={{ paddingLeft: '5px' }}>
              General Info
            </h2>
          </div>

          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="g-3">
                  <Col lg="4">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="firstName"
                      type="text"
                      className={`mb-3 ${!formData.firstName && !isValid ? 'is-invalid' : ''}`}
                      onChange={handleInputChange}
                      value={formData.firstName}
                    />
                    <Col lg="0">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        type="text"
                        className={`mb-3 ${!formData.email && !isValid ? 'is-invalid' : ''}`}
                        onChange={handleInputChange}
                        value={formData.email}
                      />
                      <Form.Label>Zone</Form.Label>
                      <Select
                        classNamePrefix="react-select"
                        className={`mb-3 ${!formData.zone && !isValid ? 'is-invalid' : ''}`}
                        options={optionsZones}
                        value={{ label: formData.zone, value: formData.zone }}
                        onChange={handleSelecZone}
                        placeholder=""
                      />
                    </Col>
                  </Col>
                  <Col lg="4">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastName"
                      type="text"
                      className={`mb-3 ${!formData.lastName && !isValid ? 'is-invalid' : ''}`}
                      onChange={handleInputChange}
                      value={formData.lastName}
                    />
                    <Col lg="0">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        name="phone"
                        type="text"
                        className={`mb-3 ${!formData.phone && !isValid ? 'is-invalid' : ''}`}
                        onChange={handleInputChange}
                        value={formData.phone}
                      />

                      <Form.Label>City</Form.Label>
                      <Select
                        classNamePrefix="react-select"
                        className={`mb-3 ${!formData.city && !isValid ? 'is-invalid' : ''}`}
                        options={optionsCity}
                        value={{ label: formData.city, value: formData.city }}
                        onChange={handleSelectCityChange}
                        placeholder=""
                      />
                    </Col>
                  </Col>
                  <Col lg={4}>
                    <div className="container text-center mt-0">
                      <div className="mb-0">
                        <text>Rider Image</text>

                        {selectedFile ? (
                          <div className="container text-center mt-5">
                            <div className="mb-2">
                              <div>
                                <img
                                  src={formData.image ? URL.createObjectURL(formData.image) : defaultUser}
                                  alt="Image"
                                  className="rounded-circle img-fluid"
                                  style={imageStyle}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="container text-center mt-5">
                            <div className="mb-2">
                              <div>
                                <img src={defaultUser} alt="Image" className="rounded-circle img-fluid" style={imageStyle} />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="d-flex justify-content-center align-items-center flex-column mt-5">
                          <Form.Control type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="image-upload-input" />
                          <Button variant="outline-primary" onClick={() => document.getElementById('image-upload-input').click()}>
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg="4">
                    <Form.Label> Rider Type</Form.Label>
                    <Select
                      classNamePrefix="react-select"
                      className={`mb-3 ${!formData.riderType && !isValid ? 'is-invalid' : ''}`}
                      options={optionsRiders}
                      value={{ label: formData.riderType, value: formData.riderType }}
                      onChange={handleSelectRiderChange}
                      placeholder=""
                    />
                  </Col>
                  <Col lg="4">
                    <Form.Label> Identity Type</Form.Label>
                    <Select
                      classNamePrefix="react-select"
                      className={`mb-3 ${!formData.identityType && !isValid ? 'is-invalid' : ''}`}
                      options={optionsIdentityType}
                      value={{ label: formData.identityType, value: formData.identityType }}
                      onChange={handleSelectIdentityTypeChange}
                      placeholder=""
                    />
                  </Col>

                  <Col lg="4">
                    <Form.Label>Identity Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="identityNumber"
                      className={`${!formData.identityNumber && !isValid ? 'is-invalid' : ''}`}
                      onChange={handleInputChange}
                      value={formData.identityNumber}
                    />
                  </Col>

                  <Col lg="4">
                    <Form.Label> Vehicle</Form.Label>
                    <Select
                      classNamePrefix="react-select"
                      className={`mb-3 ${!formData.vehicle && !isValid ? 'is-invalid' : ''}`}
                      options={optionsVehicle}
                      value={{ label: formData.vehicle, value: formData.vehicle }}
                      onChange={handleSelectVehicleChange}
                      placeholder=""
                    />
                  </Col>

                  <Col lg="4">
                    <Form.Label>Vehicle Number</Form.Label>
                    <Form.Control
                      type="text"
                      className={`mb-3 ${!formData.vehicleNumber && !isValid ? 'is-invalid' : ''}`}
                      name="vehicleNumber"
                      onChange={handleInputChange}
                      value={formData.vehicleNumber}
                    />
                  </Col>

                  <Col lg="4">
                    <Form.Label>Emergency Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      className={`mb-3 ${!formData.emergencyContactNumber && !isValid ? 'is-invalid' : ''}`}
                      name="emergencyContactNumber"
                      onChange={handleInputChange}
                      value={formData.emergencyContactNumber}
                    />
                  </Col>

                  {/*  */}

                  <Col lg="4">
                    <Form.Label>Emirates ID</Form.Label>
                    <div>
                      <label htmlFor="emiratesIdInput">
                        <div style={OwnerInfoImages}>
                          {selectedEmiratesIDFile ? (
                            <img src={URL.createObjectURL(selectedEmiratesIDFile)} alt="Selected" style={{ width: '100%', height: '100%' }} />
                          ) : (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                color: '#ced4da',
                              }}
                            >
                              <div>{/* Icon or text for upload */}</div>
                              <div style={{ textAlign: 'center' }}>Upload Image</div>
                            </div>
                          )}
                        </div>
                      </label>
                      <input
                        type="file"
                        id="emiratesIdInput"
                        accept="image/*"
                        className="form-control-file"
                        style={{ display: 'none' }}
                        onChange={handleEmiratesIDFileChange}
                      />
                    </div>
                  </Col>

                  <Col lg="4">
                    <Form.Label>Driving License</Form.Label>
                    <div>
                      <label htmlFor="drivingLicense">
                        <div style={OwnerInfoImages}>
                          {selectedLicenseFile ? (
                                                      <img src={URL.createObjectURL(selectedLicenseFile)} alt="Selected" style={{ width: '100%', height: '100%' }} />

                          ) : (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                color: '#ced4da',
                              }}
                            >
                              <div>{/* Icon or text for upload */}</div>
                              <div style={{ textAlign: 'center' }}>Upload Image</div>
                            </div>
                          )}
                        </div>
                      </label>
                      <input
                        type="file"
                        id="drivingLicense"
                        accept="image/*"
                        className="form-control-file"
                        style={{ display: 'none' }}
                        onChange={handleLicenseFileChange}
                      />
                    </div>
                  </Col>

                  <Col lg="4">
                    <Form.Label>Passport</Form.Label>
                    <div>
                      <label htmlFor="passport">
                        <div style={OwnerInfoImages}>
                          {selectedPassportFile ? (
                                                      <img src={URL.createObjectURL(selectedPassportFile)} alt="Selected" style={{ width: '100%', height: '100%' }} />

                          ) : (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                color: '#ced4da',
                              }}
                            >
                              <div>{/* Icon or text for upload */}</div>
                              <div style={{ textAlign: 'center' }}>Upload Image</div>
                            </div>
                          )}
                        </div>
                      </label>
                      <input
                        type="file"
                        id="passport"
                        accept="image/*"
                        className="form-control-file"
                        style={{ display: 'none' }}
                        onChange={handlePassportFileChange}
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <div className="container d-flex justify-content-end">
          <button onClick={handleAddResetClick} type="button" className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold ">
            Reset
          </button>

          <button
            onClick={handleAddRiderClick}
            style={{ marginLeft: '15px', backgroundColor: '#5A94C8' }}
            type="button"
            className="btn btn-icon btn-icon-start btn-primary font-weight-bold"
          >
            {buttonText}
          </button>
        </div>
        <div style={{ height: '45px' }} />
      </Row>
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
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <p style={{ textAlign: 'center', fontSize: '18px' }}>No riders available!</p>
        </div>
      )}
      {/* List Header Start */}
      {displayedData.length > 0 && (
        <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
          <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
            <div className="text-muted text-small cursor-pointer sort">Id</div>
          </Col>
          <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
            <div className="text-muted text-small cursor-pointer sort">Name</div>
          </Col>
          <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
            <div className="text-muted text-small cursor-pointer sort">Phone</div>
          </Col>
          <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
            <div className="text-muted text-small cursor-pointer sort">Email</div>
          </Col>
          <Col xs="1" md="1" className="d-flex flex-column justify-content-center">
            <div className="text-muted text-small cursor-pointer sort">City</div>
          </Col>
          <Col xs="1" md="1" className="d-flex flex-column justify-content-center">
            <div className="text-muted text-small cursor-pointer sort">Rider Type</div>
          </Col>

          <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end">
            <div className="text-muted text-small cursor-pointer sort">Vehicle Number</div>
          </Col>
        </Row>
      )}
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
                    <img style={smallImageStyle} src={item.image} alt={item.name} />
                  </div>
                  <div className="text-alternate ms-2">
                    {item.firstName} {item.lastName}
                  </div>
                </div>
              </Col>

              <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
                <div className="text-muted text-small d-md-none">Purchase</div>
                <div className="text-alternate">
                  <span>{item.phone}</span>
                </div>
              </Col>

              <Col xs="2" md="2" className="d-flex flex-column justify-content-center">
                <div className="text-muted text-small d-md-none">Email</div>
                <div className="text-alternate">{item.email}</div>
              </Col>

              <Col xs="1" md="1" className="d-flex flex-column justify-content-center">
                {/* New Column 1 */}
                <div className="text-muted text-small d-md-none">City</div>
                <div className="text-alternate">{item.location}</div>
              </Col>

              <Col xs="1" md="1" className="d-flex flex-column justify-content-center">
                {/* New Column 1 */}
                <div className="text-muted text-small d-md-none">City</div>
                <div className="text-alternate">{item.riderType}</div>
              </Col>

              <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end">
                <div className="text-muted text-small d-md-none">Vehicle Number</div>
                <div>
                  <div className="text-alternate">{item.vehicleNumber}</div>
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

          <Snackbar open={openToast} autoHideDuration={3000} onClose={() => setOpenToast(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
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

export default AddNewRider;
