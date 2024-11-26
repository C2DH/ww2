import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from 'react-responsive'
import { useSharedState } from "../../contexts/SharedStateProvider"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import siteConfig from '../../../site.config'
import { fetchData, truncateText } from "../../lib/utils";
import { useLanguageContext } from "../../contexts/LanguageProvider"
import { bbox } from "@turf/bbox";
import { points } from "@turf/helpers";
const apiKeyMapbox = import.meta.env.VITE_API_KEY_MAPBOX
const apiStyleMapbox = import.meta.env.VITE_API_STYLE_MAPBOX_MSF

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
import classNames from "classnames"

const BOUNDS = {
    'toLux': {
        bbox: [[4.635609906406312, 49.24474658911654], [7.7936412937252015, 50.38780761708563]],
        country: 'Luxembourg'
    },
    'toUk': {
        bbox: [[-10.439758, 49.783564], [1.875916, 58.299816]],
        country: 'Royaume Uni'
    },
    'toRussia': {
        bbox: [[27.519882, 52.090495], [160.166371, 81.215593]],
        country: 'Russie'
    },
    'toPolska': {
        bbox: [[14.121395, 49.002038], [24.145134, 54.838998]],
        country: 'Pologne'
    }
}

export default function Home() {
    const [sharedState, setSharedState] = useSharedState()
    const [isLoaded, setIsLoaded] = useState(false); 
    const [data, setData] = useState(null)
    const [visibleMarkers, setVisibleMarkers] = useState({origin : "toLux", destinations : ['toUk', 'toRussia', 'toPolska'] })


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
        <MapBox items={data} visibleMarkers={visibleMarkers} setVisibleMarkers={setVisibleMarkers}/>
    )
}

const MapBox = ({ items, visibleMarkers, setVisibleMarkers }) => {
    const { t } = useTranslation()
    const { language } = useLanguageContext()
    const isSmall = useMediaQuery({ query: '(max-width: 1024px)'})
    const mapRef = useRef(null)
    const navigate = useNavigate()
    const [lng] = useState(6.131514)
    const [lat] = useState(49.815764)
    const [zoom, setZoom] = useState(9)
    const [isFlying, setIsFlying] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState({ id: null, data: null })
    const [markers, setMarkers] = useState([])
    const [interactive, setInteractive] = useState(true)
    const [bounds, setBounds] = useState([[4.635609906406312, 49.24474658911654], [7.7936412937252015, 50.38780761708563]])

    useEffect(() => {
        setMarkers([
            {origin: 'toUk', country: 'Royaume Uni', img: isSmall ? smallLeftArrow : UKArrowLong },
            {origin: 'toRussia', country: 'Russie', img: isSmall ? smallRightArrow : russiaArrowLong },
            {origin: 'toPolska', country: 'Pologne', img: isSmall ? smallRightArrow : russiaArrowLong },
            {origin: 'toLux', country: 'Luxembourg', img: isSmall ? smallRightArrow : polskaArrowLong }
        ])
    }, [isSmall])

    const calculatePixelPosition = () => {
        const place = selectedMarker.data.covers.find(place => 
            place.data.type === 'place' && place.data.geojson?.geometry?.coordinates.length === 2
        )

        if (place) {
            const projected = mapRef.current.project(place.data.geojson.geometry.coordinates);
            return { 
                x: projected.x, 
                y: projected.y, 
                filter: 'drop-shadow(23px 30px 15px rgba(0, 0, 0, 0.65))'
            }
        }
    }

    const fly = (origin) => {
        if (isFlying) return
        setBounds(null)
        setIsFlying(true)
        setInteractive(false); 

        const p = items.reduce((carry, item) => {
            return [...carry, ...item.covers.filter(marker => marker.type === 'entity' && marker.data.geojson?.geometry?.coordinates && marker.data.geojson?.properties?.country.fr_FR == BOUNDS[origin].country).map(marker => [marker.data.geojson.geometry.coordinates[0], marker.data.geojson.geometry.coordinates[1]])]
        }, []);

        mapRef.current.fitBounds(bbox(points(p)), {maxZoom: 12, padding: 50, duration: 5000})
        
        setTimeout(() => {
            setIsFlying(false)
            setInteractive(true)

            if (origin === 'toLux') {
                setVisibleMarkers({origin: origin, destinations: ['toUk', 'toRussia', 'toPolska']})

            } else {
                setVisibleMarkers({origin: origin, destinations: ['toLux']})
            }
            // setBounds(BOUNDS[origin].bbox)

        }, 3000)
    }

    const markerVariants = {
        initial: { opacity: 0, scale: 0.8, y: 50 }, // État initial (avant l'apparition)
        animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, // État après l'apparition
        exit: { opacity: 0, scale: 0.8, y: -50, transition: { duration: 0.3, ease: "easeIn" } } // État lors de la disparition
    }

    return (
        <motion.div className='mask h-[calc(100dvh-80px)] sm:h-[calc(100vh-80px)] overflow-hidden' exit={{opacity: 0.999, transition: {duration: siteConfig.cloudsTransitionDuration}}}>

            {/* MARKERS COUNTRY */}
            <AnimatePresence>
            
            {!isFlying && markers
                .filter(marker => visibleMarkers.destinations.includes(marker.origin))
                .map((marker, index) => (
                    <motion.div key={index}
                        onClick={() => fly(marker.origin)}
                        variants={markerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={classNames("fixed z-[9999]", {
                            "left-[50px] top-[120px]": marker.origin === "toUk",
                            "right-[50px] top-[120px]": marker.origin === "toPolska",
                            "right-[50px] top-[250px]": marker.origin === "toRussia",
                            "right-[50px] bottom-[150px]": marker.origin === "toLux" && visibleMarkers.origin === "toUk",
                            "left-[50px] bottom-[150px]": marker.origin === "toLux" && visibleMarkers.origin !== "toUk",
                        })}
                    >

                 
    
                        <img src={marker.img} alt="marker" className={classNames("cursor-pointer", {
                            "rotate-[180deg]": visibleMarkers.origin === "toRussia" || visibleMarkers.origin === "toPolska",
                        })} />

                        <div style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))"}}
                            className={classNames('bg-[#F4F4F4] w-auto h-[25px] absolute -top-[3px] lg:-top-[40px] mx-[10px] lg:mx-0 flex justify-center items-center uppercase text-[20px] font-sofia px-[6px] whitespace-nowrap cursor-pointer', {
                                "right-[20px] lg:right-0": marker.origin === "toRussia" || marker.origin === "toPolska" || (marker.origin === "toLux" && visibleMarkers.origin === "toUk"),
                                "left-[20px] lg:left-0": (marker.origin === "toLux" && visibleMarkers.origin !== "toUk") || (marker.origin === "toUk" && visibleMarkers.origin == "toLux") 
                            })}
                        >
                            {t(marker.country)}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>


            <Map
                ref={mapRef}
                style={{ width: '100%', height: '100%' }}
                mapboxAccessToken={apiKeyMapbox}
                mapStyle={apiStyleMapbox}
                dragRotate={false} // 3D Relief : désactiver
                scrollZoom={interactive} // Désactiver/Activer selon l'état
                dragPan={interactive}
                doubleClickZoom={interactive}
                keyboard={interactive}
                maxBounds={bounds} // Bloquer le panning
                initialViewState={{
                    pitch: 30 // Inclinaison en degrés
                }}
                // center={[6.090742202904814, 49.7627550671219]}
            >
                {/* MARKERS */}
                {items.map((item, index) => {
                   return item.covers.filter(marker => marker.type === 'entity' && marker.data.geojson?.geometry?.coordinates).map(marker => 
                        <Marker 
                            key={index} 
                            longitude={marker.data.geojson.geometry.coordinates[0]} 
                            latitude={marker.data.geojson.geometry.coordinates[1]}
                        >
                            <div className="relative">
                                <img src={pinMarker} alt="marker" className="cursor-pointer relative z-[1]" onClick={() => { setSelectedMarker({ id: index, data: item }) }} />
                            </div>
                        </Marker>
                    )
                })}

                {/* POPUP */}
                <AnimatePresence>
                    {selectedMarker && selectedMarker.data && (
                        <motion.div
                            key={selectedMarker.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="absolute z-[1000] bg-white rounded-[6px] shadow-lg p-[3px]"
                            style={{
                                left: `${calculatePixelPosition().x}px`,
                                top: `${calculatePixelPosition().y}px`,
                                filter: calculatePixelPosition().filter
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
                                                <h3 className="font-abril text-[16px] pb-[8px]">{truncateText(selectedMarker.data.data.title[language] ?? "", 40)}</h3>
                                                <p className="text-[16px] font-sofia leading-none uppercase">{truncateText(selectedMarker.data.data.abstract[language] ?? "", 70)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <XMarkIcon className="absolute top-[2px] right-[4px]" style={{ width: '15px'}} onClick={() => setSelectedMarker({ id: null, data: null })}/>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>


            </Map>
        </motion.div> 
    )
}




