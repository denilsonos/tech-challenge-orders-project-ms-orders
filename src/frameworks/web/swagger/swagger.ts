export const swaggerUiOptions = {
    routePrefix: '/docs',
    exposeRoute: true,
}

export const swaggerOptions = {
    swagger: {
        info: {
            title: 'Tech Challenge - Orders Project',
            description: 'Project developed to serve a restaurant ordering system.',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        tags: [
            { name: 'Health', description: 'Health check endpoints' },
            { name: 'Item', description: 'Item\'s endpoints' },
            { name: 'Order', description: 'Order\'s endpoints' }
        ]
    }
}