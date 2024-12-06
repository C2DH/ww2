import { useEffect, useState } from "react"
import { useSharedState } from "../../contexts/SharedStateProvider"
import { motion } from 'framer-motion'
import siteConfig from '../../../site.config'
import { useTranslation } from "react-i18next"
import { fetchData } from "../../lib/utils"
import { useLanguageContext } from '../../contexts/LanguageProvider'
import bgBlack from '../../assets/images/common/bg-black.jpg'
import ReactMarkdown from 'react-markdown';

export default function Terms() {

    const [sharedState, setSharedState] = useSharedState()
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { language } = useLanguageContext()

    const fetchTerms = async () => {
        try {
            const response = await fetchData('story/terms-of-use')
            if (response) {
                setData(response)
                setIsLoading(false)
            }
        } catch(e) {
            console.log('erreur :', e)
        }
    }

    useEffect(() => {
        fetchTerms()
    }, [])


    useEffect(() => {
        setSharedState({ ...sharedState, showCurtains: false })
    }, [])

    return (

        !isLoading &&
            <motion.div style={{ background: `url(${bgBlack}) center / cover no-repeat` }} className="px-[20px] sm:px-0 text-white" exit={{ opacity: 0.999, transition: { duration: 1 } }}>
                <div className="container mx-auto px-[20px] md:px-[10%] lg:px-[15%] xl:px-[20%] h-[calc(100dvh-120px)] sm:h-[calc(100vh-120px)] overflow-scroll flex flex-col relative">
                    <h1 className="text-center text-[34px] lg:text-[60px] mt-[50px] lg:mt-[100px] underline decoration-2 underline-offset-8" >{ data.data.title[language]}</h1>
                    <h2 className="text-center text-[26px] lg:text-[40px] mt-[35px] lg:mt-[100px] leading-none">{ data.data.subtitle[language]}</h2>
                    <div className="flex justify-center text-center mb-[80px]">
                        <MarkdownContent content={data.data.abstract[language]} />
                    </div>
                </div>
            </motion.div>
    )   
}


const MarkdownContent = ({content}) => {

    const customComponents = {
        h2: ({ node, ...props }) => <h2 className="text-[26px] lg:text-[40px] mt-[40px] lg:mt-[80px]" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-[22px] lg:text-[28px]" {...props} />,
        p: ({ node, ...props }) => <p className="text-[20px] lg:text-[24px] leading-none" {...props} />,
        a: ({ node, ...props }) => <a className="text-blue underline" target="_blank"  {...props} />,
    }
    return (
        <div className="markdown-container" >
            <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
        </div>
    )
}