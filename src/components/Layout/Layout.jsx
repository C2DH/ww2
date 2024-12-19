import { Outlet, useLocation } from "react-router-dom"
import { useMenuContext } from '../../contexts/MenuProvider'
import { useMediaQuery } from "react-responsive"
import { useSourceContext } from "../../contexts/SourceProvider"
import Player from '../Player/Player'
import { useEffect, useState } from "react"
import classNames from "classnames"
import { ForwardIcon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion } from "framer-motion"
import { useIntroContext } from "../../contexts/IntroProvider"
const trailers = {
    fr_FR: [
        { url: import.meta.env.VITE_VIDEO_TRAILER_HOME_WEBM_FR, type: 'video/webm'} , 
        {url: import.meta.env.VITE_VIDEO_TRAILER_HOME_MP4_FR, type: 'video/mp4' }
    ],
    en_GB: [
        { url: import.meta.env.VITE_VIDEO_TRAILER_HOME_WEBM_EN, type: 'video/webm'} , 
        {url: import.meta.env.VITE_VIDEO_TRAILER_HOME_MP4_EN, type: 'video/mp4' }
    ],
    de_DE: [
        { url: import.meta.env.VITE_VIDEO_TRAILER_HOME_WEBM_DE, type: 'video/webm'} , 
        {url: import.meta.env.VITE_VIDEO_TRAILER_HOME_MP4_DE, type: 'video/mp4' }
    ]
}

export default function Layout() {
    const isSmall = useMediaQuery({ query: '(max-width: 768px)'})
    const { pathname } = useLocation()
    const { openMenu } = useMenuContext()
    const { isOpenSource } = useSourceContext()
    const { displayVideo, setDisplayVideo } = useIntroContext()
    const [showSkip, setShowSkip] = useState(true)
    const languageTrailer = localStorage.getItem("i18nextLng")
    const trailerUrl = trailers[languageTrailer]

    const handleIntroEnd = () => {
        setDisplayVideo(false)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowSkip(false)
        }, 21000)
    
        return () => clearTimeout(timer)
      }, [])

    return (
        <>
            {(displayVideo && pathname === '/' ) &&
                <div className='hidden lg:block absolute top-0 left-0 z-[201] w-screen h-screen overflow-hidden'>
                    <Player url={trailerUrl} status={"trailer"} page={"/"} onEnded={handleIntroEnd} />
                    
                    <AnimatePresence>
                        {showSkip &&
                            <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 0.9 }} exit={{ opacity: 0 }} onClick={handleIntroEnd} className="absolute top-[50%] -translate-y-[50%] right-[50px] cursor-pointer bg-black bg-opacity-50 p-2 rounded-full">
                                <ForwardIcon style={{ width: '50px', color: 'white'}}/>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>  
            }

            {(pathname === '/' || pathname === '/spatiotemporal-map' || pathname.includes('/notice/')) ? (
                <div className={classNames('absolute inset-0 transition-all duration-[2500ms] flex z-[200] top-[80px]', {
                    'translate-y-0': !openMenu && !isSmall,
                    'translate-y-full': openMenu,
                    '-translate-y-[80px] h-full': isOpenSource && isSmall
                    }
                )}>
                    <Outlet/>
                </div>
            ) : (
                <Outlet/>
            )}
        </>
    )
}