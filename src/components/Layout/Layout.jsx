import { Outlet, useLocation } from "react-router-dom"
import { useMenuContext } from '../../contexts/MenuProvider'
import { useMediaQuery } from "react-responsive"
import { useSourceContext } from "../../contexts/SourceProvider"
import Player from '../Player/Player'
import { useEffect, useState } from "react"
import classNames from "classnames"
import { ForwardIcon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion } from "framer-motion"
const trailers = {
    fr_FR: import.meta.env.VITE_VIDEO_TRAILER_HOME_FR,
    en_GB: import.meta.env.VITE_VIDEO_TRAILER_HOME_EN,
    de_DE: import.meta.env.VITE_VIDEO_TRAILER_HOME_DE,
}

export default function Layout() {
    const { pathname } = useLocation()
    const { openMenu } = useMenuContext()
    const {isOpenSource} = useSourceContext()
    const isSmall = useMediaQuery({ query: '(max-width: 768px)'})
    const [showIntro, setShowIntro] = useState(false)
    const languageTrailer = localStorage.getItem("i18nextLng")
    const [showSkip, setShowSkip] = useState(true)
    const trailerUrl = trailers[languageTrailer]

    const handleIntroEnd = () => {
        setShowIntro(false)
        localStorage.setItem("introSeen", JSON.stringify({value: true, expire: new Date().getTime()}))
    }

    useEffect(() => {
        const introSeen = localStorage.getItem("introSeen")
        const now = new Date().getTime()
        if ((!introSeen && pathname === "/") || (pathname === "/" && now - parseInt(introSeen.expire) > 6 * 60 * 60 * 1000)) {
            setShowIntro(true)
        }
    }, [pathname])

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowSkip(false)
        }, 21000)

        console.log('isSmall', isSmall)
    
        return () => clearTimeout(timer)
      }, [])

    return (
        <>
            {(showIntro && pathname === '/' ) &&
                <div className='hidden lg:block absolute top-0 left-0 z-[201] w-screen h-screen overflow-hidden'>
                    <Player url={trailerUrl} status={"trailer"} onEnded={handleIntroEnd} />
                    
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
                    '-translate-y-[80px]': isOpenSource && isSmall
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