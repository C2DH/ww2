import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

export default function HeaderHistorianWorkshop({items}) {

    const { pathname } = useLocation()
    
    return (
        <>
            <div className="hidden lg:grid grid-cols-12 lg:pt-[20px] xl:pt-[50px]">
                <div className="col-span-12 xl:col-span-9">
                    <h1 className='text-[50px] xl:text-[70px] abril leading-none pb-[20px] xl:pb-[50px]'>L'atelier de l'historien</h1>
                </div>

                <div className="col-span-12 xl:col-span-3 text-[20px] xl:pt-[20px]">
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.</p>
                </div>
            </div>

            <nav className='hidden lg:block'>
                <ul className='text-[28px] xl:text-[38px] font-semibold uppercase flex gap-[20px]'>
                    {items?.map((item, index) => 
                        <li key={index}>
                            <Link key={index} to={item.link} className={classNames('navbar-title', {'active' : pathname === `${item.link}`})}>{item.title}</Link>
                        </li>
                   )}
                </ul>
            </nav>
        </>
    )
}


