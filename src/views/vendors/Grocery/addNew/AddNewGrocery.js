import React, { useState,useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import GroceryDetails from '../detail/GroceryDetails';

const AddItemOption = { value: 'AddCategory', label: 'Add Category' };

const initialOptionsCity = [
  { value: 'Fresh Produce', label: 'Fresh Produce' },
  { value: 'Bakery', label: 'Bakery' },
  { value: 'Dairy', label: 'Dairy' },
  { value: 'Beverages', label: 'Beverages' },
  { value: 'Snacks', label: 'Snacks' },
];
const initialCity = [
  { value: 'Bur Dubai', label: 'Bur Dubai' },
  { value: 'Deira', label: 'Deira' },
  { value: 'Jumeirah', label: 'Jumeirah' },
  { value: 'Downtown', label: 'Downtown' },
  { value: 'Jumeirah', label: 'Jumeirah' },
];
const AddNewGrocery = ({ google }) => {
  const title = 'Add New Grocery';
  const description = 'Ecommerce Customer List Page';
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [optionsCity, setOptionsCity] = useState(initialOptionsCity);
  const [city, setCity] = useState(initialCity);
  const [selectValueCity, setSelectValueCity] = useState('');
  const [selectCityMap, setSelectCityMap] = useState('');
  const [selectZoneMap, setSelectZoneMap] = useState();
  const [newItemName, setNewItemName] = useState('');
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [selectedItem, setSelectedItem] = useState('');
  const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false);
  const [showAddedItem, setShowAddedItem] = useState(false);
  const [showErrorFieldsToast, setShowErrorFieldsToast] = useState(false);
 
  const [selectedItemIndex, setSelectedItemIndex] = useState('');
  const [selectedEmiratesID, setSelectedEmiratesID] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedItemImage, setSelectedItemImage] = useState('');
  const [selectedCoverImage, setSelectedCoverImage] = useState('');
  const [selectedLicensedImage, setSelectedLicensedImage] = useState('');
  const [ItemList, setItemList] = useState([]);
  const [selectedPassport, setSelectedPassport] = useState('');
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [savedDataArray, setSavedDataArray] = useState([]);
  const uniqueIdCounter = useRef(0);

  const [formData, setFormData] = useState({
    GroceryName: '',
    GroceryAddress: '',
    phone: '',
    email: '',
    vatTax: '',
    estimatedDeliveryTime: '',
    openTime: '',
    closeTime: '',
    minimumOrderAmount: '',
    // name: '',
    // price: '',
    // description: '',
    category: 'null',

    city: '',
    zone: '',
    latitude: '',
    longitude: '',

    firstName: '',
    lastName: '',
    ownerPhone: '',


    bankName: '',
    accountNumber: '',
    IBAN: '',
    accountName: '',

    // discount: '',
  });

  const [buttonText, setButtonText] = useState('Add Item');

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
    border: '1px dashed #ced4da',
    backgroundImage:
      'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0.5) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.5) 75%, rgba(255, 255, 255, 0.5))',
    backgroundSize: '10px 10px',
    width: '120px',
    height: '120px',
    borderRadius: '10px',
  };
  const OwnerInfoImages = {
    border: '1px dashed #ced4da',
    backgroundImage:
      'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.5) 25%, rgba(255, 255, 255, 0.5) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.5) 75%, rgba(255, 255, 255, 0.5))',
    backgroundSize: '10px 10px',
    height: '120px',
    width: '200px',
    borderRadius: '10px',
  };

  function handleSuccess() {
    setIsValid(false);

    const dataArray = [formData, selectedEmiratesID, selectedLicensedImage, selectedPassport, selectedImage, selectedCoverImage];

    setSavedDataArray((prevDataArray) => [...prevDataArray, ...dataArray]);

    console.log('Form Data Array:', dataArray);
  }

  function handleAddGrocery() {
    const isEmptyField = Object.values(formData).some((value) => value === '');

    const isEmptyImage = !selectedEmiratesID || !selectedLicensedImage || !selectedPassport || !selectedImage || !selectedCoverImage

    if (isEmptyField || isEmptyImage) {
  

      toast.error('Please fill in all the required fields.', {
        position: 'top-right', // You can change the position
        autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
      });
      // setShowErrorFieldsToast(true);
      return;
    }

    handleSuccess();
  }

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
  const handleImageItem = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedItemImage(reader.result);
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
    const newOption = { value: newItemName, label: newItemName };
    setOptionsCity([...optionsCity, newOption]);
    setSelectValueCity(newOption);
    setShowModal(false);
    setNewItemName('');
  };
  const handleAddItem = () => {
    console.log(selectValueCity);
    console.log(selectedItemImage);
    // Create an object to store the values
    const newId = uniqueIdCounter.current + 1;
    uniqueIdCounter.current = newId;
    
    const ItemObject = {
        id: newId,
      name: formData.name,
      price: formData.price,
      description: formData.description,

      selectedDropdownValue: selectValueCity.label,
      discount: formData.discount,
      selectedItemImage, // Add the selectedItemImage to the object
    };
    console.log(ItemObject);

    setSavedDataArray((prevDataArray) => [...prevDataArray, ItemObject]);

    // Check if the Item already exists in the list
    const existingIndex = ItemList.findIndex((item) => item.name === formData.name);

    if (existingIndex !== -1) {
      // If the Item already exists, update it
      const updatedList = [...ItemList];
      updatedList[existingIndex] = ItemObject;
      setItemList(updatedList);


      toast.success('Item updated successfully', {
        position: 'top-right', // You can change the position
        autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
      });
      setButtonText('Add Item');
    } else {
      setItemList([...ItemList, ItemObject]);
  

      toast.success('Item added', {
        position: 'top-right', // You can change the position
        autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
      });
    }

    setFormData({
      name: '',
      price: '',
      description: '',
      category: null,
      discount: '',
    });
    setSelectValueCity(null);
    setIsFormEmpty(true);
    setSelectedItemImage(null);
    // setShowAddedItem(true);
  };

  const handleDeleteItem = (indexToDelete) => {
    setIsDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setSelectedItemIndex(null);
  };

  const handleDeleteConfirmed = (indexToDelete) => {
    setSelectedItemIndex(indexToDelete);
    const updatedList = [...ItemList];

    // Remove the item at the specified index
    updatedList.splice(indexToDelete, 1);

    // Update the state with the modified list
    setItemList(updatedList);
    toast.success('Item removed', {
      position: 'top-right', // You can change the position
      autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
    });

    
    setIsDeleteDialogOpen(false);
    setSelectedItemIndex(null);
    setSelectedItemImage('');

    setFormData({
      name: '',
      price: '',
      description: '',
      category: null,
      discount: '',
    });
    setSelectValueCity(null);
    setIsFormEmpty(true);
    setSelectedItemImage(null);
    // setShowAddedItem(true);
  };

  const checkItem = (Item) => {
    setSelectedItems([Item.id]);

    console.log('Selected Item:', Item);
    console.log('Selected Dropdown Value:', Item.selectedDropdownValue);
    console.log('Selected Dropdown Value:', Item.id);
    setSelectValueCity({ label: Item.selectedDropdownValue, value: Item.selectedDropdownValue });
    if (selectedItem === Item) {
      setSelectedItem(null);
      setButtonText('Add Item');
    } else {
      setSelectedItem(Item);
      setButtonText('Update Item');
    }
    setFormData({
      name: Item.name,
      price: Item.price,
      description: Item.description,
      category: Item.selectedDropdownValue,
      discount: Item.discount,
      selectedItemImage: Item.selectedItemImage,
    });
    setIsFormEmpty(false);

    setSelectedItemImage(Item.selectedItemImage);
  };

  const handleSelectCityChange = (selectedOption) => {
    setSelectCityMap(selectedOption);
    setFormData({ ...formData, city: selectedOption ? selectedOption.value : '' });
  };

  const handleSelectZoneChange = (selectedOption) => {
    setSelectZoneMap(selectedOption);
    setFormData({ ...formData, zone: selectedOption ? selectedOption.value : '' });
  };
  const handleAddGroceryItem = () => {
    // Check if ItemList is empty
    if (ItemList.length > 0) {
      console.log('Saved Data Array:', savedDataArray);
      // setShowAddedItem(true);

      toast.success('Saved Grocery Successfully', {
        position: 'top-right', // You can change the position
        autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
      });


      setFormData({
        name: '',
        price: '',
        description: '',
        category: null,
        discount: '',
      });
      setSelectValueCity(null);
      setIsFormEmpty(true);
      setSelectedItemImage(null);
      setIsValid(true)
      // setTimeout(() => {
      //   history.push('/vendors/Grocery/list/GroceryList');
      // }, 1000);
    } else {
      toast.error('Cannot add Restaurant without at least one Item', {
        position: 'top-right', // You can change the position
        autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
      });
      // setShowErrorFieldsToast(true);
    }
  };
  const handleResetItem = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: null,
      discount: '',
    });
    setSelectValueCity(null);
    setIsFormEmpty(true);
    setSelectedItemImage(null);
    setButtonText('Add Item');
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

      {isValid ? (
        <div>
          <>
            <Row className="row-cols-1 row-cols-md-2 g-2">
              <Col>
                <h2 className="small-title">Details</h2>
                <Card className=" h-100">
                  <Card.Body>
                    <Form className="mb-n3">
                      <div className="mb-3">
                        <Form.Label>Grocery Name</Form.Label>
                        <Form.Control
                          name="GroceryName"
                          type="text"
                          // className={`mb-3 ${!formData.GroceryName && !isValid ? 'is-invalid' : ''}`}
                          // onChange={handleInputChange}
                          // value={formData.GroceryName}

                          /*

                    value={formData.ownerPhone}
                    className={`mb-3 ${!formData.ownerPhone && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}

                    */
                          value={formData.GroceryName}
                          className={`mb-3 ${!formData.GroceryName && !isValid ? 'is-invalid' : ''}`}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <Form.Label>Grocery Address</Form.Label>
                        <Form.Control
                          name="GroceryAddress"
                          type="text"
                          className={`mb-3 ${!formData.GroceryAddress && !isValid ? 'is-invalid' : ''}`}
                          onChange={handleInputChange}
                          value={formData.GroceryAddress}
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
                <h2 className="small-title">Grocery Logo & Covers</h2>
                <Card className=" h-100">
                  <Card.Body>
                    <Row>
                      <Col className="col-auto mb-3 mb-sm-0 me-auto">
                        <Form.Label>Logo</Form.Label>
                        <div>
                          <label htmlFor="imageInput">
                            <div
                              style={{
                                ...logoStyle,
                                borderColor: !selectedImage && !isValid ? '#dc3545' : logoStyle.border,
                              }}
                            >
                              {selectedImage ? (
                                <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
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
                            <div
                              style={{
                                ...OwnerInfoImages,
                                borderColor: !selectedCoverImage && !isValid ? '#dc3545' : coverImageStyle.border,
                              }}
                            >
                              {selectedCoverImage ? (
                                <img src={selectedCoverImage} alt="Selected Cover" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
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
              <h2 className="small-title">Grocery Info</h2>
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

                      <Col lg="6">
                  <Form.Label>Minimum Order Amount</Form.Label>
                  <Form.Control
                    type="text"
                    name="minimumOrderAmount"
                    value={formData.minimumOrderAmount}
                    className={`mb-3 ${!formData.minimumOrderAmount && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </div>

            {/* iTEM */}

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
                            <div>
                              <label htmlFor="licenseInput">
                                <div
                                  style={{
                                    ...OwnerInfoImages,
                                    borderColor: !selectedLicensedImage && !isValid ? '#dc3545' : OwnerInfoImages.border,
                                  }}
                                >
                                  {selectedLicensedImage ? (
                                    <img
                                      src={URL.createObjectURL(selectedLicensedImage)}
                                      alt="Selected"
                                      style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                                    />
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
                                <img
                                  src={URL.createObjectURL(selectedEmiratesID)}
                                  alt="Selected"
                                  style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                                />
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
                            <div
                              style={{
                                ...OwnerInfoImages,
                                borderColor: !selectedPassport && !isValid ? '#dc3545' : OwnerInfoImages.border,
                              }}
                            >
                              {selectedPassport ? (
                                <img
                                  src={URL.createObjectURL(selectedPassport)}
                                  alt="Selected"
                                  style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                                />
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


            <div style={{ paddingTop: '60px' }}>
        <h2 className="small-title">Bank Info</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form>
              <Row className="g-3">
                <Col lg="6">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    className={`mb-3 ${!formData.accountNumber && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>IBAN </Form.Label>
                  <Form.Control
                    type="text"
                    name="IBAN"
                    value={formData.IBAN}
                    className={`mb-3 ${!formData.IBAN && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>Account Holder name</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountName"
                    value={formData.accountName}
                    className={`mb-3 ${!formData.accountName && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col lg="6">
                  <Form.Label>Bank Name </Form.Label>
                  <Form.Control
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    className={`mb-3 ${!formData.bankName && !isValid ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
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
                onClick={handleAddGrocery}
              >
                Next
              </button>
            </div>
          </>
        </div>
      ) : (
        // {showAdditionalContent && (
        //   <div>
        //     <p>Additional content after successful addition</p>
        //     {/* Additional JSX specific to after successful addition */}
        //   </div>
        // )}
        // JSX to render when isValid is false
        <div style={{ paddingTop: '60px' }}>
          <h2 className="small-title">Item</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form className="mb-5">
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '100%' }}>
                    <Row className="g-9">
                      <Col lg="3" className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
                      </Col>
                      <Col lg="3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} />
                      </Col>
                      <Col lg="4">
                        <Form.Label>Description (Optional)</Form.Label>
                        <Form.Control type="text" name="description" value={formData.description} onChange={handleInputChange} />
                      </Col>
                      <Col lg="3">
                        <Form.Label>Discount</Form.Label>
                        <Form.Control type="number" name="discount" value={formData.discount} onChange={handleInputChange} />
                      </Col>
                      <Col lg="3">
                        <Form.Group>
                          <Form.Label>Category</Form.Label>
                          <Select
                            classNamePrefix="react-select"
                            options={[...optionsCity, AddItemOption]}
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
                              value={newItemName}
                              onChange={(e) => setNewItemName(e.target.value)}
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
                      {/*  */}

                      {/*  */}
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <Col>
                        <Form.Label>Image</Form.Label>
                        <div className="mb-5">
                          <label htmlFor="imageInputItem">
                            <div
                              style={{
                                ...coverImageStyle,
                                borderColor: !selectedImage && !isValid ? '#dc3545' : coverImageStyle.border,
                              }}
                            >
                              {selectedItemImage ? (
                                <img src={selectedItemImage} alt="Selected" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
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
                            id="imageInputItem"
                            accept="image/*"
                            className="form-control-file"
                            style={{ display: 'none' }}
                            onChange={handleImageItem}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>

                <Row className="g-4">
                  <Col className="w-100 d-flex justify-content-end">
                    <Form.Label>&nbsp;</Form.Label>
                    <br />

                    <button    onClick={handleResetItem}  type="button" className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold ">
              Reset
            </button>
                    <button
                      type="button"
                      className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold"
                      onClick={handleAddItem}
                      disabled={
                        isFormEmpty || formData.name === '' || formData.price === '' || formData.discount === '' || selectedItemImage === '' // Check if selectedItemImage is null
                      }
                      style={{marginLeft:'15px'}}
                    >
                      {buttonText}
                    </button>
                  </Col>
                </Row>
              </Form>

              <div>
                {ItemList.length > 0 && (
                  <Row className="g-1 p-3">
                    <Col lg="1">
                      <div className="text-muted text-small d-lg-none">Name</div>
                      <div className="text-muted text-small cursor-pointer sort">NAME</div>
                    </Col>
                    <Col lg="2">
                      <div className="text-muted text-small d-lg-none">Price</div>
                      <div className="text-muted text-small cursor-pointer sort">PRICE</div>
                    </Col>
                    <Col lg="2">
                      <div className="text-muted text-small d-lg-none">Description</div>
                      <div className="text-muted text-small cursor-pointer sort">DESCRIPTION</div>
                    </Col>
                    <Col lg="2">
                      <div className="text-muted text-small d-lg-none">Discount</div>
                      <div className="text-muted text-small cursor-pointer sort">DISCOUNT</div>
                    </Col>
                    <Col lg="2">
                      <div className="text-muted text-small d-lg-none">Category</div>
                      <div className="text-muted text-small cursor-pointer sort">CATEGORY</div>
                    </Col>
                    <Col lg="1">
                      <div className="text-muted text-small d-lg-none">Image</div>
                      <div className="text-muted text-small cursor-pointer sort">IMAGE</div>
                    </Col>
                    <Col lg="2">
                      <div className="text-muted text-small d-md-none">Actions</div>
                    </Col>
                  </Row>
                )}

                {ItemList.map((Item, index) => (
                  <>
                    <React.Fragment key={Item.id}>
                    <Card className={`mb-2 ${Item === selectedItem ? 'selected' : ''}`}>
                      <Card.Body style={{ borderRadius: '10px' }} className="p-3">
                        <Row className="g-1" onClick={() => checkItem(Item)}>
                          <Col lg="1">
                            <div className="text-muted text-small d-lg-none">Name</div>
                            <div className="text-alternate">{Item.name}</div>
                          </Col>

                          <Col lg="2">
                            <div className="text-muted text-small d-lg-none">Price</div>
                            <div className="text-alternate">{Item.price}</div>
                          </Col>
                          <Col lg="2">
                            <div className="text-muted text-small d-lg-none">Description</div>
                            <div className="text-alternate">{Item.description}</div>
                          </Col>
                          <Col lg="2">
                            <div className="text-muted text-small d-lg-none">Description</div>
                            <div className="text-alternate">{Item.discount}</div>
                          </Col>
                          <Col lg="2">
                            <div className="text-muted text-small d-lg-none">Category</div>
                            <div className="text-alternate">{Item.selectedDropdownValue}</div>
                          </Col>
                          <Col lg="1">
                            <img style={{ width: 35, height: 20, borderRadius: '4px' }} src={Item.selectedItemImage} alt={Item.selectedItemImage} />
                          </Col>
                          <Col lg="2">
                            <Col className="d-flex flex-column justify-content-center mb-lg-0 align-items-md-end">
                              <div className="text-muted text-small d-md-none">Select</div>
                              <div onClick={() => handleDeleteItem(index)}>
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
                    </React.Fragment>
                  </>
                ))}
              </div>
            </Card.Body>
          </Card>

          <div className=" d-flex justify-content-end">
    

            <button
              style={{ marginLeft: '15px', backgroundColor: '#5A94C8', fontWeight: 'bold' }}
              type="button"
              className="btn btn-icon btn-icon-start btn-primary"
              onClick={handleAddGroceryItem}
            >
              Add Grocery
            </button>
          </div>
        </div>
      )}

      <Snackbar
        open={showDeleteSuccessToast}
        autoHideDuration={3000}
        onClose={() => setShowDeleteSuccessToast(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'top' }}
      >
        <Alert variant="filled" severity="error" onClose={() => setShowDeleteSuccessToast(false)}>
          {toast}
        </Alert>
      </Snackbar>

      <Snackbar open={showAddedItem} autoHideDuration={3000} onClose={() => setShowAddedItem(false)} anchorOrigin={{ vertical: 'top', horizontal: 'top' }}>
        <Alert variant="filled" severity="success" onClose={() => setShowAddedItem(false)}>
          {toast}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showErrorFieldsToast}
        autoHideDuration={3000}
        onClose={() => setShowAddedItem(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'top' }}
      >
        <Alert variant="filled" severity="error" onClose={() => setShowErrorFieldsToast(false)}>
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
})(AddNewGrocery);
