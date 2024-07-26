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



export default function Menu() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false)
    const { openMenu, setOpenMenu } = useMenuContext()
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [sharedState, setSharedState] = useSharedState();

    const { pathname } = useLocation()
    const locations = ['/catalogue', '/historian-workshop', '/historical-index', '/research-institutions', '/bibliography', '/glossary','/sources']

    console.log('includes',locations.includes(pathname))

    useEffect(() => {
        setSharedState({ ...sharedState, showClouds: false, showCurtains: false });
      }, []);

    return (
        <>
            <header 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 1500 }}
                style={{ background: `url(${bgBlack}) 50% / cover no-repeat`}}
                className={classNames('transition-all duration-[2000ms] overflow-hidden pb-[50px]', {
                    'max-h-[120vh] h-[100vh]': openMenu,
                    'max-h-[120px] h-[120px]': !openMenu && locations.includes(pathname),
                    'max-h-[140px] h-[120px]': !openMenu && !locations.includes(pathname)
                })} 
            >

                {/** HEADER */}
                <div className="flex justify-between px-[30px] sm:px-[90px] pt-[140px] md:pt-[20px]">
                    <Sound />
                    <MenuLogo isOpenMenu={openMenu} setIsOpenMenu={setOpenMenu} />
                    <LanguageSwitcher />
                </div>


                {/** ITEMS */}
                <div className='flex justify-center mt-[60px] sm:mt-[90px]'>
                    <ul className={classNames('w-2/3 lg:w-1/3 text-center transition-all duration-[750ms]', {
                        'opacity-1': openMenu,
                        'opacity-0': !openMenu 
                    })}>
                        <li>
                            <MenuItem path={'/'} title={"Parcours"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit."} handleMenuItemClick={() => setIsOpenMenu(false) }/>
                        </li>
                        <li>
                            <MenuItem path={'/catalogue'} title={"Catalogue"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris."} handleMenuItemClick={() => setIsOpenMenu(false) } />
                        </li>
                        <li>
                            <MenuItem path={'/historian-workshop'} title={"Atelier de l'historien"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris."} handleMenuItemClick={() => setIsOpenMenu(false) }/>
                        </li>
                        <li>
                            <MenuItem path={'/spacetime-map'} title={"Carte spatio-temporelle"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit."} handleMenuItemClick={() => setIsOpenMenu(false) }/>
                        </li>
                        <li>
                            <MenuItem path={'/credits'} title={"Générique"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit."} handleMenuItemClick={() => setIsOpenMenu(false) }/>
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
                        <li className='tiret'><Link to='/about'>A propos</Link></li>
                        <li className='tiret'><Link to='/terms'> Conditions</Link></li>
                        <li><Link to='/contact'> Contact</Link></li>
                    </ul>
                </div>
            </header>
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

export function MenuLogo({ isOpenMenu, setIsOpenMenu }) {
    return (
        <div className='absolute top-[20px] sm:top-[3px] left-[50%] -translate-x-[50%]'>
            <div>
                <span className='block text-center cursor-pointer' onClick={() => setIsOpenMenu(!isOpenMenu) }
                >{isOpenMenu ? "- FERMER -" : "- MENU -"  }</span>
                <Link to={'/'}>
                    <img src={ logo } alt="Logo Menu" className='w-[180px]' onClick={() => setIsOpenMenu(false)}/>
                </Link>
            </div>
        </div>
    )
}

const LanguageSwitcher = () => {
    return (
        <div>   
            <span className='text-[20px] cursor-pointer'>EN DE FR</span>
        </div>
    )
}

const Sound = () => {
    return (
        <div>
            <span className="text-[20px]">SOUND ON</span>
            <FontAwesomeIcon 
                icon={ faVolume } 
                style={{ fontSize: '26px', marginLeft: '10px', cursor: 'pointer' }}
            />
        </div>
    )
}