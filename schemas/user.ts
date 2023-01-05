export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
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
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true
          }
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
            name: 'address',
            title: 'Address',
            type: 'string',
        },
        {
            name: 'gps_coordinates',
            title: 'GPS Coordinates',
            type: 'object',
            fields: [
                {
                    name: 'latitude',
                    title: 'Latitude',
                    type: 'number',
                },
                {
                    name: 'longitude',
                    title: 'Longitude',
                    type: 'number',
                }
            ]
        },
        {
            name: 'confidence_score',
            title: 'Confidence Score',
            type: 'number',
        },
        {
            name: 'password',
            title: 'Password',
            type: 'string',
        },
    ]
}
