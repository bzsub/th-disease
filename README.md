# DISEASE UI

This is a simple UI where you can assign risks and symptoms to diseases.

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js

## Frontend

The frontend was made by React. To run it locally run these commands in the frontend directory:

- npm i
- npm start

## Backend

### System requirements:

- nodejs
- npm

### Environment variables

The backend directory contains the API code, using Express.js. Make a **.env** file in the backend directory with these values:

- PORT={port}
- CONNECTION_STRING={mongo-connection-string}

for example:
- PORT=8080
- CONNECTION_STRING=mongodb://localhost:27017/disease

### Starting the app

After properly setting up the **.env** file, run these commands in the backend directory:

- npm i
- npm start
