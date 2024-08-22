import { useContext, useEffect, useState } from 'react'
import bgPaper from '../../assets/images/common/bg-paper.png'
import Accordion from '../Accordion/Accordion'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguageContext } from '../../contexts/LanguageProvider'
import { useSharedState } from '../../contexts/SharedStateProvider'
import siteConfig from '../../../site.config'


export default function Catalogue() {

    // Stocker un json dans le local storage pour gérer les progress bar
    // Quand j'ouvre la popup de la note je sette le localstorage
    const { i18n, t } = useTranslation()
    const { language } = useLanguageContext()
    const [lastRead, setLastRead] = useState('')
    const storedParams = localStorage.getItem('params')
    const [sharedState, setSharedState] = useSharedState()
    const [readTheme1, setReadTheme1] = useState(60/100)
    const [readTheme2, setReadTheme2] = useState(20/100)
    const [readTheme3, setReadTheme3] = useState(50/100)
    const [readTheme4, setReadTheme4] = useState(85/100)
    const [isLoaded, setIsLoaded] = useState(false)
    const [theme, setTheme] = useState([])

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response1 = await fetch(`https://ww2-lu.netlify.app/api/story/theme-01-vivre-sous-lannexion`)
                const data1 = await response1.json()

                const response2 = await fetch(`https://ww2-lu.netlify.app/api/story/theme-02-reagir-a-lannexion`)
                const data2 = await response2.json()

                setTheme([data1, data2])
                setIsLoaded(true)
            } catch (error) {
                console.log(error)
            }
        }
        fetchThemes()

        setSharedState({ ...sharedState, showCurtains: false });

    }, [])


    if (isLoaded) {
        return (
            <motion.div style={{ background: `url(${ bgPaper }) center / cover no-repeat`}} className="px-[20px] sm:px-0" exit={{opacity: 0.999, transition: {duration: siteConfig.curtainsTransitionDuration}}}>
                <div className='container mx-auto h-[calc(100dvh-120px)] sm:h-[calc(100vh-120px)] flex flex-col overflow-scroll'>
    
                     {/** Headers */}
                    <div className='grid grid-cols-12 pt-[20px] 2xl:pt-[35px]'>
                        <div className="col-span-12 lg:col-span-8">
                            <h1 className='font-abril text-[40px] sm:text-[50px] 2xl:text-[70px]'>Catalogue</h1>
                            <p className='pt-[15px] pr-[15px] text-[20px] md:text-[24px] 2xl:text-[28px] mb-[20px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.</p>                    
                        </div>
    
                        <div className="hidden lg:flex col-span-4 border-l border-black mt-[70px] mb-[45px] pl-[20px] flex-col justify-between">
                            <div className='flex items-center'>
                                <span className='text-[24px] uppercase pr-[10px] text-nowrap'>{ t('theme')} 1</span>  
                                <ProgressBar progress={readTheme1}/>
                            </div>
    
                            <div className='flex items-center'>
                                <span className='text-[24px] uppercase pr-[10px] text-nowrap'>{ t('theme')} 2</span>   
                                <ProgressBar progress={readTheme2} />
                            </div>
    
                            <div className='flex items-center'> 
                                <span className='text-[24px] uppercase pr-[10px] text-nowrap'>{ t('theme')} 3</span>   
                                <ProgressBar progress={readTheme3} />   
                            </div>
                            <div className='flex items-center'>
                                <span className='text-[24px] uppercase pr-[10px] text-nowrap'>{ t('theme')} 4</span>   
                                <ProgressBar progress={readTheme4} />
                            </div>

                                
                                {/* <div className='resume-reading'>
    
                                </div> */}
                        </div>
                    </div>
                    
                    <div className='lg:flex flex-grow flex-col lg:overflow-scroll'>
                        <Accordion items={ theme } />
                    </div>
                </div>
            </motion.div>
        )
    }
}



const ProgressBar = ({ progress }) => {
    return (
        <div className="progress-container">
            <motion.div className='progress-bar' initial={{ width: 0 }} animate={{ width: `${progress * 100}%` }} transition={{ duration: 1, delay: 1 }}></motion.div>
        </div>
    )
}