const { QUEUE_CONFIG: { ORDER, DOUGH, COMPLETED, SERVE, OVEN, TOPPING } } = require('../config');
const PizzaProcessQueue = require('./queue');

// create completed queue
const completedQ = new PizzaProcessQueue({
    name: COMPLETED.name,
    timeToComplete: COMPLETED.timeToComplete,
    workersCount: COMPLETED.workersCount
});

// create serve Queue
const serveQ = new PizzaProcessQueue({
    name: SERVE.name,
    timeToComplete: SERVE.timeToComplete,
    workersCount: SERVE.workersCount,
    moveToQ: completedQ
});

// create oven Queue
const ovenQ = new PizzaProcessQueue({
    name: OVEN.name,
    timeToComplete: OVEN.timeToComplete,
    workersCount: OVEN.workersCount,
    moveToQ: serveQ
});

// create topping Queue
const toppingQ = new PizzaProcessQueue({
    name: TOPPING.name,
    timeToComplete: TOPPING.timeToComplete,
    workersCount: TOPPING.workersCount,
    moveToQ: ovenQ
});

// create dough Queue
const doughQ = new PizzaProcessQueue({
    name: DOUGH.name,
    timeToComplete: DOUGH.timeToComplete,
    workersCount: DOUGH.workersCount,
    moveToQ: toppingQ
});

// create order Queue
const orderQ = new PizzaProcessQueue({
    name: ORDER.name,
    timeToComplete: ORDER.timeToComplete,
    workersCount: ORDER.workersCount,
    moveToQ: doughQ
});

module.exports = { orderQ, doughQ, toppingQ, ovenQ, serveQ, completedQ };