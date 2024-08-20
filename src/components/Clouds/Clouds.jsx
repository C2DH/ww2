import { motion } from 'framer-motion'
import cloudTopLeft from '../../assets/images/common/cloud-top-left.png'
import cloudBottomLeft from '../../assets/images/common/cloud-bottom-left.png'
import cloudTopRight from '../../assets/images/common/cloud-top-right.png'
import cloudBottomRight from '../../assets/images/common/cloud-bottom-right.png'

export default function Clouds() {
    return (
        <>
            {/** LEFT TOP */}
            <motion.div className='fixed top-0 -left-[60%] pointer-events-none'
                initial={{ x: '0%' }}
                animate={{ x: '60%' }}
                exit={{ x: '-60%' }}
                transition={{ ease: 'linear', duration: 1.5 }}
            >
                <img src={ cloudTopLeft } alt="Cloud Transition" />
            </motion.div>

            {/** LEFT BOTTOM */}
            <motion.div className='fixed bottom-0 -left-[60%] pointer-events-none'
                initial={{ x: '0%' }}
                animate={{ x: '60%' }}
                exit={{ x: '-60%' }}
                transition={{ ease: 'linear', duration: 1.5 }}
            >
                <img src={ cloudBottomLeft } alt="Cloud Transition" className='h-full'/>
            </motion.div>


            {/** RIGHT TOP */}
            <motion.div className='fixed top-0 -right-[60%] pointer-events-none opacity-80'
                initial={{ x: '0%' }}
                animate={{ x: '60%' }}
                exit={{ x: '-60%' }}
                transition={{ ease: 'linear', duration: 105 }}
            >
                <img src={ cloudTopRight } alt="Cloud Transition" />
            </motion.div>

            {/** RIGHT BOTTOM */}
            <motion.div className='fixed bottom-0 -right-[60%] pointer-events-none opacity-80'
                initial={{ x: '0%' }}
                animate={{ x: '60%' }}
                exit={{ x: '-60%' }}
                transition={{ ease: 'linear', duration: 105 }}
            >
                <img src={ cloudBottomRight } alt="Cloud Transition" />
            </motion.div>

        </>
    )
}