import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import classNames from 'classnames'
import Player from '../Player/Player'

// ASSETS
import bgBlack from '../../assets/images/common/bg-black.jpg'
import logo from '../../assets/images/common/logo.png'
import logoGouv from '../../assets/images/menu/logo-gouv.svg'
import logoUni from '../../assets/images/menu/logo-uni.svg'

// CONTEXT
import { useSharedState } from "../../contexts/SharedStateProvider";
import { useMenuContext } from '../../contexts/MenuProvider'
import { useLanguageContext } from '../../contexts/LanguageProvider'

// TRANSLATION
import { useTranslation } from 'react-i18next'


export default function Menu() {

    const { t } = useTranslation()
    const { openMenu, setOpenMenu } = useMenuContext()
    const [sharedState, setSharedState] = useSharedState()
    const [results, setResults] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { pathname } = useLocation()
    const {language, changeLanguage } = useLanguageContext()
    const locations = ['/', '/spacetime-map', '/^\/notice\/[a-zA-Z0-9_-]+$/']
    const isMatch = locations.some(location => {
        if (location.startsWith('/^') && location.endsWith('$/')) {
            const regex = new RegExp(location.slice(1, -1))
            return regex.test(pathname)
        }
        return location === pathname
    })


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
    }, [openMenu])


    // ANIMATION CURTAINS
    useEffect(() => {
        setSharedState({ ...sharedState, showClouds: false, showCurtains: false });
    }, [])


    return (
        <>
            {isLoading &&            
                <header 
                    style={{ background: `url(${bgBlack}) 50% / cover no-repeat`}}
                    className={classNames('transition-all duration-[2000ms] overflow-hidden pb-[50px] text-white flex flex-col', {
                        'max-h-[100vh] h-[100vh]': openMenu,
                        'max-h-[140px] h-[140px]': (!openMenu && isMatch),
                        'max-h-[120px] h-[120px]': (!openMenu && !isMatch),
                    })} 
                >

                    {/** HEADER */}
                    <div className="flex justify-between px-[30px] sm:px-[90px] pt-[140px] sm:pt-[120px] md:pt-[20px] ">
                        <Player/>
                        <MenuLogo isOpenMenu={openMenu} setIsOpenMenu={setOpenMenu} translate={t} />
                        <LanguageSwitcher switchLanguage={changeLanguage} lang={language}/>
                    </div>

                    {/** ITEMS */}
                    <div className='overflow-scroll'>

                        <div className='flex justify-center mt-[20px] md:mt-[70px]'>
                            <ul className={classNames('sm:w-[80%] lg:w-2/3 2xl:w-1/3 text-center transition-all duration-[1000ms]', {
                                'opacity-1': openMenu,
                                'opacity-0': !openMenu 
                            })}>
                                <li>
                                    <MenuItem path={'/'} title={"Parcours"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit."} className='text-[34px] md:text-[40px] leading-none text-blue font-abril' handleMenuItemClick={() => setOpenMenu(false) }/>
                                </li>
                                <li>
                                    <MenuItem path={'/catalogue'} title={"Catalogue"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris."} className='text-[34px] md:text-[40px] leading-none text-blue font-abril' handleMenuItemClick={() => setOpenMenu(false) } />
                                </li>
                                <li>
                                    <MenuItem path={'/historian-workshop'} title={"Atelier de l'historien"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris."} className='text-[34px] md:text-[40px] leading-none text-blue font-abril' handleMenuItemClick={() => setOpenMenu(false) }/>
                                </li>
                                <li>
                                    <MenuItem path={'/spacetime-map'} title={"Carte spatio-temporelle"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit."} className='text-[34px] md:text-[40px] leading-none text-blue font-abril' handleMenuItemClick={() => setOpenMenu(false) }/>
                                </li>
                                <li>
                                    <MenuItem path={'/credits'} title={"Générique"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit."} className='text-[34px] md:text-[40px] leading-none text-blue font-abril' handleMenuItemClick={() => setOpenMenu(false) }/>
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
            <h3 className={`mb-[40px] sm:mb-0 ${className}`}>{title}</h3>
            { text !== "" &&
                <p className="hidden sm:block pt-[14px] text-[20px] leading-none mb-[30px]">{text}</p>
            }
        </CustomLink>
    )
}

const MenuLogo = ({ isOpenMenu, setIsOpenMenu, translate }) => {
    return (
        <div className='absolute top-[5px] left-[50%] -translate-x-[50%]'>
            <div>
                <span className='block text-center cursor-pointer uppercase text-[18px]' onClick={() => setIsOpenMenu(!isOpenMenu) }
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
        <div className='text-[24px]'>   
            <span className={classNames('cursor-pointer mr-[5px]', {'text-blue': lang === 'en_EN'})} onClick={() => switchLanguage('en_EN') }>EN</span>
            <span className={classNames('cursor-pointer mr-[5px]', {'text-blue': lang === 'de_DE'})}  onClick={() => switchLanguage('de_DE') }>DE</span>
            <span className={classNames('cursor-pointer', {'text-blue': lang === 'fr_FR'})}  onClick={() => switchLanguage('fr_FR') }>FR</span>
        </div>
    )
}

