import { Outlet, useLocation } from "react-router-dom"
import { useMenuContext } from '../../contexts/MenuProvider'
import classNames from "classnames"
import { useMediaQuery } from "react-responsive"
import { useSourceContext } from "../../contexts/SourceProvider"


export default function Layout() {
    const { pathname } = useLocation()
    const { openMenu } = useMenuContext()
    const {isOpenSource} = useSourceContext()
    const isSmall = useMediaQuery({ query: '(max-width: 768px)'})

    console.log('isOpensource', isOpenSource)


    if (pathname === '/' || pathname === '/spatiotemporal-map' || pathname.includes('/notice/')) {
        return (
            <div className={classNames('absolute inset-0 transition-all duration-[2500ms] flex z-[200] top-[80px]', {
                'translate-y-0': !openMenu,
                'translate-y-full': openMenu,
                '-translate-y-[80px]': isOpenSource && isSmall
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