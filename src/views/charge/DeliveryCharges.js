import React, { useState } from 'react';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const DeliveryCharges = () => {
  const title = 'Delivery';
  const description = 'Ecommerce Settings General Page';

  const [locationValue, setLocationValue] = useState({ value: 'JP', label: 'JP' });
  const locationOptions = [
    { value: 'BR', label: 'BR' },
    { value: 'DE', label: 'DE' },
    { value: 'FR', label: 'FR' },
    { value: 'JP', label: 'JP' },
    { value: 'US', label: 'US' },
    { value: 'UK', label: 'UK' },
  ];

  const [countryValue, setCountryValue] = useState({ value: 'Japan', label: 'Japan' });
  const countryOptions = [
    { value: 'Brazil', label: 'Brazil' },
    { value: 'Deutschland', label: 'Deutschland' },
    { value: 'France', label: 'France' },
    { value: 'Japan', label: 'Japan' },
    { value: 'United States of America', label: 'United States of America' },
    { value: 'United Kingdom', label: 'United Kingdom' },
  ];

  const [smallOrderValue, setsmallOrderValue] = useState({ value: 2, label: '2 AED' });
  const currencyOptions = [
    { value: 2, label: '2 AED' },
    { value: 3, label: '3 AED' },
    { value: 4, label: '4 AED' },
    { value: 5, label: '5 AED' },
  ];


  const [minimuOrder, setminimuOrder] = useState({ value: 2, label: '10 AED' })
  const minimumOrderCount = [
    { value: 10, label: '10 AED' },
    { value: 20, label: '20 AED' },
    { value: 30, label: '30 AED' },
  ];


  const [restaurant, setRestaurant] = useState({ value: "SS Bucket Biryani", label: 'SS Bucket Biryani' })
  const selectRestaurant = [
    { value: "SS Bucket Biryani", label: 'SS Bucket Biryani' },
    { value: "My Home Kitchen", label: 'My Home Kitchen' },
    { value: "Laptop Lunch Dubai", label: 'Laptop Lunch Dubai' },
    { value: "Maharaja Bhog", label: 'Maharaja Bhog' },
  ];
  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/settings">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Home</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button variant="outline-primary" className="btn-icon btn-icon-start w-100 w-md-auto">
              <CsLineIcons icon="save" /> <span>Save</span>
            </Button>
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row>
        <Col xl="8">
          {/* Location Start */}

          {/* Location End */}

          {/* Location Start */}

          {/* Location End */}

          {/* Currency Options Start */}
          <h2 className="small-title">Charge Options</h2>
          <Card>
            <Card.Body>
              <Form className="mb-n3">
              <div className="mb-3">
                  <Form.Label>Select restaurant</Form.Label>
                  <Select classNamePrefix="react-select" options={selectRestaurant} value={restaurant} onChange={setRestaurant} placeholder="" />
                </div>
                <div className="mb-3">
                  <Form.Label>Free Delivery</Form.Label>
                  <Form.Control type="text" defaultValue="0.00" />
                </div>

                <div className="mb-3">
                  <Form.Label>Delivery Charges</Form.Label>
                  <Form.Control type="text" id="deliveryCharges" defaultValue="12.50" />
                </div>

                <div className="mb-3">
                  <Form.Label>Small Order Charge</Form.Label>
                  <Select classNamePrefix="react-select" options={currencyOptions} value={smallOrderValue} onChange={setsmallOrderValue} placeholder="" />
                </div>
                     <div className="mb-3">
                  <Form.Label>Minimum Order</Form.Label>
                  <Select classNamePrefix="react-select" options={minimumOrderCount} value={minimuOrder} onChange={setminimuOrder} placeholder="" />
                </div>
                   <div className="mb-3">
                  <Form.Label>Minimum Order</Form.Label>
                  <Select classNamePrefix="react-select" options={minimumOrderCount} value={minimuOrder} onChange={setminimuOrder} placeholder="" />
                </div>
              </Form>
            </Card.Body>
          </Card>
          {/* Currency Options End */}
        </Col>
        <Col xl="4">
          <h2 className="small-title">Promotional Codes </h2>
          <Card className="mb-5">
            <Card.Body>
              <Form className="mb-n3">
                <div className="mb-3">
                  <Form.Label>Promo Code</Form.Label>
                  <Form.Control type="text" defaultValue="1234" />
                </div>
                <div className="mb-3">
                  <Form.Label>Promo Code Quantity (Optional)</Form.Label>
                  <Form.Control type="text" defaultValue="100" />
                </div>
                <div className="mb-3">
                  <Form.Label>Promo Code Expiration Date (Optional)</Form.Label>
                  <Form.Control type="text" defaultValue="" />
                </div>
                {/* <div className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" defaultValue="info@myawesomestore.com" disabled />
                </div> */}
                <div className="mb-3">
                  <Form.Label> Description (optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    defaultValue=""
                  />
                </div >
                <div className="mb-3" style={{ display: 'flex', justifyContent: 'center',paddingTop:"6px"}}>
  <button type="button" className="btn btn-primary" style={{ width: '200px' }}>
    Update
  </button>
</div>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="small-title">Popular Categories</h2>
      <Row className="g-2 row-cols-2 row-cols-md-3 row-cols-xl-6 mb-5">
        <Col className="sh-19">
          <Card className="h-100 hover-border-primary">
            <Card.Body className="text-center">
              <NavLink to="/storefront/categories">
                <CsLineIcons icon="pepper" className="text-primary" />
                <p className="heading mt-3 text-body">Pepper</p>
                <div className="text-extra-small fw-medium text-muted">14 PRODUCTS</div>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col className="sh-19">
          <Card className="h-100 hover-border-primary">
            <Card.Body className="text-center">
              <NavLink to="/storefront/categories">
                <CsLineIcons icon="radish" className="text-primary" />
                <p className="heading mt-3 text-body">Radish</p>
                <div className="text-extra-small fw-medium text-muted">3 PRODUCTS</div>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col className="sh-19">
          <Card className="h-100 hover-border-primary">
            <Card.Body className="text-center">
              <NavLink to="/storefront/categories">
                <CsLineIcons icon="loaf" className="text-primary" />
                <p className="heading mt-3 text-body">Bread</p>
                <div className="text-extra-small fw-medium text-muted">8 PRODUCTS</div>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col className="sh-19">
          <Card className="h-100 hover-border-primary">
            <Card.Body className="text-center">
              <NavLink to="/storefront/categories">
                <CsLineIcons icon="pear" className="text-primary" />
                <p className="heading mt-3 text-body">Pear</p>
                <div className="text-extra-small fw-medium text-muted">9 PRODUCTS</div>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col className="sh-19">
          <Card className="h-100 hover-border-primary">
            <Card.Body className="text-center">
              <NavLink to="/storefront/categories">
                <CsLineIcons icon="banana" className="text-primary" />
                <p className="heading mt-3 text-body">Banana</p>
                <div className="text-extra-small fw-medium text-muted">3 PRODUCTS</div>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col className="sh-19">
          <Card className="h-100 hover-border-primary">
            <Card.Body className="text-center">
              <NavLink to="/storefront/categories">
                <CsLineIcons icon="loaf" className="text-primary" />
                <p className="heading mt-3 text-body">Mushrooms</p>
                <div className="text-extra-small fw-medium text-muted">4 PRODUCTS</div>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DeliveryCharges;
