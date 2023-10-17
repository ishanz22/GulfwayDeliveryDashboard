<Card className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
<Card.Body className="pt-0 pb-0 sh-30 sh-lg-8">
  <Row className="g-0 h-100 align-content-center" onClick={() => checkItem(1)}>
    <Col xs="11" lg="1" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-1 order-lg-1 h-lg-100 position-relative">
      <div className="text-muted text-small d-lg-none">Id</div>
      <NavLink to="/customers/detail" className="text-truncate h-100 d-flex align-items-center">
        245
      </NavLink>
    </Col>
    <Col xs="6" lg="2" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-3 order-lg-2">
      <div className="text-muted text-small d-lg-none">Name</div>
      <div className="text-alternate">Joisse Kaycee</div>
    </Col>
    <Col xs="6" lg="2" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-5 order-lg-3">
      <div className="text-muted text-small d-lg-none">Location</div>
      <div className="text-alternate">Leipzig, DE</div>
    </Col>
    <Col xs="6" lg="2" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-4 order-lg-4">
      <div className="text-muted text-small d-lg-none">Spent</div>
      <div className="text-alternate">
        <span>
          <span className="text-small">$</span> 321.75
        </span>
      </div>
    </Col>
    <Col xs="6" lg="2" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-5 order-lg-4">
      <div className="text-muted text-small d-lg-none">Last Order</div>
      <NavLink to="/customers/detail" className="text-truncate h-100 d-flex align-items-center body-link">
        5323
      </NavLink>
    </Col>
    <Col xs="6" lg="2" className="d-flex flex-column justify-content-center mb-2 mb-lg-0 order-last order-lg-5">
      <div className="text-muted text-small d-lg-none mb-1">Status</div>
      <div>
        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top">Newsletter</Tooltip>}>
          <div className="d-inline-block me-2">
            <CsLineIcons icon="shop" className="text-primary" size="17" />
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top">Purchased</Tooltip>}>
          <div className="d-inline-block me-2">
            <CsLineIcons icon="boxes" className="text-primary" size="17" />
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top">Trusted</Tooltip>}>
          <div className="d-inline-block me-2">
            <CsLineIcons icon="check-square" className="text-primary" size="17" />
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top">Phone</Tooltip>}>
          <div className="d-inline-block me-2">
            <CsLineIcons icon="phone" className="text-primary" size="17" />
          </div>
        </OverlayTrigger>
      </div>
    </Col>
    <Col xs="1" lg="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
      <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(1)} onChange={() => {}} />
    </Col>
  </Row>
</Card.Body>
</Card>