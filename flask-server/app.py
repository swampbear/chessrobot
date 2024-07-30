from flask import Flask
from flask_socketio import SocketIO, send, emit
import chess
import json

# Example PGN string
pgn_string = """
[Event "Example Event"]
[Site "Example Site"]
[Date "2024.07.30"]
[Round "1"]
[White "WhitePlayer"]
[Black "BlackPlayer"]
[Result "*"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6
"""




# Create the JSON object
playerMove = {
    "pgn": "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6",
    "fen": "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5",
    "isLegal": True
}

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

@socketio.on('playerMoveTest')
def test_playerMove():
    if(playerMove is not None): 
        emit('playerMove', playerMove)
        print('Sending message',playerMove)
    else:
        print('player move is None')




if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)