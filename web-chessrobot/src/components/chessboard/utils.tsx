import React from 'react';
import Tile from '../tile/Tile';
import { Piece } from './Piece';

export const createBoard = (pieces: Piece[], previousPieces: { [key: string]: string }) => {
    const board = [];
        for (let i = 8 - 1; i >= 0; i--) {
            for (let j = 0; j < 8; j++) {
                const number = i + j + 2;
                const positionKey = `${j},${i}`;
                const image = previousPieces[positionKey];
                board.push(<Tile key={positionKey} image={image} number={number} />);
            }
        }
        return board;
    };


export const drawCoordinateAxis = (
    isPlayingWhite: boolean,
    setFrameHorizontal: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
    setFrameVertical: React.Dispatch<React.SetStateAction<JSX.Element[]>>
) => {
    try {
        const frameHorizontal: JSX.Element[] = [];
        const frameVertical: JSX.Element[] = [];

        let horizontal = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
        let vertical = [8,7,6,5,4,3,2,1];

        if (!isPlayingWhite) {
            if (vertical[0] !== 1) vertical.reverse();
            if (horizontal[0] !== 'h') horizontal.reverse();
        } else {
            if (vertical[0] !== 8) vertical.reverse();
            if (horizontal[0] !== 'a') horizontal.reverse();
        }

        for (let i = 0; i < 8; i++) {
            frameVertical.push(<span > {vertical[i]} </span>);
            frameHorizontal.push(<span>{horizontal[i]}</span>);
        }

        setFrameHorizontal(frameHorizontal);
        setFrameVertical(frameVertical);
    } catch (error) {
        console.error(error);
    }
};

export const drawPieces = (
    isPlayingWhite: boolean,
    currentBoardFEN: string,
    setPieces: React.Dispatch<React.SetStateAction<Piece[]>>,
    setCurrentBoardFEN: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        if (isPlayingWhite) {
            setUpPositionFromFEN(currentBoardFEN, setPieces, setCurrentBoardFEN);
        } else {
            const boardPosOnly = currentBoardFEN.split(' ')[0];
            const reversedRows = boardPosOnly.split('/').reverse().map(row => row.split('').reverse().join('')).join('/');
            setUpPositionFromFEN(reversedRows, setPieces, setCurrentBoardFEN);
        }
    } catch (error) {
        console.error(error);
    }
};

export const setUpPositionFromFEN = (
    FEN: string, 
    setPieces: React.Dispatch<React.SetStateAction<Piece[]>>,
    setCurrentBoardFEN: React.Dispatch<React.SetStateAction<string>>
) => {
    try {
        const rows = FEN.split('/');
        const pieces: Piece[] = [];

        rows.forEach((row, i) => {
            let x = 0;
            for (const char of row) {
                const num = parseInt(char);
                if (isNaN(num)) {
                    const piece = char.toLowerCase();
                    const isWhite = char === char.toUpperCase();
                    const image = `./assets/images/Chess_${piece}${isWhite ? 'lt60.png' : 'dt60.png'}`;
                    pieces.push({ image, x, y: 7 - i });
                    x++;
                } else {
                    x += num;
                }
            }
        });
        setPieces(pieces); 
        setCurrentBoardFEN(FEN);  
    } catch (error) {
        console.error("Error trying to set up position from FEN", error);
    }
};

export const getFENFromPosition = (pieces: Piece[]) => {
    let fen = '';
    for(let i = 7; i>=0; i--){
        let empty = 0;
        for(let j = 0; j<8; j++){
            let piece = '';
            pieces.forEach(p => {
                if(p.x === j && p.y === i){
                    const pieceType = p.image.split('_')[1].split('t')[0][0];
                    const pieceColor = p.image.split('_')[1].split('t')[0][1]
                    if(pieceColor === 'l'){
                        piece = pieceType.toUpperCase();
                    }else{
                        piece = pieceType;
                    }
                }
            });
            if(piece){
                if(empty){
                    fen += empty;
                    empty = 0;
                }
                fen += piece;
            } else {
                empty++;
            }
        }
        if(empty){
            fen += empty;
        }
        if(i > 0){
            fen += '/';
        }
    }
    return fen;
}