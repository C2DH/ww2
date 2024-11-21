import { useEffect, useState } from 'react'
import bgPaper from '../../assets/images/common/bg-paper.png'
import Accordion from '../Accordion/Accordion'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useSharedState } from '../../contexts/SharedStateProvider'
import siteConfig from '../../../site.config'
import { fetchData } from '../../lib/utils'
import { useLanguageContext } from '../../contexts/LanguageProvider'


export default function Catalogue() {

    // Stocker un json dans le local storage pour gérer les progress bar
    // Quand j'ouvre la popup de la note je sette le localstorage
    const { t } = useTranslation()
    const [lastRead, setLastRead] = useState('')
    const storedParams = localStorage.getItem('params')
    const [sharedState, setSharedState] = useSharedState()
    const [readTheme1, setReadTheme1] = useState(60/100)
    const [readTheme2, setReadTheme2] = useState(20/100)
    const [readTheme3, setReadTheme3] = useState(50/100)
    const [readTheme4, setReadTheme4] = useState(85/100)
    const [isLoaded, setIsLoaded] = useState(false)
    const [textCatalogue, setTextCatalogue] = useState()
    const { language } = useLanguageContext()
    const [themes, setThemes] = useState([])


    useEffect(() => {
        const getData = async () => {
            const catalogue = await fetchData(`story/catalogue`)    
            const allThemes = catalogue.stories
            const textCatalogue = catalogue.data.abstract

            setTextCatalogue(textCatalogue)
            
            if (catalogue && allThemes.length > 0) {
                const themesData = await Promise.all(
                    allThemes.map(async (item) => {
                        return fetchData(`story/${item.slug}`)
                    })
                )
    
                setThemes(themesData);
                setIsLoaded(true);
            }
        }
        getData();
    }, [isLoaded])


    useEffect(() => {
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
                            <p className='pt-[15px] pr-[15px] text-[20px] md:text-[24px] 2xl:text-[28px] mb-[20px]'>{textCatalogue[language]}</p>                    
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
                        <Accordion items={ themes } />
                    </div>
                </div>
            </motion.div>
        )
    }
}



const ProgressBar = ({ progress }) => {
    return (
        <div className="h-[20px] w-full bg-[#000000]/[0.15]">
            <motion.div className='h-[20px] bg-[rgba(0,0,0,0.3)] w-full relative after:bg-[#6EDFFB] after:absolute after:top-1/2 after:left-0 after:transform after:-translate-y-1/2 after:h-[10px] after:w-full' initial={{ width: 0 }} animate={{ width: `${progress * 100}%` }} transition={{ duration: 1, delay: 1 }}></motion.div>
        </div>
    )
}