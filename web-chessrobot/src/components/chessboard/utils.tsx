import React from 'react';
import Tile from '../tile/Tile';
import { Piece } from './Piece';

export const createBoard = (
    pieces: Piece[],
    vertical: number[],
    horizontal: string[]
) => {
    const board = [];
        for (let i = vertical.length - 1; i >= 0; i--) {
          for (let j = 0; j < horizontal.length; j++) {
            const number = i + j + 2;
            let image = undefined;
            pieces.forEach((p) => {
              let pieceInPosition = p.x === j && p.y === i;
              if (pieceInPosition) {
                image = p.image;
              }
            });
            board.push(<Tile key={`${j}, ${i}`} image={image} number={number} />);
          }
        }
        return board;
}


export const drawCoordinateAxis = (
    isPlayingWhite: boolean,
    vertical: number[],
    horizontal: string[],
    setFrameHorizontal: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
    setFrameVertical: React.Dispatch<React.SetStateAction<JSX.Element[]>>
) => {
    try {
        const frameHorizontal: JSX.Element[] = [];
        const frameVertical: JSX.Element[] = [];

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
            const reverseFen = currentBoardFEN.split('').reverse().join('');
            setUpPositionFromFEN(reverseFen, setPieces, setCurrentBoardFEN,);
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
        const fen = FEN;
        const rows = fen.split('/');
        const pieces: Piece[] = [];
        
        for(let i = 0; i<rows.length; i++){
            const row = rows[i];
            let x = 0;
            for(let j = 0; j<row.length; j++){
                const char = row[j];
                if(isNaN(parseInt(char))){
                    let isLowerCase = char === char.toLowerCase();
                    if(isLowerCase){
                        pieces.push({image: `./assets/images/Chess_${char}dt60.png`, x, y: 7 - i})
                    }
                    else {
                        const lightChar = char.toLowerCase();
                        pieces.push({image: `./assets/images/Chess_${lightChar}lt60.png`, x, y: 7 - i})
                    }
                    x++;
                } else {
                    x += parseInt(char);
                }
            }
        }
        setPieces(pieces);
        setCurrentBoardFEN(FEN)    

    } catch (error) {
        console.error("Error trying to set up position from FEN",error);
    }
}

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