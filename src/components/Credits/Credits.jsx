import { motion } from 'framer-motion'
import { useSharedState } from '../../contexts/SharedStateProvider'
import { useEffect, useState } from 'react'
import siteConfig from '../../../site.config'
import { useTranslation } from 'react-i18next'
import bgBlack from '../../assets/images/common/bg-black.jpg'
import { fetchData } from '../../lib/utils'
import { useLanguageContext } from '../../contexts/LanguageProvider'

export default function Credits() {

    const { t } = useTranslation()
    const [sharedState, setSharedState] = useSharedState()
    const [credits, setCredits] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const {language} = useLanguageContext()

    useEffect(() => {
        const getData = async () => {
            const data = await fetchData(`/story/credits`)    
            setCredits(data)
            setIsLoaded(true)
        }

        getData();
    }, [])

    useEffect(() => {
        setSharedState({ ...sharedState, showCurtains: false })
    }, [])


    if (isLoaded) {
        return (
    
        <motion.div style={{ background: `url(${ bgBlack }) center / cover no-repeat`}} className="px-[20px] sm:px-0" exit={{opacity: 0.999, transition: {duration: siteConfig.curtainsTransitionDuration}}}>
            <div className='container mx-auto h-[calc(100dvh-120px)] sm:h-[calc(100vh-120px)] flex flex-col overflow-scroll'>
                <h1 className="text-center mt-[100px] text-[32px] md:text-[40px] leading-none text-blue font-abril">{ t('credits') }</h1>
                <div className='flex justify-center mt-[100px]'>
                    <p className='text-[24px] leading-none text-white'>{ credits.data.abstract[language] }</p>
                </div>
            </div>
        </motion.div>

        )
    }

    

        
    
}