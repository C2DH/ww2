import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from 'react-responsive'
import { useSharedState } from "../../contexts/SharedStateProvider"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import siteConfig from '../../../site.config'
import { fetchData, truncateText } from "../../lib/utils";
import { useLanguageContext } from "../../contexts/LanguageProvider"
const apiKeyMapbox = import.meta.env.VITE_API_KEY_MAPBOX
const apiStyleMapbox = import.meta.env.VITE_API_STYLE_MAPBOX_MSF
maptilerClient.config.apiKey = import.meta.env.VITE_API_MAPTILER

// ASSETS
import pinMarker from '../../assets/images/common/marker.svg'
import smallLeftArrow from '../../assets/images/common/smallLeftArrow.png'
import smallRightArrow from '../../assets/images/common/smallRightArrow.png'
import UKArrowLong from '../../assets/images/common/ukArrowLong.png'
import russiaArrowLong from '../../assets/images/common/russiaArrowLong.png'
import polskaArrowLong from '../../assets/images/common/polskaArrowLong.png'
import { XMarkIcon } from "@heroicons/react/24/outline"

// FRAMER
import { AnimatePresence, motion } from "framer-motion"

// MAPBOX
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import * as maptilerClient from "@maptiler/client"
import classNames from "classnames"

export default function Home() {
    const [sharedState, setSharedState] = useSharedState()
    const [isLoaded, setIsLoaded] = useState(false); 
    const [data, setData] = useState(null)

    const getData = async () => {
        const data = await fetchData('story', {
            mentioned_to__slug: 'journeys',
            covers__data__type: 'place'
        }, 100)
        
        if (data) {
            setData(data.results)
            setIsLoaded(true)
        }
    }

    useEffect(() => {
        setSharedState({ ...sharedState, showClouds: false, showCurtains: false })
    }, [])

    useEffect(() => {
        getData()
    }, [])
    
    return isLoaded && data && (
        <MapBox items={data}/>
    )
}

const MapBox = ({ items }) => {
    const { t } = useTranslation()
    const { language } = useLanguageContext()
    const isSmall = useMediaQuery({ query: '(max-width: 1024px)'})
    const mapRef = useRef(null)
    const navigate = useNavigate()
    const [lng] = useState(6.131514)
    const [lat] = useState(49.815764)
    const [zoom, setZoom] = useState(8)
    const [scroolZoom, setScrollZoom] = useState(true)
    const [isFlying, setIsFlying] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState({ id: null, data: null })
    const [markers, setMarkers] = useState([])
    const bounds = [
        [4.635609906406312, 49.24474658911654], // Southeast coordinate
        [7.7936412937252015, 50.38780761708563] // Northeast coordinate
    ]
     
    useEffect(() => {
        setMarkers([
            {origin: 'luxToUk', country: 'uk', img: isSmall ? smallLeftArrow : UKArrowLong, lat: isSmall ? 50.09985688348138 : 50.00708409698924, lng: isSmall ? 5.773948314338081 : 5.377067446744771, destination: {lat: 51.5074, lng: -0.1278 }},
            {origin: 'luxToRussia', country: 'russia', img: isSmall ? smallRightArrow : russiaArrowLong, lat: isSmall ?  49.98162959665259 : 50.03469691527637, lng: isSmall ? 6.552160650142298 : 7.104207203884845, destination: {lat: 55.55709366783896, lng: 30.95355419000392 }},
            {origin: 'luxToPolska', country: 'polska', img: isSmall ? smallRightArrow : polskaArrowLong, lat: 50.17060676591056, lng: 6.515322417081631, destination: {lat: 52.21820180325254, lng: 17.665013242195442 }},
            {origin: 'ukToLux', country: 'luxembourg', img: isSmall ? smallRightArrow : polskaArrowLong, lat: 51.5074, lng: 0.5, destination: {lat: 49.815764, lng: 6.131514 }},
            {origin: 'russiaToLux', country: 'luxembourg', img: isSmall ? smallLeftArrow : UKArrowLong, lat: 55.55709366783896, lng: 30.95355419000392, destination: {lat: 49.815764, lng: 6.131514 }},
            {origin: 'polskaToLux', country: 'luxembourg', img: isSmall ? smallLeftArrow : UKArrowLong, lat: 52.34805169404136, lng: 18.280327255460616, destination: {lat: 49.815764, lng: 6.131514 }},
        ])
    }, [isSmall])

    const calculatePixelPosition = (coordinates) => {
        const projected = mapRef.current.project(coordinates)
        return { x: projected.x, y: projected.y }
    }

    const fly = (longitude, latitude) => {
        if (isFlying) return
        setIsFlying(true)
        setZoom(0)
        setScrollZoom(false)
        mapRef.current.flyTo({ center: [longitude, latitude], essential: true, duration: 2500, curve: 2 })
        setTimeout(() => {
            setZoom(8)
            setScrollZoom(true)
            setIsFlying(false)
        }, 3000)
    }

    const markerVariants = {
        initial: { opacity: 0, scale: 0.8, y: 50 }, // État initial (avant l'apparition)
        animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, // État après l'apparition
        exit: { opacity: 0, scale: 0.8, y: -50, transition: { duration: 0.3, ease: "easeIn" } }, // État lors de la disparition
    }


    return (
        <motion.div className='mask h-[calc(100dvh-80px)] sm:h-[calc(100vh-80px)] overflow-hidden' exit={{opacity: 0.999, transition: {duration: siteConfig.cloudsTransitionDuration}}}>
            <Map
                ref={mapRef}
                style={{ width: '100%', height: '100%' }}
                mapboxAccessToken={apiKeyMapbox}
                mapStyle={apiStyleMapbox}
                dragPan={true}
                dragRotate={false} // 3D Relief : désactiver
                scrollZoom={scroolZoom}
                minZoom={zoom} // Ne peut pas dézoomer en dessous de x8
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: zoom,
                    pitch: 30 // Inclinaison en degrés
                }}
                // center={[6.090742202904814, 49.7627550671219]}
                // maxBounds={bounds} // Bloquer le panning
            >
                {/* MARKERS */}
                {items.map((marker, index) => {
                    if (marker.covers[0].data.geojson?.geometry.coordinates) {
                        return (
                            <Marker 
                                key={index} 
                                longitude={marker.covers[0].data.geojson.geometry.coordinates[0]} 
                                latitude={marker.covers[0].data.geojson.geometry.coordinates[1]}
                            >
                                <div className="relative">
                                    <img src={pinMarker} alt="marker" className="cursor-pointer relative z-[1]" onClick={() => { setSelectedMarker({ id: index, data: marker }) }} />
                                </div>
                            </Marker>
                        )
                    }
                })}

                {/* POPUP */}
                <AnimatePresence>
                    {selectedMarker && selectedMarker.data && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="absolute z-[1000] bg-white rounded-[6px] shadow-lg p-[3px]"
                            style={{
                                left: `${calculatePixelPosition(selectedMarker.data.covers[0].data.geojson.geometry.coordinates).x}px`,
                                top: `${calculatePixelPosition(selectedMarker.data.covers[0].data.geojson.geometry.coordinates).y}px`,
                                filter: 'drop-shadow(23px 30px 15px rgba(0, 0, 0, 0.65))'
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="flex w-[275px] h-[110px] items-center justify-center cursor-pointer p-[6px] rounded-[6px]"
                            >
                                <div className="border border-black rounded-[6px] h-full w-full px-3 py-[12px] relative">
                                    <div onClick={() => {
                                        mapRef.current.flyTo({ zoom: zoom + 2, speed: 0.2, curve: 1 });
                                        navigate(`/notice/${selectedMarker.data.slug}`);
                                    }}>
                                        <div className="flex">
                                            <span className="font-abril block pr-[10px]">{selectedMarker.id + 1 < 10 ? '0' + (selectedMarker.id + 1) : selectedMarker.id + 1}</span>
                                            <div>
                                                <h3 className="font-abril text-[16px] pb-[8px]">{truncateText(selectedMarker.data.data.title[language], 40)}</h3>
                                                <p className="text-[16px] font-sofia leading-none uppercase">{truncateText(selectedMarker.data.data?.abstract[language], 70)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <XMarkIcon className="absolute top-[2px] right-[4px]" style={{ width: '15px'}} onClick={() => setSelectedMarker({ id: null, data: null })}/>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MARKERS COUNTRY */}
                <AnimatePresence>
                    {!isFlying && markers.map((marker) => (
                        <Marker key={marker.origin} longitude={marker.lng} latitude={marker.lat} anchor="center">
                            <motion.div 
                                className="relative z-[9999]" 
                                variants={markerVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                onClick={() => !isFlying && fly(marker.destination.lng, marker.destination.lat)}
                            >
                                <img src={marker.img} alt="marker" className={classNames("cursor-pointer", {"rotate-[320deg]": marker.origin === "russiaToLux" || marker.origin === "polskaToLux" })} />
                                <div style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))"}}
                                    className={classNames('bg-[#F4F4F4] w-auto h-[25px] absolute -translate-y-[50%] top-[10px] mx-[10px] lg:mx-0 flex justify-center items-center uppercase text-[20px] font-sofia px-[6px] whitespace-nowrap cursor-pointer', {
                                        "left-[100%] lg:right-[105%] lg:left-auto": marker.origin === "luxToUk" || marker.origin === "russiaToLux" || marker.origin === "polskaToLux",
                                        "right-[100%] lg:left-[105%] lg:right-auto": marker.origin === "luxToRussia" || marker.origin === "luxToPolska" || marker.origin === "ukToLux",
                                        "lg:top-[75px]": marker.origin === "russiaToLux" || marker.origin === "polskaToLux",
                                        "lg:top-0": marker.origin === "luxToRussia",
                                        "lg:top-[10px]": marker.origin === "luxToPolska" || marker.origin === "ukToLux",
                                        "lg:top-[3px]": marker.origin === "luxToUk",
                                    })}
                                >
                                    {t(marker.country)}
                                </div>
                            </motion.div>
                        </Marker>
                    ))}
                </AnimatePresence>
            </Map>
        </motion.div> 
    )
}




