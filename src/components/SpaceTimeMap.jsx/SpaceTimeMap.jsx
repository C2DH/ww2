import map1 from '../../assets/images/spaceTimeMap/map-1.png'
import map2 from '../../assets/images/spaceTimeMap/map-2.png'
import map3 from '../../assets/images/spaceTimeMap/map-3.png'
import pinMarker from '../../assets/images/spaceTimeMap/marker-red.svg'

import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// MAPBOX
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, Source, Layer } from 'react-map-gl';

// FRAMER
import { AnimatePresence, motion } from "framer-motion"

import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";


const tokenMapbox = import.meta.env.VITE_API_KEY_MAPBOX
const styleBlueprint = import.meta.env.VITE_API_STYLE_MAPBOX_BLUEPRINT
const styleMSF = import.meta.env.VITE_API_STYLE_MAPBOX_MSF

const styleGeoportail = "style geo"
const tokenGeoportail = "geo"

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

    const [map, setMap] = useState({
        name: 'blueprint',
        token: tokenMapbox,
        style: styleBlueprint
    })


    const handleMap = (map) => {
        console.log(map)
        if (map === 'msf') {
            setMap({...map, name: 'msf', style: styleMSF, token: tokenMapbox})
        } else if (map === 'blueprint') {
            setMap({...map, name: 'blueprint', style: styleBlueprint, token: tokenMapbox})
        } else {
            setMap({...map, name:'geoportail', style: styleGeoportail, token: tokenGeoportail})
        }
    }

    return (
        // <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transition: {duration: 1}}}>
        //     <h1 className="text-center text-[60px] mt-[100px]">Carte Spatio-temporelle</h1>
        // </motion.div>
        <div className='absolute top-[70px] inset-0'>
       
            <MapBox items={geojson.features} state={map}/>

            <div className="bottom-gradient absolute bottom-0"></div>
        

            {/** Filtre chronologique */}
            <div className="container mx-auto fixed bottom-[20px] left-0 right-0">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <MultiRangeSelector/>
                    </div>
                </div>
            </div>


            {/** Changement Map style */}
            <div className='absolute top-[40px] right-[80px]'>
                <div className='flex gap-5'>

                    { map.name !== 'geoportail' &&     
                        <div className='w-[60px] h-[60px] border border-white rounded-[4px] cursor-pointer' onClick={() => handleMap('geoportail')}>
                            <img src={map1} alt="map" className='rounded-[4px]' />
                        </div>
                    }

                    {map.name !== 'msf' &&                    
                        <div className='w-[60px] h-[60px] border border-white rounded-[4px] cursor-pointer' onClick={() => handleMap('msf') }>
                            <img src={map2} alt="map" className='rounded-[4px]'/>
                        </div>
                    }

                    {map.name !== 'blueprint' &&
                        <div className='w-[60px] h-[60px] border border-white rounded-[4px] cursor-pointer' onClick={() => handleMap('blueprint') }>
                            <img src={map3} alt="map" className='rounded-[4px]'/>
                        </div>
                    }


                </div>
            </div>

        </div>
    )
}


const MapBox = ({items, state}) => {
    const mapRef = useRef(null)
    const [lng, setLng] = useState(6.1243943);
    const [lat, setLat] = useState(49.6099615);
    const [zoom, setZoom] = useState(15);
    const [selectedMarker, setSelectedMarker] = useState({ id: null, data: null });

    console.log(state)

    return (
        <div className='mask h-[calc(100vh-70px)] overflow-hidden'>
        <Map
            ref={mapRef}
            style={{ width: '100%', height: '100%' }}
            mapboxAccessToken={state.token}
            mapStyle={state.style}              
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

    
            <Source id="geo" type="raster-dem" url='https://wms.geoportail.lu/public_map_layers/service/220?service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=220&bbox={bbox-epsg-3857}&format=image/png&styles'>
                <Layer type="hillshade" id="layer_id" source="geo" />
            </Source>
          
            { items.map((marker, index) => {
                return (

                    <Marker 
                        key={ index } 
                        longitude={ marker.geometry.coordinates[1] } 
                        latitude={ marker.geometry.coordinates[0] } 
                        anchor={ marker.properties.place === 'Grande-Bretagne' ? "center" : "bottom" }   
                    >
                        <div className='relative'> 
                            <img src={ pinMarker } alt="marker" className="cursor-pointer" onMouseOver={() => setSelectedMarker({ id: index, data: marker }) }/>

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
                                        <div className='border border-black rounded-[6px] h-full w-full overflow-scroll'>
                                            <Link to={`/notice/${selectedMarker.data.id}`}>

                                                <div className='flex py-[12px]'>
                                                    <span className='abril block px-3'>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</span>
                                                    <div className='pr-3'>                                                
                                                        <h3 className='abril text-[20px] pb-[8px]'>{ selectedMarker.data.properties.location }</h3>
                                                        <p className='sofia uppercase text-[20px]'>{ selectedMarker.data.properties.description }</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </motion.div>
                                }
                            </AnimatePresence>
                            
                        </div>
                    </Marker>
                )
            })}
        </Map>
        </div>    
    )
}


// const MultiRangeSelector = () => {
//     const dates = ["1939", "1940", "1941", "1942", "1943", "1944", "1945", "1946"];
//     const months = ["01", "04", "07", "10"];
//     const [minValue, setMinValue] = useState(0);
//     const [maxValue, setMaxValue] = useState(dates.length - 1);
//     const [minCaption, setMinCaption] = useState(dates[0]);
//     const [maxCaption, setMaxCaption] = useState(dates[dates.length - 1]);

//     const handleInput = (e) => {
//         setMinValue(e.minValue);
//         setMaxValue(e.maxValue);
//         setMinCaption(dates[e.minValue]);
//         setMaxCaption(dates[e.maxValue]);
//     };


//     const begin = new Date(`${dates[0]}-${months[0]}-01`)
//     const end = new Date(`${dates.length - 1}-${months[0]}-01`)

//     console.log('begin',begin)


//     return (
//         <div>
//             <MultiRangeSlider
//                 labels={dates}
//                 min={begin}
//                 max={end}
//                 minValue={begin}
//                 maxValue={end}
//                 step={1}
//                 onInput={handleInput}
//             />
//         </div>
//     );
// };



const MultiRangeSelector = () => {

    const monthNames = ["Jan", "Apr", "Jul", "Oct"]
    const labels = ["1939", "", "", "", "1940", "", "", "", "1941", "", "", "", "1942", "", "", "", "1943", "", "", "", "1944", "", "", "", "1945", "", "", "", "1946"]
    
    const generateDateLabels = (startYear, endYear) => {
        let dates = [];
        
        for (let year = startYear; year <= endYear; year++) {
            for (let month = 0; month < 4; month++) {
                if (year === endYear && month > 0) break;
                const monthName = monthNames[month];
                dates.push(`${monthName}-${year}`)
            }
        }
        return dates;
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
    };
    
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
        />
    )
}




