const { Queue, Worker } = require('bullmq');

module.exports = class PizzaProcessQueue {
    constructor({ name, timeToComplete, moveToQ, workersCount }) {
        this._queue = new Queue(name);
        this.queueName = name;
        this.timeToComplete = timeToComplete;
        this.moveToQ = moveToQ;
        this.workersCount = workersCount;
        this.createWorkers(workersCount);
    }

    get queue () {
        return this._queue;
    }
    createWorkers(n) {
        new Array(n).fill(0).map((_, k) => {
            return new Worker(this.queueName, this.doJob).on('completed', job => {
                console.log(`[${new Date().toISOString()}]: [${this.queueName}]: Job ID ${job.id} finished by worker ${k+1}`);
            });
        })
    }

    doJob = (job) => {
        console.log(`[${new Date().toISOString()}]: [${this.queueName}]: Job ID ${job.id} started by worker`);
        return new Promise((r) => {
            setTimeout(() => {
                if (this.moveToQ) {
                    this.moveToQ.addJob(job.name, { ...job.data, [this.queueName]: new Date() });
                }
                return r();
            }, this.timeToComplete);
        })
    }

    addJob(name, payload) {
        this._queue.add(name, payload);
    }
}
