export default {
    name: 'rating_review',
    title: 'Rating & Review',
    type: 'document',
    fields: [
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                maxLength: 96
            },
        },
        {
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{ type: 'user' }],
            validation: Rule => Rule.required()
        },
        {
            name: 'restaurant',
            title: 'Restaurant',
            type: 'reference',
            to: [{ type: 'restaurant' }],
            validation: Rule => Rule.required()
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: Rule => Rule.required()
        },
        {
            name: 'review',
            title: 'Review',
            type: 'text'
        },
        {
            name: 'timestamp',
            title: 'Timestamp',
            type: 'datetime',
            validation: Rule => Rule.required()
        }
    ]
}
