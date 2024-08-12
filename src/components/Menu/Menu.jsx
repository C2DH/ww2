// ASSETS
import './Menu.scss'
import bgBlack from '../../assets/images/common/bg-black.jpg'
import logo from '../../assets/images/common/logo.png'
import logoGouv from '../../assets/images/menu/logo-gouv.svg'
import logoUni from '../../assets/images/menu/logo-uni.svg'
import cloud from '../../assets/images/common/cloud.png'

// CONTEXT
import { useSharedState } from "../../contexts/SharedStateProvider";
import { useMenuContext } from '../../contexts/MenuProvider'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolume } from '@fortawesome/pro-light-svg-icons'


// FRAMER
import { AnimatePresence, motion } from "framer-motion"

// REACT
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from 'react'
import classNames from 'classnames'

// TRANSLATION
import { useTranslation } from 'react-i18next'

export default function Menu() {

    // const [isOpenMenu, setIsOpenMenu] = useState(false)
    // const [isAnimationComplete, setIsAnimationComplete] = useState(false);

    const { i18n, t } = useTranslation();
    
    const [language, setLanguage] = useState('fr_FR')
    const { openMenu, setOpenMenu } = useMenuContext()
    const [sharedState, setSharedState] = useSharedState();
    const [results, setResults] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { pathname } = useLocation()
    const locations = ['/catalogue', '/historian-workshop', '/historical-index', '/research-institutions', '/bibliography', '/glossary','/sources']

    // TRANSLATION
    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e)
        if (localStorage.getItem('i18nextLng')) {
            setLanguage(e)
        }
    }


    // API DATA
    useEffect(() => {
        fetch("https://ww2-lu.netlify.app/api/story/?filters=%7B%22tags__slug%22%3A%22menu%22%7D&order_by=slug&limit=10&h=d159095c9a67b4a002ed8a5c522df27440e74f0f58af01bd93b7d38de7ad7bfa", {
            method: "GET",
            headers: {}
        })
        .then((response) => response.json())
        .then((data) => {
            setResults(data)
            setIsLoading(true)
        })
        .catch((error) => console.log(error))

    }, [isLoading])


    // ANIMATION MENU 
    useEffect(() => {
            if (openMenu) {
                document.body.style.height = '';
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.height = '';
                document.body.style.overflow = '';
            }
            console.log(openMenu)
    }, [openMenu])


    // ANIMATION CURTAINS
    useEffect(() => {
        setSharedState({ ...sharedState, showClouds: false, showCurtains: false });
    }, [])


    return (
        <>
            {isLoading &&            
                <header 
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    transition={{ duration: 1500 }}
                    style={{ background: `url(${bgBlack}) 50% / cover no-repeat`}}
                    className={classNames('transition-all duration-[2000ms] overflow-hidden pb-[50px]', {
                        'max-h-[120vh] h-[100vh]': openMenu,
                        'max-h-[120px] h-[120px]': !openMenu && locations.includes(pathname),
                        'max-h-[140px] h-[140px]': !openMenu && !locations.includes(pathname)
                    })} 
                >

                    {/** HEADER */}
                    <div className="flex justify-between px-[30px] sm:px-[90px] pt-[140px] md:pt-[20px]">
                        <Sound translate={t}/>
                        <MenuLogo isOpenMenu={openMenu} setIsOpenMenu={setOpenMenu} translate={t} />
                        <LanguageSwitcher switchLanguage={handleLanguageChange} lang={language}/>
                    </div>

                    {/** ITEMS */}
                    <div className='flex justify-center mt-[60px] sm:mt-[90px]'>
                        <ul className={classNames('w-2/3 lg:w-1/3 text-center transition-all duration-[750ms]', {
                            'opacity-1': openMenu,
                            'opacity-0': !openMenu 
                        })}>
                        
                        {/* {results.results.map(item => {
                            return (
                                <li>
                                    <MenuItem path={'/'} title={item.data.title.fr_FR} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit."} handleMenuItemClick={() => setIsOpenMenu(false) }/>
                                </li>
                            )
                        })} */}

                            <li>
                                <MenuItem path={'/'} title={"Parcours"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit."} handleMenuItemClick={() => setOpenMenu(false) }/>
                            </li>
                            <li>
                                <MenuItem path={'/catalogue'} title={"Catalogue"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris."} handleMenuItemClick={() => setOpenMenu(false) } />
                            </li>
                            <li>
                                <MenuItem path={'/historian-workshop'} title={"Atelier de l'historien"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris."} handleMenuItemClick={() => setOpenMenu(false) }/>
                            </li>
                            <li>
                                <MenuItem path={'/spacetime-map'} title={"Carte spatio-temporelle"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit."} handleMenuItemClick={() => setOpenMenu(false) }/>
                            </li>
                            <li>
                                <MenuItem path={'/credits'} title={"Générique"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit."} handleMenuItemClick={() => setOpenMenu(false) }/>
                            </li>
                        </ul>
                    </div>


                    {/** PARTNERS LOGOS */}
                    <div className='flex justify-center items-center mt-[30px] mx-[30px]'>
                        <div className=''>
                            <Link to='https://www.c2dh.uni.lu/' target='_blank'>
                                <img src={ logoUni } alt="Logo Université" />
                            </Link>
                        </div>
                        <div>
                            <Link to='https://mcult.gouvernement.lu/fr.html' target='_blank'>
                                <img src={ logoGouv } alt="Logo Université" />
                            </Link>
                        </div>
                    </div>


                    {/** ITEMS SUITE */}
                    <div className='flex justify-center items-center mt-[20px]'>
                        <ul className='flex text-[20px]'>
                            <li className='tiret'><Link to='/about'>{ t('about')}</Link></li>
                            <li className='tiret'><Link to='/terms'> { t('conditions')}</Link></li>
                            <li><Link to='/contact'> { t('contact')}</Link></li>
                        </ul>
                    </div>
                </header>
            }
        </>
    )
}


export function CustomLink(props) {
    const location = useLocation();

    return <Link {...props} state={{ from: location.pathname }} className="block"/>
}


export function MenuItem({path, title = "", text = "", handleMenuItemClick}) {
    return (
        <CustomLink to={path} onClick={handleMenuItemClick}>
            <h3 className='mb-[40px] sm:mb-0'>{title}</h3>
            <p className="hidden sm:block">{text}</p>
        </CustomLink>
    )
}

export function MenuLogo({ isOpenMenu, setIsOpenMenu, translate }) {
    return (
        <div className='absolute top-[20px] sm:top-[3px] left-[50%] -translate-x-[50%]'>
            <div>
                <span className='block text-center cursor-pointer uppercase' onClick={() => setIsOpenMenu(!isOpenMenu) }
                >{isOpenMenu ? `- ${translate('close')} -` : `- ${translate('menu')} -`  }</span>
                <Link to={'/'}>
                    <img src={ logo } alt="Logo Menu" className='w-[180px]' onClick={() => setIsOpenMenu(false)}/>
                </Link>
            </div>
        </div>
    )
}

const LanguageSwitcher = ({ switchLanguage, lang }) => {
    return (
        <div>   
            <span className={classNames('text-[20px] cursor-pointer mr-[5px]', {'blue': lang === 'en_EN'})} onClick={() => switchLanguage('en_EN') }>EN</span>
            <span className={classNames('text-[20px] cursor-pointer mr-[5px]', {'blue': lang === 'de_DE'})}  onClick={() => switchLanguage('de_DE') }>DE</span>
            <span className={classNames('text-[20px] cursor-pointer', {'blue': lang === 'fr_FR'})}  onClick={() => switchLanguage('fr_FR') }>FR</span>
        </div>
    )
}

const Sound = ({ translate }) => {
    return (
        <div>
            <span className="text-[20px]">{ translate('sound') }</span>
            <FontAwesomeIcon 
                icon={ faVolume } 
                style={{ fontSize: '26px', marginLeft: '10px', cursor: 'pointer' }}
            />
        </div>
    )
}