import { motion } from 'framer-motion'
import cloudTopLeft from '../../assets/images/common/cloud-top-left.png'
import cloudBottomLeft from '../../assets/images/common/cloud-bottom-left.png'
import cloudTopRight from '../../assets/images/common/cloud-top-right.png'
import cloudBottomRight from '../../assets/images/common/cloud-bottom-right.png'
import siteConfig from '../../../site.config'

export default function Clouds() {
    return (
        <>
            {/** BG GRAY */}
            <motion.div
                className='fixed inset-0 bg-gray-100'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: siteConfig.cloudsTransitionDuration * 0.5, duration: siteConfig.cloudsTransitionDuration * 0.5 } }}
                exit={{ opacity: 0, transition: {duration: siteConfig.cloudsTransitionDuration * 0.5, delay: siteConfig.cloudsTransitionDelay} } }
                transition={{ ease: 'easeInOut', duration: siteConfig.cloudsTransitionDuration }}
            >
            </motion.div>

            {/** LEFT TOP */}
            <motion.div className='fixed top-0 left-0 w-full h-full pointer-events-none'
                initial={{ x: '-100%', y: '-10%' }}
                animate={{ x: '0%', y: '0%' }}
                exit={{ x: '-100%', y: '-10%', transition: {ease: 'easeInOut', duration: siteConfig.cloudsTransitionDuration, delay: siteConfig.cloudsTransitionDelay } }}
                transition={{ ease: 'easeInOut', duration: siteConfig.cloudsTransitionDuration }}
            >
                <img src={ cloudTopLeft } alt="Cloud Transition" className='object-cover w-full h-full max-w-none' />
            </motion.div>

            {/** LEFT BOTTOM */}
            <motion.div className='fixed bottom-0 left-0 w-full h-full pointer-events-none'
                initial={{ x: '-100%', y: '10%' }}
                animate={{ x: '0%', y: '0%' }}
                exit={{ x: '-100%', y: '10%', transition: {ease: 'easeInOut', duration: siteConfig.cloudsTransitionDuration * (0.5 + (Math.random() * 0.5)), delay: siteConfig.cloudsTransitionDelay } }}
                transition={{ ease: 'easeInOut', duration: siteConfig.cloudsTransitionDuration * (0.5 + (Math.random() * 0.5)) }}
            >
                <img src={ cloudBottomLeft } alt="Cloud Transition" className='object-cover w-full h-full max-w-none' />
            </motion.div>


            {/** RIGHT TOP */}
            <motion.div className='fixed top-0 right-0 w-full h-full pointer-events-none'
                initial={{ x: '100%', y: '-10%' }}
                animate={{ x: '0%', y: '0%' }}
                exit={{ x: '100%', y: '-10%', transition: {ease: 'easeInOut', duration: siteConfig.cloudsTransitionDuration * (0.5 + (Math.random() * 0.5)) , delay: siteConfig.cloudsTransitionDelay } }}
                transition={{ ease: 'easeInOut', duration: siteConfig.cloudsTransitionDuration * (0.5 + (Math.random() * 0.5)) }}
            >
                <img src={ cloudTopRight } alt="Cloud Transition" className='object-cover w-full h-full max-w-none' />
            </motion.div>

            {/** RIGHT BOTTOM */}
            <motion.div className='fixed bottom-0 right-0 w-full h-full pointer-events-none'
                initial={{ x: '100%', y: '10%' }}
                animate={{ x: '0%', y: '0%' }}
                exit={{ x: '100%', y: '10%', transition: {ease: 'easeInOut', duration: siteConfig.cloudsTransitionDuration * (0.5 + (Math.random() * 0.5)), delay: siteConfig.cloudsTransitionDelay} }}
                transition={{ ease: 'easeInOut', duration: siteConfig.cloudsTransitionDuration * (0.5 + (Math.random() * 0.5)) }}
            >
                <img src={ cloudBottomRight } alt="Cloud Transition" className='object-cover w-full h-full max-w-none' />
            </motion.div>

        </>
    )
}