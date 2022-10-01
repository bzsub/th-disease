# BIKE REPAIR SITE

This is a basic UI where you can CRUD diseases, symptoms and risks.

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
- APP_URL={url-of-frontend}
- CONNECTION_STRING={mongo-connection-string}
- SECRET_KEY={secret}

For errorHandling I used Logflare :

- LOGFLARE_SOURCE_ID={source-id}
- LOGFLARE_API_KEY={api-key}

### Starting the app

After properly setting up the **.env** file, run these commands in the backend directory:

- npm i
- npm start
