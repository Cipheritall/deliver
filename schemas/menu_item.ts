export default {
    name: 'menu_item',
    title: 'Menu Item',
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
        type: 'text'
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
        name: 'price',
        title: 'Price',
        type: 'number',
        
      },
      {
        name: 'restaurant',
        title: 'Restaurant',
        type: 'reference',
        to: [{type: 'restaurant'}],
        
      }
    ]
  }
  