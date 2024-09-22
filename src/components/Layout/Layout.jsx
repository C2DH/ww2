import { Outlet, useLocation } from "react-router-dom"
import { useMenuContext } from '../../contexts/MenuProvider'
import classNames from "classnames"


export default function Layout() {
    const { pathname } = useLocation()
    const { openMenu } = useMenuContext()

    if (pathname === '/level-01-journeys' || pathname === '/spacetime-map' || pathname.includes('/notice/')) {
        return (
            <div className={classNames('absolute inset-0 top-[80px] transition-all duration-[2000ms] flex z-[200]', {
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