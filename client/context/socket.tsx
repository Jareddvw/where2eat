import { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from '@env';
import { useState } from "react";
import { rest } from "../components/Card";

export const socket = io(SOCKET_URL);
console.log(socket)

export const SocketContext = createContext({socket:socket, restaurants:[
    {
    // "id": "J7_-faNq_Ag9qTOlDn81Pw",
    // "alias": "starbelly-san-francisco",
    "name": "Starbelly",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/G1SweY3VbKx_BqAws9RytA/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/starbelly-san-francisco?adjust_creative=dcRlC0go3yYTIK5TvJUUvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dcRlC0go3yYTIK5TvJUUvw",
    "review_count": 2075,
    "categories": [
        {
            "alias": "comfortfood",
            "title": "Comfort Food"
        },
        {
            "alias": "cocktailbars",
            "title": "Cocktail Bars"
        },
        {
            "alias": "wine_bars",
            "title": "Wine Bars"
        }
    ],
    "rating": 4.0,
    // "coordinates": {
    //     "latitude": 37.76402,
    //     "longitude": -122.43253
    // },
    // "transactions": [
    //     "delivery",
    //     "pickup",
    //     "restaurant_reservation"
    // ],
    "price": "$$",
    "location": {
        "address1": "3583 16th St",
        "address2": "",
        "address3": "",
        "city": "San Francisco",
        "zip_code": "94114",
        "country": "US",
        "state": "CA",
        "display_address": [
            "3583 16th St",
            "San Francisco, CA 94114"
        ]
    },
    "phone": "+14152527500",
    "display_phone": "(415) 252-7500",
    "distance": 490.0201155034338}
],
setRestaurants:(restaurants:Array<rest>)=>{}});

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