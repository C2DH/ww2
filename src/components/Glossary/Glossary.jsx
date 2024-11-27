
import { useCallback, useEffect, useRef, useState } from "react";
import CardText from "../Cards/CardText";
import Dropdown from "../Dropdown/Dropdown";
import HeaderHistorianWorkshop from "../HeaderHistorianWorkshop/HeaderHistorianWorkshop";
import LayoutHistorianWorkshop from "../LayoutHistorianWorkshop/LayoutHistorianWorkshop";
import bgPaper from '../../assets/images/common/bg-paper.png'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { useSharedState } from "../../contexts/SharedStateProvider";
import axios from "axios";
import { useLanguageContext } from "../../contexts/LanguageProvider";
import Error from "../Error/Error";


export default function Glossary() {
    
    const [sharedState, setSharedState] = useSharedState()
    const { t } = useTranslation()
    const { language } = useLanguageContext()
    const [filter, setFilter] = useState('')
    const [filteredTerms, setFilteredTerms] = useState([])
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isOpenFilters, setIsOpenFilters] = useState(false)
    const { pathname } = useLocation()
    
    const [terms, setTerms] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)



    const fetchTerms = async (offset = 0, limit = 10) => {
        try {
            const response = await axios.get(`api/document/?filters=%7B%22type%22%3A%22glossary%22%7D&facets=data__letter&limit=${ limit }&offset=${ offset }`)
            return response.data.results
        } catch (error) {
            setError(error)
            return []
        }
    }


    const loadMoreTerms = async () => {
        setLoading(true)
        const newTerms = await fetchTerms(offset, 10)
        setTerms((prevTerms) => [...prevTerms, ...newTerms])
        setLoading(false)
    };


    const observer = useRef()

    const lastTermRef = useCallback(
        (node) => {
            if (loading) return;
            
            if (observer.current) {
                observer.current.disconnect();
            } 
    
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setOffset((prevOffset) => prevOffset + 10)
                }
            })
    
            if (node) {
                observer.current.observe(node);
            } 
        },[loading]
    )

    useEffect(() => {
        loadMoreTerms()
    }, [offset])

    {/* TODO: Mettre à jour les tags  */}
    const tags = ['Dolor', 'Sit', 'Amet', 'Test', 'Abeas', 'Corpus']

    const menuItems = [
        {
            title: "Sources",
            link: '/sources'
        },
        {
            title: "Glossaire",
            link: '/glossary'
        },
        {
            title: "Institutions de recherche",
            link: '/research-institutions'
        },
        {
            title: "Bibliographie",
            link: '/bibliography'
        },
    ]

    let allFirstLetters = []
    let selectedLetters = []

    terms.map(term => {
        allFirstLetters.push(term.data.title[language].substring(0, 1))
        selectedLetters = [...new Set(allFirstLetters)]
    })

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
        setSharedState({ ...sharedState, showClouds: false, showCurtains: false })
    }, [])

    useEffect(() => {
        if (filter) {
            const selectedTerms = terms.filter(term => term.data.title[language][0] == filter)
            setFilteredTerms(selectedTerms)
        } else {
            setFilteredTerms(terms)
        }
    },[filter, terms])

    if (error) {
        return <Error />
    } else {
        return (
            <LayoutHistorianWorkshop pageTitle={ t('menuItems.glossary')}>
    
                <HeaderHistorianWorkshop items={ menuItems }/>
    
                {/** FILTERS */}
                <div className="hidden lg:block mt-[40px]">
                    <div className="border-b border-black pb-[40px] w-full flex flex-wrap gap-y-[20px]">
                        <div className="w-[40%] relative h-[40px] me-5">
                            <Dropdown items={tags} text={'Liste des tags'} />
                        </div>
    
                        <LetterFilters itemsSelected={selectedLetters} filter={filter} handleClick={(letter) => setFilter(filter !== letter ? letter : '')} />
                    </div>
                </div>
                
                {/** CONTENT */}
                <div className="lg:overflow-scroll">
                    <div className="grid grid-cols-12 gap-y-[30px] pt-[40px] pb-[100px] lg:pb-[40px]">
                        { filteredTerms.map((term, index) => 
                            <CardText key={term.id} ref={filteredTerms.length === index + 1 ? lastTermRef : null} title={term.data.title[language]} text={term.data.description[language]} />
                        )}
                    </div>
                </div>
    
                {/* MOBILE: BTN MENU / BTN FILTERS */}
                <div className='lg:hidden fixed bottom-0 left-0 right-0 z-[100] h-[70px] w-full flex border-t border-black' style={{ backgroundImage: `url(${bgPaper})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                    <div 
                        onClick={() => handleMenu('menu')}
                        className={classNames("flex items-center justify-center", {
                            "border-r border-black w-1/2": allFirstLetters,
                            "w-full": !allFirstLetters
                        })} 
                    >
                        <span className='uppercase text-[24px] cursor-pointer'>Menu</span>
                    </div>
    
                    {allFirstLetters &&                
                        <div className="w-1/2 flex items-center justify-center" onClick={() => handleMenu('filter')}>
                            <span className='uppercase text-[24px] cursor-pointer'>{t('filters')}</span>
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
    
                { allFirstLetters &&
                    <div className={classNames('lg:hidden py-[50px] fixed bottom-[70px] left-0 right-0 bg-paper border-black border-t transition-all duration-[750ms] flex justify-center items-center', {
                        "translate-y-[100%]": !isOpenFilters
                    })}>
                        <div className='flex flex-wrap justify-center gap-2'>
                            <LetterFilters itemsSelected={selectedLetters} filter={filter} handleClick={(letter) => setFilter(filter !== letter ? letter : '')} />
                        </div>
                    </div>
                }
    
            </LayoutHistorianWorkshop>
        )
    }

}



const LetterFilters = ({itemsSelected, filter, handleClick}) => {

    const alphabet = [];
    for (let i = 65; i <= 90; i++) {
        alphabet.push(String.fromCharCode(i));
    }

    return (
        alphabet.map((letter, index) => {
            if (itemsSelected.includes(letter)) {
                return (
                    <div key={index} className={classNames("border border-black px-[22px] py-[7px] h-[40px] lg:me-5 cursor-pointer group hover:bg-black transition-all duration-500", {
                        'bg-black': letter === filter
                    })}
                        onClick={() => { handleClick(letter) }}
                    >
                        <span className={classNames("text-[24px] leading-none group-hover:text-white transition-all duration-500", {
                            "text-white": letter === filter
                        })}>{letter}</span>
                    </div>
                )
            } else {
                return (
                    <div key={index} className="border border-black opacity-20 px-[22px] py-[7px] h-[40px] lg:me-5 pointer-events-none">
                        <span className="text-[24px] leading-none">{letter}</span>
                    </div>
                )
            }
        })
    )
}


