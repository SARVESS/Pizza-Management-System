module.exports = {
    QUEUE_CONFIG: {
        ORDER: {
            name: 'order',
            timeToComplete: 0,
            workersCount: 1,
            moveToQ: 'dough'
        },
        DOUGH: {
            name: 'dough',
            timeToComplete: 7000,
            workersCount: 2,
            moveToQ: 'topping'
        },
        TOPPING: {
            name: 'topping',
            timeToComplete: 4000,
            workersCount: 3,
            moveToQ: 'oven'
        },
        OVEN: {
            name: 'oven',
            timeToComplete: 10000,
            workersCount: 1,
            moveToQ: 'serve'
        },
        SERVE: {
            name: 'serve',
            timeToComplete: 5000,
            workersCount: 2,
            moveToQ: 'completed'
        },
        COMPLETED: {
            name: 'completed',
            timeToComplete: 0,
            workersCount: 1
        }
    }
}