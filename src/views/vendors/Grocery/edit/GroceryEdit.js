/* eslint-disable no-plusplus */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
import { Table, Tag, Space } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gulfwayBlue } from 'layout/colors/Colors';
import { useDispatch, useSelector } from 'react-redux';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { newRestaurant } from 'actions/restaurant';
import { getCities, getRestaurantCategories } from 'actions/admin';

const AddItemOption = { value: 'AddCategory', label: 'Add Category' };

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

const AddNewGrocery = ({ google }) => {
  const location = useLocation();
  const { record } = location.state;

  if (!record) {
    return <p>Vendor not found</p>;
  }
  console.log('record Details:', record);


  const title = 'Edit Grocery';
  const description = 'Ecommerce Customer List Page';
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
  const defaultImageURL = 'https://example.com/default-image.jpg';

  const [selectedItemIndex, setSelectedItemIndex] = useState('');
  const [selectedEmiratesID, setSelectedEmiratesID] = useState('');
  const [selectedEmiratesIDBack, setSelectedEmiratesIDBack] = useState('');

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedItemImage, setSelectedItemImage] = useState('');
  const [selectedCoverImage, setSelectedCoverImage] = useState('');
  const [selectedLicensedImage, setSelectedLicensedImage] = useState('');
  const [selectedLicensedImageBack, setselectedLicensedImageBack] = useState('');

  const [ItemList, setItemList] = useState([]);
  const [selectedPassport, setSelectedPassport] = useState('');
  const [selectedPassportBack, setSelectedPassportBack] = useState('')

  const [selectedZone, setSelectedZone] = useState([]);
  const [savedDataArray, setSavedDataArray] = useState([]);

  const [menuImage, setMenuImage] = useState('');

  const [formData, setFormData] = useState({
    GroceryName: 'test Rest',
    GroceryAddress: 'Grocery Address',
    phone: ' Grocery phone',
    email: 'test@gmail.com',
    vatTax: '112222',
    estimatedDeliveryTime: '1111111',
    openTime: '1111',
    closeTime: '111112',
    minimumOrderAmount: '22232323',

    city: 'dubai mall',
    zone: 'deiar',
    latitude: '222122',
    longitude: '321111',

    firstName: 'Mohomed',
    lastName: 'Ahsan',
    ownerPhone: '0878665477',

    bankName: 'Mashreq',
    accountNumber: '87654356789',
    IBAN: '23456765432q',
    accountName: 'Saving Account',
  });

  const [buttonText, setButtonText] = useState('Add Item');

  const dispatch = useDispatch();

  const { restaurant, error } = useSelector((state) => state.restaurant);
  const { cities, restaurantCategories } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getCities({}));
    dispatch(getRestaurantCategories({}));

    if (error) {
     
      toast.error(error, {
        position: 'top-right',
        autoClose: 3000, 
      });
    }
    // console.log(restaurantCategories);
  }, [error]);

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
  const tableHeaderStyle = {
    color: 'grey',
    fontSize: '10px',
  };
  function handleSuccess() {
    setIsValid(false);

    const dataArray = [formData, selectedEmiratesID, selectedLicensedImage, selectedPassport, selectedImage, selectedCoverImage];

    setSavedDataArray((prevDataArray) => [...prevDataArray, ...dataArray]);

    console.log('Form Data Array:', dataArray);
  }

  function handleNexPage() {
    const isEmptyField = Object.values(formData).some((value) => value === '');

    // const isEmptyImage = !selectedEmiratesID || !selectedLicensedImage || !selectedPassport || !selectedImage || !selectedCoverImage;

    if (isEmptyField) {
      toast.error('Please fill in all the required fields.', {
        position: 'top-right', 
        autoClose: 3000, 
      });
      // setShowErrorFieldsToast(true);
      return;
    }

    handleSuccess();
  }

  function handleAddGrocery() {
    if (
      formData.GroceryName === '' ||
      formData.GroceryAddress === '' ||
      formData.phone === '' ||
      formData.email === '' ||
      formData.vatTax === '' ||
      formData.estimatedDeliveryTime === '' ||
      formData.openTime === '' ||
      formData.closeTime === '' ||
      formData.bankName === '' ||
      formData.accountNumber === '' ||
      formData.IBAN === '' ||
      formData.accountName === '' ||
      formData.minimumOrderAmount === '' ||
      !selectedEmiratesID ||
      !selectedLicensedImage ||
      !selectedPassport ||
      !selectedImage ||
      !selectedCoverImage
    ) {
      setIsValid(false); // Form is invalid
      // setToast('Please fill in all the required fields.');
      setShowErrorFieldsToast(true);
    } else if (ItemList.length === 0) {
      setIsValid(false); // Form is invalid
      toast.error('Cannot add Grocery without at least one Item', {
        position: 'top-right', 
        autoClose: 3000, 
      });
      setShowErrorFieldsToast(true);
    } else {
      setIsValid(true); // Form is valid
      console.log('Saved Data Array:', savedDataArray);
      // console.log('Form Data:', { ...formData, selectedEmiratesID, selectedLicensedImage, selectedPassport, selectedImage, selectedCoverImage, ItemList });
      const data = [selectedImage, selectedCoverImage, selectedEmiratesID, selectedLicensedImage, selectedPassport];
      for (let index = 0; index < ItemList.length; index++) {
        data.push(ItemList[index]?.selectedItemImage);
      }
      const formdata = new FormData();
      // Append each image to the FormData object
      data.forEach((image) => {
        formdata.append('images', image);
      });

      // console.log(data);

      formdata.append('GroceryName', formData.GroceryName);
      formdata.append('GroceryAddress', formData.GroceryAddress);
      formdata.append('firstName', formData.firstName);
      formdata.append('lastName', formData.lastName);
      formdata.append('email', formData.email);
      formdata.append('ownerPhone', formData.ownerPhone);
      formdata.append('mobile', formData.phone);

      formdata.append('vatTax', formData.vatTax);
      formdata.append('estimatedDeliveryTime', formData.estimatedDeliveryTime);
      formdata.append('openTime', formData.openTime);
      formdata.append('closeTime', formData.closeTime);
      formdata.append('minimumOrderAmount', formData.minimumOrderAmount);

      formdata.append('menu', JSON.stringify(ItemList));

      // ItemList.forEach((item, index) => {
      //   formdata.append(`menu[${index}].description`, item.description);
      //   formdata.append(`menu[${index}].discount`, item.discount);
      //   formdata.append(`menu[${index}].name`, item.name);
      //   formdata.append(`menu[${index}].price`, item.price);
      //   formdata.append(`menu[${index}].image`, item.selectedItemImage);
      // });
      formdata.append('city', formData.city);
      formdata.append('zone', formData.zone);
      formdata.append('lat', formData.latitude);
      formdata.append('long', formData.longitude);

      formdata.append('bankName', formData.bankName);
      formdata.append('accountNumber', formData.accountNumber);
      formdata.append('IBAN', formData.IBAN);
      formdata.append('accountName', formData.accountName);

      // console.log('FormData:', JSON.stringify(formdata));
      dispatch(newRestaurant(formdata));
      toast.success('Grocery added successfully', {
        position: 'top-right', // You can change the position
        autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
      });
      // setShowAddedItem(true);

      // setFormData({
      //   GroceryName: '',
      //   GroceryAddress: '',
      //   phone: '',
      //   email: '',
      //   vatTax: '',
      //   estimatedDeliveryTime: '',
      //   openTime: '',
      //   closeTime: '',
      //   minimumOrderAmount: '',

      //   city: '',
      //   zone: '',
      //   latitude: '',
      //   longitude: '',

      //   firstName: '',
      //   lastName: '',
      //   ownerPhone: '',

      //   bankName: '',
      //   accountNumber: '',
      //   IBAN: '',
      //   accountName: '',
      // });
      // setSelectValueCity('');
      // setSelectedEmiratesID('');
      // setSelectedImage('');
      // setSelectedImage('');
      // setSelectedCoverImage('');
      // setSelectedLicensedImage('');
      // setSelectedPassport('');
      // setItemList([]);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setSelectedImage(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };
  const handleImageItem = (e) => {
    const file = e.target.files[0];
    setSelectedItemImage(file);
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setSelectedItemImage(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedCoverImage(file);
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setSelectedCoverImage(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  // 🩸
  // const optionsCityMap = cities && cities.map((cityData) => cityData.name);

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
    console.log(file);
    setSelectedLicensedImage(file);
  };

  const handleLicenseUploadBack = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setselectedLicensedImageBack(file);
  };


  const handleEmiratesIdUpload = (e) => {
    const file = e.target.files[0];
    setSelectedEmiratesID(file);
  };

  const handleEmiratesIdUploadBack = (e) => {
    const file = e.target.files[0];
    setSelectedEmiratesIDBack(file);
  };

  const handlePassportUpload = (e) => {
    const file = e.target.files[0];
    setSelectedPassport(file);
  };

  const handlePassportUploadBack = (e) => {
    const file = e.target.files[0];
    setSelectedPassportBack(file);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const updateIsFormEmpty = () => {
    const isEmpty = Object.values(formData).every((value) => value === '');
    setIsFormEmpty(isEmpty);
  };

  // 🩸
  // const handleSelectChange = (e) => {
  //   setSelectValueCity(e.target.value);

  //   updateIsFormEmpty();
  // };

  // 🩸

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
  // const handleAddItem = () => {
  //   console.log(selectValueCity);
  //   console.log(selectedItemImage);
  //   // Create an object to store the values
  //   const ItemObject = {
  //     name: formData.name,
  //     price: formData.price,
  //     description: formData.description,
  //     category: formData.category,
  //     selectedDropdownValue: selectValueCity,
  //     discount: formData.discount,
  //     selectedItemImage, // Add the selectedItemImage to the object
  //   };
  // console.log(ItemObject);

  //   setSavedDataArray((prevDataArray) => [...prevDataArray, ItemObject]);
  //   // Check if the Item already exists in the list
  //   const existingIndex = ItemList.findIndex((Item) => Item.name === formData.name);

  //   if (existingIndex !== -1) {
  //     // If the Item already exists, update it
  //     const updatedList = [...ItemList];
  //     updatedList[existingIndex] = ItemObject;
  //     setItemList(updatedList);
  //     console.log(updatedList);
  //     toast.success('Item updated successfully', {
  //       position: 'top-right', // You can change the position
  //       autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
  //     });
  //     setButtonText('Add Item');
  //   } else {
  //     // If the Item doesn't exist, add it to the list
  //     toast.success('Item added successfully', {
  //       position: 'top-right', // You can change the position
  //       autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
  //     });
  //     setItemList([...ItemList, ItemObject]);
  //   }

  //   // Reset the form data for the next entry
  //   setFormData({
  //     name: '',
  //     price: '',
  //     description: '',
  //     category: null,
  //     discount: '',
  //   });
  //   setSelectValueCity(null);
  //   setIsFormEmpty(true);
  //   setSelectedItemImage(null);
  //   setShowAddedItem(true);
  // };

  const handleAddItem = () => {
    console.log(selectValueCity);
    console.log(selectedItemImage);
    setMenuImage('');
    // Create an object to store the values
    const ItemObject = {
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
    const existingIndex = ItemList.findIndex((Item) => Item.name === formData.name);

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
  };
  const handleDeleteItem = (indexToDelete) => {
    setSelectedItemIndex(indexToDelete);
    console.log('hshs');
    setIsDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setSelectedItemIndex(null);
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
    setMenuImage(null);
  };

  const handleDeleteConfirmed = () => {
    if (selectedItemIndex !== null) {
      const updatedItemList = ItemList.filter((_, index) => index !== selectedItemIndex);

      setItemList(updatedItemList);
      toast.success('Item removed', {
        position: 'top-right', // You can change the position
        autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
      });
      setShowDeleteSuccessToast(true);
      setButtonText('Add Item');

      // Reset the form data for the next entry
      setFormData({
        name: '',
        price: '',
        description: '',
        category: null,
        discount: '',
      });
      setSelectValueCity(null);
      setIsFormEmpty(true);
    }

    setIsDeleteDialogOpen(false);
    setSelectedItemIndex(null);
    setSelectedItemImage('');
  };
  const generateDummyData = () => {
    const dummyData = [
      {
        id: 1,
        name: 'Product 1',
        price: 19.99,
        description: 'Description 1',
        discount: 0.1,
        category: 'Category A',
        image: 'https://www.topgear.com/sites/default/files/2022/07/13.jpg',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 29.99,
        description: 'Description 2',
        discount: 0.2,
        category: 'Category B',
        image: 'https://cdn.images.express.co.uk/img/dynamic/1/590x/uk-passport-1196535.jpg?r=1572255773482',
      },
    ];

    setItemList(dummyData);
  };

  useEffect(() => {
    generateDummyData();
  }, []);
  const checkItem = (Item) => {
    setSelectedItems([Item.name]);

    console.log('Selected Item:', Item);
    console.log('Selected Dropdown Value:', Item.selectedDropdownValue);
    setSelectValueCity({
      label: Item.selectedDropdownValue ? Item.selectedDropdownValue : Item.category,
      value: Item.selectedDropdownValue ? Item.selectedDropdownValue : Item.category,
    });

    setMenuImage(Item.image);

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
      category: Item.selectedDropdownValue ? Item.selectedDropdownValue : Item.category,
      discount: Item.discount,
      selectedItemImage: Item.selectedItemImage ? Item.selectedItemImage : Item.image,
    });
    console.log(formData);
    setIsFormEmpty(false);

    setSelectedItemImage(Item.selectedItemImage);
  };
  // 🩸
  // const handleSelectCityChange = (e) => {
  //   console.log(e.target.value);
  //   setSelectCityMap(e.target.value);
  //   setFormData({ ...formData, city: e.target.value ? e.target.value : '' });
  //   console.log(formData.city);
  //   cities.map((cityData) => (cityData.name === e.target.value ? setSelectedZone(cityData.zone) : []));
  // };

  // 🩸

  const handleSelectCityChange = (selectedOption) => {
    setSelectCityMap(selectedOption);
    setFormData({ ...formData, city: selectedOption ? selectedOption.value : '' });
  };
  // console.log(selectedZone);
  // 🩸
  // const handleSelectZoneChange = (e) => {
  //   setSelectZoneMap(e.target.value);
  //   setFormData({ ...formData, zone: e.target.value ? e.target.value : '' });
  // };
  // 🩸
  const handleSelectZoneChange = (selectedOption) => {
    setSelectZoneMap(selectedOption);
    setFormData({ ...formData, zone: selectedOption ? selectedOption.value : '' });
  };

  const columns = [
    {
      title: <span style={tableHeaderStyle}>NAME</span>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <span style={tableHeaderStyle}>Price</span>,
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: <span style={tableHeaderStyle}>Description</span>,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: <span style={tableHeaderStyle}>Discount</span>,
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: <span style={tableHeaderStyle}>Category</span>,
      dataIndex: 'category',
      key: 'category',
      render: (text, records) => (records.selectedDropdownValue ? records.selectedDropdownValue : text),
    },
    {
      title: <span style={tableHeaderStyle}>Image</span>,
      dataIndex: 'image',
      key: 'image',
      render: (text, records) =>
        records.image || records.selectedItemImage ? (
          <img
            style={{ width: 35, height: 20, borderRadius: '4px' }}
            src={records.image || URL.createObjectURL(records.selectedItemImage)}
            alt={records.selectedItemImage}
          />
        ) : (
          <span>No image</span>
        ),
    },
    {
      title: <span style={tableHeaderStyle}>Action</span>,
      key: 'action',
      render: (text, records, index) => (
        <Space size="middle">
          <span className="text-muted text-small d-md-none">Select</span>

          <div
            onClick={() => {
              checkItem(records);
              console.log('/////////', records);
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', paddingRight: '10px', color: gulfwayBlue }}
          >
            <CsLineIcons icon="pen" />
          </div>
          <div
            onClick={() => {
              console.log('Clicked index:', index);
              handleDeleteItem(index);
            }}
          >
            <CsLineIcons icon="bin" className="text-danger cursor-pointer" style={{ fontSize: '14px' }} />
          </div>
        </Space>
      ),
    },
  ];

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/vendors/Grocery/list/">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Groceries</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
        </Row>
      </div>

      {isValid ? (
        <div>
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
                        className={`mb-3 ${!formData.GroceryName && !isValid ? 'is-invalid' : ''}`}
                        onChange={handleInputChange}
                        value={formData.GroceryName}
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
                          <div>
                            <label htmlFor="licenseInput">
                              <div
                                style={{
                                  ...logoStyle,
                                  borderColor: !selectedImage && !isValid ? '#dc3545' : logoStyle.border,
                                }}
                              >
                                {selectedImage ? (
                                  <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                    style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                                  />
                                ) : (
                                  <img src={record.logo} alt="Default" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                                )}
                              </div>
                            </label>
                            <input
                              type="file"
                              id="licenseInput"
                              accept="image/*"
                              className="form-control-file"
                              style={{ display: 'none' }}
                              onChange={handleImageChange}
                            />
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
                              <img
                                src={URL.createObjectURL(selectedCoverImage)}
                                alt="Selected"
                                style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                              />
                            ) : (
                              <img src={record.coverPhoto} alt="Default" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
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
                      <Form.Label>Estimated Delivery Time </Form.Label>
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
                    type="time"
                        name="openTime"
                        value={formData.openTime}
                        className={`mb-3 ${!formData.openTime && !isValid ? 'is-invalid' : ''}`}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col lg="6">
                      <Form.Label>Close Time</Form.Label>
                      <Form.Control
                     type="time"
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

          <h2 className="small-title">Location</h2>

          <Card style={{ borderRadius: '15px', height: '450px' }}>
            <Card.Body style={{ padding: 0 }}>
              <Row className="g-3">
                {/* Search Input on the Right */}

                <Col lg="6" className="p-5">
                  <Form>
                    {/* 🩸 */}
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
                        options={initialOptionsCity}
                        value={{ label: formData.zone, value: formData.zone }}
                        onChange={handleSelectZoneChange}
                        placeholder=""
                      />
                    </Form.Group>

                    {/* 🩸 */}
                    {/*       
   <Form.Group controlId="textInput1">
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    classNamePrefix="react-select"
                    className={`mb-3 ${!formData.city && !isValid ? 'is-invalid' : ''}`}
                    // options={optionsCityMap}
                    value={selectCityMap}
                    onChange={handleSelectCityChange}
                  >
                    <option value="">Select City</option>
                    {optionsCityMap?.map((zone, index) => (
                      <option key={index} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <text>&nbsp; &nbsp;</text>
                <Form.Group controlId="textInput1">
                  <Form.Label>Zone</Form.Label>

                  <Form.Select
                    classNamePrefix="react-select"
                    className={`mb-3 ${!formData.zone && !isValid ? 'is-invalid' : ''}`}
                    value={selectZoneMap}
                    onChange={handleSelectZoneChange}
                  >
                    <option value="">Select Zone</option>
                    {selectedZone?.map((zone, index) => (
                      <option key={index} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </Form.Select>

                </Form.Group>
 */}

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

                      <div>
                        <label htmlFor="liecenceImage">
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
                              <img src={record.license} alt="Default" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                            )}
                          </div>
                        </label>

                        <input
                          type="file"
                          id="liecenceImage"
                          accept="image/*"
                          className="form-control-file"
                          style={{ display: 'none' }}
                          onChange={handleLicenseUpload}
                        />
                      </div>
                      &nbsp;
                      <div>
                        <label htmlFor="liecenceImageBack">
                          <div
                            style={{
                              ...OwnerInfoImages,
                              borderColor: !selectedLicensedImageBack && !isValid ? '#dc3545' : OwnerInfoImages.border,
                            }}
                          >
                            {selectedLicensedImageBack ? (
                              <img
                                src={URL.createObjectURL(selectedLicensedImageBack)}
                                alt="Selected"
                                style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                              />
                            ) : (
                              <img src={record.licenseBack} alt="Default" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                            )}
                          </div>
                        </label>

                        <input
                          type="file"
                          id="liecenceImageBack"
                          accept="image/*"
                          className="form-control-file"
                          style={{ display: 'none' }}
                          onChange={handleLicenseUploadBack}
                        />
                      </div> 

                      </div>
                   
                    </Col>

                    <Col lg="4">
                      <Form.Label>Emirates ID</Form.Label>

                      <div>
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
                                <img src={record.emiratesID} alt="Default" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
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
                        &nbsp;
                        <div>
                          <label htmlFor="emiratesIdInputBack">
                            <div
                              style={{
                                ...OwnerInfoImages,
                                borderColor: !selectedEmiratesIDBack && !isValid ? '#dc3545' : OwnerInfoImages.border,
                              }}
                            >
                              {selectedEmiratesIDBack ? (
                                <img
                                  src={URL.createObjectURL(selectedEmiratesIDBack)}
                                  alt="Selected"
                                  style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                                />
                              ) : (
                                <img src={record.emiratesIdBack} alt="Default" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            id="emiratesIdInputBack"
                            accept="image/*"
                            className="form-control-file"
                            style={{ display: 'none' }}
                            onChange={handleEmiratesIdUploadBack}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col lg="4">
                      <Form.Label>Passport</Form.Label>
                      <div>
                      <div>
                        <label htmlFor="passportInput">
                          <div
                            style={{
                              ...OwnerInfoImages,
                              borderColor: !selectedPassport && !isValid ? '#dc3545' : OwnerInfoImages.border,
                            }}
                          >
                            {selectedPassport ? (
                              <img src={URL.createObjectURL(selectedPassport)} alt="Selected" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                            ) : (
                              <img src={record.PassportBack} alt="Default" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
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
                      &nbsp;
                      <div>
                        <label htmlFor="passportInputBack">
                          <div
                            style={{
                              ...OwnerInfoImages,
                              borderColor: !selectedPassportBack && !isValid ? '#dc3545' : OwnerInfoImages.border,
                            }}
                          >
                            {selectedPassportBack ? (
                              <img src={URL.createObjectURL(selectedPassportBack)} alt="Selected" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                            ) : (
                              <img src={record.Passport} alt="Default" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                            )}
                          </div>
                        </label>
                        <input
                          type="file"
                          id="passportInputBack"
                          accept="image/*"
                          className="form-control-file"
                          style={{ display: 'none' }}
                          onChange={handlePassportUploadBack}
                        />
                      </div>
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
              onClick={handleNexPage}
            >
              Next
            </button>
          </div>
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
                          {/* 🩸 */}
                          {/* <Form.Label>Category</Form.Label>
                          <Form.Select
                            classNamePrefix="react-select"
                            // options={[...optionsCity, AddItemOption]}
                            value={selectValueCity}
                            onChange={handleSelectChange}
                            placeholder=""
                          >
                            <option>Select Categories</option>
                            {restaurantCategories &&
                              restaurantCategories?.map((item, index) => (
                                <option key={index} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                          </Form.Select> */}
                          {/* 🩸 */}

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
                                // borderColor: !selectedImage && !isValid ? '#dc3545' : coverImageStyle.border,
                              }}
                            >
                              {menuImage || selectedItemImage ? (
                                <img
                                  // src={URL.createObjectURL(menuImage)}
                                  src={menuImage || URL.createObjectURL(selectedItemImage)}
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
                    <button onClick={handleResetItem} type="button" className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold ">
                      Reset
                    </button>

                    <button
                      type="button"
                      className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold"
                      onClick={handleAddItem}
                      style={{ marginLeft: '15px' }}
                      disabled={
                        isFormEmpty || formData.name === '' || formData.price === '' || formData.discount === '' || selectedItemImage === '' // Check if selectedItemImage is null
                      }
                    >
                      {buttonText}
                    </button>
                  </Col>
                </Row>
              </Form>

              <div>
                <Table dataSource={ItemList} columns={columns} rowKey={(index) => index} />
              </div>
            </Card.Body>
          </Card>

          <div className=" d-flex justify-content-end">
            {/* <button   type="button" className="btn btn-icon btn-icon-start btn-outline-primary font-weight-bold ">
              Reset
            </button> */}

            <button
              style={{ marginLeft: '15px', backgroundColor: '#5A94C8', fontWeight: 'bold' }}
              type="button"
              className="btn btn-icon btn-icon-start btn-primary"
              onClick={handleAddGrocery}
            >
              Update Grocery
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
