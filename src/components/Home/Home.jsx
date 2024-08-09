import Intro from "../Intro/Intro"

import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from 'react-responsive'

import pinMarker from '../../assets/images/common/marker.svg'
import longLeftArrow from '../../assets/images/common/longLeftArrow.png'
import longRightArrow from '../../assets/images/common/longRightArrow.png'
import smallLeftArrow from '../../assets/images/common/smallLeftArrow.png'
import smallRightArrow from '../../assets/images/common/smallRightArrow.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

// MAPBOX
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Source, Layer } from 'react-map-gl';

// FRAMER
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom";

import * as maptilerClient from "@maptiler/client"


const apiKeyMapbox = import.meta.env.VITE_API_KEY_MAPBOX
const apiStyleMapbox = import.meta.env.VITE_API_STYLE_MAPBOX_MSF
maptilerClient.config.apiKey = import.meta.env.VITE_API_MAPTILER



export default function Home() {

    const isMobile = useMediaQuery({
        query: '(max-width: 640px)'
    })

    const [arrowMarker, setArrowMarker] = useState(longLeftArrow)
    const [showIntro, setShowIntro] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false); 
    const [data, setData] = useState(null)

    useEffect(() => {
        if (isMobile) {
            setArrowMarker(smallLeftArrow)
        } else {
            setArrowMarker(longLeftArrow)
        }

        const lastVisited = localStorage.getItem('lastVisited')
        const datetime = new Date().getTime()

        // Si page non visité ou si page visitée plus de 12h
        if (!lastVisited || ((datetime - lastVisited) >= 12 * 60 * 60 * 1000)) {
            setShowIntro(true)
            localStorage.setItem('lastVisited', datetime.toString());
        } else {
            setShowIntro(false)
        }

        setIsLoaded(true)
    }, [isMobile])



    const [isLoading, setIsLoading] = useState(false)

    
    useEffect(() => {
        fetch("https://ww2-lu.netlify.app/api/story/?filters=%7B%22mentioned_to__slug%22%3A%22level-01-journeys%22%2C%22covers__data__type%22%3A%22place%22%7D&limit=100&h=4a75fb8cbf80d23b000166e1dbc06eb397d542efaa28a7f89ceb914fb95c051b", {
            method: "GET",
            headers: {}
        })
        .then((response) => response.json())
        .then((data) => {
            setData(data)
            setIsLoading(true)
        })
        .catch((error) => console.log(error))
    }, [isLoading])
    

    return isLoaded && data && data.results && (
        <>      
            {/* <Intro /> */}
            <MapBox items={data.results} arrow={arrowMarker}/>
        </>
    )
}

const MapBox = ({ items, arrow }) => {
    const mapRef = useRef(null);
    const [lng, setLng] = useState(6.131514);
    const [lat, setLat] = useState(49.815764);
    const [zoom, setZoom] = useState(8);
    const [selectedMarker, setSelectedMarker] = useState({ id: null, data: null });
    const [convertedItems, setConvertedItems] = useState([]);
    
    useEffect(() => {

        Promise.all(items.filter(item => item.covers.filter(item => item.data?.type == 'place').length > 0).map(async (item, index) =>  {      
            try {
                const place = item.covers.filter(item => item.data?.type == 'place').shift();
                const convertedCoor = await maptilerClient.coordinates.transform(place.data.geojson.geometry.coordinates,{ sourceCrs: 2169 },{ targetCrs: 4326 })
                const t = { ...item, convertedCoordinates: convertedCoor.results[0], country: place.data.geojson.geometry.properties.country, description: place.data.description, title: place.data.title }
                return t
            } catch (error) {
                console.error(error)
                return null;
            }   
        })).then((data) => {
            setConvertedItems(data.filter(item => item !== null))
        })

    }, [items])



    // useEffect(() => {

    //     const map = document.querySelector('.mapboxgl-map')

    //     if (map) {
            
    //                if (selectedMarker.id !== null) {
    //                    console.log('la')
    //                    map.addEventListener('click', () => {
    //                        setSelectedMarker({ id: null, marker: null})
    //                    })
    //                }

    //     }
        
    //     console.log(selectedMarker)
    // }, [selectedMarker])

 
    
    return (
        <>
            <div className='mask h-[calc(100vh-80px)] overflow-hidden relative'>
                <Map
                    ref={mapRef}
                    style={{ width: '100%', height: '100%' }}
                    mapboxAccessToken={apiKeyMapbox}
                    mapStyle={apiStyleMapbox}
                    initialViewState={{
                        longitude: lng,
                        latitude: lat,
                        zoom: zoom,
                        pitch: 30 // Inclinaison en degrés
                    }}
                    minZoom={8} // Ne peut pas dézoomer en dessous de x8
                    dragRotate={true} // 3D Relief : désactiver
                    scrollZoom={true} // Désactiver Zoom scroll
                >

                    {convertedItems.map((marker, index) => {
                        return (
                            <Marker
                                key={index}
                                longitude={marker.convertedCoordinates.x}
                                latitude={marker.convertedCoordinates.y}
                                anchor={marker.country === 'Grande-Bretagne' ? "center" : "bottom"}
                            >
                                <div className='relative z-[9999]'>
                                    <img
                                        src={marker.country === 'Grande-Bretagne' ? arrow : pinMarker}
                                        alt="marker"
                                        className="cursor-pointer"
                                        onClick={() => { setSelectedMarker({ id: index, data: marker }) }}
                                    />

                                    { marker.country !== 'Grande-Bretagne' ?
                                        <AnimatePresence>
                                            { selectedMarker && selectedMarker.id == index &&
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.4, ease: 'easeInOut'}}
                                                    className='flex w-[275px] h-[110px] absolute z-[9999] left-0 top-0 bg-white items-center justify-center cursor-pointer p-[6px] rounded-[6px]' 
                                                    style={{ boxShadow: '23px 30px 15px 0px rgba(0, 0, 0, 0.45)'}}
                                                >
                                                    <div className='border border-black rounded-[6px] h-full w-full px-3 py-[12px] relative'>
                                                        <Link to={`/notice/${marker.slug}`}>
                                                            <div className='flex'>
                                                                <span className='abril block pr-[10px]'>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</span>
                                                                <div>                                                
                                                                    <h3 className='abril text-[18px] pb-[8px]'>{ marker.title.fr_FR }</h3>
                                                                    <p className='text-[18px] leading-none sofia uppercase'>{ marker.description.fr_FR }</p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <FontAwesomeIcon icon={faXmark} className="absolute top-[2px] right-[4px]" onClick={() => setSelectedMarker({ id: null, data: null })} />
                                                    </div>
                                                </motion.div>
                                            }
                                        </AnimatePresence>
                                        :
                                        <div className='bg-[#F4F4F4] w-auto h-[25px] absolute top-[8px] sm:top-0 -translate-y-[50%] left-[100%] sm:right-[100%] sm:left-auto mx-[10px] sm:mx-0 flex justify-center items-center uppercase text-[20px] sofia px-[6px] whitespace-nowrap cursor-pointer' style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))" }} >{ marker.properties.place }</div>
                                    }
                                </div>
                            </Marker>
                        );
                    })}
                </Map>
            </div>
        </>
    );
}


