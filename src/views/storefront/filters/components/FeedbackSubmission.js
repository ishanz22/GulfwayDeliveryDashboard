import React from 'react';

const dummyData = [
  {
    id: 1,
    name: 'John Doe',
    date: '2d',
    description: 'DC Tenant ',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4bCSBiL3114mq9BSIZmJ3Rq6huVNeW053516pM5IhIZeNtVGvSWtaXrE12AJUSSHij0&usqp=CAU',
    survey: 'survey completed',
  },
  {
    id: 2,
    name: 'Jane Johnson',
    date: '3d',
    description: 'DC Tenant ',
    imageUrl: 'https://img.freepik.com/free-photo/close-up-young-person-barbeque_23-2149271990.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696636800&semt=ais',
    survey: 'survey completed',
  },
  {
    id: 3,
    name: 'Sarah Davis',
    date: '4d',
    description: 'DC Tenant',
    imageUrl: 'https://media.istockphoto.com/id/1307791658/photo/headshot-portrait-of-arabic-businessman-posing-in-office.jpg?s=612x612&w=0&k=20&c=V8Wqmr-x6KYXdPDV-iAi5pjJqgKGasOCRYUSNUNsltM=',
    survey: 'survey completed',
  },
  {
    id: 4,
    name: 'Emily Moore',
    date: '5d',
    description: 'DC Tenant',
    imageUrl: 'https://img.freepik.com/free-photo/portrait-young-bearded-man-looking-camera_23-2148187159.jpg?w=2000',
    survey: 'survey completed',
  },
  {
    id: 5,
    name: 'Emily Moore',
    date: '5d',
    description: 'DC Tenant',
    imageUrl: 'https://img.freepik.com/free-photo/portrait-young-bearded-man-looking-camera_23-2148187159.jpg?w=2000',
    survey: 'survey completed',
  },
  {
    id: 6,
    name: 'Emily Moore',
    date: '5d',
    description: 'DC Tenant',
    imageUrl: 'https://img.freepik.com/free-photo/portrait-young-bearded-man-looking-camera_23-2148187159.jpg?w=2000',
    survey: 'survey completed',
  },
  {
    id: 7,
    name: 'Emily Moore',
    date: '5d',
    description: 'DC Tenant',
    imageUrl: 'https://img.freepik.com/free-photo/portrait-young-bearded-man-looking-camera_23-2148187159.jpg?w=2000',
    survey: 'survey completed',
  },
  {
    id: 8,
    name: 'Emily Moore',
    date: '5d',
    description: 'DC Tenant',
    imageUrl: 'https://img.freepik.com/free-photo/portrait-young-bearded-man-looking-camera_23-2148187159.jpg?w=2000',
    survey: 'survey completed',
  },

];

function FeedbackSubmission({ data }) {
  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      <div className="d-flex align-items-center">
        <div>
          <div style={{ width: '50px', height: '50px' }} className="rounded-circle">
            <img
              src={data.imageUrl}
              alt={`Profile image of ${data.name}`}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
        <div className="ml-3 p-2">
          <div className="font-weight-bold">
            {data.name} - {data.survey}
          </div>
          <div className="text-muted">
            {data.date} &nbsp; {data.description}
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-primary">
        View
      </button>
    </div>
  );
}

function App() {
  const first6Items = dummyData.slice(0, 6); // Get the first 6 items from the array
  return (
    <div>
      {first6Items.map((data) => (
        <FeedbackSubmission key={data.id} data={data} />
      ))}
    
        <button type="button" className="btn btn-primary" style={{ width: '100%' }}>
          Show All
        </button>
 
    </div>
  );
}

export default App;
