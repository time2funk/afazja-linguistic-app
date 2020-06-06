# ReaderView
Technical Requirements :
Angular 7, Node.js, npm, apache2/nginx, Mongo DB, pm2

Client based on Angular version 7.3.9
Server powered by Express.js

## Setup
```bash
    # go to client and server folders and install npm dependences
    npm install

    # then you need to create and set env file for project server
    # go to server folder and create .env file
    touch .env

    # and put Google CSE Access Keys into env file
    # file example below
    
    # .env
    GOOGLE_API_KEY=***
    GOOGLE_CSE_ID=***
```

## Start server
```bash
    # server using port 4444
    # go to server folder and run it with pm2
    pm2 start index.js
```

## Deploy client
```bash
    # go to client folder and build script
    npm run build

    # then you need to set path of client build for your HTTP Server (apache2 or nginx)
    # build path: /PATH_TO_THE_PROJECT/client/dist/
```