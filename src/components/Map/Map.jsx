// ASSETS
import './Map.scss'
import pinMarker from '../../assets/images/common/marker.svg'
import { useEffect, useRef, useState } from "react";

// FRAMER
import { AnimatePresence, motion } from "framer-motion"

// MAPBOX
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Popup } from 'react-map-gl';
import { Link } from 'react-router-dom';


export default function MapDisplay() {

    const [lng, setLng] = useState(6.131514);
    const [lat, setLat] = useState(49.815764);
    const [zoom, setZoom] = useState(9);
    const [selectedMarker, setSelectedMarker] = useState({ id: null, data: null });


    useEffect(() => {

    },[selectedMarker])

    const geojson = {
        features: [
            {
                id: 1,
                geometry: {
                    coordinates: [49.48056, 6.0875]
                },
                properties: {
                    city: 'Dudelange',
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
                    city: 'Luxembourg',
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
                    city: 'Esch-sur-Alzette',
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
                    city: 'Wiltz',
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

    
    return (
        <motion.div     
            className="w-full h-[calc(100vh-120px)] map"
            initial={{ y: "95vh" }}
            animate={{ y: "120px" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 4 }}
        >    
              
            <Map
                style={{ width: '100%', height: '100%' }}
                mapboxAccessToken="pk.eyJ1IjoiYmxhY2ttYWdpazg4IiwiYSI6ImNsZ3VrcjFvdjIzaDUzY210MHF1ZW5jb3MifQ.oFMw45FSzF-cJVUbu7f7fg"
                mapStyle="mapbox://styles/blackmagik88/clgqlrxnk00kb01pk2gz2fzhh"                
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: zoom,
                    pitch: 30 // Inclinaison en degrés
                }}
                minZoom={8} // Ne peut pas dézoomer en dessous de x8

                dragRotate={false} // 3D Relief : désactiver 
                scrollZoom={true} // Désactiver Zoom scroll
            >
                { geojson.features.map((marker, index) => {
                    return (
                   
                        <Marker 
                            key={ index } 
                            longitude={ marker.geometry.coordinates[1] } 
                            latitude={ marker.geometry.coordinates[0] } 
                            anchor="bottom"   
                        >
                            <div className='relative'>
                                <img src={ pinMarker } alt="marker" className="cursor-pointer" 
                                    // onClick={() => setSelectedMarker({ id: index, data: marker }) }
                                    onMouseOver={() => setSelectedMarker({ id: index, data: marker }) }
                                />

                                <AnimatePresence>
                                { selectedMarker && selectedMarker.id == index &&
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut'}}
                                        className='w-[275px] h-[110px] absolute z-[9999] left-0 top-0 bg-white flex items-center justify-center rounded-[6px] cursor-pointer p-[6px]' 
                                        style={{ boxShadow: '23px 30px 15px 0px rgba(0, 0, 0, 0.45)'}}
                                        onMouseLeave={() => setSelectedMarker({ id: null, data: null }) }
                                    >
                                        <Link to={`/notice/${selectedMarker.data.id}`} state={{ data: selectedMarker.data }} className='border border-black rounded-[6px] h-full'>
                                            <div className='flex py-[12px]'>
                                                <span className='abril block px-3'>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</span>
                                                <div>
                                                    <h3 className='abril text-[20px] pb-[8px]'>{ selectedMarker.data.properties.location }</h3>
                                                    <p className='sofia uppercase text-[20px]'>{ selectedMarker.data.properties.description }</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                }
                                </AnimatePresence>
                            </div>
                        </Marker>
                    )
                })}
            </Map>
        </motion.div>
    )
}