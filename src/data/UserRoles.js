const userRoles = [
    { 
      id: 2121, 
      name: 'Admin',
      isActive: true,
      description: 'Full access to all features and settings',
      permissions: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
    },
    { 
      id: 2122, 
      name: 'Editor',
      isActive: false,
      description: 'Can edit content and manage users',
      permissions: ['CREATE', 'READ', 'UPDATE'],
    },
    { 
      id: 2123, 
      name: 'Viewer',
      isActive: true,
      description: 'Read-only access to view content',
      permissions: ['READ'],
    },
    // Add more roles as needed
  ];
  
  export default userRoles;
  