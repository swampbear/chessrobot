# HVL ROBOTICS CHESSROBOT

Welcome to the HVL ROBOTICS chessrobot project. This project consists of two applications. A react-typescript application acting as a client, and a pyhon program as the server. They are connectiong using a socket connection

# Running the applications
Both applications needs to run simontaniusly for the socket s to be able to connect.


## Python flask server - terminal comands
When in chessrobot folder

Manouvver to flask-server
````
cd flask-server
````

Activate (venv) when in flask-server folder
````
source venv/bin/activate
````
If its the first time running run:
````
pip3 install <missing_packages>
````
To start server run:
````
python3 app.js
````


## React web-client - terminal commands
Manouver to web-chessrobot
````
cd web-chessrobot
````
If its the first time running run:
````
npm install
````
To start the server run the following command:
````
npm start
````

## Project progression

### GUI
- [x] Set up project
- [x] Home page
- [x] Set up socket
- [x] Selection page
- [x] Boardconfig page
- [ ] Game page
- [ ] Chessboard component communicationg with backend
- [ ] GameOver page

### PYTHON-Backend
//to be filled out
- [x] Set up flask-server project
- [x] Set up socket
- [ ] Combine with Chessprogram(In another repo for the moment)
