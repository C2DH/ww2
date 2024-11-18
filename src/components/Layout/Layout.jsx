import { Outlet, useLocation } from "react-router-dom"
import { useMenuContext } from '../../contexts/MenuProvider'
import classNames from "classnames"
import { useMediaQuery } from "react-responsive"


export default function Layout() {
    const { pathname } = useLocation()
    const { openMenu } = useMenuContext()
    const isSmall = useMediaQuery({ query: '(max-width: 768px)'})

    if (pathname === '/' || pathname === '/spatiotemporal-map' || pathname.includes('/notice/')) {
        return (
            <div className={classNames('absolute inset-0 ransition-all duration-[2000ms] flex z-[200] top-[80px]', {
                'translate-y-0': !openMenu,
                'translate-y-full': openMenu,
                // 'top-[80px]': !isSmall && pathname === '/spatiotemporal-map',
                // 'top-0': isSmall && pathname === '/spatiotemporal-map'
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