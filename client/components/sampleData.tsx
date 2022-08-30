import { rest } from "./Card"

const sampleData: Array<rest> = [
{
    "id": "sample",
    "alias": "starbelly-san-francisco",
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
    "coordinates": {
        "latitude": 37.76402,
        "longitude": -122.43253
    },
    "transactions": [
        "delivery",
        "pickup",
        "restaurant_reservation"
    ],
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
    "distance": 490.0201155034338,
    'yeses':["bob", "alice", "eve"],
    "nos":["alex", 'bobby', 'charlie']
},
{
    "id": "lUUQi1b2rV3glIn4t2I1Iw",
    "alias": "horsefeather-san-francisco-2",
    "name": "Horsefeather",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/Fh0PkCrPfP7mItoZvVG2VA/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/horsefeather-san-francisco-2?adjust_creative=dcRlC0go3yYTIK5TvJUUvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dcRlC0go3yYTIK5TvJUUvw",
    "review_count": 437,
    "categories": [
        {
            "alias": "cocktailbars",
            "title": "Cocktail Bars"
        },
        {
            "alias": "newamerican",
            "title": "American (New)"
        }
    ],
    "rating": 4.0,
    "coordinates": {
        "latitude": 37.774501,
        "longitude": -122.437355
    },
    "transactions": [
        "delivery",
        "pickup"
    ],
    "price": "$$",
    "location": {
        "address1": "528 Divisidero St",
        "address2": "",
        "address3": "",
        "city": "San Francisco",
        "zip_code": "94117",
        "country": "US",
        "state": "CA",
        "display_address": [
            "528 Divisidero St",
            "San Francisco, CA 94117"
        ]
    },
    "phone": "+14158171939",
    "display_phone": "(415) 817-1939",
    "distance": 1514.8624498232032,
    'yeses':["bob", "alice", "eve"],
    "nos":["alex", 'bobby', 'charlie']
},
{
    "id": "qfRZjzNqO3fRgEGqvGNY-A",
    "alias": "santeria-san-francisco",
    "name": "Santeria",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/cBh6Ih-cKY0YRVmRPaIGHA/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/santeria-san-francisco?adjust_creative=dcRlC0go3yYTIK5TvJUUvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dcRlC0go3yYTIK5TvJUUvw",
    "review_count": 200,
    "categories": [
        {
            "alias": "mexican",
            "title": "Mexican"
        },
        {
            "alias": "cocktailbars",
            "title": "Cocktail Bars"
        }
    ],
    "rating": 4.5,
    "coordinates": {
        "latitude": 37.764836,
        "longitude": -122.431808
    },
    "transactions": [
        "restaurant_reservation"
    ],
    "price": "$$",
    "location": {
        "address1": "2251 Market St",
        "address2": "",
        "address3": null,
        "city": "San Francisco",
        "zip_code": "94114",
        "country": "US",
        "state": "CA",
        "display_address": [
            "2251 Market St",
            "San Francisco, CA 94114"
        ]
    },
    "phone": "+14158964496",
    "display_phone": "(415) 896-4496",
    "distance": 603.8917617486115,
    'yeses':["bob", "alice", "eve"],
    "nos":["alex", 'bobby', 'charlie']
},
{
    "id": "reXWH9Wo0ZTOuQsTMNOSxg",
    "alias": "fable-san-francisco",
    "name": "Fable",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/Q-ggLlAKmVeobiJfPIYzpQ/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/fable-san-francisco?adjust_creative=dcRlC0go3yYTIK5TvJUUvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dcRlC0go3yYTIK5TvJUUvw",
    "review_count": 709,
    "categories": [
        {
            "alias": "newamerican",
            "title": "American (New)"
        },
        {
            "alias": "wine_bars",
            "title": "Wine Bars"
        },
        {
            "alias": "breakfast_brunch",
            "title": "Breakfast & Brunch"
        }
    ],
    "rating": 4.0,
    "coordinates": {
        "latitude": 37.759958,
        "longitude": -122.435089
    },
    "transactions": [
        "delivery",
        "pickup"
    ],
    "price": "$$",
    "location": {
        "address1": "558 Castro St",
        "address2": "",
        "address3": "",
        "city": "San Francisco",
        "zip_code": "94114",
        "country": "US",
        "state": "CA",
        "display_address": [
            "558 Castro St",
            "San Francisco, CA 94114"
        ]
    },
    "phone": "+14155902404",
    "display_phone": "(415) 590-2404",
    "distance": 158.7823750404592,
    'yeses':["bob", "alice", "eve"],
    "nos":["alex", 'bobby', 'charlie']
},
{
    "id": "IoTaMS3mnLh5vq4nfW1y_A",
    "alias": "hot-johnnie-s-san-francisco",
    "name": "HOT JOHNNIE’S",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/TOUJq4da4Lu-fnlouerIhg/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/hot-johnnie-s-san-francisco?adjust_creative=dcRlC0go3yYTIK5TvJUUvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dcRlC0go3yYTIK5TvJUUvw",
    "review_count": 265,
    "categories": [
        {
            "alias": "sandwiches",
            "title": "Sandwiches"
        },
        {
            "alias": "bbq",
            "title": "Barbeque"
        },
        {
            "alias": "breakfast_brunch",
            "title": "Breakfast & Brunch"
        }
    ],
    "rating": 5.0,
    "coordinates": {
        "latitude": 37.76083883893122,
        "longitude": -122.4344859
    },
    "transactions": [
        "delivery",
        "pickup"
    ],
    "price": "$$",
    "location": {
        "address1": "4077 18th St",
        "address2": null,
        "address3": "",
        "city": "San Francisco",
        "zip_code": "94114",
        "country": "US",
        "state": "CA",
        "display_address": [
            "4077 18th St",
            "San Francisco, CA 94114"
        ]
    },
    "phone": "+14156243171",
    "display_phone": "(415) 624-3171",
    "distance": 172.53974199177622,
    'yeses':["bob", "alice", "eve"],
    "nos":["alex", 'bobby', 'charlie']
},
{
    "id": "OOlS_RmdMk1LHtgOQWoHoA",
    "alias": "tanglad-san-francisco",
    "name": "Tanglad",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/jzNmvepv5zG5fbBOXfmtWw/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/tanglad-san-francisco?adjust_creative=dcRlC0go3yYTIK5TvJUUvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dcRlC0go3yYTIK5TvJUUvw",
    "review_count": 198,
    "categories": [
        {
            "alias": "vietnamese",
            "title": "Vietnamese"
        }
    ],
    "rating": 4.5,
    "coordinates": {
        "latitude": 37.761492,
        "longitude": -122.434844
    },
    "transactions": [
        "delivery",
        "pickup"
    ],
    "price": "$$",
    "location": {
        "address1": "469 Castro St",
        "address2": null,
        "address3": "",
        "city": "San Francisco",
        "zip_code": "94114",
        "country": "US",
        "state": "CA",
        "display_address": [
            "469 Castro St",
            "San Francisco, CA 94114"
        ]
    },
    "phone": "+14156243238",
    "display_phone": "(415) 624-3238",
    "distance": 159.10650212292109,
    'yeses':["bob", "alice", "eve"],
    "nos":["alex", 'bobby', 'charlie']
},
{
    "id": "LjVlsV9tKGnv7e4Iyt9c5Q",
    "alias": "lark-san-francisco-2",
    "name": "Lark",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/BiDUDWE3pDcZnRRvDk7ruA/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/lark-san-francisco-2?adjust_creative=dcRlC0go3yYTIK5TvJUUvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dcRlC0go3yYTIK5TvJUUvw",
    "review_count": 311,
    "categories": [
        {
            "alias": "newamerican",
            "title": "American (New)"
        },
        {
            "alias": "mediterranean",
            "title": "Mediterranean"
        },
        {
            "alias": "wine_bars",
            "title": "Wine Bars"
        }
    ],
    "rating": 4.0,
    "coordinates": {
        "latitude": 37.761243,
        "longitude": -122.434248
    },
    "transactions": [
        "delivery"
    ],
    "price": "$$",
    "location": {
        "address1": "4068 18th St",
        "address2": "",
        "address3": "",
        "city": "San Francisco",
        "zip_code": "94114",
        "country": "US",
        "state": "CA",
        "display_address": [
            "4068 18th St",
            "San Francisco, CA 94114"
        ]
    },
    "phone": "+14154004623",
    "display_phone": "(415) 400-4623",
    "distance": 197.0605128915999,
    'yeses':["bob", "alice", "eve"],
    "nos":["alex", 'bobby', 'charlie']
},
{
    "id": "055dTcfz2AOAFPed_2KjEQ",
    "alias": "nopalito-san-francisco",
    "name": "Nopalito",
    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/3xz1SUH2huhqPTJtcX7F1A/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/nopalito-san-francisco?adjust_creative=dcRlC0go3yYTIK5TvJUUvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dcRlC0go3yYTIK5TvJUUvw",
    "review_count": 1969,
    "categories": [
        {
            "alias": "mexican",
            "title": "Mexican"
        }
    ],
    "rating": 4.0,
    "coordinates": {
        "latitude": 37.77343530099,
        "longitude": -122.438993048014
    },
    "transactions": [
        "delivery"
    ],
    "price": "$$",
    "location": {
        "address1": "306 Broderick St",
        "address2": "",
        "address3": "",
        "city": "San Francisco",
        "zip_code": "94117",
        "country": "US",
        "state": "CA",
        "display_address": [
            "306 Broderick St",
            "San Francisco, CA 94117"
        ]
    },
    "phone": "+14154370303",
    "display_phone": "(415) 437-0303",
    "distance": 1411.7774969689415,
    'yeses':["bob", "alice", "eve"],
    "nos":["alex", 'bobby', 'charlie']
},
{
    "id": "BjlVE7tTp1UCEttgkM1Big",
    "alias": "beit-rima-san-francisco-3",
    "name": "Beit Rima",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/qnhe07hneYHMng9qLebLpg/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/beit-rima-san-francisco-3?adjust_creative=dcRlC0go3yYTIK5TvJUUvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dcRlC0go3yYTIK5TvJUUvw",
    "review_count": 561,
    "categories": [
        {
            "alias": "arabian",
            "title": "Arabic"
        },
        {
            "alias": "mediterranean",
            "title": "Mediterranean"
        },
        {
            "alias": "lebanese",
            "title": "Lebanese"
        }
    ],
    "rating": 4.5,
    "coordinates": {
        "latitude": 37.768723240002956,
        "longitude": -122.42928109103333
    },
    "transactions": [
        "delivery"
    ],
    "price": "$$",
    "location": {
        "address1": "138 Church St",
        "address2": null,
        "address3": "",
        "city": "San Francisco",
        "zip_code": "94114",
        "country": "US",
        "state": "CA",
        "display_address": [
            "138 Church St",
            "San Francisco, CA 94114"
        ]
    },
    "phone": "+14157030270",
    "display_phone": "(415) 703-0270",
    "distance": 1074.0792339472885,
    'yeses':["bob", "alice", "eve"],
    "nos":["alex", 'bobby', 'charlie']
},
{
    "id": "TlBFKt2N2eSEBpN-UZmDBw",
    "alias": "parada-22-san-francisco",
    "name": "Parada 22",
    "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/EV-QYPFFjtdmB4rwtNiAFg/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/parada-22-san-francisco?adjust_creative=dcRlC0go3yYTIK5TvJUUvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=dcRlC0go3yYTIK5TvJUUvw",
    "review_count": 1368,
    "categories": [
        {
            "alias": "latin",
            "title": "Latin American"
        },
        {
            "alias": "puertorican",
            "title": "Puerto Rican"
        },
        {
            "alias": "breakfast_brunch",
            "title": "Breakfast & Brunch"
        }
    ],
    "rating": 4.0,
    "coordinates": {
        "latitude": 37.769217,
        "longitude": -122.4521212
    },
    "transactions": [
        "delivery",
        "pickup"
    ],
    "price": "$$",
    "location": {
        "address1": "1805 Haight St",
        "address2": "",
        "address3": "",
        "city": "San Francisco",
        "zip_code": "94117",
        "country": "US",
        "state": "CA",
        "display_address": [
            "1805 Haight St",
            "San Francisco, CA 94117"
        ]
    },
    "phone": "+14157501111",
    "display_phone": "(415) 750-1111",
    "distance": 1659.4286084394544,
    'yeses':["bob", "alice", "eve"],
    "nos":["alex", 'bobby', 'charlie']
}
]

export default sampleData