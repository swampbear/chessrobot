#!/bin/bash

# Define the path to webchessrobot
WEBCHESSROBOT_PATH="./web-chessrobot"
WEBCHESSROBOT_PORT=3000

# Check and kill any process using the port
fuser -k $WEBCHESSROBOT_PORT/tcp

# Navigate to the webchessrobot directory and start it
cd $WEBCHESSROBOT_PATH
npm start &

# Wait for the server to start
sleep 5

# Start Chromium in kiosk mode pointing to the webchessrobot URL
chromium-browser --kiosk http://localhost:$WEBCHESSROBOT_PORT