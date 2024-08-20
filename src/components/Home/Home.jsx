import Intro from "../Intro/Intro"
import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from 'react-responsive'
import { useSharedState } from "../../contexts/SharedStateProvider"

import pinMarker from '../../assets/images/common/marker.svg'
import smallLeftArrow from '../../assets/images/common/smallLeftArrow.png'
import smallRightArrow from '../../assets/images/common/smallRightArrow.png'
import UKArrowLong from '../../assets/images/common/ukArrowLong.png'
import russiaArrowLong from '../../assets/images/common/russiaArrowLong.png'
import polskaArrowLong from '../../assets/images/common/polskaArrowLong.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

// MAPBOX
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import * as maptilerClient from "@maptiler/client"

// FRAMER
import { AnimatePresence, motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"
import siteConfig from '../../../site.config'

const apiKeyMapbox = import.meta.env.VITE_API_KEY_MAPBOX
const apiStyleMapbox = import.meta.env.VITE_API_STYLE_MAPBOX_MSF
maptilerClient.config.apiKey = import.meta.env.VITE_API_MAPTILER


export default function Home() {
    const [sharedState, setSharedState] = useSharedState()

    useEffect(() => {
        console.log('hideClouds');
        setSharedState({ ...sharedState, showClouds: false, showCurtains: false })
    }, []);

    const isSmall = useMediaQuery({
        query: '(max-width: 1024px)'
    })

    const [isLoading, setIsLoading] = useState(false)
    const [dataMarker, setDataMarker] = useState([
        {ukArrow: UKArrowLong, ukLng: "", ukLat: "" },
        {russiaArrow: russiaArrowLong, russiaLng: "", russiaLat: "" },
        {polskaArrow: polskaArrowLong, polskaLng: "", polskaLat: "" }
    ])
    const [showIntro, setShowIntro] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false); 
    const [data, setData] = useState(null)

    useEffect(() => {
        if (isSmall) {
            setDataMarker([
                {ukArrow: smallLeftArrow, ukLng: 5.6591201603317075, ukLat: 50.40793013795516 },
                {russiaArrow: smallRightArrow, russiaLng: 6.467898325775285, russiaLat: 50.24406234423884 },
                {polskaArrow: smallRightArrow, polskaLng: 6.532067821847243, polskaLat: 50.40793013795516 }
            ])
        } else {
            setDataMarker([
                {ukArrow: UKArrowLong, ukLng: 5.377067446744771, ukLat: 50.477084096989245 },
                {russiaArrow: russiaArrowLong, russiaLng: 7.104207203884845, russiaLat: 50.03469691527637 },
                {polskaArrow: polskaArrowLong, polskaLng: 6.815322417081631, polskaLat: 50.347060676591056 }
            ])
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
    }, [isSmall])


    
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
            <MapBox items={data.results} markers={dataMarker}/>
        </>
    )
}

const MapBox = ({ items, markers }) => {
    const { t } = useTranslation()
    const mapRef = useRef(null);
    const navigate = useNavigate();
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

    
    return (
        <motion.div className='mask h-[calc(100vh-80px)] overflow-hidden' exit={{opacity: 0.999, transition: {duration: siteConfig.cloudsTransitionDuration}}}>
            <Map
                ref={mapRef}
                style={{ width: '100%', height: '100%' }}
                mapboxAccessToken={apiKeyMapbox}
                mapStyle={apiStyleMapbox}
                dragPan={false}
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
                                                    <div onClick={() => {
                                                        mapRef.current.flyTo({ zoom: zoom + 2, speed: 0.2, curve: 1 });
                                                        navigate(`/notice/${marker.slug}`);
                                                    }}>
                                                        <div className='flex'>
                                                            <span className='abril block pr-[10px]'>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</span>
                                                            <div>                                                
                                                                <h3 className='abril text-[18px] pb-[8px]'>{ marker.title.fr_FR }</h3>
                                                                <p className='text-[18px] leading-none sofia uppercase'>{ marker.description.fr_FR }</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <FontAwesomeIcon icon={faXmark} className="absolute top-[2px] right-[4px]" onClick={() => setSelectedMarker({ id: null, data: null })} />
                                                </div>
                                            </motion.div>
                                        }
                                    </AnimatePresence>
                                    :
                                    <div className='bg-[#F4F4F4] w-auto h-[25px] absolute top-[8px] sm:top-0 -translate-y-[50%] left-[100%] sm:right-[105%] sm:left-auto mx-[10px] sm:mx-0 flex justify-center items-center uppercase text-[20px] sofia px-[6px] whitespace-nowrap cursor-pointer' style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))" }} >{ marker.properties.place }</div>
                                }
                            </div>
                        </Marker>
                    )
                })}                   

                <Marker
                    key={"great-britain"}
                    longitude={markers[0].ukLng}
                    latitude={markers[0].ukLat}
                    anchor={"center"}
                >   
                    <div className='relative z-[9999]'>
                        <img src={markers[0].ukArrow} alt="marker" className="cursor-pointer" />
                        <div className='bg-[#F4F4F4] w-auto h-[25px] absolute top-[8px] lg:top-0 -translate-y-[50%] left-[100%] lg:right-[105%] lg:left-auto mx-[10px] lg:mx-0 flex justify-center items-center uppercase text-[20px] sofia px-[6px] whitespace-nowrap cursor-pointer' style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))" }}>{ t('uk') }</div>
                    </div>
                </Marker>

                <Marker
                    key={"russia"}
                    longitude={markers[1].russiaLng}
                    latitude={markers[1].russiaLat}
                    anchor={"center"}
                >   
                    <div className='relative z-[9999]'>
                        <img src={markers[1].russiaArrow} alt="marker" className="cursor-pointer" />
                        <div className='bg-[#F4F4F4] w-auto h-[25px] absolute top-[8px] lg:top-0 -translate-y-[50%] right-[100%] lg:left-[105%] lg:right-auto mx-[10px] lg:mx-0 flex justify-center items-center uppercase text-[20px] sofia px-[6px] whitespace-nowrap cursor-pointer' style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))" }} >{ t('russia') }</div>
                    </div>
                </Marker>

                <Marker
                    key={"polska"}
                    longitude={markers[2].polskaLng}
                    latitude={markers[2].polskaLat}
                    anchor={"center"}
                >   
                    <div className='relative z-[9999]'>
                        <img src={markers[2].polskaArrow} alt="marker" className="cursor-pointer" />
                        <div className='bg-[#F4F4F4] w-auto h-[25px] absolute top-[8px] lg:top-0 -translate-y-[50%] right-[100%] lg:left-[105%] lg:right-auto mx-[10px] lg:mx-0 flex justify-center items-center uppercase text-[20px] sofia px-[6px] whitespace-nowrap cursor-pointer' style={{ filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))" }} >{ t('polska') }</div>
                    </div>
                </Marker>
            </Map>
        </motion.div>
    );
}


