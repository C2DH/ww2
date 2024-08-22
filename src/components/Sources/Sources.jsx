import bgPaper from '../../assets/images/common/bg-paper.png'
import HeaderHistorianWorkshop from "../HeaderHistorianWorkshop/HeaderHistorianWorkshop";
import CardImageText from '../Cards/CardImageText';
import Dropdown from '../Dropdown/Dropdown';
import ButtonFilter from '../ButtonFilter/ButtonFilter';
import LayoutHistorianWorkshop from '../LayoutHistorianWorkshop/LayoutHistorianWorkshop';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSharedState } from '../../contexts/SharedStateProvider';


export default function Sources() {
    const [sharedState, setSharedState] = useSharedState()
    const { t } = useTranslation()
    const tags = ['Dolor', 'Sit', 'Amet', 'Test', 'Abeas', 'Corpus']
    const types = [
        {
            category: "Audio",
            number: 17
        },
        {
            category: "Video",
            number: 5
        },
        {
            category: "Photo",
            number: 11
        },
        {
            category: "Livre",
            number: 4
        },
        {
            category: "Document manuscrit",
            number: 19
        }
    ]
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
    const { pathname } = useLocation()
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isOpenFilters, setIsOpenFilters] = useState(false)
    const [ filters, setFilters ] = useState({types: [], tags: []})
    
    useEffect(() => {
        setSharedState({ ...sharedState, showClouds: false, showCurtains: false })
    }, [])

    const handleMenu = (element) => {
        if (element === 'menu') {
            setIsOpenFilters(false)
            setIsOpenMenu(!isOpenMenu)
        } else {
            setIsOpenMenu(false)
            setIsOpenFilters(!isOpenFilters)
        }
    }

    const generateContent = () => {
        const arrayContent = []
        for(let i = 0; i < 25; i++) {
            arrayContent.push({
                img: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1839&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                tag: tags[Math.floor(Math.random() * tags.length)],
                title: 'Lorem ipsum dolor sit amet',
                text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.',
                type: types[Math.floor(Math.random() * types.length)].category
            })
        }
        return arrayContent
    }

    const items = generateContent()

    const filteredItems = items.filter(item => {
        if (filters.types.length === 0) {
            return items
        } else {
            return filters.types.includes(item.type)
        }
    })

    const clickButton = (type) => {
        if (!filters.types.includes(type)) {
            setFilters(prevFilters => ({
                ...prevFilters,
                types: [...prevFilters.types, type]
            }));
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                types: prevFilters.types.filter(t => t !== type)
            }))
        }
    }

    return (
        <LayoutHistorianWorkshop pageTitle={ t('menuItems.sources')}>

            <HeaderHistorianWorkshop items={ menuItems } />

            {/** Filters */}
            <div className="hidden lg:block mt-[30px] 2xl:mt-[40px]">
                <div className="grid grid-cols-12 gap-5 border-b border-black pb-[30px] 2xl:pb-[40px]">
                    <div className="col-span-5 relative">
                        <Dropdown items={tags} text={'Recherche par #tag'}/>
                    </div>

                    <div className="col-span-7">
                        {types?.map((type, index) => {
                            return (
                                <ButtonFilter key={index} title={type.category} number={type.number} types={filters.types} handleClick={() => clickButton(type.category)} />
                            )
                        })} 
                    </div>
                </div>
            </div>
                
            {/** Content */}   
            <div className='lg:overflow-scroll'>
                <div className="grid grid-cols-12 gap-[20px] pt-[40px] pb-[100px] lg:pb-[40px]">
                    { filteredItems.map((item, index) => {
                        return (
                            <CardImageText 
                                key={index}
                                img={item.img} 
                                tag={item.tag}
                                title={item.title}
                                text={item.text}
                                // type={item.type}
                            />
                        )
                    })}
                </div>
            </div>

               {/* MOBILE: BTN MENU / BTN FILTERS */}
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

            {types &&
                <div className={classNames('lg:hidden py-[50px] fixed bottom-[70px] left-0 right-0 bg-paper border-black border-t transition-all duration-[750ms] flex justify-center items-center', {
                    "translate-y-[100%]": !isOpenFilters
                })}>
                    <div className='flex flex-col shrink-0'>
                        { types.map((item, index) => 
                            <ButtonFilter 
                                key={index} 
                                title={item.category} 
                                number={item.number} 
                                types={filters.types}
                                handleClick={() => clickButton(item.category)}
                            />
                        )}
                    </div>
                </div>
            }

        </LayoutHistorianWorkshop>       
    )
}