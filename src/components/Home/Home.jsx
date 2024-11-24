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
    const [zoom] = useState(8)
    const [selectedMarker, setSelectedMarker] = useState({ id: null, data: null })
    const bounds = [
        [4.635609906406312, 49.24474658911654], // Southeast coordinate
        [7.7936412937252015, 50.38780761708563] // Northeast coordinate
    ]
    const [markers, setMarkers] = useState([
        {ukArrow: "", ukLng: "", ukLat: "" },
        {russiaArrow: "", russiaLng: "", russiaLat: "" },
        {polskaArrow: "", polskaLng: "", polskaLat: "" },
        {ukToLuxArrow: "", ukToLuxArrowLng: "", ukToLuxArrowLat: "" }
    ])

    useEffect(() => {
        if (isSmall) {
            setMarkers([
                {ukArrow: smallLeftArrow, ukLng: 5.659120160331707, ukLat: 50.40793013795516 },
                {russiaArrow: smallRightArrow, russiaLng: 6.467898325775285, russiaLat: 50.24406234423884 },
                {polskaArrow: smallRightArrow, polskaLng: 6.532067821847243, polskaLat: 50.40793013795516 },
                {ukToLuxArrow: smallRightArrow, ukToLuxArrowLng: 6.532067821847243, ukToLuxArrowLat: 50.40793013795516 }
            ])
        } else {
            setMarkers([
                {ukArrow: UKArrowLong, ukLng: 5.377067446744771, ukLat: 50.17708409698924 },
                {russiaArrow: russiaArrowLong, russiaLng: 7.104207203884845, russiaLat: 50.03469691527637 },
                {polskaArrow: polskaArrowLong, polskaLng: 6.815322417081631, polskaLat: 50.347060676591056 },
                {ukToLuxArrow: polskaArrowLong, ukToLuxArrowLng: 0.5, ukToLuxArrowLat: 51.5074 }
            ])
        }
    }, [isSmall])

    const calculatePixelPosition = (coordinates) => {
        const projected = mapRef.current.project(coordinates)
        return { x: projected.x, y: projected.y }
    }

    const fly = (longitude, latitude) => {
        mapRef.current.flyTo({ center: [longitude, latitude], essential: true, duration: 2000, curve: 2 })
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
                scrollZoom={true} // Désactiver Zoom scroll
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: zoom,
                    pitch: 30 // Inclinaison en degrés
                }}
                // minZoom={8} // Ne peut pas dézoomer en dessous de x8
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


                <Marker key={"great-britain"} longitude={markers[0].ukLng} latitude={markers[0].ukLat} anchor={"center"} >   
                    <div className='relative z-[9999]' onClick={() => fly(-0.1278, 51.5074)}>
                        <img src={markers[0].ukArrow} alt="marker" className="cursor-pointer" />
                        <div className='bg-[#F4F4F4] w-auto h-[25px] absolute top-[8px] lg:top-0 -translate-y-[50%] left-[100%] lg:right-[105%] lg:left-auto mx-[10px] lg:mx-0 flex justify-center items-center uppercase text-[20px] font-sofia px-[6px] whitespace-nowrap cursor-pointer' style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))" }}>{ t('uk') }</div>
                    </div>
                </Marker>

                <Marker key={"russia"} longitude={markers[1].russiaLng} latitude={markers[1].russiaLat} anchor={"center"}>   
                    <div className='relative z-[9999]'>
                        <img src={markers[1].russiaArrow} alt="marker" className="cursor-pointer" />
                        <div className='bg-[#F4F4F4] w-auto h-[25px] absolute top-[8px] lg:top-0 -translate-y-[50%] right-[100%] lg:left-[105%] lg:right-auto mx-[10px] lg:mx-0 flex justify-center items-center uppercase text-[20px] font-sofia px-[6px] whitespace-nowrap cursor-pointer' style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))" }} >{ t('russia') }</div>
                    </div>
                </Marker>

                <Marker key={"polska"} longitude={markers[2].polskaLng} latitude={markers[2].polskaLat} anchor={"center"}>   
                    <div className='relative z-[9999]'>
                        <img src={markers[2].polskaArrow} alt="marker" className="cursor-pointer" />
                        <div className='bg-[#F4F4F4] w-auto h-[25px] absolute top-[8px] lg:top-0 -translate-y-[50%] right-[100%] lg:left-[105%] lg:right-auto mx-[10px] lg:mx-0 flex justify-center items-center uppercase text-[20px] font-sofia px-[6px] whitespace-nowrap cursor-pointer' style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))" }} >{ t('polska') }</div>
                    </div>
                </Marker>

                <Marker key={"uk_to_lux"} longitude={markers[3].ukToLuxArrowLng} latitude={markers[3].ukToLuxArrowLat} anchor={"center"}>   
                    <div className='relative z-[9999]' onClick={() => fly(6.131514, 49.815764)}>
                        <img src={markers[2].polskaArrow} alt="marker" className="cursor-pointer" />
                        <div className='bg-[#F4F4F4] w-auto h-[25px] absolute top-[8px] lg:top-0 -translate-y-[50%] right-[100%] lg:left-[105%] lg:right-auto mx-[10px] lg:mx-0 flex justify-center items-center uppercase text-[20px] font-sofia px-[6px] whitespace-nowrap cursor-pointer' style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))" }} >{ t('luxembourg') }</div>
                    </div>
                </Marker>
            </Map>
        </motion.div>
    )
}




