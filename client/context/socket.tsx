import { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from '@env';
import { useState } from "react";
import { rest } from "../components/Card";
import sampleData from "../components/sampleData";
import { CommonActions } from "@react-navigation/native";

export const socket = io(SOCKET_URL);

export const SocketContext = createContext({
    socket:socket, 
    restaurants:sampleData,
    setRestaurants:(restaurants:Array<rest>)=>{}
});

export const SocketProvider = ({ children }: {children: any}) => {

    useEffect(() => {
        socket.on('restaurant-list', (rests) => {
            console.log('getting restaurants:')
            console.log(rests)
            setRestaurants(rests)
        })
    }, [])

    const [restaurants, setRestaurants] = useState<Array<rest>>([])

    let socketData = {
        socket:socket,
        restaurants:restaurants,
        setRestaurants:setRestaurants
    }

    return (
        <SocketContext.Provider value={socketData}>
            {children}
        </SocketContext.Provider>
    )
}