import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import ReactTags from 'react-tag-autocomplete';
import { Row, Col, Button, Dropdown, Card, Badge, Form } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { restaurantById } from 'actions/restaurant';
import cashImage from '../../../../assets/money.png';
import withdrawImage from '../../../../assets/money-withdrawal.png';
import withdrawBalanceImage from '../../../../assets/withdrawal.png';
import totalEarningImage from '../../../../assets/salary.png';

const GroceryDetail = ({ google }) => {
  const googleImageUrl =
    'https://hips.hearstapps.com/hmg-prod/images/2024-lamborghini-revuelto-127-641a1d518802b.jpg?crop=0.566xw:1.00xh;0.184xw,0&resize=640:*';

  const location = useLocation();
  const { record } = location.state;

  if (!record) {
    return <p>Vendor not found</p>;
  }
  console.log('record Details:', record);

  const title = 'Grocery Detail';

  const description = 'Ecommerce Customer Detail Page';

  // 🩸
  // const { restaurantId } = useParams();

  // const dispatch = useDispatch();

  // 🩸
  // console.log(restaurantId);

  // const getGrocerybyId = () => {
  //   console.log(restaurantId);
  //   dispatch(restaurantById({ id: restaurantId }));
  // };

  // const { restaurant } = useSelector((state) => state.restaurant);

  // useEffect(() => {
  //   getGrocerybyId();
  //   console.log(restaurant);
  //   // setrestaurant(restaurant);
  // }, []);

  // Tags
  const [tags, setTags] = useState([
    { id: 0, name: 'Rates' },
    { id: 1, name: 'Sales Shopper' },
    { id: 2, name: 'Newsletter' },
  ]);
  const onTagDelete = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };
  const onTagAddition = (tag) => {
    setTags(() => {
      return [...tags, tag];
    });
  };

  const dummyData = [
    {
      id: 1,
      name: 'Kommissbrot',
      description: 'Whole Wheat',
      category: "Chinese",
      pricePerUnit: 1.1,
      total: 13.2,
      image: '/img/product/small/product-1.webp',
      discount:'30%'
    },
    {
      id: 2,
      name: 'Ruisreikäleipä',
      description: 'Multigrain',
      category: "Japanese",
      pricePerUnit: 2.75,
      total: 8.25,
      image: '/img/product/small/product-2.webp',
      discount:'10%'
    },
    {
      id: 3,
      name: 'Cornbread',
      description: 'Sourdough',
      category: "Korean",
      pricePerUnit: 7.5,
      total: 15.0,
      image: '/img/product/small/product-3.webp',
      discount:'20%'
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
          {/* Title End */}

          {/* Top Buttons Start */}

          {/* Top Buttons End */}
        </Row>
      </div>

      <Row className="g-2 row-cols-1 row-cols-md-2 row-cols-xl-2 row-cols-xxl-3">
        {/* Merged Cards on the Left */}
        <Col md={6}>
          <Card style={{ backgroundColor: '#E0F0FF' }} className="mb-0 flex-fill custom-card h-100">
            <Row className="g-0 custom-card-body">
              <Col className="text-center">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <div className="mb-3">Collected cash by grocery</div>
                  <div className="d-flex h6">
                    <img src={cashImage} alt="Image Description" style={{ maxWidth: 'auto', height: '35px', marginRight: '10px' }} />

                    <div className="mb-3 fw-bold fs-0" style={{ fontWeight: 'bold', fontSize: '24px', color: '#47566B' }}>
                      1000 AED
                    </div>
                  </div>
                  <NavLink to="/vendors/Grocery/collection" className="w-100">
                    <button type="submit" className="btn btn-primary w-100 btn-block">
                      Collect cash from restaurant
                    </button>
                  </NavLink>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Two Flex Cards on the Right */}
        <Col md={6}>
          {/* Card 1 */}
          <Card style={{ backgroundColor: '#E1F2E8' }} className="mb-2 flex-fill custom-card">
            <Row className="g-0 custom-card-body">
              <Col>
                <Card.Body className="d-flex align-items-center py-3">
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div className="mb-2 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <div className="fw-bold fs-6" style={{ color: '#388F6D' }}>
                          2300 AED
                        </div>
                      </div>

                      <div>
                        <div className=" d-inline-block  align-text-top">Pending withdraw</div>
                      </div>
                    </div>
                    <div className="mb-0 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <img src={withdrawImage} alt="Image Description" style={{ maxWidth: '30px', height: 'auto' }} />
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          {/* Card 2 */}
          <Card style={{ backgroundColor: '#FEF4EB' }} className="mb-2 flex-fill custom-card">
            <Row className="g-0 custom-card-body">
              <Col>
                <Card.Body className="d-flex align-items-center py-3">
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div className="mb-2 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <div className="fw-bold fs-6" style={{ color: '#394052' }}>
                          2300 AED
                        </div>
                      </div>
                      <div>
                        <div className=" d-inline-block  align-text-top">Withdraw able balance</div>
                      </div>
                    </div>
                    <div className="mb-0 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <img src={withdrawBalanceImage} alt="Image Description" style={{ maxWidth: '30px', height: 'auto' }} />
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Two Fixed-Height Cards on the Right */}
        <Col md={6}>
          {/* Card 3 */}
          <Card style={{ backgroundColor: '#FFEDED' }} className="mb-2 custom-card">
            <Row className="g-0 custom-card-body">
              <Col>
                <Card.Body className="d-flex align-items-center py-3">
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div className="mb-2 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <div className="fw-bold fs-6" style={{ color: '#F39067' }}>
                          2300 AED
                        </div>
                      </div>
                      <div>
                        <div className=" d-inline-block  align-text-top">Total withdrawn amount</div>
                      </div>
                    </div>
                    <div className="mb-0 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <img src={withdrawBalanceImage} alt="Image Description" style={{ maxWidth: '30px', height: 'auto' }} />
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          {/* Card 4 */}
          <Card style={{ backgroundColor: '#E0F0FF' }} className="mb-2 custom-card">
            <Row className="g-0 custom-card-body">
              <Col>
                <Card.Body className="d-flex align-items-center py-3">
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div className="mb-2 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-medium sh-2" />
                        <div className="fw-bold fs-6" style={{ color: '#106BA4' }}>
                          2300 AED
                        </div>
                      </div>
                      <div>
                        <div className=" d-inline-block  align-text-top">Total earning</div>
                      </div>
                    </div>
                    <div className="mb-0 h6">
                      <div className="card-text mb-2">
                        <div className="text-muted text-overline text-small sh-2" />
                        <img src={totalEarningImage} alt="Image Description" style={{ maxWidth: '30px', height: 'auto' }} />
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <h2 className="small-title mt-5">Grocery Info</h2>

      {/* Grocery Info section */}
      <Card className="mb-5" style={{ borderRadius: '15px', height: '200px' }}>
        <Card.Body style={{ padding: 0 }}>
          <Form>
            <Row className="g-3">
              {/* Search Input on the Right */}

              <Col lg="6" className="p-5">
                <Row className="g-3">
                  <Col lg="15" className="d-flex">
                    <div style={{ width: '90%', display: 'flex' }}>
                      <div style={{ display: 'flex' }}>
                        <div className="profile-box" style={{ paddingRight: '10px' }}>
                          {/* Add your box image for the profile here */}
                          <img
                            src="https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg"
                            alt="Profile Box"
                            className="profile-box-image "
                            width="120"
                            height="140"
                            style={{ borderRadius: '10px' }}
                          />
                        </div>

                        <div>
                          <Row className="g-0 mb-2">
                            <Col xs="auto">
                              <div className="sw-3 me-1">
                                <CsLineIcons icon="user" size="17" className="text-primary" />
                              </div>
                            </Col>
                            <Col className="text-alternate">{record.name}</Col>
                          </Row>

                          <Row className="g-0 mb-2">
                            <Col xs="auto">
                              <div className="sw-3 me-1">
                                <CsLineIcons icon="email" size="17" className="text-primary" />
                              </div>
                            </Col>
                            <Col className="text-alternate">{record.email}</Col>
                          </Row>
                          <Row className="g-0 mb-2">
                            <Col xs="auto">
                              <div className="sw-3 me-1">
                                <CsLineIcons icon="pin" size="17" className="text-primary" />
                              </div>
                            </Col>
                            <Col className="text-alternate">
                              <div>{record.location}</div>
                              <div>
                                <span style={{ fontWeight: 'bold' }}>Lat</span> {record.latitude} - <span style={{ fontWeight: 'bold' }}>Long</span>{' '}
                                {record.longitude}
                              </div>
                            </Col>
                          </Row>
                          {/* 
                          <Row className="g-0 mb-2">
                            <Col xs="auto">
                              <div className="sw-3 me-1">
                                <CsLineIcons icon="pin" size="17" className="text-primary" />
                              </div>
                            </Col>
                            <Col className="text-alternate">
                              <div>{record.location}</div>
                         
                            </Col>
                            
                          </Row> */}
                          <Row className="g-0 mb-2">
                            <Col xs="auto">
                              <div className="sw-3 me-1">
                                <CsLineIcons icon="phone" size="17" className="text-primary" />
                              </div>
                            </Col>
                            <Col className="text-alternate">{record.phone}</Col>
                          </Row>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          padding: 5,
                          borderRadius: 5,

                          backgroundColor: (() => {
                            switch (record.status) {
                              case 'APPROVED':
                                return '#E1F2E8';
                              case 'PENDING':
                                return '#FEF4EB';
                              case 'DECLINED':
                                return '#FFF2F0';
                              default:
                                return '';
                            }
                          })(),

                          color: (() => {
                            switch (record.status) {
                              case 'APPROVED':
                                return '#388F6D';
                              case 'PENDING':
                                return '#F39067';
                              case 'DECLINED':
                                return '#FF4D4F';
                              default:
                                return '';
                            }
                          })(),
                          borderColor: (() => {
                            switch (record.status) {
                              case 'Approved':
                                return '#388F6D';
                              case 'Pending':
                                return '#F39067';
                              case 'Decline':
                                return 'darkblue';
                              default:
                                return '';
                            }
                          })(),
                          borderWidth: 1, // You can adjust the border width as needed
                          borderStyle: 'solid',
                        }}
                        className="text-small"
                      >
                        {' '}
                        {record.status}
                      </div>
                    </div>
                  </Col>
                </Row>
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
          </Form>
        </Card.Body>
      </Card>

      <Row className="row-cols-1 row-cols-md-2 g-2 mb-5">
        <Col>
          <h2 className="small-title">Owner Info</h2>
          <Card className=" h-100">
            <Card.Body>
              <Form>
                <Row className="g-3">
                  {/* Search Input on the Right */}

                  <Col className="p-0">
                    <Row className="g-3">
                      <Col lg="15">
                        <div>
                          <div style={{ display: 'flex' }}>
                            <div className="profile-box" style={{ paddingRight: '10px' }}>
                              {/* Add your box image for the profile here */}
                              <img
                                src="https://i0.wp.com/florrycreativecare.com/wp-content/uploads/2020/08/blank-profile-picture-mystery-man-avatar-973460.jpg?ssl=1"
                                alt="Profile Box"
                                className="profile-box-image rounded-circle"
                                width="120"
                                height="120"
                                style={{ borderRadius: '10px' }}
                              />
                            </div>

                            <div>
                              <Row className="g-0 mb-2">
                                <Col xs="auto">
                                  <div className="sw-3 me-1">
                                    <CsLineIcons icon="user" size="17" className="text-primary" />
                                  </div>
                                </Col>
                                <Col className="text-alternate">{record.ownerName}</Col>
                              </Row>
                              <Row className="g-0 mb-2">
                                <Col xs="auto">
                                  <div className="sw-3 me-1">
                                    <CsLineIcons icon="email" size="17" className="text-primary" />
                                  </div>
                                </Col>
                                <Col className="text-alternate">{record.email}</Col>
                              </Row>
                              <Row className="g-0 mb-2">
                                <Col xs="auto">
                                  <div className="sw-3 me-1">
                                    <CsLineIcons icon="pin" size="17" className="text-primary" />
                                  </div>
                                </Col>
                                <Col className="text-alternate">
                                  <div>{record.ownerAddress}</div>
                                  <div>
                                    <span style={{ fontWeight: 'bold' }}>Lat</span> {record.latitude} - <span style={{ fontWeight: 'bold' }}>Long</span>{' '}
                                    {record.longitude}
                                  </div>
                                </Col>{' '}
                              </Row>
                              <Row className="g-0 mb-2">
                                <Col xs="auto">
                                  <div className="sw-3 me-1">
                                    <CsLineIcons icon="phone" size="17" className="text-primary" />
                                  </div>
                                </Col>
                                <Col className="text-alternate">{record.ownerPhone}</Col>
                              </Row>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h2 className="small-title">Bank Info</h2>
          <Card className="h-100">
            <Card.Body>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div>Bank Name</div>
                <div className="text-alternate">{record.bank}</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div>Account Holder Name</div>
                <div className="text-alternate">{record.accountHolder}</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div>Account Number</div>
                <div className="text-alternate">{record.AccountNumber}</div>
              </div>
              <div className="mb-n0 p-3 d-flex justify-content-between">
                <div>IBAN </div>
                <div className="text-alternate">{record.IBAN}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className="small-title mt-5">Grocery modal</h2>
          <Card>
            <Card.Body>
              <Form>
                <Row className="g-3">
                  {/* Search Input on the Right */}

                  <Col className="p-0">
                    <Row className="g-3">
                      <Col lg="15">
                        <div className="mb-5">
                          {dummyData.map((item) => (
               <Row key={item.id} className="g-0 sh-9 mb-3">
               <Col xs="auto">
                 <img src={item.image} className="card-img rounded-md h-100 sw-13" alt="thumb" />
               </Col>
               <Col>
                 <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                   <Row className="g-0 h-100 align-items-start align-content-center">
                     <Col xs="12" className="d-flex flex-column mb-2">
                       <div>{item.name}</div>
                       <div className="text-muted text-small d-flex justify-content-between">
                         <span>{item.description}</span>
                         <span>{item.discount} Discount</span>
                       </div>
                     </Col>
             
                     <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                       <Row className="g-0">
                         <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                           <span>{item.category}</span>
                           <span>
                             &nbsp;
                             {item.pricePerUnit.toFixed(2)}
                           </span>
                         </Col>
             
                         <Col xs="6">
                           <span className="d-flex flex-row align-items-end justify-content-end text-alternate">
                          <text >AED</text> &nbsp;
                             {item.total.toFixed(2)}
                           </span>
                         </Col>
                       </Row>
                     </Col>
                   </Row>
                 </div>
               </Col>
             </Row>
             
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className="small-title mt-5">Identification Info</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="g-4">
                  <Col lg="4">
                    <Form.Label>Emirates ID</Form.Label>
                    <div>
                      <img src={record.emiratesID} alt="Google Image" style={{ borderRadius: '10px', height: '120px', width: '200px' }} />
                    </div>
                            &nbsp;
                    <div>
                      <img src={record.emiratesIdBack} alt="Google Image" style={{ borderRadius: '10px', height: '120px', width: '200px' }} />
                    </div>
                  </Col>

                  <Col lg="4">
                    <Form.Label>License</Form.Label>
                    <div>
                      <img src={record.license} alt="Google Image" style={{ borderRadius: '10px', height: '120px', width: '200px' }} />
                    </div>
                            &nbsp;
                    <div>
                      <img src={record.licenseBack} alt="Google Image" style={{ borderRadius: '10px', height: '120px', width: '200px' }} />
                    </div>
                  </Col>

                  <Col lg="4">
                    <Form.Label>Passport</Form.Label>
                    <div>
                      <img src={record.Passport} alt="Google Image" style={{ borderRadius: '10px', height: '120px', width: '200px' }} />
                    </div>
                            &nbsp;
                    <div>
                      <img src={record.PassportBack} alt="Google Image" style={{ borderRadius: '10px', height: '120px', width: '200px' }} />
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDrI53GlC5-ymZmPKzJq11U36dheMGfeLU',
})(GroceryDetail);
