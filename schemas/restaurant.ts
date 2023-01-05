export default {
    name: 'restaurant',
    title: 'Restaurant',
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
        name: 'description',
        title: 'Description',
        type: 'text',
        
      },
      {
        name: 'owner',
        title: 'Owner',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'user' }] }],
        
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
        name: 'location',
        title: 'Location',
        type: 'geopoint',
        
      },
      {
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{type: 'menu_item'}]
          }
        ],
        
      }
    ]
  }
  