export const createItemSwagger = () => ({
    schema: {
        tags: ['Item'],
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                category: { type: 'string' },
                value: { type: 'number' },
                image: { type: 'string' },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    itemId: { type: 'number' },
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            }
        }
    }
})

export const findItemSwagger = () => ({
    schema: {
        tags: ['Item'],
        query: {
            category: { type: 'string' }
        },
        response: {
            200: {
                message: { type: 'string' },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            itemId: { type: 'number' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            category: { type: 'string' },
                            value: { type: 'number' },
                            image: { type: 'string' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        }
                    }
                },
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            }
        }
    }
})

export const getItemSwagger = () => ({
    schema: {
        tags: ['Item'],
        params: {
            id: { type: 'number' }
        },
        response: {
            200: {
                message: { type: 'string' },
                item: {
                    type: 'object',
                    properties: {
                        itemId: { type: 'number' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        category: { type: 'string' },
                        value: { type: 'number' },
                        image: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                    }
                },
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            },
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})

export const deleteItemSwagger = () => ({
    schema: {
        tags: ['Item'],
        params: {
            id: { type: 'number' },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            },
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})

export const updateItemSwagger = () => ({
    schema: {
        tags: ['Item'],
        params: {
            id: { type: 'number' },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            },
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})

export const createOrderSwagger = () => ({
    schema: {
        tags: ['Order'],
        body: {
            type: 'object',
            properties: {
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            itemId: { type: 'number' },
                            quantity: { type: 'number' },
                        }
                    }
                },
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    orderId: { type: 'number' },
                    total: { type: 'number' },
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            },
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})

export const createOrderPaymentSwagger = () => ({
    schema: {
        tags: ['Payment'],
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    payment: {
                        type: 'object',
                        properties: {
                            paymentId: { type: 'number' },
                            status: { type: 'string' },
                            value: { type: 'number' },
                            qrCode: { type: 'string' },
                            order: {
                                type: 'object',
                                properties: {
                                    orderId: { type: 'number' },
                                    status: { type: 'string' },
                                    clientId: { type: 'number' },
                                    items: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                itemId: { type: 'number' },
                                                name: { type: 'string' },
                                                description: { type: 'string' },
                                                category: { type: 'string' },
                                                value: { type: 'number' },
                                                image: { type: 'string' },
                                                createdAt: { type: 'string' },
                                                updatedAt: { type: 'string' },
                                            }
                                        }
                                    },
                                    total: { type: 'number' },
                                    createdAt: { type: 'string' },
                                    updatedAt: { type: 'string' }
                                }
                            },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        }
                    },
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            },
            409: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})

export const confirmOrderPaymentSwagger = () => ({
    schema: {
        tags: ['Payment'],
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            }
        },
    }
})

export const recuseOrderPaymentSwagger = () => ({
    schema: {
        tags: ['Payment'],
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            }
        },
    }
})

export const getOrderPaymentSwagger = () => ({
    schema: {
        tags: ['Payment'],
        params: {
            id: { type: 'number' }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    payment: {
                        type: 'object',
                        properties: {
                            paymentId: { type: 'number' },
                            status: { type: 'string' },
                            value: { type: 'number' },
                            qrCode: { type: 'string' },
                            order: {
                                type: 'object',
                                properties: {
                                    orderId: { type: 'number' },
                                    status: { type: 'string' },
                                    clientId: { type: 'number' },
                                    items: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                itemId: { type: 'number' },
                                                name: { type: 'string' },
                                                description: { type: 'string' },
                                                category: { type: 'string' },
                                                value: { type: 'number' },
                                                image: { type: 'string' },
                                                createdAt: { type: 'string' },
                                                updatedAt: { type: 'string' },
                                            }
                                        }
                                    },
                                    total: { type: 'number' },
                                    createdAt: { type: 'string' },
                                    updatedAt: { type: 'string' }
                                }
                            },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        }
                    },
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            },
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})

export const getOrderSwagger = () => ({
    schema: {
        tags: ['Order'],
        params: {
            id: { type: 'string' }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    order: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            orderId: { type: 'number' },
                            status: { type: 'string' },
                            clientId: { type: 'number' },
                            items: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        itemId: { type: 'number' },
                                        name: { type: 'string' },
                                        description: { type: 'string' },
                                        category: { type: 'string' },
                                        value: { type: 'number' },
                                        image: { type: 'string' },
                                        createdAt: { type: 'string' },
                                        updatedAt: { type: 'string' },
                                    }
                                }
                            },
                            total: { type: 'number' },
                            createdAt: { type: 'string' },
                            updatedAt: { type: 'string' },
                        }
                    },
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            },
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})

export const findOrderSwagger = () => ({
    schema: {
        tags: ['Order'],
        query: {
            clientId: { type: 'string' }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    orders: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                status: { type: 'string' },
                                clientId: { type: 'number' },
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            itemId: { type: 'number' },
                                            name: { type: 'string' },
                                            description: { type: 'string' },
                                            category: { type: 'string' },
                                            value: { type: 'number' },
                                            image: { type: 'string' },
                                            createdAt: { type: 'string' },
                                            updatedAt: { type: 'string' },
                                        }
                                    }
                                },
                                total: { type: 'number' },
                                createdAt: { type: 'string' },
                                updatedAt: { type: 'string' },
                            }
                        }

                    },
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            },
        }
    }
})

export const updateOrderSwagger = () => ({
    schema: {
        tags: ['Order'],
        params: {
            id: { type: 'string' }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            },
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            },
            409: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})

export const getAllOrders = () => ({
    schema: {
        tags: ['Order'],
        response: {
            200: {
                type: 'object',
                properties: {
                    'orders': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                orderId: { type: 'number' },
                                status: { type: 'string' },
                                clientId: { type: 'number' },
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            itemId: { type: 'number' },
                                            name: { type: 'string' },
                                            description: { type: 'string' },
                                            category: { type: 'string' },
                                            value: { type: 'number' },
                                            image: { type: 'string' },
                                            createdAt: { type: 'string' },
                                            updatedAt: { type: 'string' },
                                        }
                                    }
                                },
                                total: { type: 'number' },
                                createdAt: { type: 'string' },
                                updatedAt: { type: 'string' },
                            }
                        }
                    }
                }
            }
        }
    }
});

export const healthCheck = () => ({
    schema: {
        tags: ['Health Check'],
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})


export const createCustomerSwagger = () => ({
    schema: {
        tags: ['Customers'],
        body: {
            type: 'object',
            properties: {
                cpf: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
                address: { type: 'string' },
                phone: { type: 'string' },
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    customerId: { type: 'number' }
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            },
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})

export const deleteCustomerSwagger = () => ({
    schema: {
        tags: ['Customers'],
        params: {
            id: { type: 'number' },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            },
            400: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    'issues': {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                fatal: { type: 'boolean' },
                                message: { type: 'string' },
                            }
                        }
                    },
                }
            },
            404: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})