# Interview Scheduler

Interview Scheduler is a Single Page Application built using React that lets you book appointments between 12pm and 5pm on weekdays. Follow the instructions below, or [click here](https://quizzical-liskov-7aee85.netlify.app/) to see it in action. The live version was deployed using Heroku Postgres and Netlify. The database server might take a few moments to load.

The application allows a user to view the schedule and add, edit or cancel appointments. It also shows the number of slots remaining for each day. Using a web socket, all connected clients see updates to the schedule when a change occurs.

!["Day fully booked"](https://github.com/cangoman/scheduler/blob/master/docs/scheduler-full-day.png?raw=true)

!["Updates all connected clients using web socket](https://github.com/cangoman/scheduler/blob/master/docs/scheduler_ws-update.gif?raw=true)


## Setup
Clone the repository and install dependencies:

 ``` sh
 git clone https://github.com/cangoman/scheduler
 npm install
 ```

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```






