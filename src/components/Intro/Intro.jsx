// HOOKS
import { useEffect, useState } from 'react'

// ASSETS
import BG from '../../assets/images/common/BG.jpg'
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
                    transition={{ duration: 2, delay: 4, ease: 'easeInOut' }}
                    style={{ background: `url(${BG}) lightgray 50% / cover no-repeat`, backgroundBlendMode: ''}} className='h-[100vh] absolute inset-0'>
                    <div className='flex flex-col items-center pt-[180px]'>
                        <img src={ logo } alt="Logo World War 2" className='w-[50%]' />
                        <div className='text-center text-white uppercase antonio w-[50%]'>
                            <h1 className='text-[43px] mt-[90px]'>L'exposition virtuelle</h1>
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