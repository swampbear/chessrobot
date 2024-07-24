import chess
import chess.pgn

def uci_to_pgn(fen, uci_move):
    # Initialize the board with the given FEN
    board = chess.Board(fen)

    # Parse the UCI move
    move = chess.Move.from_uci(uci_move)

    # Ensure the move is legal in the current position
    if move not in board.legal_moves:
        raise ValueError(f"Illegal move {uci_move} for position {fen}")

    # Apply the move to the board
    board.push(move)

    # Generate the PGN move notation
    pgn_move = board.san(move)

    return pgn_move

# Example usage
initial_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
uci_move = "e2e4"
pgn_move = uci_to_pgn(initial_fen, uci_move)
print(pgn_move)