import bgPaper from '../../assets/images/common/bg-paper.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLongToLine } from '@fortawesome/pro-regular-svg-icons'
import { faImage } from '@fortawesome/pro-thin-svg-icons'
import { Link, useParams } from 'react-router-dom'
import Source from '../Source/Source'
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from 'react'
import { useLanguageContext } from '../../contexts/LanguageProvider'
import { t } from 'i18next'
import { convertToHtml } from '../../lib/utils'
import { useSharedState } from '../../contexts/SharedStateProvider'
import siteConfig from '../../../site.config'


export default function Note() {
    const [sharedState, setSharedState] = useSharedState()
    const { slug } = useParams()
    const { language } = useLanguageContext()
    const [sourcePopup, setSourcePopup] = useState({ open: false, src: null })
    const [data, setData] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch(`https://ww2-lu.netlify.app/api/story/${ slug }`, {
            method: "GET",
            headers: {}
        })
        .then((response) => response.json())
        .then((data) => {
            setData(data)
            setIsLoaded(true)
        })
        .catch((error) => console.log(error))
    }, [isLoaded])

    useEffect(() => {
        setSharedState({ ...sharedState, showCurtains: false })
    }, [])

    const handleSourcePopup = () => {
        if (!sourcePopup.open) {
            setSourcePopup(prevSource => ({
                ...prevSource, 
                open: true, 
                src: "https://images.unsplash.com/photo-1692981226516-f76bcc8945b3?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }))
        } else {
            setSourcePopup(prevSource => ({
                ...prevSource, 
                open: false, 
                src: null
            }))
        }
    }

    if (isLoaded) {
        return (
            <>
                <motion.div style={{ backgroundImage: `url(${bgPaper})`, backgroundSize: 'cover'}} className='note' exit={{opacity: 0.999, transition: {duration: siteConfig.curtainsTransitionDuration}}}>
                    <div className="container mx-auto relative h-[calc(100vh-120px)] flex flex-col px-[30px] lg:px-0">
    
                        <Link to={'/catalogue'} className='2xl:absolute 2xl:top-[73px] 2xl:-left-[80px] text-[20px] lg:text-[30px] pt-[20px] 2xl:pt-0'>
                            <FontAwesomeIcon icon={faArrowLeftLongToLine} />
                        </Link>
    
                        <div className="flex lg:justify-between lg:border-b border-black pt-[20px] 2xl:pt-[60px]">
                            <div className="uppercase">
                                <span className="text-[30px] lg:text-[38px] lg:pb-[5px] relative after:content-[''] after:absolute after:left-[45px] lg:after:left-[50px] after:bottom-[50%] lg:after:bottom-[5px] after:translate-y-[50%] lg:after:translate-y-0 after:h-[30px] lg:after:h-[60px] after:w-[1px] after:bg-black pr-[10px] font-thin">{ data.data.title.fr_FR.split('(')[1]?.replace(')',"") }</span>
                                <span className="hidden lg:inline-block text-[40px] font-abril pl-[10px]">{ data.data.title[language]?.split('(')[0] }</span>
                            </div>
    
                            <div className='text-[22px] lg:text-[24px] uppercase flex items-center lg:items-end lg:leading-[48px] cursor-pointer pl-[20px] lg:pl-0'>   
                                <span className='pr-[10px] lg:pr-[20px]' onClick={() => console.log('previous')}>{ t('prev') }</span>
                                <span className='pl-[10px] lg:pl-[20px] relative before:content-[""] before:absolute before:left-[0px] before:bottom-[50%] lg:before:bottom-0 before:translate-y-[50%] lg:before:translate-y-0 before:h-[30px] lg:before:h-[60px] before:w-[1px] before:bg-black' onClick={() => console.log('next')}>{ t('next') }</span>
                            </div>
                        </div>

                        <span className="block lg:hidden uppercase text-[35px] leading-none font-abril border-b border-black pb-[20px] pt-[10px]">{ data.data.title[language]?.split('(')[0] }</span>
    
                        <div className="flex flex-col lg:flex-row overflow-scroll" id="text">
                            <div className="lg:w-1/2 py-[30px] lg:py-[40px] font-light lg:border-r border-black lg:pr-[60px] lg:overflow-y-auto flex-grow">   
                                
                                {/** CONTENT - REFERENCES */}
                                <div className='text-[28px]' id="content">
                                    {JSON.parse(data.contents).modules.map((text, index) => (
                                        <ContentDisplay
                                            key={index}
                                            text={text.text.content[language]}
                                            index={index}
                                        />
                                    ))}
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
    
                            <div className="lg:w-1/2 lg:ml-[50px] py-[40px] lg:overflow-y-auto flex-grow border-t lg:border-none border-black">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="grid gap-6">
                                        <div className='relative cursor-pointer' onClick={handleSourcePopup}>
                                            <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="" onClick={() => handleSourcePopup() }/>
                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={faImage} className='text-white text-[40px]' />
                                            </div>
                                        </div>
                                        <div className='relative cursor-pointer' onClick={handleSourcePopup}>
                                            <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt=""/>
                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={faImage} className='text-white text-[40px]' />
                                            </div>
                                        </div>
                                        <div className='relative cursor-pointer' onClick={handleSourcePopup}>
                                            <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt=""/>
                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={faImage} className='text-white text-[40px]' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-6">
                                        <div className='relative cursor-pointer' onClick={handleSourcePopup}>
                                            <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt=""/>
                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={faImage} className='text-white text-[40px]' />
                                            </div>
                                        </div>
                                        <div className='relative cursor-pointer' onClick={handleSourcePopup}>
                                            <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt=""/>
                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={faImage} className='text-white text-[40px]' />
                                            </div>
                                        </div>
                                        <div className='relative cursor-pointer' onClick={handleSourcePopup}>
                                            <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt=""/>
                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={faImage} className='text-white text-[40px]' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-6">
                                        <div className='relative cursor-pointer' onClick={handleSourcePopup}>
                                            <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt=""/>
                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={faImage} className='text-white text-[40px]' />
                                            </div>
                                        </div>
                                        <div className='relative cursor-pointer' onClick={handleSourcePopup}>
                                            <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt=""/>
                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={faImage} className='text-white text-[40px]' />
                                            </div>
                                        </div>
                                        <div className='relative cursor-pointer' onClick={handleSourcePopup}>
                                            <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt=""/>
                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={faImage} className='text-white text-[40px]' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-6">
                                        <div className='relative cursor-pointer' onClick={handleSourcePopup}>
                                            <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt=""/>
                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={faImage} className='text-white text-[40px]' />
                                            </div>
                                        </div>
                                        <div className='relative cursor-pointer' onClick={handleSourcePopup}>
                                            <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt=""/>
                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={faImage} className='text-white text-[40px]' />
                                            </div>
                                        </div>
                                        <div className='relative cursor-pointer' onClick={handleSourcePopup}>
                                            <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt=""/>
                                            <div className='absolute hover:opacity-0 transition-all duration-[750ms] inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center'>
                                                <FontAwesomeIcon icon={faImage} className='text-white text-[40px]' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
    
                <AnimatePresence>
                    { sourcePopup.open && 
                        <motion.div 
                            className='absolute w-full top-0'
                            initial={{ top: '100%' }}
                            animate={{ top: '120px' }}
                            exit={{ top: '100%'}}
                            transition={{ duration: 0.8, ease: 'easeInOut'}}
                        >
                            <Source src={ sourcePopup.src } handleSourcePopup={ handleSourcePopup }/>
                        </motion.div>
                        }
                </AnimatePresence>
            </>
        )
    }
}



const ContentDisplay = ({ text, index }) => {
    const htmlContent = convertToHtml(text);
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} ></div>
    )
}