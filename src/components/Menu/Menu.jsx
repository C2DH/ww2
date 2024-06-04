// ASSETS
import './Menu.scss'
import bg from '../../assets/images/common/BG.jpg'
import logo from '../../assets/images/common/logo.png'
import logoGouv from '../../assets/images/menu/logo-gouv.svg'
import logoUni from '../../assets/images/menu/logo-uni.svg'
import cloud from '../../assets/images/common/cloud.png'

import { useSharedState } from "../../contexts/SharedStateProvider";


// FRAMER
import { AnimatePresence, motion } from "framer-motion"

// REACT
import { Link, Outlet } from "react-router-dom";
import { useState, useContext, useEffect } from 'react'
import classNames from 'classnames'

// COMPONENTS
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import Sound from '../Sound/Sound'
import CustomLink from '../CustomLink.jsx/CustomLink'


export default function Menu({delay = 0}) {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [sharedState, setSharedState] = useSharedState();

    useEffect(() => {
        setSharedState({ ...sharedState, showClouds: false, showCurtains: false });
      }, []);

    return (
        <>
        <div className='h-screen overflow-hidden'>

        
            <header 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ delay: delay, ease: "easeInOut" }}
                style={{ background: `url(${bg}) 50% / cover no-repeat`}}
                className={classNames('transition-all duration-[2000ms] overflow-hidden', {
                    'h-[100vh]': isOpenMenu,
                    'h-[120px]': !isOpenMenu
                })} 
            >

                {/** HEADER */}
                <div className="flex justify-between px-[90px] pt-[20px]">
                    <Sound />
                    <MenuLogo isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
                    <LanguageSwitcher />
                </div>


                {/** NAVBAR */}
                <div className='flex justify-center mt-[90px]'>
                    <ul className={classNames('w-1/3 text-center transition-all duration-[750ms]', {
                        'opacity-1': isOpenMenu,
                        'opacity-0': !isOpenMenu 
                    })}>
                        <li>
                            <MenuItem path={'/map'} title={"Map"} text={"Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit."} handleMenuItemClick={() => setIsOpenMenu(false) }/>
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
                <div className='flex justify-center items-center mt-[30px]'>
                    <div className='me-[80px]'>
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


                {/** NAVBAR SUITE */}
                <div className='flex justify-center items-center mt-[20px]'>
                    <ul className='flex text-[20px]'>
                        <li className='tiret'><Link to='/about'>A propos</Link></li>
                        <li className='tiret'><Link to='/terms'> Conditions</Link></li>
                        <li><Link to='/contact'> Contact</Link></li>
                    </ul>
                </div>
            </header>

            <Outlet />
            
            
            {/* <motion.div     
                initial={{ y: '90%'} }
                animate={ isOpenMenu ? { y: "-90px" } : { y: '-50px'}}
                onAnimationComplete={() => setIsAnimationComplete(isOpenMenu ? true : false) }
                transition={{ duration: 2, ease: "easeInOut", delay: 1 }} // Delai = durée de la vidéo et si deja visité pas de délai
                style={{ position: '' }}
                className={classNames('w-full',{
                    "h-[calc(100vh-120px)]": !isOpenMenu,
                    "h-[90px] overflow-hidden": (isOpenMenu && isAnimationComplete)
                    // "h-[90px] overflow-hidden": isOpenMenu
                })}
            >     */}
                {/* <AnimatePresence >
                        <>
                            <motion.div className='fixed left-0 -top-[70px] z-[3]' initial={{ x: '-100%' }} animate={{ x: 0, scale: 3 }} exit={{ x: '-100%' }} transition={{ duration: 0.75 }}>
                                <img src={ cloud } alt="" />
                            </motion.div>

                            <motion.div className='fixed left-0 -bottom-[20px] z-[3]' initial={{ x: '-100%', rotateX: 180}} animate={{ x: 0, rotateX: 180, scale: 2 }} exit={{ x: '-100%' }} transition={{ duration: 0.75 }}>
                                <img src={ cloud } alt="" />
                            </motion.div>

                            <motion.div className='fixed right-0 -top-[70px] z-[3]' initial={{ x: '100%', rotateY: -180}} animate={{ x: 0, rotateY: -180, scale: 2 }} exit={{ x: '100%'}} transition={{ duration: 0.75 }}>
                                <img src={ cloud } alt="" />
                            </motion.div>

                            <motion.div className='fixed right-0 -bottom-[20px] z-[3]' initial={{ x: '100%', rotateY: -180, rotateX: 180 }} animate={{ x: 0, rotateY: -180, rotateX: 180, scale: 3 }} exit={{ x: '100%'}} transition={{ duration: 0.75 }}>
                                <img src={ cloud } alt="" />
                            </motion.div>
                        </>
                </AnimatePresence> */}
                
            {/* </motion.div> */}
            </div>
        </>
    )
}



export function MenuItem({path, title = "", text = "", handleMenuItemClick}) {
    return (
        <CustomLink to={path} onClick={handleMenuItemClick}>
            <h3>{title}</h3>
            <p>{text}</p>
        </CustomLink>
    )
}

export function MenuLogo({ isOpenMenu, setIsOpenMenu }) {
    return (
        <div className='absolute top-[3px] left-[50%] -translate-x-[50%]'>
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
