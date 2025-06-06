
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
import { useLanguageContext } from "../../contexts/LanguageProvider";
import Error from "../Error/Error";
import { useMenuHistorianContext } from "../../contexts/MenuHistorianProvider";
import { fetchData, fetchFacets } from "../../lib/utils";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function Glossary() {
    const [searchParams] = useSearchParams();
    const filtersParams = JSON.parse(decodeURIComponent(searchParams.get('filters') || '{}'))
    const [sharedState, setSharedState] = useSharedState()
    const { t } = useTranslation()
    const { language } = useLanguageContext()
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
    const [filterTitle, setFilterTitle] = useState(null)


    const getTitleNote = async () => {
        if (filtersParams.stories__slug) {
            const data = await fetchData(`story/${filtersParams.stories__slug}`)
            if (data?.data?.title[language]) {
                setFilterTitle(data.data.title[language])
            }
        }
    }

    useEffect(() => {
        getTitleNote()
    }, [])

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
            if (loading || !hasMore) return;
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
        setFilters({ note: false })
        setLoading(true)
        setFilterTitle(null)
        navigate('/glossary')
    }
    

    if (error) {
        return <Error />
    } else {
        return (
            <>
                <LayoutHistorianWorkshop pageTitle={ t('menuItems.glossary')}>
                    <HeaderHistorianWorkshop items={ menuItems }/>

                    {/** RESET */}
                    {filtersParams.stories__slug &&
                        <div className="lg:hidden cursor-pointer text-[20px] underline mt-[20px]" onClick={resetFilters}>{ t('reset') }</div>
                    }
        
                    {/** FILTERS */}
                    <div className="hidden lg:block mt-[40px]">
                        <div className="border-b border-black pb-[40px] w-full flex flex-wrap gap-y-[20px]">
                            <div className="w-[40%] relative h-[40px] me-5">
                                {filterTitle &&
                                    <div className='py-[5px] px-[10px] border border-black cursor-pointer w-full rounded-[4px] bg-[#EFEFED] transition-all duration-[750ms]'>
                                        <div className='relative w-fit'>
                                            <span className='uppercase text-[24px] mr-5'>{filterTitle}</span>
                                            <XCircleIcon style={{ width: '15px' }} onClick={(e) => { e.stopPropagation(); resetFilters(); }} className="absolute top-0 right-0 hover:text-red-500" />
                                        </div>
                                    </div>
                                }

                                {!filterTitle && 
                                    <Dropdown items={notes} text={'Recherche par Note(s) et capsule(s)'} theme={'notes'} onChange={handleChangeNote}/>
                                }
                            </div>
                        </div>
                    </div>
                    
                    {/** CONTENT */}
                    <div className="lg:overflow-scroll" ref={contentRef}>
                        <div className="grid grid-cols-12 gap-y-[30px] pt-[40px] pb-[100px] lg:pb-[40px]">
                            { terms.map((term, index) => 
                                <CardText key={term.id}  myRef={terms.length - 6 === index + 1 ? lastTermRef : null} title={term.data.title[language]} text={term.data.description[language]} />
                            )}
                        </div>
                    </div>
                </LayoutHistorianWorkshop>

                {/* MOBILE: BTN MENU / BTN FILTERS */}
                <div className='lg:hidden fixed bottom-0 left-0 right-0 z-[101] h-[70px] w-full flex border-t border-black' style={{ backgroundImage: `url(${bgPaper})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
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

                {/* MENU */}
                <div className={classNames('lg:hidden h-[360px] fixed bottom-[70px] left-0 right-0 bg-paper border-black border-t transition-all duration-[750ms] z-[100]', {
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

                {/* FILTERS */}
                {notes &&
                    <div className={classNames('lg:hidden py-[50px] fixed bottom-[70px] left-0 right-0 bg-paper border-black border-t transition-all duration-[750ms] flex justify-center items-center z-[100]', {
                        "translate-y-[100%]": !isOpenFilters
                    })}>
                        
                        <div className="w-[90%] sm:w-[80%] relative h-[200px] xl:me-5">
                            <Dropdown items={notes} text={'recherche'} theme={'notes'} onChange={handleChangeNote}/>
                        </div>
                    </div>
                }
            </>
        )
    }
}