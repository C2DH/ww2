import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import classNames from 'classnames'
import Player from '../Player/Player'

// ASSETS
import bgBlack from '../../assets/images/common/bg-black.jpg'
import logo from '../../assets/images/common/logo.png'
import logoGouv from '../../assets/images/menu/logo-gouv.png'
import logoUni from '../../assets/images/menu/logo-uni.svg'

// CONTEXT
import { useSharedState } from "../../contexts/SharedStateProvider";
import { useMenuContext } from '../../contexts/MenuProvider'
import { useLanguageContext } from '../../contexts/LanguageProvider'

// TRANSLATION
import { useTranslation } from 'react-i18next'
import axios from "axios"
const email = import.meta.env.VITE_EMAIL


export default function Menu() {

    const { t } = useTranslation()
    const { openMenu, setOpenMenu } = useMenuContext()
    const [sharedState, setSharedState] = useSharedState()
    const [results, setResults] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { pathname } = useLocation()
    const {language, changeLanguage } = useLanguageContext()
    const locations = ['/', '/spatiotemporal-map', '/^/notice/[a-zA-Z0-9_-]+$/']
    const isMatch = locations.some(location => {
        if (location.startsWith('/^') && location.endsWith('$/')) {
            const regex = new RegExp(location.slice(1, -1))
            return regex.test(pathname)
        }
        return location === pathname
    })

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get("/api/story/?orderby=priority&filters=%7B%22tags__slug%22:%22menu%22%7D")
                setResults(response.data);
                setIsLoading(true);
            } catch (error) {
                console.log(error)
                setIsLoading(false);
            }
        }
        fetchMenu();
    }, [])

   
    // ANIMATION MENU 
    useEffect(() => {
        if (openMenu) {
            document.body.style.height = '';
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.height = '';
            document.body.style.overflow = '';
        }
    }, [openMenu])


    // ANIMATION CURTAINS
    useEffect(() => {
        setSharedState({ ...sharedState, showClouds: false, showCurtains: false });
    }, [])

    return (
        <>
            {isLoading && results &&           
                <header 
                    style={{ background: `url(${bgBlack}) 50% / cover no-repeat`}}
                    className={classNames('transition-all  overflow-hidden pb-[60px] text-white flex flex-col relative z-[102]', {
                        'max-h-[100vh] h-[100vh] duration-[2000ms]': openMenu,
                        'max-h-[140px] h-[140px] duration-[3000ms]': (!openMenu && isMatch),
                        'max-h-[120px] h-[120px] duration-[3000ms]': (!openMenu && !isMatch),
                    })} 
                >

                    {/** HEADER */}
                    <div className="flex justify-between px-[30px] sm:px-[90px] pt-[40px] lg:pt-[20px]">
                        <Player status={'menu'}/>
                        <MenuLogo isOpenMenu={openMenu} setIsOpenMenu={setOpenMenu} translate={t} />
                        <LanguageSwitcher switchLanguage={changeLanguage} lang={language}/>
                    </div>

                    {/** MENU ITEMS */}
                    <div className='overflow-scroll mt-[30px] lg:mt-[70px]'>

                        <div className='flex justify-center mt-[20px]'>
                            <ul className={classNames('sm:w-[80%] lg:w-2/3 2xl:w-1/3 text-center transition-all duration-[1000ms]', {
                                'opacity-1': openMenu,
                                'opacity-0': !openMenu 
                            })}>

                                { results.results.slice(0, 5).map(item =>
                                    <li key={ item.id } className="mb-[40px]">
                                        <MenuItem path={item.slug === 'journeys' ? '' : item.slug} title={item.data.title[language]} text={item.data.subtitle ? item.data.subtitle[language] : ""} className='text-[32px] md:text-[40px] leading-none text-blue font-abril' handleMenuItemClick={() => setOpenMenu(false) }/>
                                    </li>
                                )}
                            </ul>
                        </div>


                        {/** PARTNERS LOGOS */}
                        <div className='flex justify-center items-center mt-[30px] mx-[30px]'>
                            <div>
                                <Link to='https://www.c2dh.uni.lu/' target='_blank'>
                                    <img src={ logoUni } alt="Logo Université" />
                                </Link>
                            </div>
                            <div>
                                <Link to='https://mcult.gouvernement.lu/fr.html' target='_blank'>
                                    <img src={ logoGouv } alt="Logo Université" className="w-[225px]" />
                                </Link>
                            </div>
                        </div>


                        {/** MENU ITEMS */}
                        <div className='flex justify-center items-center mt-[20px]'>
                            <div className='flex text-[24px]'>
                                <MenuItem path={'/about'} title={ t('about')} className={'tiret'} handleMenuItemClick={() => setOpenMenu(false) } />
                                <MenuItem path={'/terms'} title={ t('conditions')} className={'tiret'} handleMenuItemClick={() => setOpenMenu(false) } />
                                <MenuItem path={'/contact'} title={ t('contact')} handleMenuItemClick={() => setOpenMenu(false) } />
                            </div>
                        </div>
                    </div>
                </header>
            }
        </>
    )
}


const CustomLink = (props) => {
    const location = useLocation();
    return <Link {...props} state={{ from: location.pathname }} className="block"/>
}

const MenuItem = ({path, title = "", text = "", className = "", handleMenuItemClick}) => {
    return (
        <CustomLink to={path} onClick={handleMenuItemClick}>
            <h3 className={className}>{title}</h3>
            { text !== "" &&
                <p className="hidden sm:block pt-[15px] pb-0 text-[20px] leading-none">{text}</p>
            }
        </CustomLink>
    )
}

const MenuLogo = ({ isOpenMenu, setIsOpenMenu, translate }) => {
    return (
        <div className='absolute top-[5px] left-[50%] -translate-x-[50%]'>
            <div>
                <span className='block text-center cursor-pointer uppercase text-[18px]' onClick={() => setIsOpenMenu(!isOpenMenu) }>
                    {isOpenMenu ? `- ${translate('close')} -` : `- ${translate('menu')} -`  }
                </span>
                <Link to={'/'}>
                    <img src={ logo } alt="Logo Menu" className='w-[180px]' onClick={() => setIsOpenMenu(false)}/>
                </Link>
            </div>
        </div>
    )
}

const LanguageSwitcher = ({ switchLanguage, lang }) => {
    return (
        <div className='text-[20px] sm:text-[24px]'>   
            <span className={classNames('cursor-pointer mr-[5px]', {'text-blue': lang === 'en_GB'})} onClick={() => switchLanguage('en_GB') }>EN</span>
            <span className={classNames('cursor-pointer mr-[5px]', {'text-blue': lang === 'de_DE'})}  onClick={() => switchLanguage('de_DE') }>DE</span>
            <span className={classNames('cursor-pointer', {'text-blue': lang === 'fr_FR'})}  onClick={() => switchLanguage('fr_FR') }>FR</span>
        </div>
    )
}

