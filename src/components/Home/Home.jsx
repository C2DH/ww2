// COMPONENTS
import Intro from "../Intro/Intro"

import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from 'react-responsive'

import pinMarker from '../../assets/images/common/marker.svg'
import longLeftArrow from '../../assets/images/common/longLeftArrow.png'
import longRightArrow from '../../assets/images/common/longRightArrow.png'
import smallLeftArrow from '../../assets/images/common/smallLeftArrow.png'
import smallRightArrow from '../../assets/images/common/smallRightArrow.png'

// MAPBOX
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Source, Layer } from 'react-map-gl';

// FRAMER
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom";

const apiKeyMapbox = import.meta.env.VITE_API_KEY_MAPBOX
const apiStyleMapbox = import.meta.env.VITE_API_STYLE_MAPBOX_MSF


export default function Home() {

    const isMobile = useMediaQuery({
        query: '(max-width: 640px)'
    })

    const [arrowMarker, setArrowMarker] = useState(longLeftArrow)
    
    const [showIntro, setShowIntro] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false); 
    const geojson = {
        features: [
            {
                id: 1,
                geometry: {
                    coordinates: [49.48056, 6.0875]
                },
                properties: {
                    place: 'Dudelange',
                    location: 'Clinique Saint Joseph',
                    description: 'Lieu de ravitaillement des réfugiés de Dudelange',
                    image: 'https://images.unsplash.com/photo-1590337318473-f1e81866c60c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    media: "video-1.mp4",
                },
                notes_related: [
                    {
                        title: 'Note 01',
                        description: "Lorem ipsum dolor sit amet consectetur."
                    },
                    {
                        title: 'Note 02',
                        description: "Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis."
                    },
                    {
                        title: 'Note 03',
                        description: "Dolor sit amet consectetur."
                    }
                ]
            },
            {
                id: 2,
                geometry: {
                    coordinates: [49.6112768, 6.129799]
                },
                properties: {
                    place: 'Luxembourg',
                    location: 'Clinique Saint Antoine',
                    description: 'Lieu de ravitaillement des réfugiés de Luxembourg',
                    image: 'https://images.unsplash.com/photo-1588336899284-950764f07147?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    media: "video-2.mp4"
                },
                notes_related: [
                    {
                        title: 'Note 01',
                        description: "Lorem ipsum dolor sit amet consectetur."
                    },
                    {
                        title: 'Note 02',
                        description: "Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis."
                    },
                    {
                        title: 'Note 03',
                        description: "Dolor sit amet consectetur."
                    }
                ]
            },
            {
                id: 3,
                geometry: {
                    coordinates: [49.4959628, 5.9850306]
                },
                properties: {
                    place: 'Esch-sur-Alzette',
                    location: 'Salle des sports',
                    description: 'Lieu de ravitaillement des réfugiés de Esch-sur-Alzette',
                    image: 'https://images.unsplash.com/photo-1590337318156-73e24cd1e36b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    media: 'video-1.mp4'
                },
                notes_related: [
                    {
                        title: 'Note 01',
                        description: "Lorem ipsum dolor sit amet consectetur."
                    },
                    {
                        title: 'Note 02',
                        description: "Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis."
                    },
                    {
                        title: 'Note 03',
                        description: "Dolor sit amet consectetur."
                    }
                ]
            },
            {
                id: 4,
                geometry: {
                    coordinates: [49.9666628, 5.9333296]
                },
                properties: {
                    place: 'Wiltz',
                    location: 'Hopital Lorem',
                    description: 'Lieu de ravitaillement des réfugiés de Wiltz',
                    image: 'https://images.unsplash.com/photo-1593131540982-57778192fc21?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    media: 'video-2.mp4'
                },
                notes_related: [
                    {
                        title: 'Note 01',
                        description: "Lorem ipsum dolor sit amet consectetur."
                    },
                    {
                        title: 'Note 02',
                        description: "Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis."
                    },
                    {
                        title: 'Note 03',
                        description: "Dolor sit amet consectetur."
                    }
                ]
            },
            {
                id: 5,
                geometry: {
                    coordinates: [50.2994, 5.5119]
                },
                properties: {
                    place: 'Grande-Bretagne',
                    location: 'Hopital Lorem',
                    description: 'Lieu de ravitaillement des réfugiés de Wiltz',
                    image: 'https://images.unsplash.com/photo-1593131540982-57778192fc21?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    media: 'video-2.mp4'
                },
                notes_related: [
                    {
                        title: 'Note 01',
                        description: "Lorem ipsum dolor sit amet consectetur."
                    },
                    {
                        title: 'Note 02',
                        description: "Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis."
                    },
                    {
                        title: 'Note 03',
                        description: "Dolor sit amet consectetur."
                    }
                ]
            }
        ]
    };

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


    return isLoaded && (
        <>      
            {/* <Intro /> */}
            <MapBox items={geojson.features} arrow={arrowMarker}/>
        </>
    )
}



const MapBox = ({items, arrow}) => {
    const mapRef = useRef(null)
    const [lng, setLng] = useState(6.131514);
    const [lat, setLat] = useState(49.815764);
    const [zoom, setZoom] = useState(8);
    const [selectedMarker, setSelectedMarker] = useState({ id: null, data: null });

    return (
        <div className='mask h-[calc(100vh-80px)] overflow-hidden'>
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

        
                { items.map((marker, index) => {
                    return (

                        <Marker 
                            key={ index } 
                            longitude={ marker.geometry.coordinates[1] } 
                            latitude={ marker.geometry.coordinates[0] } 
                            anchor={ marker.properties.place === 'Grande-Bretagne' ? "center" : "bottom" }   
                        >
                            <div className='relative'> 
                                <img src={ marker.properties.place === 'Grande-Bretagne' ? arrow : pinMarker } alt="marker" className="cursor-pointer" onMouseOver={() => setSelectedMarker({ id: index, data: marker }) }/>

                                { marker.properties.place !== 'Grande-Bretagne' ?
                                    <AnimatePresence>
                                        { selectedMarker && selectedMarker.id == index &&
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.4, ease: 'easeInOut'}}
                                                className='w-[275px] h-[110px] absolute z-[9999] left-0 top-0 bg-white flex items-center justify-center cursor-pointer p-[6px] rounded-[6px]' 
                                                style={{ boxShadow: '23px 30px 15px 0px rgba(0, 0, 0, 0.45)'}}
                                                onMouseLeave={() => setSelectedMarker({ id: null, data: null }) }
                                            >
                                                <div className='border border-black rounded-[6px] h-full w-full'>
                                                    <Link to={`/notice/${selectedMarker.data.id}`}>

                                                        <div className='flex py-[12px]'>
                                                            <span className='abril block px-3'>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</span>
                                                            <div>                                                
                                                                <h3 className='abril text-[20px] pb-[8px]'>{ selectedMarker.data.properties.location }</h3>
                                                                <p className='sofia uppercase text-[20px]'>{ selectedMarker.data.properties.description }</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        }
                                    </AnimatePresence>
                                    :
                                    <div className='bg-[#F4F4F4] w-auto h-[25px] absolute top-[8px] sm:top-0 -translate-y-[50%] left-[100%] sm:right-[100%] sm:left-auto mx-[10px] sm:mx-0 flex justify-center items-center uppercase text-[20px] sofia px-[6px] whitespace-nowrap cursor-pointer' style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))" }} >{ marker.properties.place }</div>
                                }
                            </div>
                        </Marker>
                    )
                })}
            </Map>
        </div>    
    )
}




