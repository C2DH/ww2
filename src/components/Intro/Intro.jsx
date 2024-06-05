// HOOKS
import { useEffect, useState } from 'react'

// ASSETS
import bgBlack from '../../assets/images/common/bg-black.jpg'
import logo from '../../assets/images/common/logo.png'

// FRAMER
import { motion, AnimatePresence } from "framer-motion"


export default function Intro({}) {

    const [isVisible, setIsVisible ] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000)
        
        return () => clearTimeout(timer)
    
    },[])    


    return (
        <>
            <AnimatePresence>
            { isVisible &&
                <motion.div 
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 3, ease: 'easeInOut' }}
                    style={{ background: `url(${bgBlack}) 50% / cover no-repeat` }} className='h-[100vh] absolute inset-0'>
                    <div className='flex flex-col items-center pt-[40px]'>
                        <motion.img initial={{ opacity: 1}} animate={{ opacity: 0 }} transition={{ duration: 1, delay: 4 }} src={ logo } alt="Logo World War 2" className='w-[45%]' />
                        <div className='text-center text-white uppercase antonio w-[50%]'>
                            <h1 className='text-[43px] mt-[45px]'>L'exposition virtuelle</h1>
                            <h2 className='text-[28px]'>sur la seconde guerre mondiale au luxembourg</h2>
                            <p className='pt-[35px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.</p>
                        </div>
                    </div>
                </motion.div>
            }
            </AnimatePresence>
        </>
        

    )
}   