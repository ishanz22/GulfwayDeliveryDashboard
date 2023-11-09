import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Tooltip, OverlayTrigger, Modal, Container } from 'react-bootstrap';
import Rating from 'react-rating';
import DatePicker from 'react-datepicker';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import OrderDetailsData from 'data/OrderDetailsData';
import Clamp from 'components/clamp';
import ItemCounter from 'views/storefront/cart/components/ItemCounter';
import AllRidersDataMap from 'data/AllRidersDataMap';
import RiderList from 'views/riders/list/RiderList';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const FeedbackDetail = () => {
  const title = 'User ID  #54321';
  const description = 'Ecommerce Order Detail Page';
  const [showModal, setShowModal] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);
  const customMarkerIcons = {};
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


  const [value, setValue] = useState('1');

  const handleMarkerClick = (rider) => {
    setSelectedRider(rider);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const allItems = [1, 2, 3, 4];
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
  const handleChangeRider = () => {
    if (selectedRider) {
      const image = selectedRider.profileImage;
      const name = selectedRider.profileName;

      console.log('Image:', image);
      console.log('Name:', name);
    }

    // Add any additional functionality you need when the button is clicked.
    // For example, you can close the modal here.
    handleCloseModal();
  };
  const handleDeleteItem = () => {
   
    setIsDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);

  };



  const handleDelete = (id) => {
    console.log(`Delete Item ID ${id}`);
    setIsDeleteDialogOpen(true);
  };
  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/support/feedbacks">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Feedbacks</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>



          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button onClick={handleDeleteItem} variant="outline-primary" className="btn-icon btn-icon-start w-100 w-md-auto" >
              <CsLineIcons icon="bin"  /> <span>Delete Feedback</span>
            </Button>
            <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
              <CsLineIcons icon="sort" />
            </Button>
          </Col>
          {/* Title End */}
        </Row>
      </div>

      <Row>
        <Col xl="8" xxl="9">
          {/* Status Start */}

          {/* Status End */}

          {/* Cart Start */}

          {/* Cart End */}

          {/* Activity Start */}
          <h2 className="small-title">Feedback</h2>
          <div className="mb-5">
            <Card className="mb-2">
              <Card.Body>
                <Row className="g-0 ">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-4.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <div>Zayn Hartley</div>
                    <div className="text-muted text-small mb-2">1 week ago</div>
                    <Rating
                      className="align-middle mt-2"
                      initialRating={5}
                      readonly
                      emptySymbol={<i className="cs-star text-primary" />}
                      fullSymbol={<i className="cs-star-full text-primary" />}
                    />
                    <div className="text-medium text-alternate mt-4 mb-2">
                      Chupa chups topping pastry halvah. Jelly cake jelly sesame snaps jelly beans jelly beans. Biscuit powder brownie powder sesame snaps
                      jelly-o dragée cake. Pie tiramisu cake jelly lemon drops. Macaroon sugar plum apple pie carrot cake jelly beans chocolate. Chupa chups
                      topping pastry halvah. Jelly cake jelly sesame snaps jelly beans jelly beans. Biscuit powder brownie powder sesame snaps jelly-o dragée
                      cake. Pie tiramisu cake jelly lemon drops. Macaroon sugar plum apple pie carrot cake jelly beans chocolate
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="mt-4 d-flex justify-content-end">
              <button type="button" className="btn btn-primary upload-label" onClick={handleShowModal}>
                Reply feedback
              </button>
            </div>

            <Modal show={showModal}>
              <Modal.Header closeButton>
                <Modal.Title>Feedback</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Control
                  type="text"
                  placeholder="Enter the reply here"
                  as="textarea" // Change the input type to "textarea"
                  rows={4} // Set the number of rows to 5
          
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary">Post Reply</Button>
              </Modal.Footer>
            </Modal>
          </div>
          {/* Activity End */}
        </Col>

        <Col xl="4" xxl="3">
          {/* Address Start */}
          <h5 className="me-3">Order Summary</h5>
          <Card className="mb-0">
            <Card.Body>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div >Order Created</div>
                <div className='text-mute text-alternate'>Sun, Sep 7 2023</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div >Order Item</div>
                <div className='text-mute text-alternate'>Margherita Pizza</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div >Order Time</div>
                <div className='text-mute text-alternate'>06.24 AM</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div>Sub Total</div>
                <div className='text-mute text-alternate'>AED 375</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div >Delivery Fee</div>
                <div className='text-mute text-alternate'>0.00</div>
              </div>
            </Card.Body>
          </Card>
          &nbsp;
          <Card className="mb-0">
            <Card.Body>
              <div className=" p-0 d-flex justify-content-between">
                <div>
                  <text >Total</text>
                </div>
                <div>AED 375</div>
              </div>
            </Card.Body>
          </Card>
          {/* Address End */}
          &nbsp;
          <h5 className="me-3">Delivered Address</h5>
          <Card className="mb-0">
          <Card.Body>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div >Address</div>
                <div className='text-alternate' >Port Saeed, Deira Dubai</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div >Flat Building Name</div>
                <div className='text-alternate'>SBK</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div >Street Name</div>
                <div className='text-alternate'>Deira</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div >PostCode</div>
                <div className='text-alternate'>en34hy</div>
              </div>
            </Card.Body>


          </Card>
        </Col>
      </Row>




      <Dialog open={isDeleteDialogOpen} onClose={handleDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this feedback ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button  color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FeedbackDetail;
