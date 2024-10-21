import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSharedState } from '../../contexts/SharedStateProvider'
import Source from '../Source/Source'

import bgPaper from '../../assets/images/common/bg-paper.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLongToLine } from '@fortawesome/pro-regular-svg-icons'
import { faImage, faVideo, faBook } from '@fortawesome/pro-thin-svg-icons'

import { AnimatePresence, motion } from "framer-motion"

import { useLanguageContext } from '../../contexts/LanguageProvider'
import { t } from 'i18next'

import { convertToHtml, fetchData, getAllNotes } from '../../lib/utils'
import defaultImage from '../../assets/images/common/default.png'
import siteConfig from '../../../site.config'


export default function Note() {
    const [sharedState, setSharedState] = useSharedState()
    const { slug } = useParams()
    const { language } = useLanguageContext()
    const [dataPopup, setDataPopup] = useState({ open: false, data: null })
    const [data, setData] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [notes, setNotes ] = useState([])
    const navigate = useNavigate()
    const rootPath = import.meta.env.VITE_ROOT

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
                    <div className="container mx-auto relative h-[calc(100dvh-120px)] sm:h-[calc(100vh-120px)] flex flex-col px-[30px]">
    
                        <div className='flex items-center justify-between pt-[10px]'>
                            <Link to={'/catalogue'} className='2xl:absolute 2xl:top-[73px] 2xl:-left-[50px] text-[20px] lg:text-[30px]'>
                                <FontAwesomeIcon icon={faArrowLeftLongToLine} />
                            </Link>
                            <div className='lg:hidden text-[20px] md:text-[24px] uppercase flex items-center cursor-pointer pl-[20px]'>   
                                <span className='pr-[10px] lg:pr-[20px]' onClick={() => console.log('previous')}>{ t('prev') }</span>
                                <span className='pl-[10px] lg:pl-[20px] relative before:content-[""] before:absolute before:left-[0px] before:bottom-[50%] lg:before:bottom-0 before:translate-y-[50%] lg:before:translate-y-0 before:h-[30px] lg:before:h-[60px] before:w-[1px] before:bg-black' onClick={() => console.log('next')}>{ t('next') }</span>
                            </div>
                        </div>
    
                        <div className="flex lg:justify-between lg:border-b border-black pt-[10px] md:pt-[20px] 2xl:pt-[60px]">
                            <div className="hidden lg:block uppercase">
                                <span className="text-[30px] lg:text-[38px] lg:pb-[5px] relative after:content-[''] after:absolute after:left-[45px] lg:after:left-[50px] after:bottom-[50%] lg:after:bottom-[5px] after:translate-y-[50%] lg:after:translate-y-0 after:h-[30px] lg:after:h-[60px] after:w-[1px] after:bg-black pr-[10px] font-thin">N01</span>
                                <span className="hidden lg:inline-block text-[40px] font-abril pl-[10px]">{ data.data.title[language] }</span>
                            </div>
                            <div className='hidden lg:flex items-center lg:items-end text-[22px] lg:text-[24px] uppercase lg:leading-[48px] cursor-pointer pl-[20px] lg:pl-0'>   
                                <span className='pr-[10px] lg:pr-[20px]' onClick={() => navigateNote(-1)}>{ t('prev') }</span>
                                <span className='pl-[10px] lg:pl-[20px] relative before:content-[""] before:absolute before:left-[0px] before:bottom-[50%] lg:before:bottom-0 before:translate-y-[50%] lg:before:translate-y-0 before:h-[30px] lg:before:h-[60px] before:w-[1px] before:bg-black' onClick={() => navigateNote(+1)}>{ t('next') }</span>
                            </div>
                        </div>

                        <div className='lg:hidden border-b border-black pb-[20px] pt-[10px] text-[24px] md:text-[38px] uppercase'>
                            <span className="relative after:content-[''] after:absolute after:left-[35px] md:after:left-[50px] after:bottom-[50%] after:translate-y-[50%] after:h-[30px] after:w-[1px] after:bg-black pr-[10px] font-thin">N01</span>
                            <span className="leading-none font-abril pl-[10px] md:pl-[15px]">{ data.data.title[language] }</span>
                        </div>
    
                        <div className="flex flex-col lg:flex-row overflow-scroll min-h-[calc(100%-120px)]" id="text">
                            <div className="lg:w-1/2 py-[30px] lg:py-[40px] font-light lg:border-r border-black lg:pr-[60px] lg:overflow-y-auto flex-grow">   
                                
                                {/** CONTENT - REFERENCES */}
                                <div className='text-[28px]' id="content">
                                    {/* {JSON.parse(data.data.abstract[language]).modules.map((text, index) => (
                                        <ContentDisplay
                                            key={index}
                                            text={text}
                                            index={index}
                                        />
                                    ))} */}

                                    <ContentDisplay text={data.data.abstract[language]} />
                                </div>
            

                                {/** RELATED NOTES */}
                                <div className='ml-[20px] mt-[30px] pb-[10px]'>
                                    <span className='uppercase font-abril text-[20px] border-b border-black block pb-[10px]'>{ t('links')} :</span>
                                    <div className='text-[24px] pt-[15px]'>
                                        <Link className=' uppercase'>
                                            <span className='font-normal'>{ data.data.title[language]?.split('(')[1]?.replace(')',"") }</span> 
                                            <span className='font-abril pl-[10px]'>{ data.data.title[language]?.split('(')[0] }</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                            {/** MEDIAS */}
                            <div className="lg:w-1/2 lg:ml-[50px] py-[40px] lg:overflow-y-auto flex-grow border-t lg:border-none border-black">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    { data.documents.map(document => 
                                        <div className="grid gap-6 relative cursor-pointer medias" key={ document.id } onClick={() => handleSourcePopup(document) }>
                                            
                                            { document.type === 'picture' &&
                                                <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={ document.data.resolutions.preview.url !== "" ? rootPath + document.data.resolutions.preview.url : defaultImage } alt={document.data.title[language]} />
                                            }

                                            { document.type === 'video' &&
                                                <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={ document.data.resolutions.preview.url === "" ? defaultImage : document.data.resolutions.preview.url } alt={document.data.title[language]} />
                                            }

                                            { document.type === 'book' &&
                                                <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={ defaultImage } alt={""} />
                                            }

                                            { document.type === 'pdf' &&
                                                <img className="max-w-full cursor-pointer h-[250px] object-cover w-full" src={ rootPath + document.data.resolutions.preview.url } alt={""} />
                                            }

                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={ 
                                                    document.type === 'picture' ? faImage :
                                                    document.type === 'video' ? faVideo :
                                                    faBook
                                                    } className='text-white text-[40px]' 
                                                />
                                            </div>

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
                            className='absolute w-full top-0'
                            initial={{ top: '100%' }}
                            animate={{ top: '120px' }}
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



const ContentDisplay = ({ text }) => {
    const htmlContent = convertToHtml(text);
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} ></div>
    )
}