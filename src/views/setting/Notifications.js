import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { utils, write } from 'xlsx';
import { Row, Col, Button, Dropdown, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import Dialog from '@mui/material/Dialog';
import Select from 'react-select';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Tag } from 'antd';
import { gulfwayBlue } from 'layout/colors/Colors';
import ExcelJS from 'exceljs';
import NotificationData from 'data/NotificationsData';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

const originData = [
  {
    key: '1',
    title: 'Welcome to the Chat App',
    message: 'Hello there! This is a test message.',
    type: 'text',
    sender: 'User123',
    recipients: ['User456', 'User789'],
    status: 'NEW',
  },
  {
    key: '2',
    title: 'Important Announcement',
    message: "Don't forget the meeting tomorrow at 10 AM.",
    type: 'announcement',
    sender: 'User789',
    recipients: ['User123', 'User456'],
    status: 'NEW',
  },
  {
    key: '3',
    title: 'New Feature Update',
    message: "We've added some exciting new features to the app!",
    type: 'text',
    sender: 'User456',
    recipients: ['User123'],
    status: 'READ',
  },
  {
    key: '4',
    title: 'Holiday Greetings',
    message: 'Wishing you a Merry Christmas and a Happy New Year!',
    type: 'greeting',
    sender: 'User123',
    recipients: ['User789'],
    status: 'READ',
  },
  {
    key: '5',
    title: 'Holiday Greetings',
    message: 'Wishing you a Merry Christmas and a Happy New Year!',
    type: 'greeting',
    sender: 'User123',
    recipients: ['User789'],
    status: 'READ',
  },
  {
    key: '6',
    title: 'Holiday Greetings',
    message: 'Wishing you a Merry Christmas and a Happy New Year!',
    type: 'greeting',
    sender: 'User123',
    recipients: ['User789'],
    status: 'READ',
  },
 
];

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Notifications = () => {
  const title = 'Notifications';
  const description = 'Ecommerce Customer List Page';
 

  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const tableHeaderStyle = {
    color: 'grey',
    fontSize: '10px',
  };

  const [filteredData, setFilteredData] = useState(originData);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

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

  // making K,M,B Format

  const exportToExcel = () => {
    const dataToExport = NotificationData.map((item) => ({
      ID: item.id,
      Name: item.name,
      Purchase: `$${item.purchase}`,
      Date: item.date,
      Status: item.status,
    }));

    // Create a new Excel workbook and worksheet
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Orders');

    // Define the column headers
    ws.columns = [
      { header: 'ID', key: 'ID', width: 10 },
      { header: 'Name', key: 'Name', width: 20 },
      { header: 'Purchase', key: 'Purchase', width: 15 },
      { header: 'Date', key: 'Date', width: 15 },
      { header: 'Status', key: 'Status', width: 15 },
    ];

    // Set the header row background color to blue
    ws.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5A94C8' }, // Blue color
      };
    });

    // Populate the worksheet with data
    dataToExport.forEach((item) => {
      ws.addRow(item);
    });

    // Create a buffer for the Excel file
    wb.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'RiderListData.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const exportToPDF = () => {
    const doc = new JsPDF();
    const tableData = NotificationData.map((item) => [item.id, item.name, `$${item.phone}`, item.assignedOrders, item.status]);
    const columns = ['ID', 'Name', 'Phone', 'Assigned Orders', 'Status'];

    doc.autoTable({
      head: [columns],
      body: tableData,
      theme: 'striped',
    });

    doc.save('RiderListData.pdf');
  };

  const handleView = (id) => {
    console.log(`View Item ID ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit Item ID ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete Item ID ${id}`);
    setIsDeleteDialogOpen(true);
  };

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();

      const newData = [...data];
      
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: <span style={tableHeaderStyle}>TITLE</span>,
      dataIndex: 'title',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      editable: true,
    },
    {
      title: <span style={tableHeaderStyle}>MESSAGE</span>,
      dataIndex: 'message',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      editable: true,
    },
    {
      title: <span style={tableHeaderStyle}>TYPE</span>,
      dataIndex: 'type',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      editable: true,
    },
    {
      title: <span style={tableHeaderStyle}>SENDER</span>,
      dataIndex: 'sender',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      editable: true,
    },
    {
      title: <span style={tableHeaderStyle}>STATUS</span>,
      dataIndex: 'status',
      key: 'status',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (text) => {
        let color = 'default';

        if (text === 'READ') {
          color = 'yellow';
        } else if (text === 'NEW') {
          color = 'orange';
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: <span style={tableHeaderStyle}>OPERATION</span>,
      dataIndex: 'operation',
      responsive: ['xs', 'md', 'lg', 'sm', 'xl'],
      render: (_, record) => {
        
        const editable = isEditing(record);
        return editable ? (
          
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
          <span onClick={() => handleDelete(record.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4f',marginLeft:10 }}>
              <CsLineIcons icon="bin" />
            </span>

          </span>
        );

     
      },
      
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirmed = () => {
    setIsDeleteDialogOpen(false);
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
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
              <CsLineIcons icon="sort" />
            </Button>
            <div className="btn-group ms-1 check-all-container">
              <CheckAll
                allItems={allItems}
                selectedItems={selectedItems}
                onToggle={toggleCheckAll}
                inputClassName="form-check"
                className="btn btn-outline-primary btn-custom-control py-0"
              />
              <Dropdown align="end">
                <Dropdown.Toggle className="dropdown-toggle dropdown-toggle-split" variant="outline-primary" />
                <Dropdown.Menu>
                  <Dropdown.Item>Move</Dropdown.Item>
                  <Dropdown.Item>Archive</Dropdown.Item>
                  <Dropdown.Item>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row className="mb-3">
        <Col md="5" lg="3" xxl="2" className="mb-1">
          {/* Search Start */}

          {/* Search End */}
        </Col>
        <Col md="7" lg="9" xxl="10" className="mb-1 text-end">
          {/* Print Button Start */}
          {/* <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Print</Tooltip>}>
            <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow">
              <CsLineIcons icon="print" />
            </Button>
          </OverlayTrigger> */}
          {/* Print Button End */}

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

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowSelection={rowSelection}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
 

  {/* 
  This is a custom Pagination that is not working and has been removed.
  However, there's an antd Pagination  in use.
*/}

      {/* <div className="d-flex justify-content-center mt-5">
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
      </div> */}
      {/* Pagination End */}

      <Dialog open={isDeleteDialogOpen} onClose={handleDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this Notification?</DialogContentText>
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

export default Notifications;
