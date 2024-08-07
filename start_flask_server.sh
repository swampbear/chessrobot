#!/bin/bash

# Define the path to the Flask server
FLASK_SERVER_PATH="./flask-server"
FLASK_APP="app.py"
FLASK_SERVER_PORT=8080

# Check and kill any process using the port
fuser -k $FLASK_SERVER_PORT/tcp

# Navigate to the Flask server directory, activate the virtual environment, and start the server
cd $FLASK_SERVER_PATH
source venv/bin/activate
export FLASK_APP=$FLASK_APP
flask run --port=$FLASK_SERVER_PORT