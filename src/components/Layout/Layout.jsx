import { Outlet, useLocation } from "react-router-dom"
import { useMenuContext } from '../../contexts/MenuProvider'
import { useMediaQuery } from "react-responsive"
import { useSourceContext } from "../../contexts/SourceProvider"
import Player from '../Player/Player'
import { useEffect, useState } from "react"
import classNames from "classnames"
import { ForwardIcon } from "@heroicons/react/24/outline"
const trailer_FR = import.meta.env.VITE_VIDEO_TRAILER_HOME_FR
const trailer_EN = import.meta.env.VITE_VIDEO_TRAILER_HOME_EN
const trailer_DE = import.meta.env.VITE_VIDEO_TRAILER_HOME_DE

export default function Layout() {
    const { pathname } = useLocation()
    const { openMenu } = useMenuContext()
    const {isOpenSource} = useSourceContext()
    const isSmall = useMediaQuery({ query: '(max-width: 768px)'})
    const [showIntro, setShowIntro] = useState(false)

    const handleIntroEnd = () => {
        setShowIntro(false)
        localStorage.setItem("introSeen", JSON.stringify({value: true, expire: new Date().getTime()}))
    }

    useEffect(() => {
        const introSeen = localStorage.getItem("introSeen")
        const now = new Date().getTime()
        if ((!introSeen && pathname === "/") || (now - parseInt(introSeen.expire) > 6 * 60 * 60 * 1000)) {
            setShowIntro(true)
        }
    }, [pathname])

    return (
        <>
            {(showIntro && pathname === '/' ) &&
                <div className='h-screen absolute inset-0 z-[201] flex items-center justify-center bg-black'>
                    <Player url={trailer_FR} status={"trailer"} onEnded={handleIntroEnd} />
                    <div onClick={handleIntroEnd} className="absolute top-[50%] -translate-y-[50%] right-[50px] cursor-pointer bg-black bg-opacity-50 p-2 rounded-full">
                        <ForwardIcon style={{ width: '50px', color: 'white'}}/>
                    </div>
                </div>  
            }

            {(pathname === '/' || pathname === '/spatiotemporal-map' || pathname.includes('/notice/')) ? (
                <div className={classNames('absolute inset-0 transition-all duration-[2500ms] flex z-[200] top-[80px]', {
                    'translate-y-0': !openMenu,
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