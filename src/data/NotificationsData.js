const NotificationData = [
    {
        id: 1,
      title: "Welcome to the Chat App",
      message: "Hello there! This is a test message.",
      type: "text",
      sender: "User123",
      recipients: ["User456", "User789"],
      status:'NEW'
    },
    {
        id:2,
      title: "Important Announcement",
      message: "Don't forget the meeting tomorrow at 10 AM.",
      type: "announcement",
      sender: "User789",
      recipients: ["User123", "User456"],
      status:'NEW'
    },
    {
        id:3,
      title: "New Feature Update",
      message: "We've added some exciting new features to the app!",
      type: "text",
      sender: "User456",
      recipients: ["User123"],
      status:'READ'
    },
    {
        id:4,
      title: "Holiday Greetings",
      message: "Wishing you a Merry Christmas and a Happy New Year!",
      type: "greeting",
      sender: "User123",
      recipients: ["User789"],
            status:'READ'
    },
    {
      id:5,
    title: "Holiday Greetings",
    message: "Wishing you a Merry Christmas and a Happy New Year!",
    type: "greeting",
    sender: "User123",
    recipients: ["User789"],
          status:'READ'
  },
  {
    id:6,
  title: "Holiday Greetings",
  message: "Wishing you a Merry Christmas and a Happy New Year!",
  type: "greeting",
  sender: "User123",
  recipients: ["User789"],
        status:'READ'
},
  ];


export default NotificationData