import { motion } from 'framer-motion'
import { useSharedState } from '../../contexts/SharedStateProvider'
import { useEffect, useState } from 'react'
import siteConfig from '../../../site.config'
import { useTranslation } from 'react-i18next'
import { fetchData } from '../../lib/utils'
import { useLanguageContext } from '../../contexts/LanguageProvider'
import bgBlack from '../../assets/images/common/bg-black.jpg'


export default function About() {

    const [sharedState, setSharedState] = useSharedState()
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { language } = useLanguageContext()

    const fetchAbout = async () => {
        try {
            const response = await fetchData('story/about')
            if (response) {
                setData(response)
                setIsLoading(false)
            }
        } catch(e) {
            console.log('erreur :', e)
        }
    }

    useEffect(() => {
        fetchAbout()
    }, [])


    useEffect(() => {
        setSharedState({ ...sharedState, showCurtains: false })
    }, [])

    return (

        !isLoading &&
            <motion.div style={{ background: `url(${bgBlack}) center / cover no-repeat` }} className="px-[20px] sm:px-0 text-white" exit={{ opacity: 0.999, transition: { duration: 1 } }}>
                <div className="container mx-auto px-[20px] md:px-[10%] lg:px-[15%] xl:px-[20%] h-[calc(100dvh-120px)] sm:h-[calc(100vh-120px)] overflow-scroll flex flex-col relative pb-[80px]">
                    <h1 className="text-center text-[34px] lg:text-[60px] mt-[50px] lg:mt-[100px] underline decoration-2 underline-offset-8 mb-[50px]">{ data.data.title[language]}</h1>
                    <p className='text-justify text-[20px] lg:text-[24px] leading-none'>{data.data.abstract[language]}</p>
                </div>
            </motion.div>
    )   
}

