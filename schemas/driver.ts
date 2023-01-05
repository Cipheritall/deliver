export default {
    name: 'driver',
    title: 'Driver',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96
        },
        
      },
      {
        name: 'user',
        title: 'User',
        type: 'reference',
        to: [{type: 'user'}],
        
      },
      {
        name: 'email',
        title: 'Email',
        type: 'email',
        
      },
      {
        name: 'phone',
        title: 'Phone',
        type: 'string',
        
      },
      {
        name: 'location_history',
        title: 'Location History',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'timestamp',
                title: 'Timestamp',
                type: 'datetime',
                
              },
              {
                name: 'location',
                title: 'Location',
                type: 'geopoint',
                
              },
              {
                name: 'precision',
                title: 'Precision',
                type: 'number',
                
              }
            ]
          }
        ]
      },
      {
        name: 'available',
        title: 'Available',
        type: 'boolean',
        
      }
    ]
  }
  