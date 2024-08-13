import map1 from '../../assets/images/spaceTimeMap/map-1.png'
import map2 from '../../assets/images/spaceTimeMap/map-2.png'
import map3 from '../../assets/images/spaceTimeMap/map-3.png'
import pinMarker from '../../assets/images/spaceTimeMap/marker-red.svg'

import {useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/sharp-thin-svg-icons'
import { faArrowRight, faArrowRightLong } from '@fortawesome/pro-light-svg-icons'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

// MAPBOX
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map, Marker, Source, Layer } from 'react-map-gl';

// FRAMER
import { AnimatePresence, motion } from "framer-motion"

import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useSharedState } from '../../contexts/SharedStateProvider'

const tokenMapbox = import.meta.env.VITE_API_KEY_MAPBOX
const styleBlueprint = import.meta.env.VITE_API_STYLE_MAPBOX_BLUEPRINT
const styleMSF = import.meta.env.VITE_API_STYLE_MAPBOX_MSF
const styleGeo = import.meta.env.VITE_API_STYLE_MAPBOX_GEO


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

export default function SpaceTimeMap() {
    
    const [sharedState, setSharedState] = useSharedState()
    const mapRef = useRef(null);
    const [openFilter, setOpenFilter] = useState(false)
    const [ viewState, setViewState ] = useState({
        longitude: 6.1243943,
        latitude: 49.6099615,
        token: tokenMapbox,
        style: styleBlueprint,  
        zoom: 15,
        maxZoom: 18,
        minZoom: 8
    })

    useEffect(() => {
        setSharedState({ ...sharedState, showCurtains: false })
    })


    const handleMap = (element) => {
        if (element.style) {
            setViewState((prevState) => ({ ...prevState, style: element.style }));
        }

        // if (element.zoom && element.zoom >= 8) {
        if (element.zoom && element.zoom >= 8 && element.zoom <= 18) {
            setViewState((prevState) => ({ ...prevState, zoom: element.zoom }))
            const map = mapRef.current.getMap()
            map.flyTo({center: [viewState.longitude, viewState.latitude], zoom: element.zoom})
        }
    }


    return (
        // <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transition: {duration: 1}}}>
        //     <h1 className="text-center text-[60px] mt-[100px]">Carte Spatio-temporelle</h1>
        // </motion.div>

        <>
            
            <div className='mask h-[calc(100vh-80px)] overflow-hidden'>
                <MapBox items={geojson.features} state={viewState} mapRef={mapRef}/>
            </div>

            <span className='block absolute z-[999] bottom-[15px] right-[15px] text-[13px] text-white antonio'>© MAPBOX 2024</span>

            {/** Gradient Bottom */}
            <div className="hidden sm:block bottom-gradient absolute bottom-0"></div>
        
            {/** Filter period Desktop */}
            <div className="hidden sm:block container mx-auto fixed bottom-[20px] left-0 right-0">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <MultiRangeSelector/>
                    </div>
                </div>
            </div>

            {/** Filter period Mobile Tablet */}
            <div className='sm:hidden bg-[#475DA9] h-[70px] fixed z-[100] bottom-0 left-0 right-0 flex justify-center items-center border-t border-white' onClick={() => setOpenFilter(!openFilter)}>
                <span className='uppercase text-white text-[24px]'>Filtrer par période</span>
            </div>

            <div className={classNames('sm:hidden bg-[#475DA9] h-[150px] fixed bottom-[70px] left-0 right-0 flex justify-center items-center border-t border-white transition-all duration-[750ms]', {
                "translate-y-full": !openFilter,
                "translate-y-0": openFilter
            })}>
            </div>
            

            {/** Map style */}
            <div className='absolute top-[40px] right-[20px]'>
                <div className='flex gap-5'>

                    { viewState.style !== styleGeo &&     
                        <div className='w-[60px] h-[60px] border border-white rounded-[4px] cursor-pointer' onClick={() => handleMap({style: styleGeo}) }>
                            <img src={map1} alt="map" className='rounded-[4px]' />
                        </div>
                    }

                    { viewState.style !== styleMSF &&                    
                        <div className='w-[60px] h-[60px] border border-white rounded-[4px] cursor-pointer' onClick={() => handleMap({style: styleMSF}) }>
                            <img src={map2} alt="map" className='rounded-[4px]'/>
                        </div>
                    }

                    { viewState.style !== styleBlueprint &&
                        <div className='w-[60px] h-[60px] border border-white rounded-[4px] cursor-pointer' onClick={() => handleMap({style: styleBlueprint}) }>
                            <img src={map3} alt="map" className='rounded-[4px]'/>
                        </div>
                    }

                    <div>
                        <>
                            <div className='h-[40px] w-[40px] bg-white rounded-t-[6px] flex items-center justify-center' onClick={() => handleMap({zoom: parseInt(viewState.zoom) + 1}) }>
                                <FontAwesomeIcon icon={faPlus} className={classNames('cursor-pointer', {
                                    'pointer-events-none text-gray-300': viewState.zoom >= 18
                                })} />
                            </div>
                            <hr />
                        </>

                        <div className='h-[40px] w-[40px] bg-white rounded-b-[6px] flex items-center justify-center' onClick={() => handleMap({zoom: parseInt(viewState.zoom) - 1}) }>
                            <FontAwesomeIcon icon={faMinus} className={classNames('cursor-pointer', {
                                'pointer-events-none text-gray-300': viewState.zoom <= 8
                            })} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const MapBox = ({ items, state, mapRef }) => {
    const [selectedMarker, setSelectedMarker] = useState({ id: null, data: null });
    const [openLocation, setOpenLocation] = useState(false);
    const [btnHover, setBtnHover] = useState(false);

    const sourceStyle = {
        id: 'geoportail',
        type: 'raster',
        tileSize: 256,
        tiles: [
            'https://wms.geoportail.lu/public_map_layers/service/220?service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=220&bbox={bbox-epsg-3857}&format=image/png&styles'
        ]
    };

    const layerStyle = {
        id: "geoportail-layer",
        type: "raster",
        source: "geoportail"
    };

    return (
        <>
            <Map
                ref={mapRef}
                style={{ width: '100%', height: '100%' }}
                mapboxAccessToken={state.token}
                mapStyle={state.style}
                initialViewState={{
                    longitude: state.longitude,
                    latitude: state.latitude,
                    zoom: state.zoom,
                    pitch: 30 // Inclinaison en degrés
                }}
                minZoom={8} // Ne peut pas dézoomer en dessous de x8
                dragRotate={true} // 3D Relief : désactiver
                scrollZoom={true} // Désactiver Zoom scroll
            >
                {state.style === 'geoportail' && (
                    <Source {...sourceStyle}>
                        <Layer {...layerStyle} />
                    </Source>
                )}

                {items.map((marker) => (
                    <Marker
                        key={marker.id}
                        longitude={marker.geometry.coordinates[1]}
                        latitude={marker.geometry.coordinates[0]}
                        anchor={marker.properties.place === 'Grande-Bretagne' ? "center" : "bottom"}
                    >
                        <div className='relative'>
                            <img
                                src={pinMarker}
                                alt="marker"
                                className="cursor-pointer"
                                onMouseOver={() => setSelectedMarker({ id: marker.id, data: marker })}
                                onClick={() => setSelectedMarker({ id: marker.id, data: marker })}
                            />

                            <AnimatePresence>
                                {selectedMarker && selectedMarker.id === marker.id && (
                                    <motion.div
                                        key={selectedMarker.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className='w-[300px] h-[110px] absolute z-[9999] left-0 top-0 bg-white flex items-center justify-center cursor-pointer p-[6px] rounded-[6px]'
                                        style={{ boxShadow: '23px 30px 15px 0px rgba(0, 0, 0, 0.45)' }}
                                        onMouseLeave={() => !openLocation && setSelectedMarker({ id: null, data: null })}
                                        onClick={() => setOpenLocation(true)}
                                    >
                                        <div className='border border-black rounded-[6px] h-full w-full overflow-scroll'>
                                            <div className='flex py-[12px]'>
                                                <span className='abril block px-3'>{marker.id < 10 ? '0' + marker.id : marker.id}</span>
                                                <div className='pr-3'>
                                                    <h3 className='abril text-[20px] pb-[8px]'>{selectedMarker.data.properties.location}</h3>
                                                    <p className='sofia uppercase text-[20px]'>{selectedMarker.data.properties.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Marker>
                ))}
            </Map>

            <AnimatePresence>
                {openLocation &&
                    <motion.div
                        key="location-panel"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className='w-[40%] h-full bg-white absolute top-0 pt-[100px] pl-[80px] pr-[40px]'
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            className='absolute right-[40px] top-[60px] cursor-pointer'
                            style={{ fontSize: '40px' }}
                            onClick={() => {
                                setOpenLocation(false);
                                setSelectedMarker({ id: null, data: null });
                            }}
                        />
                        <div>
                            <h2 className='text-[30px] pb-[30px] font-semibold'>{selectedMarker.data.properties.location}</h2>
                            <span className='text-[28px] block mb-[10px]'>{selectedMarker.data.properties.place}, mars 1945</span>
                            <img src={selectedMarker.data.properties.image} alt="" className='rounded-[5px]' />
                            <Link
                                className="button-arrow border border-black px-[12px] py-[8px] w-fit mt-[30px] flex items-center rounded-[4px] cursor-pointer"
                                onMouseOver={() => setBtnHover(true)}
                                onMouseLeave={() => setBtnHover(false)}
                            >
                                <span className='uppercase text-[24px] font-medium pr-[12px]'>En savoir plus</span>
                                <span className='block icon-arrow'></span>
                            </Link>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    );
};




const MultiRangeSelector = () => {

    const monthNames = ["Jan", "Apr", "Jul", "Oct"]
    const labels = ["1939", "", "", "", "1940", "", "", "", "1941", "", "", "", "1942", "", "", "", "1943", "", "", "", "1944", "", "", "", "1945", "", "", "", "1946"]
    

    // const labels = [
    //     { label: "1939", key: "1939-0" }, { label: "", key: "1939-1" }, { label: "", key: "1939-2" }, { label: "", key: "1939-3" },
    //     { label: "1940", key: "1940-0" }, { label: "", key: "1940-1" }, { label: "", key: "1940-2" }, { label: "", key: "1940-3" },
    //     { label: "1941", key: "1941-0" }, { label: "", key: "1941-1" }, { label: "", key: "1941-2" }, { label: "", key: "1941-3" },
    //     { label: "1942", key: "1942-0" }, { label: "", key: "1942-1" }, { label: "", key: "1942-2" }, { label: "", key: "1942-3" },
    //     { label: "1943", key: "1943-0" }, { label: "", key: "1943-1" }, { label: "", key: "1943-2" }, { label: "", key: "1943-3" },
    //     { label: "1944", key: "1944-0" }, { label: "", key: "1944-1" }, { label: "", key: "1944-2" }, { label: "", key: "1944-3" },
    //     { label: "1945", key: "1945-0" }, { label: "", key: "1945-1" }, { label: "", key: "1945-2" }, { label: "", key: "1945-3" },
    //     { label: "1946", key: "1946-0" }
    // ]



    const generateDateLabels = (startYear, endYear) => {
        let dates = []
        
        for (let year = startYear; year <= endYear; year++) {
            for (let month = 0; month < 4; month++) {
                if (year === endYear && month > 0) break
                const monthName = monthNames[month]
                dates.push(`${monthName}-${year}`)
            }
        }
        return dates
    }
    
    
    const dateGenerated = generateDateLabels(1939, 1946)
    
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(dateGenerated.length - 1)

    const [minDateCaption, setMinDateCaption] = useState(dateGenerated[0])
    const [maxDateCaption, setMaxDateCaption] = useState( dateGenerated[dateGenerated.length - 1])
    
    const handleDateChange = (e) => {
        setMinDateCaption(dateGenerated[e.minValue])
        setMaxDateCaption(dateGenerated[e.maxValue])
        setMinValue(e.minValue)
        setMaxValue(e.maxValue)
    }

 
    return (
        <MultiRangeSlider
            labels={labels}
            min={0}
            max={dateGenerated.length - 1}
            minValue={0}
            maxValue={dateGenerated.length - 1}
            step={1}
            minCaption={minDateCaption}
            maxCaption={maxDateCaption}
            onInput={handleDateChange}
            // onChange={(e) => console.log(e)}
        />
    )
}




