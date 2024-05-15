import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolume } from '@fortawesome/pro-light-svg-icons'

import './Menu.scss'
import bg from '../../assets/images/common/BG.jpg'
import logo from '../../assets/images/common/logo.png'
import logoGouv from '../../assets/images/menu/logo-gouv.svg'
import logoUni from '../../assets/images/menu/logo-uni.svg'
import { Link } from 'react-router-dom'


export default function Menu() {

    return (
        <header className='h-[100vh] fixed inset-0' style={{ background: `url(${bg}) lightgray 50% / cover no-repeat`, backgroundBlendMode: ''}}>
            <div className="flex justify-between px-[90px] pt-[20px]">
                <div>
                    <span className="text-[20px]">SOUND ON</span>
                    <FontAwesomeIcon icon={ faVolume } style={{ fontSize: '26px', marginLeft: '10px', cursor: 'pointer' }}/>
                </div>

                <div>   
                    <span className='text-[20px] cursor-pointer'>EN DE FR</span>
                </div>
            </div>

            <div className='absolute top-[3px] left-[50%] -translate-x-[50%]'>
                <Link to="/">
                    <span className='block text-center'>- MENU -</span>
                    <img src={ logo } alt="Logo Menu" className='w-[210px]'/>
                </Link>
            </div>

            <div className='flex justify-center mt-[130px]'>
                <ul className='w-1/3 text-center'>
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
                    <li className='mt-[70px]'>
                        <Link to="/credits">
                            <h3>Générique</h3>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='flex justify-center items-center mt-[45px]'>
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
        </header>
    )
}