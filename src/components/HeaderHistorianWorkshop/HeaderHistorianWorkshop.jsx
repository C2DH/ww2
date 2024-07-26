import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import bgPaper from '../../assets/images/common/bg-paper.png'
import ButtonFilter from '../ButtonFilter/ButtonFilter'

export default function HeaderHistorianWorkshop({filters}) {

    const [currentPage, setCurrentPage] = useState('')
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isOpenFilters, setIsOpenFilters] = useState(false)
    const { pathname } = useLocation()

    const menuItems = [
        {
            title: "Index historique",
            link: '/historical-index'
        },
        {
            title: "Sources",
            link: '/sources'
        },
        {
            title: "Institutions de recherche",
            link: '/research-institutions'
        },
        {
            title: "Glossaire",
            link: '/glossary'
        },
        {
            title: "Bibliographie",
            link: '/bibliography'
        },
    ]


    const handleMenu = (element) => {
        if (element === 'menu') {
            setIsOpenFilters(false)
            setIsOpenMenu(!isOpenMenu)
        } else {
            setIsOpenMenu(false)
            setIsOpenFilters(!isOpenFilters)
        }
    }


    useEffect(() => {
        setCurrentPage(pathname)
    })

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
                    <MenuItems items={menuItems} page={currentPage}/>
                </ul>
            </nav>

            {/* MOBILE: NAVBAR - FILTERS */}
            <div className='lg:hidden fixed bottom-0 left-0 right-0 z-[100] h-[70px] w-full bg-red-200 flex border-t border-black' style={{ backgroundImage: `url(${bgPaper})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                <div 
                    onClick={() => handleMenu('menu')}
                    className={classNames("flex items-center justify-center", {
                        "border-r border-black w-1/2": filters,
                        "w-full": !filters
                    })} 
                >
                    <span className='uppercase text-[24px] cursor-pointer'>Menu</span>
                </div>

                {filters &&                
                    <div className="w-1/2 flex items-center justify-center" onClick={() => handleMenu('filter')}>
                        <span className='uppercase text-[24px] cursor-pointer'>Filtres</span>
                    </div>
                }
            </div>

            <div className={classNames('lg:hidden h-[360px] fixed bottom-[70px] left-0 right-0 bg-paper border-black border-t transition-all duration-[750ms]', {
                "translate-y-[100%]": !isOpenMenu
            })}>
                <ul className='text-[38px] uppercase flex flex-col justify-center items-center h-full gap-4'>
                    <MenuItems items={menuItems} page={currentPage}/>
                </ul>
            </div>

            {filters &&
                <div className={classNames('sm:hidden py-[50px] fixed bottom-[70px] left-0 right-0 bg-paper border-black border-t transition-all duration-[750ms] flex justify-center items-center', {
                    "translate-y-[100%]": !isOpenFilters
                })}>
                    <div className='flex flex-col shrink-0'>
                        <FilterItems items={filters}/>    
                    </div>
                </div>
            }
        </>
    )
}



const MenuItems = ({items, page}) => {
    return (
        items.map((item, index) => {
            return (
                <li key={index}>
                    <Link key={index} to={item.link} className={classNames('navbar-title', {'active' : page === `${item.link}`})}>{item.title}</Link>
                </li>
            )
        })
    )
}


const FilterItems = ({items}) => {
    return (
        items.map((item, index) => {
            return <ButtonFilter key={index} category={item.category} number={item.number}/>
        })
    )
}