    import { useCallback, useEffect, useRef, useState } from "react"
    import { Link, useLocation } from "react-router-dom"
    import Error from '../Error/Error'
    import Dropdown from "../Dropdown/Dropdown"
    import HeaderHistorianWorkshop from "../HeaderHistorianWorkshop/HeaderHistorianWorkshop"
    import LayoutHistorianWorkshop from "../LayoutHistorianWorkshop/LayoutHistorianWorkshop"
    import bgPaper from '../../assets/images/common/bg-paper.png'
    import classNames from "classnames"
    import { useTranslation } from "react-i18next"
    import { useSharedState } from "../../contexts/SharedStateProvider"
    import { Cite } from '@citation-js/core'
    import '@citation-js/plugin-csl'
    import { truncateText, cleanText, fetchData, fetchFacets } from '../../lib/utils'
    import { useMenuHistorianContext } from "../../contexts/MenuHistorianProvider"



    export default function Bibliography() {

        const { t } = useTranslation()
        const [sharedState, setSharedState] = useSharedState()
        const { pathname } = useLocation()
        const [isOpenMenu, setIsOpenMenu] = useState(false)
        const [documents, setDocuments] = useState([])
        const [offset, setOffset] = useState(0)
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const [authors, setAuthors] = useState([])
        const [notes, setNotes] = useState([])
        const [filters, setFilters] = useState()
        const menuItems = useMenuHistorianContext()

        const fetchDocuments = async (offset, limit) => {

            console.log('filters',filters)
            
            // https://ww2.lu/api/document/?facets=data__authors&limit=1&filters={"data__contains":{"authors":["Sonja Kmec"]}}
            // https://ww2.lu/api/document/?facets=data__authors&filters={"data__contains":{"authors":[1922, Robert Lewis Koehl]}}
  
            try {
                const data = await fetchData(
                    'document',
                    { type__in: ['reference', 'book', 'manuscript'] },
                    limit
                )
                return data ? data.results : []
            } catch (error) {
                console.error('Erreur lors de la récupération des documents :', error)
                return []
            }
        }

        const fetchNotes = async () => {
            try {
                const data = await fetchFacets('document', 'stories')
                return data ? data.facets : []
            } catch (error) {
                console.error('Erreur lors de la récupération des documents :', error)
                return []
            }
        }

        const fetchNotesTitle = async (notesIdTab) => {
            try {
                const data = await fetchData('story', {
                    id__in: notesIdTab
                })
                return data.results
            } catch (error) {
                console.error('Erreur lors de la récupération des documents :', error)
                return []
            }
        }

        const getNotes = async () => {
            const fetchedNotesId = await fetchNotes()
            const allNotes = []
        
            fetchedNotesId.stories.forEach(note => {
                if (note.stories) {
                    allNotes.push(note.stories)
                }
            })
        
            const relatedNotes = await fetchNotesTitle(allNotes)
            setNotes(relatedNotes)
        }
        
        const fetchAuthors = async () => {
            try {
                const fetchedAuthors = await fetchFacets('document', 'data__authors')
                return fetchedAuthors ? fetchedAuthors.facets.data__authors : []
            } catch (error) {
                console.error('Erreur lors de la récupération des auteurs :', error)
                return []
            }   
        }

        const getAuthors = async () => {
            const authors = await fetchAuthors()
            const allAuthors = []

            authors.forEach(item => { 
                if (item.data__authors) {
                    item.data__authors.forEach(author => {
                        allAuthors.push(author)
                    })
                }
            })
            setAuthors([...(new Set(allAuthors))].sort((a, b) => a.localeCompare(b)))
        }


    useEffect(() => {
        getNotes()
        getAuthors()
    }, [])

    
    const loadMoreDocuments = async () => {
        setLoading(true)
        const newDocuments = await fetchDocuments(offset, 10)
        setDocuments((prevDocuments) => [...prevDocuments, ...newDocuments])
        setLoading(false)
    }

    const handleDropdownChange = (item) => {
        setFilters(item)
        console.log('item click',item)
      };

    const observer = useRef()

    const lastBookRef = useCallback(
        (node) => {
            if (loading) return;
            
            if (observer.current) {
                observer.current.disconnect()
            } 
    
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setOffset((prevOffset) => prevOffset + 10)
                }
            })
    
            if (node) {
                observer.current.observe(node)
            } 
        },[loading]
    )

    useEffect(() => {
        loadMoreDocuments()
    }, [offset, filters])


    useEffect(() => {
        setSharedState({ ...sharedState, showClouds: false, showCurtains: false })
    }, [])

    if (error) {
        return <Error />
    } else {
        return (
            <LayoutHistorianWorkshop pageTitle={ t('menuItems.bibliography')}>
            
                <HeaderHistorianWorkshop items={ menuItems } />
    
                {/** FILTERS */}
                <div className="hidden lg:block mt-[30px] xl:mt-[40px]">
                    <div className="grid grid-cols-12 gap-5 border-b border-black pb-[80px]">
                        <div className="col-span-5 relative">
                            <Dropdown items={authors} text={t('Auteurs')} theme={'authors'} onChange={handleDropdownChange} />
                        </div>
                        <div className="col-span-5 relative">
                            <Dropdown items={notes} text={t('Notes')} theme={'notes'}/>
                        </div>
                    </div>
                </div>
    
                {/** CONTENT */}
                <div className="lg:overflow-scroll">
                    <div className="grid grid-cols-12 gap-[20px] pt-[40px] pb-[100px] lg:pb-[40px]">
                        { documents.map((item, index) => {
                            const Wrapper = item.data.zotero.url !== "" ? 'a' : 'div';
                            const wrapperProps = item.data.zotero.url !== "" ? { href: item.data.zotero.url, target: "_blank"} : "";
                            return (
                                <Wrapper {...wrapperProps}
                                    className={`block col-span-12 md:col-span-6 border border-black rounded-[5px] p-[10px] h-[240px] lg:h-[140px] hover:bg-[#0e4b5a]/[0.15] transition-all duration-[750ms] boxShadow ${item.data.zotero.url !== "" ? 'cursor-pointer ' : '' }overflow-hidden`}
                                    key={`${item.id}-${index}`}
                                    ref={documents.length === index + 1 ? lastBookRef : null}
                                >
                                    <div className="col-span-6 lg:col-span-4">
                                        <h2 className='text-[24px] lg:text-[30px] pt-[10px] md:pt-0'>{ cleanText(truncateText(item.data.zotero.title, 100)) }</h2>
                                        <hr className="border-black"/>

                                        <DocumentReference doc={item}/>
                                        {/* <p className='text-[20px] pt-[10px] md:text-[24px] pb-0'>{ truncateText('Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. sit amet consectetur adipiscingsit amet consectetur adipiscingsit amet consectetur adipiscingsit amet consectetur adipiscingsit amet consectetur adipiscing Pellentesque sit amet sapien.', 80) }</p> */}
                                    </div>
                                </Wrapper>
                            )
                        } )}
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
}


const DocumentReference = ({ doc = {} }) => {
    const { i18n } = useTranslation()
  
    if (!doc.data?.csljson) {
        console.error('data.csljson field not found in doc:', doc)
        return null
    }
    const cite = new Cite(doc.data.csljson)
  
    let reference = cite.format('bibliography', {
        template: 'apa',
        format: 'html',
        lang: i18n.language,
    })

    if (typeof reference === 'string') {
        reference = cleanText(reference.replace(
            /(https?:\/\/[0-9a-zA-Z-./_:?=%&#;]+)/g,
            (m, link) => `<a href="${link}" target="_blank">${link}</a>`,
        ))
    }

    return (
        <div>
            {reference !== null && <p className="text-[22px] leading-none font-light pt-[10px]" dangerouslySetInnerHTML={{ __html: reference }} />}
        </div>
    )
}
  