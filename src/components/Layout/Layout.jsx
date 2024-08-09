import { Outlet, useLocation, useRouteError } from "react-router-dom";
import { useMenuContext } from '../../contexts/MenuProvider'
import classNames from "classnames";
import { useEffect } from "react";

export default function Layout() {

    const { pathname } = useLocation()
    const { openMenu, setOpenMenu } = useMenuContext()


    // useEffect(() => {
    //     console.log('menu open',openMenu)
    // }, [openMenu])

    if (pathname === '/' || pathname === '/spacetime-map' || pathname.includes('/notice/')) {
        return (
            <div className={classNames('absolute top-[100px] sm:top-[80px] inset-0 transition-all duration-[2000ms] flex', {
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