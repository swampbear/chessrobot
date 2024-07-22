from flask import Flask
from flask_socketio import SocketIO, send, emit
import json


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

dataJson = None


@socketio.on('message')
def handle_message(msg):
    print('Received message:', msg)
    socketio.emit('message', msg)

@socketio.on('json')
def handle_json(json):
    print('Recieved message:', json)
    global dataJson
    dataJson = json
    send(json, json=True)

@socketio.on('getColor')
def handle_get_color():
    if dataJson is not None and 'Conditions' in dataJson and 'pieceColor' in dataJson['Conditions']:
        emit('getColor', dataJson['Conditions']['pieceColor'])
    else:
        emit('getColor', 'Color not available')

@socketio.on('getDifficulty')
def handle_get_difficulty():
    if dataJson is not None and 'Conditions' in dataJson and 'difficulty' in dataJson['Conditions']:
        emit('getDifficulty', dataJson['Conditions']['difficulty'])
    else:
        emit('getDifficulty', 'Difficulty not available')

    
@socketio.on('connect')
def test_connect():
    print("Connected to client")

@socketio.on('disconnect')
def test_disconnect():
    print("Disconnected from client")


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)