import map1 from '../../assets/images/spaceTimeMap/map-1.png'
import map2 from '../../assets/images/spaceTimeMap/map-2.png'
import map3 from '../../assets/images/spaceTimeMap/map-3.png'
import map4 from '../../assets/images/spaceTimeMap/map-4.png'
import pinMarker from '../../assets/images/spaceTimeMap/marker-red.svg'
import pinCluster from '../../assets/images/spaceTimeMap/marker-blue.svg'
import groupBy from 'object.groupby';


import {forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

// MAPBOX
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map, Marker, Source, Layer } from 'react-map-gl';
import mapboxgl from 'mapbox-gl'
import MapboxglSpiderifier from 'mapboxgl-spiderifier';
import 'mapboxgl-spiderifier/index.css';

// FRAMER
import { AnimatePresence, motion } from "framer-motion"

import MultiRangeSlider from "multi-range-slider-react";
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useSharedState } from '../../contexts/SharedStateProvider'
import { t } from 'i18next'
import { useMediaQuery } from 'react-responsive'
import siteConfig from '../../../site.config'
import { fetchData, transformDate } from '../../lib/utils';
import { useLanguageContext } from '../../contexts/LanguageProvider'
import { formatDate } from '../../lib/utils'
import defaultImage from '../../assets/images/common/default.png'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import SourceComponent from '../Source/Source'
import { useSourceContext } from '../../contexts/SourceProvider'

const rootPath = import.meta.env.VITE_ROOT
const tokenMapbox = import.meta.env.VITE_API_KEY_MAPBOX
const styleBlueprint = import.meta.env.VITE_API_STYLE_MAPBOX_BLUEPRINT
const styleMSF = import.meta.env.VITE_API_STYLE_MAPBOX_MSF
const styleGeo = import.meta.env.VITE_API_STYLE_MAPBOX_GEO


export default function SpaceTimeMap() {
    const [sharedState, setSharedState] = useSharedState()
    const [data, setData] = useState([])
    const [filters, setFilters] = useState({ min: transformDate('Jan-1939'), max: transformDate('Jan-1946') })
    const [isLoaded, setIsLoaded] = useState(false)
    const mapRef = useRef(null)
    const [openFilter, setOpenFilter] = useState(false)
    const [openLocation, setOpenLocation] = useState(false);


    const [ viewState, setViewState ] = useState({
        longitude: 6.1243943,
        latitude: 49.6099615,
        token: tokenMapbox,
        style: styleBlueprint,
        scrollZoom: false,
        zoom: 15,
        maxZoom: 18,
        minZoom: 8
    })

    const dataFiltered = []

    const handleZoomState = (newZoom) => {
        setViewState((prevState) => ({
            ...prevState,
            zoom: newZoom,
        }))
    }


    // ALL LOCATIONS WITH DATE
    useEffect(() => {
        const getData = async () => {
            const locations = await fetchData(`story`, {mentioned_to__slug: 'spatiotemporal-map'}, 100)
            if (locations.results.length > 0) {
                locations.results.forEach(location => {
                    location.covers.forEach(item => {
                        if (item.data && item.type == "glossary") {
                            if (new Date(item.data.start_date) >= filters.min && new Date(item.data.end_date) <= filters.max ) {
                                dataFiltered.push(location)
                            }
                        }
                    })
                })
                setData(dataFiltered)
                setIsLoaded(true)
            }
        }
        getData()
    }, [filters])


    useEffect(() => {
        setSharedState({ ...sharedState, showCurtains: false })
    }, [])

    const handleMap = (element) => {
        if (element.style) {
            setViewState((prevState) => ({ ...prevState, style: element.style, minZoom: element.style === "oldmap" ? 14 : 8 }))
        }

        if (element.zoom && mapRef.current) {
            const map = mapRef.current.getMap()

            if (element.style === "oldmap" && element.zoom >= 14 && element.zoom <= 18) {
                setViewState((prevState) => ({ ...prevState, zoom: element.zoom}))
                map.flyTo({center: [viewState.longitude, viewState.latitude], zoom: element.zoom})
            } else {
                setViewState((prevState) => ({ ...prevState, zoom: element.zoom}))
                map.flyTo({center: [viewState.longitude, viewState.latitude], zoom: element.zoom})
            }
        }
    }    


    const handleFilterChange = (newFilters) => {
        const { min, max } = newFilters
        setFilters({ min: transformDate(min), max: transformDate(max) })
    }

    const handleLocationChange = (isOpen) => {
        setOpenLocation(isOpen);
    }

    if (isLoaded) {
        return (

            <motion.div className='h-full w-full' exit={{opacity: 0.999, transition: {duration: siteConfig.curtainsTransitionDuration}}}>
                <MapBox items={data} state={viewState} ref={mapRef} onZoomChange={handleZoomState} onLocationChange={handleLocationChange} />

                {/** Map style and zoom */}
                <div className='absolute top-[40px] right-[20px]'>
                    <div className='flex gap-2 lg:gap-5'>

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

                        { viewState.style !== 'oldmap' &&
                            <div className='w-[60px] h-[60px] border border-white rounded-[4px] cursor-pointer' onClick={() => handleMap({style: 'oldmap', zoom: viewState.zoom >= 14 ? viewState.zoom : 14}) }>
                                <img src={map4} alt="map" className='rounded-[4px]'/>
                            </div>
                        }

                        <div>
                            <>
                                <div className='h-[40px] w-[40px] bg-white rounded-t-[6px] flex items-center justify-center' 
                                    onClick={() => {
                                        if (viewState.zoom <= 18) {
                                            handleMap({ zoom: parseInt(viewState.zoom) + 1 });
                                        }
                                    }}
                                >
                                    <PlusIcon style={{width: '20px'}} className={classNames('cursor-pointer', {
                                        'pointer-events-none text-gray-300': viewState.zoom >= 18
                                    })}/>
                                </div>
                                <hr />
                            </>

                            <div className='h-[40px] w-[40px] bg-white rounded-b-[6px] flex items-center justify-center' 
                                onClick={() =>{ 
                                    if ((viewState.zoom > 8 && viewState.style !== 'oldmap') || (viewState.style === 'oldmap' && viewState.zoom > 14) ) {
                                        handleMap({zoom: parseInt(viewState.zoom) - 1})
                                    } 
                                }}
                            >
                                <MinusIcon style={{width: '20px'}} className={classNames('text-[20px] cursor-pointer', {
                                    'pointer-events-none text-gray-300': viewState.zoom <= 8 || (viewState.style === 'oldmap' && viewState.zoom <= 14)
                                })}/>
                            </div>
                        </div>
                    </div>
                </div>

                <span className='hidden xl:block absolute z-[100] bottom-[15px] right-[15px] text-[13px] text-white font-antonio'>© MAPBOX 2024</span>

                <AnimatePresence>
                    {!openLocation && (
                        <motion.div
                            key="filter-panel"
                            className="relative"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Contenu avec animation */}
                            <div className="hidden md:block bottom-gradient absolute bottom-0"></div>
                            <div className="hidden md:block container mx-auto fixed bottom-[20px] left-0 right-0">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-10 col-start-2">
                                        <MultiRangeSelector onFilterChange={handleFilterChange} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/** Filter period Mobile */}
                {!openLocation &&
                <div className="fixed md:hidden bottom-0 left-0 right-0">
                    <div className='bg-[#475DA9] h-[70px] flex justify-center items-center border-t border-white relative z-[100]' onClick={() => setOpenFilter(!openFilter)}>
                        <span className='uppercase text-white text-[24px] cursor-pointer'>{ t('filter_by_period') }</span>
                    </div>

                    <div className={classNames('bg-[#475DA9] absolute bottom-[70px] left-0 right-0 flex justify-center items-center border-t border-white transition-all duration-[750ms]', {
                        "translate-y-full h-[70px]": !openFilter,
                        "translate-y-0 h-[150px]": openFilter
                    })}>
                        <XMarkIcon className='absolute right-[10px] top-[10px] cursor-pointer text-white' style={{ width: '25px' }}
                            onClick={() => {setOpenFilter(!openFilter)}}
                        />

                        <div className='w-full mx-[20px]'>
                            <MultiRangeSelector onFilterChange={ handleFilterChange }/>
                        </div>
                    </div>
                </div> 
                } 
            </motion.div>
        )
    }
}


const MapBox = forwardRef(({ items, state, onZoomChange, onLocationChange }, ref) => {
    const innerRef = useRef(null);
    const clusterRef = useRef(null);
    useImperativeHandle(ref, () => ({
        getMap: () => innerRef.current?.getMap(), // Expose `getMap()` pour accéder à l'instance Mapbox
    }), []);

    const { language } = useLanguageContext()
    const [selectedMarker, setSelectedMarker] = useState({ id: null, data: null })
    const [openLocation, setOpenLocation] = useState(false)
    const [openSource, setOpenSource] = useState(false)
    const isSmall = useMediaQuery({ query: '(max-width: 768px)'})
    const [dateStart, setDateStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)
    const [city, setCity] = useState(null)
    const [description, setDescription] = useState(null )
    const {setIsOpenSource} = useSourceContext()
    const [mapLoaded, setMapLoaded] = useState(false)

    const handleMapScroll = () => {
        const map = innerRef.current.getMap()
        const newZoom = map.getZoom()

        if (onZoomChange) {
            onZoomChange(newZoom);
        }
    }

    const sourceStyle = {
        id: 'geoportail',
        type: 'raster',
        tileSize: 256,
        tiles: [
            'https://wms.geoportail.lu/public_map_layers/service/220?service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=220&bbox={bbox-epsg-3857}&format=image/png&styles'
        ]
    }

    const layerStyle = {
        id: "geoportail-layer",
        type: "raster",
        source: "geoportail"
    }

    const oldMapSourceStyle = {
        id: 'oldmap',
        type: 'raster',
        tileSize: 256,
        tiles: [
            '/tiles/oldmap/{z}/{x}/{y}.png'
        ]
    }

    const oldMapLayerStyle = {
        id: "oldmap-layer",
        type: "raster",
        minzoom: 14,
        source: "oldmap"
    }

    useEffect(() => {
        if (onLocationChange) {
            onLocationChange(openLocation);
        }
    }, [openLocation, onLocationChange]);

    useEffect(() => {
        if (selectedMarker.data && selectedMarker.id) {
            selectedMarker.data.covers.map(cover => {
                if (cover.type === "glossary") {
                    setDateStart(formatDate(cover.data.start_date, language))
                    setDateEnd(formatDate(cover.data.end_date, language))
                    setDescription(cover.data.description[language])
                }
                if (cover.data.type === "place") {
                    setCity(cover.data.geojson.properties.city[language])
                }
            })
        }
    }, [selectedMarker, language])


    useEffect(() => {
        if (innerRef.current && mapLoaded) {
            const map = innerRef.current.getMap();
            
            clusterRef.current = new MapboxglSpiderifier(map, {
                onClick: function (e, spiderLeg) {
                    setOpenLocation(true)
                    setIsOpenSource(true)
                    setSelectedMarker({ id: spiderLeg.feature.id, data: spiderLeg.feature.data })
                },
                customPin: true,
                animate: true,
                animationSpeed: 200
            });

            // map.on('error', function(error) {
            //     console.log('Map loading error:', error);
            // }); 

        } 
    }, [items, mapLoaded]);

    const allMarkers = Object.values(groupBy(items.reduce((acc, item) => {
        const markers = item.covers.filter(cover => cover.data.type === "place").map(cover => {
            return {
                id: item.id,
                markerId: cover.id,
                coordinates: cover.data.geojson.geometry.coordinates,
                data: item
            };
        });
        return acc.concat(markers);
    }, []), ({ coordinates }) => coordinates));


    const clusters = allMarkers.filter(item => item.length > 1);
    const markers = allMarkers.filter(item => item.length === 1).flat();

    return (
        <>
            <div className='mask w-full h-[calc(100dvh-80px)] sm:h-[calc(100vh-80px)] transition-all duration-[750ms]'>
                <Map
                    ref={innerRef}
                    style={{ width: '100%', height: '100%' }}
                    mapboxAccessToken={state.token}
                    mapStyle={state.style}
                    initialViewState={{
                        longitude: state.longitude,
                        latitude: state.latitude,
                        zoom: state.zoom,
                        pitch: 30 // Inclinaison en degrés
                    }}
                    minZoom={state.minZoom} // Ne peut pas dézoomer en dessous de x8
                    maxZoom={state.maxZoom}
                    dragRotate={true} // 3D Relief : désactiver
                    scrollZoom={true} // Désactiver Zoom scroll
                    // onZoomEnd={handleMapScroll}
                    onLoad={
                        () => setMapLoaded(true)
                    }
                >
                    {state.style === 'geoportail' && (
                        <Source {...sourceStyle}>
                            <Layer {...layerStyle} />
                        </Source>
                    )}

                    {state.style === 'oldmap' && (
                        <Source {...oldMapSourceStyle}>
                            <Layer {...oldMapLayerStyle} />
                        </Source>
                    )}
                    
                    {markers.map(item =>
                        <Marker
                            key={item.markerId}
                            longitude={item.coordinates[0]}
                            latitude={item.coordinates[1]}
                        >
                            <div className='relative'>
                                <img src={pinMarker} alt="marker" className="cursor-pointer"
                                    onClick={() => {
                                        setOpenLocation(true)
                                        setIsOpenSource(true)
                                        setSelectedMarker({ id: item.id, data: item.data })
                                    }}
                                />
                            </div>
                        </Marker>
                    )}

                    {clusters.map(item =>
                        <Marker
                            key={item[0].markerId}
                            longitude={item[0].coordinates[0]}
                            latitude={item[0].coordinates[1]}
                        >
                            <div className='relative'>
                                <img src={pinCluster} alt="marker" className="cursor-pointer"
                                    onClick={() => {
                                        clusterRef.current.spiderfy(item[0].coordinates, item);
                                    }}
                                />
                            </div>
                        </Marker>
                    )}
                    
                </Map>

                {/* <div ref={innerRef}  style={{ width: '100%', height: '100vh' }} /> */}
                
                {!isSmall &&                
                    <AnimatePresence>
                        {openLocation &&
                            <motion.div
                                key="location-panel"
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ duration: 0.8, ease: 'easeInOut' }}
                                className='md:w-[70%] lg:w-[60%] xl:w-[40%] h-full bg-white absolute z-[9999] md:pt-[100px] pb-[50px] sm:pl-[80px] sm:pr-[40px] top-0 overflow-scroll'
                            >

                                <XMarkIcon className='hidden md:block absolute right-[40px] top-[60px] cursor-pointer' style={{ width: '40px' }}
                                    onClick={() => {
                                        setOpenLocation(false);
                                        setIsOpenSource(false)
                                        setSelectedMarker({ id: null, data: null });
                                    }}
                                />

                                <div className="md:hidden bg-[rgba(0,0,0,0.9)] h-[120px] flex justify-center items-center"
                                    onClick={() => {
                                        setOpenLocation(false);
                                        setSelectedMarker({ id: null, data: null });
                                    }}>
                                        <span className='cursor-pointer text-[24px] uppercase text-white'>{ t('close') }</span>
                                </div>

                                <div className='px-[20px] md:px-0'>

                                    {/* Location */}
                                    {selectedMarker.data.covers.map(cover => {
                                        if (cover.type === "glossary") {
                                            return (
                                                <h2 key={cover.id} className='text-[30px] pb-[10px] md:pb-[30px] font-semibold pt-[20px] md:pt-0'>{cover.data.title[language]}</h2>
                                            )
                                        }

                                    })}

                                    {description &&
                                        <p className='text-[28px] pb-[40px] md:pb-[10px] font-light'>{ description }</p>
                                    }

                                    {/* {city &&
                                        <span className='text-[28px] pb-[40px] md:pb-[10px] italic'>{ city }, </span>
                                    }

                                    {dateStart &&
                                        <span className='text-[28px] pb-[40px] md:pb-[10px] italic'>{ dateStart } - </span>
                                    }

                                    {dateEnd &&
                                        <span className='text-[28px] pb-[40px] md:pb-[10px] italic'>{ dateEnd }</span>
                                    } */}

                                    {selectedMarker.data.covers.map(cover => {
                                        if (cover.type === "glossary" && cover.data.resolutions?.medium.url) {
                                            return (
                                                <div key={cover.id} className='mt-[30px]'>
                                                    <img key={cover.id} src={cover.data.resolutions.medium.url ? rootPath + cover.data.resolutions.medium.url : defaultImage } alt="" className='rounded-[5px]' />
                                                    <Link  className="button-arrow border border-black px-[12px] py-[8px] w-fit mt-[40px] md:mt-[30px] flex items-center rounded-[4px] cursor-pointer" onClick={() => setOpenSource(true)}>
                                                        <span className='uppercase text-[24px] font-medium pr-[12px]'>{ t('learn_more') }</span>
                                                        <span className='block icon-arrow'></span>
                                                    </Link>
                                                </div>
                                            )
                                        }

                                    })}
                                </div>
                            </motion.div>
                        }
                    </AnimatePresence>
                }
            </div>

            {isSmall &&            
                <AnimatePresence>
                    {openLocation &&
                        <motion.div
                            key="location-panel"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                            className='md:w-[70%] lg:w-[60%] xl:w-[40%] h-full bg-white absolute z-[9999] md:pt-[100px] md:pl-[80px] md:pr-[40px] top-0'
                        >

                            <div className="md:hidden bg-[rgba(0,0,0,0.9)] h-[120px] flex justify-center items-center"
                                onClick={() => {
                                    setOpenLocation(false);
                                    setSelectedMarker({ id: null, data: null });
                                }}>
                                    <span className='cursor-pointer text-[24px] uppercase text-white' onClick={() => setIsOpenSource(false)}>{ t('close') }</span>
                            </div>

                            <div className='px-[20px] md:px-0 pb-[40px] h-[calc(100dvh-120px)] overflow-scroll'>

                                {/* Location */}
                                {selectedMarker.data.covers.map(cover => {
                                    if (cover.type === "glossary") {
                                        return (
                                            <h2 key={cover.id} className='text-[30px] pb-[10px] md:pb-[30px] font-semibold pt-[20px] md:pt-0'>{cover.data.title[language]}</h2>
                                        )
                                    }

                                })}

                                    {description &&
                                        <p className='text-[28px] pb-[40px] md:pb-[10px] font-light'>{ description }</p>
                                    }
{/* 
                                    {city &&
                                        <span className='text-[28px] pb-[40px] md:pb-[10px] italic'>{ city }, </span>
                                    }

                                    {dateStart &&
                                        <span className='text-[28px] pb-[40px] md:pb-[10px] italic'>{ dateStart } - </span>
                                    }

                                    {dateEnd &&
                                        <span className='text-[28px] pb-[40px] md:pb-[10px] italic'>{ dateEnd }</span>
                                    } */}

                                    {selectedMarker.data.covers.map(cover => {
                                        if (cover.type === "glossary" && cover.data.resolutions?.medium.url) {
                                            return (
                                                <div key={cover.id} className='mt-[30px]'>
                                                    <img key={cover.id} src={cover.data.resolutions.medium.url ? rootPath + cover.data.resolutions.medium.url : defaultImage } alt="" className='rounded-[5px]' />
                                                    <Link  className="button-arrow border border-black px-[12px] py-[8px] w-fit mt-[40px] md:mt-[30px] flex items-center rounded-[4px] cursor-pointer" onClick={() => setOpenSource(true)}>
                                                        <span className='uppercase text-[24px] font-medium pr-[12px]'>{ t('learn_more') }</span>
                                                        <span className='block icon-arrow'></span>
                                                    </Link>
                                                </div>
                                            )
                                        }

                                    })}
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            }

            <AnimatePresence>
                {openSource &&
                    <motion.div
                        className={classNames('absolute w-full h-full z-[10000]', {
                            'mask': !isSmall
                        })}
                        initial={{ top: '100%' }}
                        animate={{ top: 0}}
                        exit={{ top: '100%'}}
                        transition={{ duration: 0.8, ease: 'easeInOut'}}
                    >
                        <SourceComponent data={ selectedMarker.data } handleSourcePopup={() => setOpenSource(false)}/>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
})

MapBox.displayName


const MultiRangeSelector = ({ onFilterChange }) => {
    const monthNames = ["Jan", "Apr", "Jul", "Oct"]
    const labels = ["1939", "1939-1", "1939-2", "1939-3", "1940", "1940-1", "1940-2", "1940-3", "1941", "1941-1", "1941-2", "1941-3", "1942", "1942-1", "1942-2", "1942-3", "1943", "1943-1", "1943-2", "1943-3", "1944", "1944-1", "1944-2", "1944-3", "1945", "1945-1", "1945-2", "1945-3", "1946"]

    const generateDateLabels = (startYear, endYear) => {
        let dates = [];
        for (let year = startYear; year <= endYear; year++) {
            for (let month = 0; month < 4; month++) {
                if (year === endYear && month > 0) break
                const monthName = monthNames[month]
                dates.push(`${monthName}-${year}`)
            }
        }
        return dates
    }


    const dateGenerated = generateDateLabels(1939, 1946);
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(dateGenerated.length - 1)
    const [minDateCaption, setMinDateCaption] = useState(dateGenerated[0])
    const [maxDateCaption, setMaxDateCaption] = useState(dateGenerated[dateGenerated.length - 1])

    const handleDateChange = (e) => {
        setMinValue(e.minValue)
        setMaxValue(e.maxValue)

        setMinDateCaption(dateGenerated[minValue])
        setMaxDateCaption(dateGenerated[maxValue])

        onFilterChange({
            min: dateGenerated[e.minValue],
            max: dateGenerated[e.maxValue]
        })
    }


    return (
        <MultiRangeSlider
            labels={labels}
            min={0}
            max={dateGenerated.length - 1}
            minValue={minValue}
            maxValue={maxValue}
            step={1}
            minCaption={minDateCaption}
            maxCaption={maxDateCaption}
            onChange={handleDateChange}
        />
    )
}
