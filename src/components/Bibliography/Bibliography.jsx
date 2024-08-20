import { Link, useLocation } from "react-router-dom"
import CardLink from "../Cards/CardLink"
import Dropdown from "../Dropdown/Dropdown"
import HeaderHistorianWorkshop from "../HeaderHistorianWorkshop/HeaderHistorianWorkshop"
import LayoutHistorianWorkshop from "../LayoutHistorianWorkshop/LayoutHistorianWorkshop"
import { useState } from "react"
import bgPaper from '../../assets/images/common/bg-paper.png'
import classNames from "classnames"
import { useTranslation } from "react-i18next"


export default function Bibliography() {

    const { t } = useTranslation()
    const authors = ['a', 'b', 'c', 'd', 'e'] 
    const notes = ['a', 'b', 'c', 'd', 'e'] 
    const { pathname } = useLocation()
    const [isOpenMenu, setIsOpenMenu] = useState(false)
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


    return (
        <LayoutHistorianWorkshop  pageTitle={ t('menuItems.glossary')}>
        
            <HeaderHistorianWorkshop items={ menuItems } />

            {/** Filters */}
            <div className="hidden lg:block mt-[30px] xl:mt-[40px]">
                <div className="grid grid-cols-12 gap-5 border-b border-black pb-[80px]">
                    <div className="col-span-5 relative">
                        <Dropdown items={authors} text={'Auteur'} />
                    </div>
                    <div className="col-span-5 relative">
                        <Dropdown items={notes} text={'Notes'} />
                    </div>
                </div>
            </div>

            {/** Content */}
            <div className="lg:overflow-scroll">
                <div className="grid grid-cols-12 gap-[20px] pt-[40px] pb-[100px] lg:pb-[40px]">
                    {[...Array(50)].map((item, index) => {
                        return (
                            <CardLink key={index} link={ 'https://www.zotero.org/' }/>
                        )
                    })}
                </div>
            </div>


            {/* MOBILE: BTN MENU */}
            <div className='lg:hidden fixed bottom-0 left-0 right-0 z-[100] h-[70px] w-full bg-red-200 flex border-t border-black' style={{ backgroundImage: `url(${bgPaper})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                <div 
                    onClick={() => setIsOpenMenu(!isOpenMenu)}
                    className="flex items-center justify-center w-full"
                >
                    <span className='uppercase text-[24px] cursor-pointer'>Menu</span>
                </div>
            </div>

            {/* MOBILE: MENU - FILTERS */}
            <div className={classNames('lg:hidden h-[360px] fixed bottom-[70px] left-0 right-0 bg-paper border-black border-t transition-all duration-[750ms]', {
                "translate-y-[100%]": !isOpenMenu
            })}>
                <ul className='text-[38px] uppercase flex flex-col justify-center items-center h-full gap-4'>
                    {menuItems.map((item, index) => 
                        <li key={index}>
                            <Link key={index} to={item.link} className={classNames('navbar-title', {'active' : pathname === `${item.link}`})}>{item.title}</Link>
                        </li>
                   )}
                </ul>
            </div>

        </LayoutHistorianWorkshop>
    )
}