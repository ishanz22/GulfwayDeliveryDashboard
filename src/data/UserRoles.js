const userRoles = [
    { 
      id: 2121, 
      name: 'Admin',
      isActive: true,
      description: 'Full access to all features and settings',
      permissions: ['dashboard', 'vendor dashboard', 'vendor restaurant', 'restaurant list'],
      date:'2023-01-15',
      updatedDate:'2023-03-15'
    },
    { 
      id: 2122, 
      name: 'Editor',
      isActive: false,
      description: 'Can edit content and manage users',
      permissions: ['orders', 'grocery', 'vendor grocery', 'grocery list'],
      date:'2023-03-05',
      updatedDate:'2023-05-16'
    },
    { 
      id: 2123, 
      name: 'Viewer',
      isActive: true,
      description: 'Read-only access to view content',
      permissions: ['orders', 'grocery', 'vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting','orders', 'grocery', 'vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting'],
      date:"2023-04-20",
         updatedDate:'2023-06-25'
    },
    { 
      id: 2124, 
      name: 'Manager',
      isActive: true,
      description: 'Read-only access to view content',
      permissions: ['orders', 'grocery', 'vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting','orders', 'grocery', 'vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting','vendor grocery', 'grocery list','wishlist','rewards','products','riders','setting'],
      date:"2023-02-10",
      updatedDate:'2023-04-22'
    },
    // Add more roles as needed
  ];
  
  export default userRoles;
  