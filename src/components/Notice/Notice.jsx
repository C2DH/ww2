// REACT 
import { Link, useParams} from 'react-router-dom';
import { useContext, useEffect } from 'react';

// COMPONENTS
import Player from '../Player/Player'
import IconMapBack from '../IconMapBack/IconMapBack';

// FRAMER
import { motion } from "framer-motion"

// ASSETS 
import '../../assets/scss/app.scss'
import next from '../../assets/images/notices/next.png'
import prev from '../../assets/images/notices/prev.png'


export default function Notice() {

    const { id } = useParams()

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

    const data = geojson.features[id - 1]

    return (
        <>
            <motion.div className='mask h-[calc(100vh-70px)] overflow-hidden absolute top-[70px]' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transition: {duration: 1}}} >
                <div className='h-full relative' style={{ background: `url(${data.properties.image}) 50% / cover no-repeat` }}>
                    <div className='notice-filter absolute inset-0'></div>

                    <div className="container mx-auto relative">
                        <div className='pt-[55px] flex flex-col items-center'>
                            <span className='text-[20px] abril blue underline underline-offset-4 block'>{ data.properties.city }</span>
                            <div className='relative'>
                                <h1 className='text-[48px] blue abril pt-[12px]'>{ data.properties.location }</h1>
                                <Link to={ `/notice/${parseInt(id) + 1}`} className='absolute top-[50%] -translate-[50%] -right-[100px]'>
                                    <img src={ next } alt="next" />
                                </Link>
                                <Link to={ `/notice/${parseInt(id) - 1}`} className='absolute top-[50%] -translate-[50%] -left-[100px]'>
                                    <img src={ prev } alt="previous" /> 
                                </Link>
                            </div>
                            <p className='text-[24px] sofia uppercase text-white border border-white p-2 mt-[10px]'>{ data.properties.description }</p>
                        </div>

                        <Link to={'/'} className='absolute top-[70px] left-0'>
                            <IconMapBack text={'Retour Carte'}/>
                        </Link>

                        <div className="grid grid-cols-12 mt-[70px] gap-x-[40px]">
                            <div className="col-span-2 pt-[20px]">
                                { data.notes_related.map((note, index) => {
                                    return (
                                        <Link key={ index } to={'/'} className='block mb-[30px] transition-all duration-[750ms] border-[0.5px] border-transparent py-[8px] px-[10px] rounded-[5px] hover:border-white hover:bg-[#000000]/[0.2]'>
                                            <h3 className='abril text-[22px] text-white uppercase'>{ note.title }</h3>
                                        </Link>
                                    )
                                })}
                            </div>

                            <div className="col-span-6 col-start-4">
                                <Player url={ `/src/assets/videos/${data.properties.media }`}/>
                            </div>

                            <div className="col-span-2 col-start-11 pt-[20px]">
                                <Link to={'/sources'} className='block uppercase abril text-[22px] text-white'>sources</Link>
                                <Link to={'/historical-index'} className='block uppercase abril text-[22px] text-white pt-[22px]'>index historique</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}