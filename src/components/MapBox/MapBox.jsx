// ASSETS

import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cloud from '../../assets/images/common/cloud.png?w=500;700;900;1200;1900&format=webp&as=srcset'

// FRAMER
import { AnimatePresence, motion } from "framer-motion"

// MAPBOX
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Source, Layer } from 'react-map-gl';


export default function MapBox({ token, style, items }) {

    const mapRef = useRef(null)
    const navigate = useNavigate()
    const [lng, setLng] = useState(6.131514);
    const [lat, setLat] = useState(49.815764);
    const [zoom, setZoom] = useState(9);
    const [selectedMarker, setSelectedMarker] = useState({ id: null, data: null });

    const { pathname } = useLocation()

    // function handleClick(id) {
    //     mapRef.current?.flyTo({ zoom: 1, duration: 2000 })
    //     setShowClouds(true)

    //     setTimeout(() => {
    //         navigate(`notice/${id}`)
    //     }, 2000)
    // }


    return (   
    
        <>
            <div className='mask h-[calc(100vh-70px)] overflow-hidden'>
                <Map
                    ref={mapRef}
                    style={{ width: '100%', height: '100%' }}
                    mapboxAccessToken={token}
                    mapStyle={style}              
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

                    {/** Carte Spatio-temporelle geoportail */}
                    {/* { pathname === "/spacetime-map" &&
                        <Source id="geo" type="raster-dem" url='https://wms.geoportail.lu/public_map_layers/service/220?service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=220&bbox={bbox-epsg-3857}&format=image/png&styles'>
                            <Layer type="hillshade" id="layer_id" source="geo" />
                        </Source>
                    } */}
        

                    { items.map((marker, index) => {
                        return (

                            <Marker 
                                key={ index } 
                                longitude={ marker.geometry.coordinates[1] } 
                                latitude={ marker.geometry.coordinates[0] } 
                                anchor={ marker.properties.place === 'Grande-Bretagne' ? "center" : "bottom" }   
                            >
                                <div className='relative'> 
                                    <img src={ marker.properties.place === 'Grande-Bretagne' ? arrowMarker : pinMarker } alt="marker" className="cursor-pointer" onMouseOver={() => setSelectedMarker({ id: index, data: marker }) }/>

                                    {/** Popup Home */}
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
                                        <div className='bg-[#F4F4F4] w-auto h-[25px] absolute top-0 -translate-y-[50%] right-[100%] flex justify-center items-center uppercase text-[20px] sofia px-[6px] whitespace-nowrap cursor-pointer' style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))" }} >{ marker.properties.place }</div>
                                    }
                                </div>
                            </Marker>
                        )
                    })}
                </Map>
            </div>    

        </>
    )
}




