import { Outlet, useLocation } from "react-router-dom"
import { useMenuContext } from '../../contexts/MenuProvider'
import classNames from "classnames"
import { useMediaQuery } from "react-responsive"


export default function Layout() {
    const { pathname } = useLocation()
    const { openMenu } = useMenuContext()
    const isSmall = useMediaQuery({ query: '(max-width: 768px)'})

    if (pathname === '/' || pathname === '/spacetime-map' || pathname.includes('/notice/')) {
        return (
            <div className={classNames('absolute inset-0 top-[80px] transition-all duration-[2000ms] flex', {
                // 'top-0': isSmall,
                // 'top-[80px]': !isSmall,
                'translate-y-0': !openMenu,
                'translate-y-full': openMenu
            })}>
                <Outlet/>
            </div>
        )
    } else {
        return (
            <Outlet/>
        ) 
    }
}