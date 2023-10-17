import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import OrderDetailsData from 'data/OrderDetailsData';


const OrdersDetail = () => {
  const title = 'Order Number #3848484';
  const description = 'Ecommerce Order Detail Page';

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

  const [discountModal, setDiscountModal] = useState(false);

  const [discountType, setDiscountType] = useState({ value: 'Fixed Amount', label: 'Fixed Amount' });
  const options = [
    { value: 'Fixed Amount', label: 'Fixed Amount' },
    { value: 'Free Shipping', label: 'Free Shipping' },
    { value: 'Percentage', label: 'Percentage' },
  ];

  const [startDate, setStartDate] = useState(Date.parse('04 Dec 2021 00:12:00 GMT'));
  const [endDate, setEndDate] = useState(Date.parse('11 Dec 2021 00:12:00 GMT'));



  

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/orders">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Orders</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          {/* <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Dropdown className="w-100 w-md-auto">
              <Dropdown.Toggle className="w-100 w-md-auto" variant="outline-primary">
                Status: Delivered
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Status: Pending</Dropdown.Item>
                <Dropdown.Item>Status: Shipped</Dropdown.Item>
                <Dropdown.Item>Status: Delivered</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="ms-1">
              <Dropdown.Toggle className="btn-icon btn-icon-only dropdown-toggle-no-arrow" variant="outline-primary">
                <CsLineIcons icon="more-horizontal" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Edit</Dropdown.Item>
                <Dropdown.Item>View Invoice</Dropdown.Item>
                <Dropdown.Item>Track Package</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col> */}
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row>
        <Col xl="8" xxl="9">
          {/* Status Start */}

          {/* Status End */}

          {/* Cart Start */}

          {/* Cart End */}

          {/* Activity Start */}

          <Card className="mb-5">
            <Card.Body>
              <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
                <Col md="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
                  <div className="text-muted text-small cursor-pointer sort">ITEMS SUMMARY</div>
                </Col>
                <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                  <div className="text-muted text-small cursor-pointer sort">QTY</div>
                </Col>
                <Col md="4" className="d-flex flex-column pe-1 justify-content-center">
                  <div className="text-muted text-small cursor-pointer sort">PRICE</div>
                </Col>
                <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
                  <div className="text-muted text-small cursor-pointer sort">TOTAL PRICE</div>
                </Col>
              </Row>

              {OrderDetailsData.map((orderDetail) => (
                <Card key={orderDetail.id} className={`mb-2 ${selectedItems.includes(orderDetail.id) && 'selected'}`}>
                  <Card.Body className="pt-0 pb-0 sh-21 sh-md-6">
                    <Row className="g-0 h-100 align-content-center cursor-default">
                      <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                        <div className="text-muted text-small d-md-none">Code</div>
                        {/* <Button variant="link" className="p-0 text-alternate h-100 d-flex align-items-center">
                          {orderDetail.itemName}
                        </Button> */}
                        <div className="text-alternate">{` ${orderDetail.itemName}`}</div>
                      </Col>
                      <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                        <div className="text-muted text-small d-md-none">Type</div>
                        <div className="text-alternate">{`x ${orderDetail.quantity}`}</div>
                      </Col>
                      <Col xs="6" md="4" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                        <div className="text-muted text-small d-md-none">Date</div>
                        <div className="text-alternate">{orderDetail.price}</div>
                      </Col>
                      <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                        <div className="text-muted text-small d-md-none">Usage</div>
                        <div className="text-alternate">{orderDetail.totalPrice}</div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
          {/* Activity End */}
          <h2 className="small-title">Customer and Order Details</h2>
          <Card className="mb-10">
            <Card.Body>
              <div className="mb-5" >
                <Row className="g-0 sh-0 mb-0" >
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-0 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className=" d-flex flex-row pe-2 align-items-end text-alternate">
                              <text style={{ color: '#4E4E4E' }}> Customer Name</text>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>Harun Billi</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="mb-5">
                <Row className="g-0 sh-0 mb-0">
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-0 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <text style={{ color: '#4E4E4E' }}> Phone Number</text>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>05064738383</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="mb-5">
                <Row className="g-0 sh-0 mb-0">
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-0 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <text style={{ color: '#4E4E4E' }}> Bag Option</text>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>No Blog</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="mb-5">
                <Row className="g-0 sh-0 mb-0">
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-0 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <text style={{ color: '#4E4E4E' }}> Type</text>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>Delivery</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="mb-5">
                <Row className="g-0 sh-0 mb-0">
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-0 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <text style={{ color: '#4E4E4E' }}> Note</text>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>N/A</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl="4" xxl="3">
          {/* Address Start */}
          <h5 className="me-3">Rider Details</h5>
          <Card className="mb-5">
            <Card.Body>
              <div className="d-flex align-items-center">
                <br />
                <div className="rounded-circle overflow-hidden w-20 h-20">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                      alt="Profile"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                </div>
                <div className="ms-3" style={{ paddingTop: 15 }}>
                  <p>Robert Suvent</p>
                </div>
                &ensp; &ensp;
                <button type="button" className="btn btn-primary upload-label">
                  Track Rider
                </button>
              </div>
            </Card.Body>
          </Card>
          <h5 className="me-3">Order Summary</h5>
          <Card className="mb-0">
            <Card.Body>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Order Created</div>
                <div>Sun, Sep 7 2023</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Order Time</div>
                <div>06.24 AM</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Sub Total</div>
                <div>AED 375</div>
              </div>
              <div className="mb-n0 p-2 d-flex justify-content-between">
                <div style={{ fontWeight: '700' }}>Delivery Fee</div>
                <div>0.00</div>
              </div>
            </Card.Body>
          </Card>
          &nbsp;
          <Card className="mb-0">
            <Card.Body>
              <div className=" p-0 d-flex justify-content-between">
                <div>
                  <text style={{ fontWeight: '700' }}>Total</text>
                </div>
                <div>AED 375</div>
              </div>
            </Card.Body>
          </Card>
          {/* Address End */}

          &nbsp;
          <h5 className="me-3">Delivery Address</h5>
          <Card className="mb-0">
            <Card.Body>
              <div className=" mb-n0 p-2 d-flex ">
                <div>
                  <text style={{ fontWeight: '700' }}>Address line:</text>
                </div>
                <text>&nbsp;&nbsp;</text>
             <text>Port Saeed, Deira Dubai</text>
              </div>

              <div className="mb-n0 p-2 p-0 d-flex ">
                <div>
                  <text style={{ fontWeight: '700' }}>Flat Building Name:</text>
                </div>
                <text>&nbsp;&nbsp;</text>
             <text>SBK</text>
              </div>

              <div className="mb-n0 p-2 p-0 d-flex ">
                <div>
                  <text style={{ fontWeight: '700' }}>Street Name:</text>
                </div>
                <text>&nbsp;&nbsp;</text>
             <text>Deira</text>
              </div>

              <div className="mb-n0 p-2 p-0 d-flex ">
                <div>
                  <text style={{ fontWeight: '700' }}>PostCode:</text>
                </div>
                <text>&nbsp;&nbsp;</text>
             <text>en34hy</text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrdersDetail;
