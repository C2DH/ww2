
import bgPaper from '../../assets/images/common/bg-paper.png'
import siteConfig from '../../../site.config'
import { motion } from 'framer-motion'

export default function LayoutHistorianWorkshop({ children, pageTitle }) {
    return (
        <motion.div style={{ backgroundImage: `url(${bgPaper})`}} className='w-full h-[calc(100vh-120px)] overflow-scroll' exit={{opacity: 0.999, transition: {duration: siteConfig.curtainsTransitionDuration}}}>
            <div className="container mx-auto h-[calc(100dvh-120px)] sm:min-h-[calc(100vh-120px)] sm:h-[calc(100vh-120px)] flex flex-col px-[20px] xl:px-0">
                
                <div className='lg:hidden pt-[30px]'>
                    <h1 className='text-[40px] font-abril leading-none'>{pageTitle}</h1>
                </div>

                { children }
            </div>
        </motion.div>
    )
}