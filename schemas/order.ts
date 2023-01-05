export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'customer',
                maxLength: 96
            },
            
        },
      {
        name: 'customer',
        title: 'Customer',
        type: 'reference',
        to: [{type: 'user'}],
        
      },
      {
        name: 'restaurant',
        title: 'Restaurant',
        type: 'reference',
        to: [{type: 'restaurant'}],
        
      },
      {
        name: 'driver',
        title: 'Driver',
        type: 'reference',
        to: [{type: 'driver'}]
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
        
      },
      {
        name: 'total_price',
        title: 'Total Price',
        type: 'number',
        
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: [
            {title: 'Received', value: 'received'},
            {title: 'In Progress', value: 'in_progress'},
            {title: 'Completed', value: 'completed'},
            {title: 'Cancelled', value: 'cancelled'}
          ],
          layout: 'radio'
        },
        
      },
      {
        name: 'delivery_address',
        title: 'Delivery Address',
        type: 'string',
        
      },
      {
        name: 'placed_at',
        title: 'Placed At',
        type: 'datetime',
        
      }
    ]
  }
  