import bgPaper from '../../assets/images/common/bg-paper.png'
import HeaderHistorianWorkshop from "../HeaderHistorianWorkshop/HeaderHistorianWorkshop"
import CardImageText from '../Cards/CardImageText'
import Dropdown from '../Dropdown/Dropdown'
import ButtonFilter from '../ButtonFilter/ButtonFilter'
import LayoutHistorianWorkshop from '../LayoutHistorianWorkshop/LayoutHistorianWorkshop'
import { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSharedState } from '../../contexts/SharedStateProvider'
import axios from 'axios'
import { useLanguageContext } from '../../contexts/LanguageProvider'
import { AnimatePresence, motion } from 'framer-motion'
import Source from '../Source/Source'
import { useMediaQuery } from 'react-responsive'
import { useMenuHistorianContext } from '../../contexts/MenuHistorianProvider'
import { fetchData, fetchFacets } from '../../lib/utils'

const computeTags = (response) => {
    return [...(new Set(response.reduce((carry, item) => {
        if (item.data__zotero__tags?.length > 0) {
            return [...carry, ...(item.data__zotero__tags.map(tag => tag.tag))]
        }
        return carry;
    }, [])))];
}

export default function Sources() {
    const [sharedState, setSharedState] = useSharedState()
    const { t } = useTranslation()
    const { language } = useLanguageContext()
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    const [sources, setSources] = useState([])
    const [types, setTypes] = useState([])
    const [tags, setTags] = useState([])
    const [notes, setNotes] = useState([])
    const [typesBase, setTypesBase] = useState([])
    const { pathname } = useLocation()
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isOpenFilters, setIsOpenFilters] = useState(false)
    const [filters, setFilters] = useState({types: [], note: false})
    const [filteredSources, setFilteredSources] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [dataPopup, setDataPopup] = useState({ open: false, data: null })
    const isSmall = useMediaQuery({ query: '(max-width: 1024px)'})
    const menuItems = useMenuHistorianContext()

    //const tags = ['Dolor', 'Sit', 'Amet', 'Test', 'Abeas', 'Corpus']  
    
    const fetchSources = async (offset = 0, limit = 24) => {
        try {
            /* const response = await axios.get(`api/document/?filters=%7B%22type__in%22%3A%5B%22audio%22%2C%22video%22%2C%22picture%22%2C%22book%22%2C%22manuscript%22%5D%7D&facets=type&limit=${limit}&offset=${offset}`) */
            let params = {type__in: ['audio', 'video', 'picture', 'book', 'manuscript']};
            if (filters.types.length > 0) params = {type__in: filters.types}
            if (filters.note) params = { ...params, stories__slug: filters.note.slug };

            const response = await fetchData('/document', params, limit, offset, 'type')

            await getNotes();
            await getTypes();

            if (response.results.length < limit) {
                setHasMore(false);
            }
            return response.results
        } catch (error) {
            setHasMore(false)
            return []
        }
    }

    const fetchNotes = async () => {
        try {
            let params = { type__in: ['audio', 'video', 'picture', 'book', 'manuscript'] };
            if (filters.types.length > 0) params = {type__in: filters.types}

            const notesIdTab = []
            const allNotes = await fetchFacets('document', 'stories', params)

            allNotes.facets.stories.map(note => {
                notesIdTab.push(note.stories)
            })

            const data = await fetchData('story', { id__in: notesIdTab })
            return data ? data.results : []

        } catch (error) {
            console.error('Erreur lors de la récupération des notes :', error)
            return []
        }
    }

    const fetchTypes = async () => {
        try {
            let params = { type__in: ['audio', 'video', 'picture', 'book', 'manuscript'] };
            if (filters.note) params = { ...params, stories__slug: filters.note.slug };

            const allTypes = await fetchFacets('document', 'type', params)
            return allTypes ? allTypes.facets.type : []

        } catch (error) {
            console.error('Erreur lors de la récupération des notes :', error)
            return []
        }
    }

    const getNotes = async () => {
        const notes = await fetchNotes()
        setNotes(notes)
    }

    const getTypes = async () => {
        const types = await fetchTypes()
        if(typesBase.length === 0) {
            setTypesBase(types)
        }
        setTypes(types)
    }

    const loadMoreSources = async (force = false) => {
        if (!hasMore && !force) return
        setLoading(true)
        const newSources = await fetchSources(offset)
        setSources((prevSources) => [...prevSources, ...newSources])
        setLoading(false)
    };


    const observer = useRef()

    const lastSourceRef = useCallback(
        (node) => {
            if (loading || !hasMore) return
            
            if (observer.current) {
                observer.current.disconnect()
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
        loadMoreSources()
    }, [offset])

    useEffect(() => {
        setHasMore(true);
        setSources([]);
        setOffset(0);
        loadMoreSources(true);
    }, [filters])
    
    /* useEffect(() => {
        if (filters.types.length > 0) {
            const filteredSources = sources.filter(source => filters.types.includes(source.type))
            setFilteredSources(filteredSources)
        } else {
            setFilteredSources(sources)
        }
    }, [sources, filters]) */    

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

    const handleSourcePopup = (source) => {

        console.log('dataPopup',dataPopup)

        if (!dataPopup.open) {
            setDataPopup(prevSource => ({
                ...prevSource, 
                open: true, 
                data: source
            }))
        } else {
            setDataPopup(prevSource => ({
                ...prevSource, 
                open: false, 
                data: null
            }))
        }
    }


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

    const handleChangeNote = (note) => {
        if (note) {
            setFilters(prevFilters => ({ ...prevFilters, note: note }))
        } else {
            setFilters(prevFilters => ({ ...prevFilters, note: false }))
        }
    }

    return (

        <>
            <LayoutHistorianWorkshop pageTitle={ t('menuItems.sources')}>
                <HeaderHistorianWorkshop items={ menuItems } />

                {/** FILTERS */}
                <div className="hidden lg:block mt-[30px] 2xl:mt-[40px]">
                    <div className="grid grid-cols-12 gap-5 border-b border-black pb-[30px] 2xl:pb-[40px]">
                        <div className="col-span-5 relative">
                            <Dropdown items={notes} theme={'notes'} text={'Recherche par #tag'} onChange={handleChangeNote} />
                        </div>

                        <div className="col-span-7">
                            {typesBase?.map((type, index) => 
                                <ButtonFilter key={index} title={type.type} number={types.find(item => item.type == type.type)?.count ?? 0} types={filters.types} handleClick={() => clickButton(type.type)} /> 
                            )}
                        </div>
                    </div>
                </div>
                    
                {/** CONTENT */}   
                {/* TODO: Manque les photos, modèles 3D et audio */}
                <div className='lg:overflow-scroll'>
                    <div className="grid grid-cols-12 gap-[20px] pt-[40px] pb-[100px] lg:pb-[40px]">
                        { sources.map((source, index) => {
                            if (source.type === 'video' || source.type === 'picture') { 
                                return (
                                    <CardImageText 
                                        myRef={sources.length === index + 1 ? lastSourceRef : null}
                                        key={index}
                                        title={source.data.title[language]}
                                        data={source}
                                        onClick={() => {
                                            setDataPopup({ open: true, data: source });
                                        }}
                                    />
                                )
                            } else if (source.type === "book" || source.type === "manuscript") {
                                return (
                                    <CardImageText 
                                        myRef={sources.length === index + 1  ? lastSourceRef : null}
                                        key={index}
                                        title={source.data.zotero.title}
                                        data={source}
                                        onClick={() => {
                                            setDataPopup({ open: true, data: source });
                                        }}
                                    />
                                )
                            }
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
                            {types?.map((type, index) => 
                                <ButtonFilter key={index} title={type.type} number={type.count} types={filters.types} handleClick={() => clickButton(type.category)} /> 
                            )}
                        </div>
                    </div>
                }

            </LayoutHistorianWorkshop> 

            <AnimatePresence>
                { dataPopup.open && 
                    <motion.div 
                        className='absolute w-full top-0 h-full lg:h-auto z-[9999]'
                        initial={{ top: '100%' }}
                        animate={{ top: isSmall ? 0 : '120px'}}
                        exit={{ top: '100%'}}
                        transition={{ duration: 0.8, ease: 'easeInOut'}}
                    >
                        <Source data={ dataPopup.data } handleSourcePopup={ handleSourcePopup }/>
                    </motion.div>
                }
            </AnimatePresence>
        </>          
    )
}