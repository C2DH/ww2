import { motion } from 'framer-motion'
import { useSharedState } from '../../contexts/SharedStateProvider'
import { useEffect } from 'react'
import siteConfig from '../../../site.config'
import { useTranslation } from 'react-i18next'


export default function Credits() {

    const { t } = useTranslation()
    const [sharedState, setSharedState] = useSharedState()

    useEffect(() => {
        setSharedState({ ...sharedState, showCurtains: false })
    }, [])

    return (
        <motion.div exit={{opacity: 0.999, transition: {duration: siteConfig.curtainsTransitionDuration}}}>
            <h1 className="text-center text-[60px] mt-[100px]">{ t('credits') }</h1>
        </motion.div>
    )
}