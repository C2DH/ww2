import { useEffect, useState } from 'react'
import bgPaper from '../../assets/images/common/bg-paper.png'
import CardLink from '../Cards/CardLink'
import HeaderHistorianWorkshop from '../HeaderHistorianWorkshop/HeaderHistorianWorkshop'
import LayoutHistorianWorkshop from '../LayoutHistorianWorkshop/LayoutHistorianWorkshop'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSharedState } from '../../contexts/SharedStateProvider'
import { useMenuHistorianContext } from '../../contexts/MenuHistorianProvider'
import { fetchData } from '../../lib/utils'

export default function ResearchInstitutions() {

    const [sharedState, setSharedState] = useSharedState()
    const { t } = useTranslation()
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const { pathname } = useLocation()
    const menuItems = useMenuHistorianContext()
    const [results, setResults] = useState([])


    const fetchInstitutions = async () => {
        try {
            const params = { data__type : "institution" }
            const data = await fetchData('document', params)
            console.log(data)
            return data ? data.results : []
        } catch (error) {
            console.error('Erreur lors de la récupération des documents :', error)
            return []
        }
    }

    const getInstitutions = async () => {
        const institutions = await fetchInstitutions()
        setResults(institutions)
    }

    useEffect(() => {
        getInstitutions()
    }, [])


    useEffect(() => {
        setSharedState({ ...sharedState, showClouds: false, showCurtains: false })
    }, [])

    return (
        
        <LayoutHistorianWorkshop pageTitle={ t('menuItems.research_institutions')}>

            <HeaderHistorianWorkshop items={ menuItems } />
            
            {/** Content */}
            <div className="lg:overflow-scroll">
                <div className="grid grid-cols-12 gap-[20px] pt-[40px] pb-[100px] lg:pb-[40px]">
                    { results?.map((item, index) => {
                        return (
                            <CardLink key={index} data={ item }/>
                        )
                    })}
                </div>
            </div>

            {/* MOBILE: BTN MENU */}
            <div className='lg:hidden fixed bottom-0 left-0 right-0 z-[100] h-[70px] w-full flex border-t border-black' style={{ backgroundImage: `url(${bgPaper})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                <div 
                    onClick={() => setIsOpenMenu(!isOpenMenu)}
                    className="flex items-center justify-center w-full"
                >
                    <span className='uppercase text-[24px] cursor-pointer'>Menu</span>
                </div>
            </div>

            {/* MOBILE: MENU */}
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



