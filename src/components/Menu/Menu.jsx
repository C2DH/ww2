// ASSETS
import './Menu.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolume } from '@fortawesome/pro-light-svg-icons'
import bg from '../../assets/images/common/BG.jpg'
import logo from '../../assets/images/common/logo.png'
import logoGouv from '../../assets/images/menu/logo-gouv.svg'
import logoUni from '../../assets/images/menu/logo-uni.svg'

// FRAMER
import { motion } from "framer-motion"

import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from 'react'
import classNames from 'classnames'


export default function Menu({delay = 0}) {

    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const location = useLocation();

    return (
        <>
            <motion.header 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ delay: delay, ease: "easeInOut" }}
                className={classNames('transition-all duration-[2000ms]', {
                    'h-[100vh]': isOpenMenu,
                    'h-[120px]': !isOpenMenu
                })} 
                style={{ background: `url(${bg}) 50% / cover no-repeat`}}
            >
                <div className="flex justify-between px-[90px] pt-[20px]">
                    <div>
                        <span className="text-[20px]">SOUND ON</span>
                        <FontAwesomeIcon 
                            icon={ faVolume } 
                            style={{ fontSize: '26px', marginLeft: '10px', cursor: 'pointer' }}
                            onClick={() => console.log('click')}    
                        />
                    </div>

                    <div>   
                        <span className='text-[20px] cursor-pointer'>EN DE FR</span>
                    </div>
                </div>

                <div className='absolute top-[3px] left-[50%] -translate-x-[50%]'>
                    <div>
                        <span className='block text-center cursor-pointer' onClick={() => setIsOpenMenu(!isOpenMenu) }>{isOpenMenu ? "- FERMER -" : "- MENU -"  }</span>
                        {/* <img src={ logo } alt="Logo Menu" className='w-[210px]'/> */}
                        <Link to="/">
                            <img src={ logo } alt="Logo Menu" className='w-[180px]'/>
                        </Link>
                    </div>
                </div>

                <div className='flex justify-center mt-[90px]'>
                    <ul className={classNames('w-1/3 text-center transition-all duration-[2000ms]', {
                        'opacity-1': isOpenMenu,
                        'opacity-0': !isOpenMenu 
                    })}>
                        <li>
                            <Link to="/path">
                                <h3>Parcours</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.</p>
                            </Link>
                        </li>
                        <li>
                            <Link to='/catalogue'>
                                <h3>Catalogue</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/historian-workshop">
                                <h3>Atelier de l'historien</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/spacetime-map">
                                <h3>Carte spatio-temporelle</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.</p>
                            </Link>
                        </li>
                        <li className=''>
                            <Link to="/credits">
                                <h3>Générique</h3>
                            </Link>
                        </li>
                    </ul>
                </div>

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

                <div className='flex justify-center items-center mt-[20px]'>
                    <ul className='flex text-[20px]'>
                        <li className='tiret'><Link to='/about'>A propos</Link></li>
                        <li className='tiret'><Link to='/terms'> Conditions</Link></li>
                        <li><Link to='/contact'> Contact</Link></li>
                    </ul>
                </div>
            </motion.header>
            
            <div className={classNames({ 'h-[70px] overflow-hidden': isOpenMenu })}>
                <Outlet />
            </div>
        </>
    )
}

