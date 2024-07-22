import React, { createContext, useContext } from "react";
import {Socket} from 'socket.io-client';

interface SocketContextType{
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({
    socket: null
});

export const useSocket = () => {
    return useContext(SocketContext)
}

interface SocketProviderProps {
    socket: Socket | null;
    children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({socket, children}) => {
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}