import React, { useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { DatePicker } from 'antd';
import Select from 'react-select';

const { RangePicker } = DatePicker;

function DateRange() {
  const [selectedDisplayMode1, setSelectedDisplayMode1] = useState('Daily');

  const optionsState = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
  ];

  return (
    <Card className="sh-45 h-xl-100-card">
      <Card.Body className="h-100 d-flex flex-column align-items-center justify-content-center">
        <div style={{display:'flex'}}>

        <div style={{width:"300px"}}>
        <RangePicker />
        </div>
      <div style={{width:"150px"}}>

  
          <Select
            classNamePrefix="react-select"
            options={optionsState}
            value={{ value: selectedDisplayMode1, label: selectedDisplayMode1 }}
            onChange={(selectedOption) => setSelectedDisplayMode1(selectedOption.value)}
            placeholder=""
          />
           </div>
           </div>
      </Card.Body>
    </Card>
  );
}

export default DateRange;
