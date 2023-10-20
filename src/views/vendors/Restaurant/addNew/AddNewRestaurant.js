import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { Row, Col, Button, Dropdown, Form, Card, Pagination, Tooltip, OverlayTrigger, Badge, Modal } from 'react-bootstrap';
import { utils, write } from 'xlsx';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Select from 'react-select';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const AddCuisineOption = { value: 'AddCategory', label: 'Add Category' };

const initialOptionsCity = [
  { value: 'Italian', label: 'Italian' },
  { value: 'French', label: 'French' },
  { value: 'Mexican', label: 'Mexican' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'American', label: 'American' },
];
const initialCity = [
  { value: 'Bur Dubai', label: 'Bur Dubai' },
  { value: 'Deira', label: 'Deira' },
  { value: 'Jumeirah', label: 'Jumeirah' },
  { value: 'Downtown', label: 'Downtown' },
  { value: 'Jumeirah', label: 'Jumeirah' },
];

const AddNewRestaurant = ({ google }) => {
  const title = 'Add New Restaurant';
  const description = 'Ecommerce Customer List Page';
  const [showModal, setShowModal] = useState(false);
  const [optionsCity, setOptionsCity] = useState(initialOptionsCity);
  const [city, setCity] = useState(initialCity);
  const [selectValueCity, setSelectValueCity] = useState('');
  const [selectCityMap, setSelectCityMap] = useState('');
  const [selectZoneMap, setSelectZoneMap] = useState();
  const [newCuisineName, setNewCuisineName] = useState('');
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [selectedItem, setSelectedItem] = useState('');
  const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false);
  const [showAddedCuisine, setShowAddedCuisine] = useState(false);
  const [showErrorFieldsToast, setShowErrorFieldsToast] = useState(false)
  const [toast, setToast] = useState('');
  const [selectedCuisineIndex, setSelectedCuisineIndex] = useState('');
  const [selectedEmiratesID, setSelectedEmiratesID] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedCoverImage, setSelectedCoverImage] = useState('');
  const [selectedLicensedImage, setSelectedLicensedImage] = useState('');
  const [cuisineList, setCuisineList] = useState([]);
  const [selectedPassport, setSelectedPassport] = useState('');
  const [formData, setFormData] = useState({
    restaurantName: '',
    restaurantAddress: '',
    phone: '',
    email: '',
    vatTax: '',
    estimatedDeliveryTime: '',
    openTime: '',
    closeTime: '',

    name: '',
    price: '',
    description: '',
    category: 'null',

    city: '',
    zone: '',
    latitude: '',
    longitude: '',

    firstName: '',
    lastName: '',
    ownerPhone: '',
    
  });
  function handleAddRestaurantClick() {
    if (
      formData.restaurantName === '' ||
      formData.restaurantAddress === '' ||
      formData.phone === '' ||
      formData.email === '' ||
      formData.vatTax === '' ||
      formData.estimatedDeliveryTime === '' ||
      formData.openTime === '' ||
      formData.closeTime === '' ||
      !selectedEmiratesID ||
      !selectedLicensedImage ||
      !selectedPassport ||
      !selectedImage ||
      !selectedCoverImage
    ) {
      // At least one field is empty, you can display an error message or take other actions.
      setIsValid(false); // Form is invalid
      setToast('Please fill in all the required fields.');
      setShowErrorFieldsToast(true);
    } else if (cuisineList.length === 0) {
      // If there are no cuisines added, do not succeed
      setIsValid(false); // Form is invalid
      setToast('Cannot add restaurant without at least one cuisine');
      setShowErrorFieldsToast(true);
    } else {
      // All fields are filled, and there's at least one cuisine, so you can proceed.
      setIsValid(true); // Form is valid
  
      console.log('Form Data:', { ...formData, selectedEmiratesID, selectedLicensedImage, selectedPassport, selectedImage, selectedCoverImage, cuisineList });
  
      setToast('Restaurant added successfully');
      setShowAddedCuisine(true);

      setFormData({
        restaurantName: '',
        restaurantAddress: '',
        phone: '',
        email: '',
        vatTax: '',
        estimatedDeliveryTime: '',
        openTime: '',
        closeTime: '',
    
        name: '',
        price: '',
        description: '',
        category: '',
    
        city: '',
        zone: '',
        latitude: '',
        longitude: '',
    
        firstName: '',
        lastName: '',
        ownerPhone: '',
      });
      setSelectValueCity('');
      setSelectedEmiratesID('');
      setSelectedImage('');
      setSelectedImage('');
      setSelectedCoverImage('');
      setSelectedLicensedImage('');
      setSelectedPassport('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  
  const [buttonText, setButtonText] = useState('Add Cuisine');


  const coverImageStyle = {
    border: '1px dashed #ced4da',
    backgroundImage:
      'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0.5) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.5) 75%, rgba(255, 255, 255, 0.5))',
    backgroundSize: '10px 10px',
    height: '120px',
    width: '200px',
    borderRadius: '10px',
  };
  const logoStyle = {
    border: '1px dashed #ced4da', // Adjust the border color and style as needed
    backgroundImage:
      'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0.5) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.5) 75%, rgba(255, 255, 255, 0.5))',
    backgroundSize: '10px 10px',
    width: '120px',
    height: '120px',
    borderRadius: '10px',
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


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [selectZone, setSelectZone] = useState();
  const optionsZone = [
    { value: 'North', label: 'North' },
    { value: 'South', label: 'South' },
    { value: 'East', label: 'East' },
    { value: 'West', label: 'West' },
    { value: 'Central', label: 'Central' },
    { value: 'Downtown', label: 'Downtown' },
  ];

  const [cityMap, setCityMap] = useState();
  const optionsCityMap = [
    { value: 'Bur Dubai', label: 'Bur Dubai' },
    { value: 'Deira', label: 'Deira' },
    { value: 'Marina', label: 'Marina' },
    { value: 'Jumeirah', label: 'Jumeirah' },
    { value: 'Downtown', label: 'Downtown' },
    { value: 'Jumeirah', label: 'Jumeirah' },
  ];

  const [selectedFile, setSelectedFile] = useState('');
  const [license, setLicense] = useState('');
  const [emiratesID, setEmiratesID] = useState('');
  const [passport, setPassport] = useState('');

  const handleLicenseUpload = (e) => {
    const file = e.target.files[0];
    setSelectedLicensedImage(file);
  };

  const handleEmiratesIdUpload = (e) => {
    const file = e.target.files[0];
    setSelectedEmiratesID(file);
  };

  const handlePassportUpload = (e) => {
    const file = e.target.files[0];
    setSelectedPassport(file);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateIsFormEmpty = () => {
    const isEmpty = Object.values(formData).every((value) => value === '');
    setIsFormEmpty(isEmpty);
  };
  const handleSelectChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'select-option' && newValue.value === 'AddCategory') {
      setShowModal(true);
    } else {
      setSelectValueCity(newValue);
    }
    updateIsFormEmpty();
  };

  const handleAddCategory = () => {
    const newOption = { value: newCuisineName, label: newCuisineName };
    setOptionsCity([...optionsCity, newOption]);
    setSelectValueCity(newOption);
    setShowModal(false);
    setNewCuisineName('');
  };
  const handleAddCuisine = () => {
    console.log(selectValueCity);

    // Create an object to store the values
    const cuisineObject = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      category: formData.category,
      selectedDropdownValue: selectValueCity.label,
    };

    // Check if the cuisine already exists in the list
    const existingIndex = cuisineList.findIndex((cuisine) => cuisine.name === formData.name);

    if (existingIndex !== -1) {
      // If the cuisine already exists, update it
      const updatedList = [...cuisineList];
      updatedList[existingIndex] = cuisineObject;
      setCuisineList(updatedList);
      setToast('Cuisine updated successfully'); // Update toast message for update action
      setButtonText('Add Cuisine');
    } else {
      // If the cuisine doesn't exist, add it to the list
      setCuisineList([...cuisineList, cuisineObject]);
      setToast('Cuisine added successfully'); // Update toast message for add action
    }

    // Reset the form data for the next entry
    setFormData({
      name: '',
      price: '',
      description: '',
      category: null,
    });
    setSelectValueCity(null);
    setIsFormEmpty(true);

    setShowAddedCuisine(true); // Show the Snackbar
  };

  const handleDeleteCuisine = (indexToDelete) => {
    setSelectedCuisineIndex(indexToDelete);

    setIsDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCuisineIndex(null);
  };

  const handleDeleteConfirmed = () => {
    if (selectedCuisineIndex !== null) {
      const updatedCuisineList = cuisineList.filter((_, index) => index !== selectedCuisineIndex);

      setCuisineList(updatedCuisineList);

      setToast('Cuisine removed');
      setShowDeleteSuccessToast(true); // Show the Snackbar
      setButtonText('Add Cuisine');


    // Reset the form data for the next entry
    setFormData({
      name: '',
      price: '',
      description: '',
      category: null,
    });
    setSelectValueCity(null);
    setIsFormEmpty(true);
    }

    setIsDeleteDialogOpen(false);
    setSelectedCuisineIndex(null);
  };

  const checkItem = (cuisine) => {
    setSelectedItems([cuisine.name]);

    console.log('Selected Item:', cuisine);
    console.log('Selected Dropdown Value:', cuisine.selectedDropdownValue);
    setSelectValueCity({ label: cuisine.selectedDropdownValue, value: cuisine.selectedDropdownValue });
    if (selectedItem === cuisine) {
      setSelectedItem(null);
      setButtonText('Add Cuisine'); // Set button text to "Add Cuisine" when an item is deselected
    } else {
      // Otherwise, set the clicked item as the selected one.
      setSelectedItem(cuisine);
      setButtonText('Update Cuisine'); // Set button text to "Update Cuisine" when an item is selected
    }

    setFormData({
      name: cuisine.name,
      price: cuisine.price,
      description: cuisine.description,
      category: cuisine.selectedDropdownValue,
    });
    setIsFormEmpty(false);
  };

  const handleSelectCityChange = (selectedOption) => {
    setSelectCityMap(selectedOption);
    setFormData({ ...formData, city: selectedOption ? selectedOption.value : '' }); // Update rider type in form data
  };

  const handleSelectZoneChange = (selectedOption) => {
    setSelectZoneMap(selectedOption);
    setFormData({ ...formData, zone: selectedOption ? selectedOption.value : '' }); // Update rider type in form data
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

      <Row className="row-cols-1 row-cols-md-2 g-2">
        <Col>
          <h2 className="small-title">Details</h2>
          <Card className=" h-100">
            <Card.Body>
              <Form className="mb-n3">
                <div className="mb-3">
                  <Form.Label>Restaurant Name</Form.Label>
                  <Form.Control
                    name="restaurantName"
                    type="text"
                    className={`mb-3 ${!formData.restaurantName && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                    value={formData.restaurantName}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Restaurant Address</Form.Label>
                  <Form.Control
                    name="restaurantAddress"
                    type="text"
                    className={`mb-3 ${!formData.restaurantAddress && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                    value={formData.restaurantAddress}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    type="text"
                    className={`mb-3 ${!formData.phone && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                    value={formData.phone}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="text"
                    className={`mb-3 ${!formData.email && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                    value={formData.email}
                  />
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h2 className="small-title">Restaurant Logo & Covers</h2>
          <Card className=" h-100">
            <Card.Body>
              <Row>
                <Col className="col-auto mb-3 mb-sm-0 me-auto">
                  <Form.Label>Logo</Form.Label>
                  <div>
                    <label htmlFor="imageInput">
                      <div  style={{
                          ...logoStyle,
                          borderColor: !selectedImage && !isValid ? '#dc3545' : logoStyle.border,
                        }}>
                        {selectedImage ? (
                          <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%' }} />
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
                            <CsLineIcons icon="cloud-upload" size={30} />
                            <div style={{ textAlign: 'center' }}>Upload Image</div>
                          </div>
                        )}
                      </div>
                    </label>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      className="form-control-file"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                  </div>
                </Col>
                <Col>
                  <Form.Label>Cover Image</Form.Label>
                  <div>
                    <label htmlFor="coverImageInput">
                      <div   style={{
                          ...OwnerInfoImages,
                          borderColor: !selectedCoverImage && !isValid ? '#dc3545' : coverImageStyle.border,
                        }}>
                        {selectedCoverImage ? (
                          <img src={selectedCoverImage} alt="Selected Cover" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                        ) : (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column', // Display children in a column
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              height: '100%',
                              color: '#ced4da',
                            }}
                          >
                            <CsLineIcons icon="cloud-upload" size={30} />
                            <div style={{ textAlign: 'center' }}>Upload Cover Image</div>
                          </div>
                        )}
                      </div>
                    </label>
                    <input
                      type="file"
                      id="coverImageInput"
                      accept="image/*"
                      className="form-control-file"
                      style={{ display: 'none' }}
                      onChange={handleCoverImageChange}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div style={{ paddingTop: '60px' }}>
        <h2 className="small-title">Restaurant Info</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form>
              <Row className="g-3">
                <Col lg="6">
                  <Form.Label>Vat/Tax (%)</Form.Label>
                  <Form.Control
                    type="text"
                    name="vatTax"
                    value={formData.vatTax}
                    className={`mb-3 ${!formData.vatTax && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>Estimated Delivery Time ( Min & Maximum Time)</Form.Label>
                  <Form.Control
                    type="text"
                    name="estimatedDeliveryTime"
                    value={formData.estimatedDeliveryTime}
                    className={`mb-3 ${!formData.estimatedDeliveryTime && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col lg="6">
                  <Form.Label>Open Time</Form.Label>
                  <Form.Control
                    type="text"
                    name="openTime"
                    value={formData.openTime}
                    className={`mb-3 ${!formData.openTime && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>Close Time</Form.Label>
                  <Form.Control
                    type="text"
                    name="closeTime"
                    value={formData.closeTime}
                    className={`mb-3 ${!formData.closeTime && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>

      <div style={{ paddingTop: '60px' }}>
        <h2 className="small-title">Cuisine</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form className="mb-5">
              <Row className="g-4">
                <Col lg="2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    // className={`mb-3 ${!formData.name && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col lg="2">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    // className={`mb-3 ${!formData.price && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col lg="3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={formData.description}
                    // className={`mb-3 ${!formData.description && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col lg={2}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Select
                      classNamePrefix="react-select"
                      options={[...optionsCity, AddCuisineOption]}
                      value={selectValueCity}
                      onChange={handleSelectChange}
                      placeholder=""
                    />
                  </Form.Group>

                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add New Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Control
                        type="text"
                        placeholder="Enter the new category name"
                        value={newCuisineName}
                        onChange={(e) => setNewCuisineName(e.target.value)}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={handleAddCategory}>
                        Add
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>

                <Col lg="2">
                  <Form.Label>&nbsp;</Form.Label>
                  <br />
                  <button
                    type="button"
                    className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold "
                    onClick={handleAddCuisine}
                    disabled={isFormEmpty || formData.name === '' || formData.price === '' || formData.description === ''}
                  >
                    {buttonText}
                  </button>
                </Col>
              </Row>
            </Form>

            <div>
              {cuisineList.map((cuisine, index) => (
                <Card key={index} className={`mb-2 ${cuisine === selectedItem ? 'selected' : ''}`}>
                  <Card.Body style={{ borderRadius: '10px' }} className="p-3">
                    <Row className="g-1" onClick={() => checkItem(cuisine)}>
                      <Col lg="2">
                        <div className="text-muted text-small d-lg-none">Name</div>
                        <div className="text-alternate">{cuisine.name}</div>
                      </Col>
                      <Col lg="2">
                        <div className="text-muted text-small d-lg-none">Price</div>
                        <div className="text-alternate">{cuisine.price}</div>
                      </Col>
                      <Col lg="3">
                        <div className="text-muted text-small d-lg-none">Description</div>
                        <div className="text-alternate">{cuisine.description}</div>
                      </Col>
                      <Col lg={2}>
                        <Col className="d-flex flex-column justify-content-center  order-lg-2">
                          <div className="text-muted text-small d-lg-none">Category</div>
                          <div className="text-alternate">&nbsp;&nbsp;&nbsp;&nbsp;{cuisine.selectedDropdownValue}</div>
                        </Col>
                      </Col>
                      <Col lg={3}>
                        <Col className="d-flex flex-column justify-content-center mb-lg-0 align-items-md-end">
                          <div className="text-muted text-small d-md-none">Select</div>
                          <div onClick={() => handleDeleteCuisine(index)}>
                            <CsLineIcons
                              // Pass the index to identify the object

                              icon="bin"
                              className="text-danger cursor-pointer"
                              style={{ fontSize: '14px' }}
                            />
                          </div>
                        </Col>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      <h2 className="small-title">Location</h2>

      <Card style={{ borderRadius: '15px', height: '450px' }}>
        <Card.Body style={{ padding: 0 }}>
          <Row className="g-3">
            {/* Search Input on the Right */}

            <Col lg="6" className="p-5">
              <Form>
                <Form.Group controlId="textInput1">
                  <Form.Label>City</Form.Label>
                  {/* <Select classNamePrefix="react-select" options={optionsCityMap} value={selectCityMap} onChange={setSelectCityMap} placeholder="" /> */}
                  <Select
                    classNamePrefix="react-select"
                    className={`mb-3 ${!formData.city && !isValid ? 'is-invalid' : ''}`}
                    options={optionsCityMap}
                    value={{ label: formData.city, value: formData.city }}
                    onChange={handleSelectCityChange}
                    placeholder=""
                  />
                </Form.Group>
                <text>&nbsp; &nbsp;</text>
                <Form.Group controlId="textInput1">
                  <Form.Label>Zone</Form.Label>
                  {/* <Select classNamePrefix="react-select" options={optionsZone} value={selectZone} onChange={setSelectZone} placeholder="" /> */}
                  <Select
                    classNamePrefix="react-select"
                    className={`mb-3 ${!formData.zone && !isValid ? 'is-invalid' : ''}`}
                    options={optionsZone}
                    value={{ label: formData.zone, value: formData.zone }}
                    onChange={handleSelectZoneChange}
                    placeholder=""
                  />
                </Form.Group>

                {/* Add more text inputs here */}
                <text>&nbsp; &nbsp;</text>
                <Form.Group controlId="textInput1">
                  <Form.Label>Latitude </Form.Label>
                  <Form.Control
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    className={`mb-3 ${!formData.latitude && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <text>&nbsp; &nbsp;</text>
                <Form.Group controlId="textInput2">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    className={`mb-3 ${!formData.longitude && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  <text>&nbsp; &nbsp;</text>
                </Form.Group>
                {/* Add more text inputs as needed */}
              </Form>
            </Col>

            {/* Smaller Map on the Left */}
            <Col lg="6" className="p-0">
              <div style={{ width: '10px', borderRadius: '15px', border: '1px solid #ccc' }}>
                <Map
                  google={google}
                  initialCenter={{ lat: 25.1838, lng: 55.36587 }}
                  zoom={14}
                  className="w-50 rounded"
                  style={{ height: '100%', borderRadius: '15px', borderBottomLeftRadius: '0px', borderTopLeftRadius: '0px' }}
                >
                  <Marker position={{ lat: 25.1838, lng: 55.36587 }} />
                </Map>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/* Pagination End */}

      <div style={{ paddingTop: '40px' }}>
        <h2 className="small-title">Owner Info</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form>
              <Row className="g-4">
                <Col lg="4">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    className={`mb-3 ${!formData.firstName && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col lg="4">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    className={`mb-3 ${!formData.lastName && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col lg="4">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    className={`mb-3 ${!formData.ownerPhone && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col lg="4">
                  <Form.Label>license</Form.Label>
                  <div>
                    <label htmlFor="imageInput">
                      <div
                      style={{
                        ...OwnerInfoImages,
                        borderColor: !selectedLicensedImage && !isValid ? '#dc3545' : OwnerInfoImages.border,
                      }}>
                        <label htmlFor="licenseInput">
                          <div style={OwnerInfoImages}>
                            {selectedLicensedImage ? (
                              <img src={URL.createObjectURL(selectedLicensedImage)} alt="Selected" style={{ width: '100%', height: '100%' }} />
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
                          id="licenseInput"
                          accept="image/*"
                          className="form-control-file"
                          style={{ display: 'none' }}
                          onChange={handleLicenseUpload}
                        />
                      </div>
                    </label>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      className="form-control-file"
                      style={{ display: 'none' }}
                      onChange={handleLicenseUpload}
                    />
                  </div>
                </Col>

                <Col lg="4">
                  <Form.Label>Emirates ID</Form.Label>
                  <div>
                    <label htmlFor="emiratesIdInput">
                      <div
                        style={{
                          ...OwnerInfoImages,
                          borderColor: !selectedEmiratesID && !isValid ? '#dc3545' : OwnerInfoImages.border,
                        }}
                      >
                        {selectedEmiratesID ? (
                          <img src={URL.createObjectURL(selectedEmiratesID)} alt="Selected" style={{ width: '100%', height: '100%' }} />
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
                      onChange={handleEmiratesIdUpload}
                    />
                  </div>
                </Col>

                <Col lg="4">
                  <Form.Label>Passport</Form.Label>
                  <div>
                    <label htmlFor="passportInput">
                      <div     style={{
                          ...OwnerInfoImages,
                          borderColor: !selectedPassport && !isValid ? '#dc3545' : OwnerInfoImages.border,
                        }}>
                        {selectedPassport ? (
                          <img src={URL.createObjectURL(selectedPassport)} alt="Selected" style={{ width: '100%', height: '100%' }} />
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
                      id="passportInput"
                      accept="image/*"
                      className="form-control-file"
                      style={{ display: 'none' }}
                      onChange={handlePassportUpload}
                    />
                  </div>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className=" d-flex justify-content-end">
        <button type="button" className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold ">
          Reset
        </button>

        <button
          style={{ marginLeft: '15px', backgroundColor: '#5A94C8', fontWeight: 'bold' }}
          type="button"
          className="btn btn-icon btn-icon-start btn-primary"
          onClick={handleAddRestaurantClick}
        >
          Add Restaurant
        </button>
      </div>
      <Snackbar
        open={showDeleteSuccessToast}
        autoHideDuration={3000}
        onClose={() => setShowDeleteSuccessToast(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'top' }}
      >
        <Alert variant="filled" severity="error" onClose={() => setShowDeleteSuccessToast(false)}>
          {' '}
          {/* Use "error" for danger color */}
          {toast}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showAddedCuisine}
        autoHideDuration={3000}
        onClose={() => setShowAddedCuisine(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'top' }}
      >
        <Alert variant="filled" severity="success" onClose={() => setShowAddedCuisine(false)}>
          {' '}
          {/* Use "error" for danger color */}
          {toast}
        </Alert>
      </Snackbar>


      <Snackbar
        open={showErrorFieldsToast}
        autoHideDuration={3000}
        onClose={() => setShowAddedCuisine(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'top' }}
      >
        <Alert variant="filled" severity="error" onClose={() => setShowErrorFieldsToast(false)}>
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

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDrI53GlC5-ymZmPKzJq11U36dheMGfeLU',
})(AddNewRestaurant);
