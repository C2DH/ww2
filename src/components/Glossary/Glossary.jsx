
import { useCallback, useEffect, useRef, useState } from "react";
import CardText from "../Cards/CardText";
import Dropdown from "../Dropdown/Dropdown";
import HeaderHistorianWorkshop from "../HeaderHistorianWorkshop/HeaderHistorianWorkshop";
import LayoutHistorianWorkshop from "../LayoutHistorianWorkshop/LayoutHistorianWorkshop";
import bgPaper from '../../assets/images/common/bg-paper.png'
import classNames from 'classnames'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { useSharedState } from "../../contexts/SharedStateProvider";
import axios from "axios";
import { useLanguageContext } from "../../contexts/LanguageProvider";
import Error from "../Error/Error";
import { useMenuHistorianContext } from "../../contexts/MenuHistorianProvider";
import { fetchData, fetchFacets } from "../../lib/utils";

export default function Glossary() {
    const [searchParams] = useSearchParams();
    const filtersParams = JSON.parse(decodeURIComponent(searchParams.get('filters') || '{}'))
    const [sharedState, setSharedState] = useSharedState()
    const { t } = useTranslation()
    const { language } = useLanguageContext()
    const [filter, setFilter] = useState('')
    const [filteredTerms, setFilteredTerms] = useState([])
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isOpenFilters, setIsOpenFilters] = useState(false)
    const { pathname } = useLocation()
    const menuItems = useMenuHistorianContext()
    const [terms, setTerms] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const contentRef = useRef(null);
    const [filters, setFilters] = useState({ note: filtersParams.stories__slug ? { slug: filtersParams.stories__slug } : false })
    const [notes, setNotes] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const navigate = useNavigate()

    const fetchTerms = async (offset = 0, limit = 24) => {
        try {
            let params = {
                type__in: ['glossary'],
            };
            if (filters.note) params = { ...params, stories__slug: filters.note.slug };

            const response = await fetchData('document', params, limit, offset)
            await getNotes();
            if (response.results.length < limit) {
                setHasMore(false);
            }
            return response.results
        } catch (error) {
            setHasMore(false)
            setError(error)
            return []
        }
    }

    const fetchNotes = async () => {
        try {
            let params = { type__in: ['glossary'] };
            const notesIdTab = []
            const allNotes = await fetchFacets('document', 'stories', params)

            allNotes.facets.stories.map(note => {
                notesIdTab.push(note.stories)
            })
            const data = await fetchData('story', { id__in: notesIdTab }, 100)
            return data ? data.results : []
        } catch (error) {
            console.error('Erreur lors de la récupération des notes :', error)
            return []
        }
    }

    const getNotes = async () => {
        const notes = await fetchNotes()
        setNotes(notes)
    }


    const loadMoreTerms = async (force = false) => {
        if (!hasMore && !force) return
        setLoading(true)
        const newTerms = await fetchTerms(offset)
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
                    setOffset((prevOffset) => prevOffset + 24)
                }
            })
    
            if (node) {
                observer.current.observe(node);
            } 
        },[loading, hasMore]
    )

    useEffect(() => {
        if (offset > 0) {
            loadMoreTerms()
        }
    }, [offset])

    useEffect(() => {
        setHasMore(true);
        setTerms([]);
        setOffset(0);
        loadMoreTerms(true);
    }, [filters])

    const handleMenu = (element) => {
        if (element === 'menu') {
            setIsOpenFilters(false)
            setIsOpenMenu(!isOpenMenu)
        } else {
            setIsOpenMenu(false)
            setIsOpenFilters(!isOpenFilters)
            if (contentRef.current) {
                contentRef.current.scrollTop = 0
                window.scrollTo(0, 0)
            }
        }
    }

    const handleChangeNote = (note) => {
        if (note) {
            setFilters(prevFilters => ({ ...prevFilters, note: note }))
        } else {
            setFilters(prevFilters => ({ ...prevFilters, note: false }))
        }
    }

    useEffect(() => {
        setSharedState({ ...sharedState, showClouds: false, showCurtains: false })
    }, [])


    const resetFilters = async () => {
        navigate('/glossary', { replace: true })
        setFilters({ note: false })
        setTerms([])
        setOffset(0)
        setLoading(true)
    
        try {
            const updatedNotes = await fetchNotes()
            setNotes(updatedNotes)
            const updatedTerms = await fetchTerms(0)
            setTerms(updatedTerms)
            setHasMore(true)
        } catch (error) {
            console.error('Erreur lors de la réinitialisation des données :', error)
            setError(error)
        } finally {
            setLoading(false)
        }
    };

    if (error) {
        return <Error />
    } else {
        return (
            <LayoutHistorianWorkshop pageTitle={ t('menuItems.glossary')}>
    
                <HeaderHistorianWorkshop items={ menuItems }/>

                {filtersParams.stories__slug &&
                    <div className="lg:hidden cursor-pointer text-[20px] underline mt-[20px]" onClick={resetFilters}>{ t('reset') }</div>
                }
    
                {/** FILTERS */}
                <div className="hidden lg:block mt-[40px]">
                    <div className="border-b border-black pb-[40px] w-full flex flex-wrap gap-y-[20px]">
                        <div className="w-[40%] relative h-[40px] me-5">
                            <Dropdown items={notes} text={'Recherche par Note(s) et capsule(s)'} theme={'notes'} onChange={handleChangeNote}/>
                        </div>
    
                        {filtersParams.stories__slug &&
                            <div className="cursor-pointer text-[20px] underline" onClick={resetFilters}>{ t('reset') }</div>
                        }
                    </div>
                </div>
                
                {/** CONTENT */}
                <div className="lg:overflow-scroll" ref={contentRef}>
                    <div className="grid grid-cols-12 gap-y-[30px] pt-[40px] pb-[100px] lg:pb-[40px]">
                        { terms.map((term, index) => 
                            <CardText key={term.id} ref={filteredTerms.length === index + 1 ? lastTermRef : null} title={term.data.title[language]} text={term.data.description[language]} />
                        )}
                    </div>
                </div>
    
                {/* MOBILE: BTN MENU / BTN FILTERS */}
                <div className='lg:hidden fixed bottom-0 left-0 right-0 z-[100] h-[70px] w-full flex border-t border-black' style={{ backgroundImage: `url(${bgPaper})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                    <div onClick={() => handleMenu('menu')}
                        className={classNames("flex items-center justify-center", {
                            "border-r border-black w-1/2": filters,
                            "w-full": !filters
                        })}
                    >
                        <span className='uppercase text-[24px] cursor-pointer'>Menu</span>
                    </div>

            
                    <div className="w-1/2 flex items-center justify-center" onClick={() => handleMenu('filter')}>
                        <span className='uppercase text-[24px] cursor-pointer'>Filtres</span>
                    </div>
                </div>
    
                {/* MOBILE: MENU - FILTERS */}
                <div className={classNames('lg:hidden h-[360px] fixed bottom-[70px] left-0 right-0 bg-paper border-black border-t transition-all duration-[750ms]', {
                    "translate-y-[100%]": !isOpenMenu
                })}>
                    <ul className='text-[38px] uppercase flex flex-col justify-center items-center h-full gap-4'>
                        {menuItems.map((item, index) =>
                            <li key={index}>
                                <Link key={index} to={item.link} className={classNames('navbar-title', { 'active': pathname === `${item.link}` })}>{item.title}</Link>
                            </li>
                        )}
                    </ul>
                </div>

                {notes &&
                    <div className={classNames('lg:hidden py-[50px] fixed bottom-[70px] left-0 right-0 bg-paper border-black border-t transition-all duration-[750ms] flex justify-center items-center', {
                        "translate-y-[100%]": !isOpenFilters
                    })}>
                       
                        <div className="w-[40%] relative h-[200px] me-5">
                            <Dropdown items={notes} text={'recherche'} theme={'notes'} onChange={handleChangeNote}/>
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


