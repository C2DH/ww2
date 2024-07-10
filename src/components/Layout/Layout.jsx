import { Outlet, useLocation, useRouteError } from "react-router-dom";
import { useMenuContext } from '../../contexts/MenuProvider'
import classNames from "classnames";

export default function Layout() {

    // const [ openMenu, setOpenMenu ] = useMenuContext()
    // console.log(openMenu)

    const { pathname } = useLocation()

    const { openMenu, setOpenMenu } = useMenuContext()
    console.log(openMenu)

    if (pathname === '/' || pathname === '/spacetime-map' || pathname.includes('/notice/')) {
        return (
            <div className={classNames('absolute top-[80px] inset-0 transition-all duration-[2000ms]', {
              'translate-y-0': !openMenu,
              'translate-y-full': openMenu
            })}>
                <Outlet/>
            </div>
        )
    } else {
        return (
            <div>
                <Outlet/>
            </div>
        ) 
    }
}