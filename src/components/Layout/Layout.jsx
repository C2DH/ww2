import { Outlet, useLocation } from "react-router-dom"
import { useMenuContext } from '../../contexts/MenuProvider'
import { useMediaQuery } from "react-responsive"
import { useSourceContext } from "../../contexts/SourceProvider"
import Player from '../Player/Player'
import { useEffect, useState } from "react"
import classNames from "classnames"
const video = import.meta.env.VITE_VIDEO_TRAILER_HOME

export default function Layout() {
    const { pathname } = useLocation()
    const { openMenu } = useMenuContext()
    const {isOpenSource} = useSourceContext()
    const isSmall = useMediaQuery({ query: '(max-width: 768px)'})
    const [showIntro, setShowIntro] = useState(false)

    useEffect(() => {
        const introSeen = localStorage.getItem("introSeen");
        if (!introSeen && pathname === "/") {
            setShowIntro(true);
        }
    }, [pathname])

    const handleIntroEnd = () => {
        setShowIntro(false)
        localStorage.setItem("introSeen", "true")
    }

    return (
        <>
            {(showIntro && pathname === '/') &&
                <div className='h-[100vh] absolute inset-0 z-[201]'>
                    <Player url={video} status={"trailer"} onEnded={handleIntroEnd} />
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