const express = require('express');
const app = express();
const port = 3000;
const { orderQ, doughQ, toppingQ, ovenQ, serveQ, completedQ } = require('./pizza-service/index');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const moment = require('moment');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/api/ui');

createBullBoard({
  queues: [
    new BullMQAdapter(orderQ.queue),
    new BullMQAdapter(doughQ.queue),
    new BullMQAdapter(toppingQ.queue),
    new BullMQAdapter(ovenQ.queue),
    new BullMQAdapter(serveQ.queue),
    new BullMQAdapter(completedQ.queue),
  ],
  serverAdapter,
});

const getTimeDiff = (a, b)  => moment(a).diff(moment(b), 's');

app.use('/api/ui', serverAdapter.getRouter());

app.get('/api/add-order', (req, res) => {
  const { name, id }= req.query;
  orderQ.addJob(name, { id });
  const bullMqUrl = 'localhost:3000/api/ui';
  res.status(200).send(`Order with Name: ${name} is being processed please check bullmq ui using url: [${bullMqUrl}] to get reports and time taken`);
});

app.get('/api/report', async (req, res) => {
  const allJobs = await completedQ.queue.getJobs();
  const report = allJobs.map(({ name, data }) => {
    return {
      'Order Id': data.id,
      'Order Name': name,
      'Placed At': moment(data.order).format("DD MMM YYYY HH:mm:ss"),
      'Time to Dough': getTimeDiff(data.dough, data.order),
      'Time to Topping': getTimeDiff(data.topping, data.dough),
      'Time to Oven': getTimeDiff(data.oven, data.topping),
      'Time to Serve': getTimeDiff(data.serve, data.oven),
      'Total Time Taken': getTimeDiff(data.serve, data.order)
    }
  })
  res.status(200).json(report);
});

app.listen(port, () => {
  console.log(`Restaurant management system listening at http://localhost:${port}`);
});