const userPermissionData = [
    { 
      id: 2121, 
      name: "John Doe",
      isActive: true,
      description: 'Full access to all features and settings',
      permissions: ['orders', 'grocery', 'vendor grocery', 'grocery list'],
      userRole: ["MANAGER", "ADMIN","ADMIN","ADMIN","ADMIN"],
      userImage: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
      email:"alice.johnson@example.com",
      date:'2023-01-15',
      updatedDate:'2023-06-25'
    },
    { 
      id: 2122, 
      name: "Jane Smith",
      isActive: false,
      description: 'Can edit content and manage users',
      permissionCount: 12,
      userRole: ["ADMIN"],
      userImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
      email:"bob.wilson@example.com",
      permissions: ['dashboard', 'vendor dashboard', 'restaurant', 'restaurant list'],
      date:'2023-03-05',
      updatedDate:'2023-04-22'
      
    },
    { 
      id: 2123, 
      name: "Robert Johnson",
      isActive: true,
      description: 'Read-only access to view content',
      permissionCount: 10,
      userRole: ["MANAGER", "ADMIN", "AUDITOR"],
      userImage: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg",
      email:"john.doe@example.com",
      date:"2023-04-20",
      permissions: ['orders', 'grocery', 'vendor', 'grocery list'],
      updatedDate:'2023-05-11'
    },
    { 
        id: 2124, 
        name: "Emily Wilson",
        isActive: true,
        description: 'Read-only access to view content',
        permissionCount: 10,
        userRole: ["ADMIN"],
        userImage: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        email:"eva.brown@example.com",
        date:"2023-06-10",
        permissions: ['orders', 'grocery', 'vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting','orders', 'grocery', 'vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting'],
        updatedDate:'2023-06-01'

      },
      { 
        id: 2125, 
        name: "Carl Wilson",
        isActive: true,
        description: 'Read-only access to view content',
        permissionCount: 10,
        userRole: ["ADMIN"],
        userImage: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        email:"eva.brown@example.com",
        date:"2023-06-10",
        permissions: ['orders', 'grocery', 'vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting','orders', 'grocery', 'vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting','vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting'],
        updatedDate:'2023-06-02'

      },
      { 
        id: 2126, 
        name: "John Wilson",
        isActive: true,
        description: 'Read-only access to view content',
        permissionCount: 10,
        userImage: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        email:"eva.brown@example.com",
        date:"2023-06-10",
        userRole: ["ADMIN"],
        permissions: ['orders', 'grocery', 'vendor grocery', 'grocery list'],
        updatedDate:'2023-06-17'

      },
      { 
        id: 2127, 
        name: 'Amanda Audrey',
        isActive: true,
        description: 'Read-only access to view content',
        permissionCount: 10,
        userRole: [""],
        userImage: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        email:"eva.brown@example.com",
        date:"2023-06-10",
        permissions: ['orders',  'vendor grocery', 'grocery list'],
        updatedDate:'2023-06-17'

      },
      { 
        id: 2128, 
        name: 'Tracey Sally',
        isActive: true,
        description: 'Read-only access to view content',
        permissionCount: 10,
        userRole: [""],
        userImage: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        email:"eva.brown@example.com",
        date:"2023-06-10",
        permissions: [ 'grocery', 'vendor grocery', 'grocery list'],
        updatedDate:'2023-06-17'

      },
      { 
        id: 2129, 
        name: 'Victoria Wendy',
        isActive: true,
        description: 'Read-only access to view content',
        permissionCount: 10,
        userRole: [""],
        userImage: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        email:"eva.brown@example.com",
        date:"2023-06-10",
        permissions: ['orders', 'grocery', 'vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting','orders', 'grocery', 'vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting','vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting'],
        updatedDate:'2023-06-17'
      },

  ];
  
  export default userPermissionData;
  