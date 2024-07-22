// PieceColorContext.ts
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface PieceColorContextType {
    pieceColor: string;
    setPieceColor: Dispatch<SetStateAction<string>>;
}

const defaultContextValue: PieceColorContextType = {
    pieceColor: '',
    setPieceColor: () => {},
};

const PieceColorContext = createContext<PieceColorContextType>(defaultContextValue);

export const usePieceColor = () => {
    return useContext(PieceColorContext);
};

export const PieceColorProvider = ({ children }: { children: ReactNode }) => {
    const [pieceColor, setPieceColor] = useState<string>('');

    return (
        <PieceColorContext.Provider value={{ pieceColor, setPieceColor }}>
            {children}
        </PieceColorContext.Provider>
    );
};