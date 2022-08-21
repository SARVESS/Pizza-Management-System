# Project Title

A Pizza Management System implemented using bullmq processing order at each step and recording time at each step and total time taken. 

## Prerequisites

1. You need to install NodeJs before running this project.
2. Install it according to your Operating System.

### Getting Started

1. Clone this Project
2. Go to cloned project directory of it with cd and open terminal. 
3. To install required dependencies run command:
   ```
   npm install
   ```

### Starting Server

   Start the server using command:
   ```
   npm start
   ```
### API and end points

 Base URL to be used before every api requests
```
localhost:3000.
```

1. `/api/add-order` - This api is used to place pizza order with query params as `name` and `id`. 

2. `/api/ui` - This api is used to see the bullmq dashboard where we can see how order is being processed in each queue.

3. `/api/report` - This api is used to see the reports generated for each order placed, time taken to process at each step and total time taken for each order. 

## Directory Structure

1. `pizza-service`: Contains queue.js which is responsible for creating workers and jobs using bullmq.
2. `config.js`: Config file for all kind of created queues.
3. `index.js`: Entry point to run server and to route requests.

## Screenshots of different actions - 

1. Placing Order - 

[![image-1.png](https://i.postimg.cc/76fFw1QR/image-1.png)](https://postimg.cc/dkcH9CFR)

2. Bullmq dashboard shows queue and how the order is getting processed at each step and its movement from active to completed - 

[![image-2.png](https://i.postimg.cc/HWJmgmqL/image-2.png)](https://postimg.cc/dDKp2btM)

3. Terminal after running server and placing order - 

[![image.png](https://i.postimg.cc/X7ZTTgyB/image.png)](https://postimg.cc/MvSPBV5z)

4. Reports for each order placed and time taken at each step and total time taken for them as json - 

[![image-3.png](https://i.postimg.cc/DzsGDR7p/image-3.png)](https://postimg.cc/Mc6XfPM1)

## Tradeoffs

1. I didn't use any database to store reports data but it can be expanded further to store. 
2. For the sake of simplicity and time crunch not able to do the full fledged solution but tried to implement producer consumer structure using bullmq.