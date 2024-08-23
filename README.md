# HVL ROBOTICS CHESSROBOT

Welcome to the HVL Robotics ChessRobot project! This innovative project consists of two main applications: a React-TypeScript client application and a Python Flask server. These two components communicate with each other via a socket connection, allowing for a seamless and interactive chess-playing experience.

For the project to function correctly, both applications need to run simultaneously, ensuring that the socket connection remains active.

## Table of Contents

1. [Running the application](#running)
   1. [Python flask server](#subrunning1)
   2. [React web-client](#subrunning2)
2. [Structure web-client](#structure) 
3. [Project progression](#progression)
4. [Summary](#summary)

# Running the applications <a name="running"></a>
Both applications needs to run simontaniusly for the socket s to be able to connect.


## Python flask server - terminal comands <a name="subrunning1"></a>
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


## React web-client - terminal commands <a name="subrunning2"></a>
Install NVM(Node Version Manager)
In your terminal run the nvm installer like this
````bash
#macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# or
#Windows
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
````
Read more about downloadning nvm here: [Github page nvm](https://github.com/nvm-sh/nvm)

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
## Structure web-client <a name="structure"></a>
### The main structure of the react project consists mainly of 3 folders
- Pages <-- Contains the different pages of the application(Home, Selection, Boardconfig, Game, End)
- Components <-- Components that are used inside the pages, most of these are reusable requiring 1 or 2 paramaters(Chessboard, Move History, StatusMessage, ...)
- ContextProviders <-- Responsible for remembering globaly set variables(Socket, Color). These viariables can be accessed and changed by all the children of the providers

<img width="178" alt="Screenshot 2024-08-23 at 13 37 59" src="https://github.com/user-attachments/assets/b333c83e-09df-4146-bf6b-83bf66cab7d7">

Pages and Components folders contain two files(usually) a tsx file and a css file

## Project progression <a name="progression"></a>

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
- [ ] Integrate with Chess program (currently located in another repository) most of these are halted bacause we need to place responsibility for where the events should be triggered. They have been tested with test data
   - [x] Start event(requires a connected socket to continue from home page)
   - [ ] Selection event
   - [ ] Start Game event
   - [ ] Confirm Move event
   - [ ] Move History
   - [ ] Resign event
   - [ ] Win on checkmate


## Summary <a name="summary"></a>

The HVL Robotics ChessRobot project aims to create a fully functional and interactive chess-playing robot. The React client provides an intuitive user interface, while the Python Flask server handles the backend operations, including the integration of a sophisticated chess program. As the project progresses, features like game board configuration, in-game communication, and game-over handling will be implemented to enhance the overall user experience.

By following the provided instructions, you can set up and run both the client and server applications, contributing to the development and refinement of this exciting project.
