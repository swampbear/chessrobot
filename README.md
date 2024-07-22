# HVL ROBOTICS CHESSROBOT

Welcome to the HVL Robotics ChessRobot project! This innovative project consists of two main applications: a React-TypeScript client application and a Python Flask server. These two components communicate with each other via a socket connection, allowing for a seamless and interactive chess-playing experience.

For the project to function correctly, both applications need to run simultaneously, ensuring that the socket connection remains active.


# Running the applications
Both applications needs to run simontaniusly for the socket s to be able to connect.


## Python flask server - terminal comands
Navigate to the chessrobot folder:
Manouvver to flask-server
````bash
cd flask-server
````

Activate the virtual environment:
````bash
source venv/bin/activate
````
Install dependencies (only needed the first time):
 ````bash
pip3 install <missing_packages>
````
Start the Flask server:
 ````bash
python3 app.js
````


## React web-client - terminal commands
Navigate to the web-chessrobot folder:
````bash
cd web-chessrobot
````
Install dependencies (only needed the first time):
````bash
npm install
````
Start the React development server:
````bash
npm start
````

## Project progression

The project consists of several key stages, both for the graphical user interface (GUI) and the Python backend. Below is an overview of the current progress:

### GUI Development
- [x] Set up project
- [x] Home page
- [x] Set up socket
- [x] Selection page
- [x] Boardconfig page
- [ ] Game page
- [ ] Chessboard component communicationg with backend
- [ ] GameOver page

### Python Backend Development
- [x] Set up flask-server project
- [x] Set up socket
- [ ] Integrate with Chess program (currently located in another repository)

## Summary

The HVL Robotics ChessRobot project aims to create a fully functional and interactive chess-playing robot. The React client provides an intuitive user interface, while the Python Flask server handles the backend operations, including the integration of a sophisticated chess program. As the project progresses, features like game board configuration, in-game communication, and game-over handling will be implemented to enhance the overall user experience.

By following the provided instructions, you can set up and run both the client and server applications, contributing to the development and refinement of this exciting project.
