// ASSETS
import './Map.scss'
import pinMarker from '../../assets/images/common/marker.svg'
import { useEffect, useRef, useState } from "react";

// FRAMER
import { motion } from "framer-motion"

// MAPBOX
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Popup } from 'react-map-gl';


export default function MapDisplay() {

    const [lng, setLng] = useState(6.131514);
    const [lat, setLat] = useState(49.815764);
    const [zoom, setZoom] = useState(9);
    const [selectedMarker, setSelectedMarker] = useState({ id: null, data: null });


    useEffect(() => {

    },[selectedMarker])

    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [49.48056, 6.0875]
                },
                properties: {
                    title: 'Mapbox',
                    location: 'Dudelange',
                    description: 'Lieu de ravitaillement des réfugiés de Dudelange'

                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [49.6112768, 6.129799]
                },
                properties: {
                    title: 'Mapbox',
                    location: 'Luxembourg',
                    description: 'Lieu de ravitaillement des réfugiés de Luxembourg'

                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [49.4959628, 5.9850306]
                },
                properties: {
                    title: 'Mapbox',
                    location: 'Esch-sur-Alzette',
                    description: 'Lieu de ravitaillement des réfugiés de Esch-sur-Alzette'
                }
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
                // mapboxAccessToken="pk.eyJ1IjoiYnVua2VyZGV2IiwiYSI6ImNsdndsYW14eTBoY24yam9nMjZrdG1jdWYifQ.3Q_qGsx-0GGzcYY4eD8RWQ"
                mapboxAccessToken="pk.eyJ1IjoiYmxhY2ttYWdpazg4IiwiYSI6ImNsZ3VrcjFvdjIzaDUzY210MHF1ZW5jb3MifQ.oFMw45FSzF-cJVUbu7f7fg"
                // mapStyle="mapbox://styles/mapbox/streets-v12"
                mapStyle="mapbox://styles/blackmagik88/clgqlrxnk00kb01pk2gz2fzhh"                
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: zoom,
                    pitch: 60 // Inclinaison en degrés
                }}
                minZoom={2}
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
                                onClick={() => setSelectedMarker({ id: index, data: marker }) }
                                onMouseOver={() => setSelectedMarker({ id: index, data: marker }) }
                                onMouseLeave={() => setSelectedMarker({ id: null, data: null }) }
                            />

                            { selectedMarker && selectedMarker.id == index &&
                                <div className='w-[280px] h-[120px] absolute z-[9999] left-5 top-5 bg-white flex items-center justify-center rounded-[6px]' style={{ boxShadow: '23px 30px 15px 0px rgba(0, 0, 0, 0.45)'}}>
                                    <div className='w-[260px] h-[100px] border border-black rounded-[6px] p-[8px]'>
                                        {/* <span onClick={() => setSelectedMarker({id: null, data: null })}>x</span> */}
                                        <h3 className='abril text-[20px] pb-[8px]'>{ selectedMarker.data.properties.location }</h3>
                                        <p className='sofia text-[20px]'>{ selectedMarker.data.properties.description }</p>
                                    </div>
                                </div>
                            }
                            </div>
                        </Marker>
                    )
                })}
            </Map>
        </motion.div>
    )
}