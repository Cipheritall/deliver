export default {
    name: 'payment',
    title: 'Payment',
    type: 'document',
    fields: [
      {
        name: 'user',
        title: 'User',
        type: 'reference',
        to: [{type: 'user'}]
      },
      {
        name: 'order',
        title: 'Order',
        type: 'reference',
        to: [{type: 'order'}]
      },
      {
        name: 'amount',
        title: 'Amount',
        type: 'number'
      },
      {
        name: 'payment_method',
        title: 'Payment Method',
        type: 'string',
        options: {
          list: [
            {title: 'Credit Card', value: 'credit_card'},
            {title: 'Debit Card', value: 'debit_card'},
            {title: 'PayPal', value: 'paypal'},
            {title: 'Google Pay', value: 'google_pay'},
            {title: 'Apple Pay', value: 'apple_pay'},
            {title: 'Crypto', value: 'crypto'}
          ],
          layout: 'radio'
        }
      },
      {
        name: 'credit_card',
        title: 'Credit Card Information',
        type: 'object',
        fields: [
          {
            name: 'card_number',
            title: 'Card Number',
            type: 'string'
          },
          {
            name: 'expiration_date',
            title: 'Expiration Date',
            type: 'date'
          },
          {
            name: 'cvv',
            title: 'CVV',
            type: 'string'
          }
        ],
        options: {
          collapsible: true,
          collapsed: true
        }
      },
      {
        name: 'crypto_payment',
        title: 'Crypto Payment Information',
        type: 'object',
        fields: [
          {
            name: 'crypto_address',
            title: 'Crypto Address',
            type: 'string'
          },
          {
            name: 'transaction_id',
            title: 'Transaction ID',
            type: 'string'
          }
        ],
        options: {
          collapsible: true,
          collapsed: true
        }
      }
    ]
  }
  