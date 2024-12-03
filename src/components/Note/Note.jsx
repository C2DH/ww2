import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSharedState } from '../../contexts/SharedStateProvider'
import Source from '../Source/Source'
import bgPaper from '../../assets/images/common/bg-paper.png'
import { AnimatePresence, motion } from "framer-motion"
import { useLanguageContext } from '../../contexts/LanguageProvider'
import { t } from 'i18next'
import { convertToHtml, fetchData, getAllNotes } from '../../lib/utils'
import defaultImage from '../../assets/images/common/default.png'
import siteConfig from '../../../site.config'
import { BookOpenIcon, CubeIcon, DocumentIcon, PhotoIcon, SpeakerWaveIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import { useMediaQuery } from 'react-responsive'


export default function Note() {
    const [sharedState, setSharedState] = useSharedState()
    const { slug } = useParams()
    const { language } = useLanguageContext()
    const [dataPopup, setDataPopup] = useState({ open: false, data: null })
    const [data, setData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [notes, setNotes ] = useState([])
    const navigate = useNavigate()
    const rootPath = import.meta.env.VITE_ROOT
    const isSmall = useMediaQuery({ query: '(max-width: 1024px)'})

    // DETAILS NOTE
    useEffect(() => {
        const getData = async () => {
            const data = await fetchData(`story/${slug}`)
        
            if (data) {
                setData(data)
                setIsLoaded(true)
            }
        }
        getData();
    }, [isLoaded])

    // ALL NOTES
    useEffect(() => {
        const fetchNotes = async () => {
            const allNotes = await getAllNotes() 
            if (allNotes.length === 0) return
            setNotes(allNotes)
        }
        fetchNotes()
    }, [])


    // ANIMATION CURTAINS
    useEffect(() => {
        setSharedState({ ...sharedState, showCurtains: false })
    }, [])


    useEffect(() => {
        console.log('documents',data.documents)
    }, [data])

    // NAVIGATE NOTES
    const navigateNote = (direction) => {
        if (notes.length === 0 || !data) return
        const noteIndex = notes.findIndex(note => note.slug === slug)
        let newIndex = noteIndex + direction
   
        if (newIndex < 0) {
            newIndex = notes.length - 1
        } else if (newIndex >= notes.length) {
            newIndex = 0    
        }   
        navigate(`/note/${notes[newIndex].slug}`)
    }


    const handleSourcePopup = (document) => {
        if (!dataPopup.open) {
            setDataPopup(prevSource => ({
                ...prevSource, 
                open: true, 
                data: document
            }))
        } else {
            setDataPopup(prevSource => ({
                ...prevSource, 
                open: false, 
                data: null
            }))
        }
    }

    if (isLoaded) {
        return (
            <>
                <motion.div style={{ backgroundImage: `url(${bgPaper})`, backgroundSize: 'cover'}} className='note' exit={{opacity: 0.999, transition: {duration: siteConfig.curtainsTransitionDuration}}}>
                    <div className="container mx-auto relative h-[calc(100dvh-120px)] sm:h-[calc(100vh-120px)] flex flex-col px-[30px] pt-[30px] 2xl:pt-0">
    
                        <div className='flex items-center justify-between'>
                            <Link to={'/catalogue'} className='2xl:absolute 2xl:top-[73px] 2xl:-left-[50px] text-[20px] lg:text-[30px]'>
                                <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.875 9.625C24.3125 9.625 24.75 10.0625 24.75 10.5C24.75 10.9922 24.3125 11.375 23.875 11.375H7.57812L13.9766 17.7734C14.3047 18.1016 14.3047 18.7031 13.9766 19.0312C13.6484 19.3594 13.0469 19.3594 12.7188 19.0312L4.84375 11.1562C4.67969 10.9922 4.625 10.7734 4.625 10.5C4.625 10.2812 4.67969 10.0625 4.84375 9.89844L12.7188 2.02344C13.0469 1.69531 13.6484 1.69531 13.9766 2.02344C14.3047 2.35156 14.3047 2.95312 13.9766 3.28125L7.57812 9.625H23.875ZM1.125 0C1.5625 0 2 0.4375 2 0.875V20.125C2 20.6172 1.5625 21 1.125 21C0.632812 21 0.25 20.6172 0.25 20.125V0.875C0.25 0.4375 0.632812 0 1.125 0Z" fill="black"/>
                                </svg>  
                            </Link>
                            <div className='lg:hidden text-[20px] md:text-[24px] uppercase flex items-center cursor-pointer pl-[20px]'>   
                                <span className='pr-[10px] lg:pr-[20px]' onClick={() => navigateNote(-1)}>{ t('prev') }</span>
                                <span className='pl-[10px] lg:pl-[20px] relative before:content-[""] before:absolute before:left-[0px] before:bottom-[50%] lg:before:bottom-0 before:translate-y-[50%] lg:before:translate-y-0 before:h-[30px] lg:before:h-[60px] before:w-[1px] before:bg-black' onClick={() => navigateNote(+1)}>{ t('next') }</span>
                            </div>
                        </div>
    
                        <div className="flex lg:justify-between lg:border-b border-black pt-[10px] md:pt-[20px] 2xl:pt-[60px]">
                            <div className="hidden lg:block uppercase">
                                {/* <span className="text-[30px] lg:text-[38px] lg:pb-[5px] relative after:content-[''] after:absolute after:left-[45px] lg:after:left-[50px] after:bottom-[50%] lg:after:bottom-[5px] after:translate-y-[50%] lg:after:translate-y-0 after:h-[30px] lg:after:h-[60px] after:w-[1px] after:bg-black pr-[10px] font-thin">N01</span> */}
                                <span className="hidden lg:inline-block text-[40px] font-abril pl-[10px]">{ data.data?.title[language].replace(/^Note \d+\s*-?\s*/, '') }</span>
                            </div>
                            <div className='hidden lg:flex items-center lg:items-end text-[22px] lg:text-[24px] uppercase lg:leading-[48px] cursor-pointer pl-[20px] lg:pl-0'>   
                                <span className='pr-[10px] lg:pr-[20px]' onClick={() => navigateNote(-1)}>{ t('prev') }</span>
                                <span className='pl-[10px] lg:pl-[20px] relative before:content-[""] before:absolute before:left-[0px] before:bottom-[50%] lg:before:bottom-0 before:translate-y-[50%] lg:before:translate-y-0 before:h-[30px] lg:before:h-[60px] before:w-[1px] before:bg-black' onClick={() => navigateNote(+1)}>{ t('next') }</span>
                            </div>
                        </div>

                        <div className='lg:hidden border-b border-black pb-[20px] pt-[10px] text-[24px] md:text-[38px] uppercase'>
                            {/* <span className="relative after:content-[''] after:absolute after:left-[35px] md:after:left-[50px] after:bottom-[50%] after:translate-y-[50%] after:h-[30px] after:w-[1px] after:bg-black pr-[10px] font-thin">N01</span> */}
                            <span className="leading-none font-abril pl-[10px] md:pl-[15px]">{ data.data?.title[language].replace(/^Note \d+\s*-?\s*/, '') }</span>
                        </div>
    
                        <div className="flex flex-col lg:flex-row overflow-scroll lg:min-h-[calc(100%-120px)]" id="text">
                            <div className="lg:w-1/2 py-[30px] lg:py-[40px] font-light lg:border-r border-black lg:pr-[60px] lg:overflow-y-auto flex-grow">   
                                
                                {/** CONTENT - REFERENCES */}
                                {data.contents &&
                                    <div className='text-[28px]' id="content">
                                        <ContentDisplay data={data.contents} />
                                    </div>
                                }
            

                                {/** RELATED NOTES */}
                                { data.stories.length > 0 &&
                                    <div className='ml-[20px] mt-[30px] pb-[10px]'>
                                        <span className='uppercase font-abril text-[20px] border-b border-black block pb-[10px]'>{ t('links')} :</span>
                                        <div className='text-[24px] pt-[15px]'>
                                            {data.stories?.map(story => 
                                                <Link to={`/note/${story.slug}`} key={story.id} className='block uppercase'>
                                                    <span className='font-abril hover:text-blue transition-all duration-500'>{ story.data.title[language].replace(/^Note \d+\s*-?\s*/, '') }</span>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                }
                            </div>
                            
                            {/** MEDIAS */}
                            <div className="lg:w-1/2 lg:ml-[50px] py-[40px] lg:overflow-y-auto flex-grow border-t lg:border-none border-black">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    { data.documents.map((document, index) => 
                                        <div key={document.id}>
                                        <h1>{document.id}</h1>

                                            { ((document.type === 'image' || document.type === 'photo') && document.attachment.split('.')[1] !== 'pdf') &&
                                                <div className="gap-6 relative cursor-pointer" onClick={() => handleSourcePopup(document) }>
                                                    <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={ document.data.resolutions.medium.url ? rootPath + document.data.resolutions.preview.url : defaultImage } alt={document.data.title[language]} />
                                                    <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                        <PhotoIcon style={{ width: '40px', color: 'white'}} />
                                                    </div>
                                                </div>  
                                            }

                                            {/* { ((document.type === 'image' || document.type === 'photo') && document.attachment.split('.')[1] === 'pdf') &&
                                                <div className="gap-6 relative cursor-pointer" onClick={() => handleSourcePopup(document) }>
                                                    <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={ document.data.resolutions.medium.url ? rootPath + document.data.resolutions.preview.url : defaultImage } alt={document.data.title[language]} />
                                                    <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                        <PhotoIcon style={{ width: '40px', color: 'white'}} />
                                                    </div>
                                                </div>  
                                            } */}

                                            { ((document.type === 'image' || document.type === 'photo' ) && document.attachment.split('.')[1] === 'pdf') && 
                                                <div className="gap-6 relative cursor-pointer" onClick={() => handleSourcePopup(document) }>
                                                    <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={  document.data.resolutions?.preview?.url ? rootPath + document.data.resolutions.preview.url : defaultImage } alt={document.data.title[language]} />
                                                    <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                        <DocumentIcon style={{ width: '40px', color: 'white'}} />
                                                    </div>
                                                </div>
                                            }

                                            { document.type === 'video' &&
                                                <div className="gap-6 relative cursor-pointer" onClick={() => handleSourcePopup(document) }> 
                                                    <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={ document.data?.resolutions?.medium?.url ? document.data?.resolutions?.preview?.url : defaultImage } alt={document.data.title[language]} />
                                                    <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                        <VideoCameraIcon style={{ width: '40px', color: 'white'}} />
                                                    </div>
                                                </div>
                                            }

                                            { (document.type === 'book' || document.type === 'reference') &&
                                                <div className="gap-6 relative cursor-pointer" onClick={() => handleSourcePopup(document) }>
                                                    <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={ defaultImage } alt={document.data} />
                                                    <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                        <BookOpenIcon style={{ width: '40px', color: 'white'}} />
                                                    </div>
                                                </div>
                                            }

                                            { document.type === 'pdf' &&
                                                <div className="gap-6 relative cursor-pointer" onClick={() => handleSourcePopup(document) }>
                                                    <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={ document.data.resolutions?.preview?.url ? rootPath + document.data?.resolutions?.preview?.url : defaultImage } alt={document.data.title[language]} />
                                                    <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                        <DocumentIcon style={{ width: '40px', color: 'white'}} />
                                                    </div>
                                                </div>
                                            }

                                            { document.type === 'audio' &&
                                                <div className="gap-6 relative cursor-pointer" onClick={() => handleSourcePopup(document) }>
                                                    <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={ defaultImage } alt={document.data.title[language]} />
                                                    <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                        <SpeakerWaveIcon style={{ width: '40px', color: 'white'}} />
                                                    </div>
                                                </div>
                                            }

                                            { document.type === "gallery" &&
                                                <div className="gap-6 relative cursor-pointer" onClick={() => handleSourcePopup(document) }>
                                                    <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={ defaultImage } alt={document.data.title[language]} />
                                                    <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                        <PhotoIcon style={{ width: '40px', color: 'white'}} />
                                                    </div>
                                                </div>
                                            }


                                            { document.type === "3d" &&
                                                <div className="gap-6 relative cursor-pointer" onClick={() => handleSourcePopup(document) }>
                                                    <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={ defaultImage } alt={document.data.title[language]} />
                                                    <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                        <CubeIcon style={{ width: '40px', color: 'white'}} />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
    
                <AnimatePresence>
                    { dataPopup.open && 
                        <motion.div 
                            className='absolute w-full top-0 h-full lg:h-auto'
                            initial={{ top: '100%' }}
                            animate={{ top: isSmall ? 0 : '120px'}}
                            exit={{ top: '100%'}}
                            transition={{ duration: 0.8, ease: 'easeInOut'}}
                        >
                            <Source data={ dataPopup.data } handleSourcePopup={ handleSourcePopup }/>
                        </motion.div>
                    }
                </AnimatePresence>
            </>
        )
    }
}


    const ContentDisplay = ({ data }) => {
        const { language } = useLanguageContext(); // Si nécessaire
        let parsedData

        try {
            parsedData = JSON.parse(data)
        } catch (error) {
            console.error("Erreur lors du parsing des données :", error)
            return <p>Erreur : Les données sont invalides.</p>
        }

        if (!parsedData?.modules || !Array.isArray(parsedData.modules)) {
            console.error("Modules manquants ou mal formés :", parsedData)
            return <p>Erreur : Aucun texte à afficher.</p>
        }

        return (
            <div>
                { parsedData.modules.map((module, index) => (
                    <div key={index} className={`${index !== 0 ? 'mt-[30px]' : ''}`}>{module?.text?.content[language]}</div>
                ))}
            </div>
        );  
    };



