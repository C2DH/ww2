import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSharedState } from '../../contexts/SharedStateProvider'
import siteConfig from '../../../site.config'
    
// Assets
import bgBlack from '../../assets/images/common/bg-black.jpg'
import img1 from '../../assets/images/historianWorkshop/img-1.png'
import img2 from '../../assets/images/historianWorkshop/img-2.png'
import img3 from '../../assets/images/historianWorkshop/img-3.png'
import img4 from '../../assets/images/historianWorkshop/img-4.png'
import img5 from '../../assets/images/historianWorkshop/img-5.png'
import img6 from '../../assets/images/historianWorkshop/img-6.png'
import img7 from '../../assets/images/historianWorkshop/img-7.png'
import img8 from '../../assets/images/historianWorkshop/img-8.png'
import { useTranslation } from 'react-i18next'

const EXPIRE = 6 * 3600 * 1000;

export default function HistorianWorkshop() {
    const [sharedState, setSharedState] = useSharedState()
    const [imgLoaded, setImgLoaded] = useState(false)
    const { t } = useTranslation()
    const historianWorkshop = localStorage.getItem('historianWorkshop');
    let animation = false;
    if (historianWorkshop < new Date().getTime() || !historianWorkshop) {
        animation = true;
        localStorage.setItem("historianWorkshop", new Date().getTime() + EXPIRE);
    }
    useEffect(() => {
        setSharedState({ ...sharedState, showCurtains: false });
    }, [])
    return (
        <motion.div exit={{opacity: 0.999, transition: {duration: siteConfig.curtainsTransitionDuration}}} >
            <div style={{ backgroundImage: `url(${bgBlack})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} className='hidden 2xl:block w-full h-[calc(100vh-120px)] overflow-hidden'>
                <div className="container mx-auto relative h-full 2xl:mt-[40px]">
                    
                    <motion.div className='absolute inset-0' initial={{ y: '150%'}} animate={{ y: '-3%' }} transition={{ duration: animation ? 0.75 : 0, delay: animation ? 1 : 0 }}>
                        <div className='flex justify-center'>
                            <img src={img1} alt="" className='h-[70vh]'  />
                        </div>
                    </motion.div>
                    <motion.div className="absolute inset-0" initial={{ y: '150%'}} animate={{ y: 0 }} transition={{ duration: animation ? 0.75 : 0, delay: animation ? 2 : 0 }}>
                        <div className='flex justify-center'>
                            <img src={img2} alt="" className='h-[70vh]' />
                        </div>
                    </motion.div>
                    <motion.div className="absolute inset-0" initial={{ x: '150%' }} animate={{ x: '5%' }} transition={{ duration: animation ? 0.75 : 0, delay: animation ? 3 : 0 }}>
                        <div className='flex justify-center'>
                            <img src={img3} alt="" className='h-[70vh]' />
                        </div>
                    </motion.div>
                    <motion.div className="absolute inset-0" initial={{ x: '-150%' }} animate={{ x: '3%' }} transition={{ duration: animation ? 0.75 : 0, delay: animation ? 4 : 0 }}>
                        <div className='flex justify-center'>
                            <img src={img4} alt="" className='h-[70vh]' />
                        </div>                    
                    </motion.div>
                    <motion.div className="absolute inset-0" initial={{ x: '-150%', y: '150%' }} animate={{ x: '-4%', y: 0 }} transition={{ duration: animation ? 0.75 : 0, delay: animation ? 5 : 0 }}>
                        <div className='flex justify-center'>
                            <img src={img5} alt="" className='h-[70vh]' />
                        </div>                    
                    </motion.div>
                    <motion.div className="absolute inset-0" initial={{ x: '150%', y: '150%' }} animate={{ x: '-3%', y: '5%' }} transition={{ duration: animation ? 0.75 : 0, delay: animation ? 6 : 0 }}>
                        <div className='flex justify-center'>
                            <img src={img6} alt="" className='h-[70vh]' />
                        </div>
                    </motion.div>
                    <motion.div className="absolute inset-0" initial={{ x: '-150%', y: '150%' }} animate={{ x: 0, y: 0 }} transition={{ duration: animation ? 0.75 : 0, delay: animation ? 7 : 0 }}>
                        <div className='flex justify-center'>
                            <img src={img7} alt="" className='h-[70vh]' />
                        </div>
                    </motion.div>
                    <motion.div className="absolute inset-0" initial={{ x: '150%', y: '150%' }} animate={{ x: 0, y: 0 }} transition={{ duration: animation ? 0.75 : 0, delay: animation ? 8 : 0 }}>
                        <div className='relative flex justify-center'>
                            <img src={img8} className='h-[70vh]' alt="" onLoad={() => setImgLoaded(true)}/>
                            
                            { imgLoaded &&                            
                                <div className='absolute bottom-[100px] right-[200px] w-1/3'>
                                    <h2 className='text-blue font-abril text-[40px] leading-none'>{ t('menuItems.historian_workshop') }</h2>
                                    <p className='text-white pt-[10px]'>{ t('historian_description')}</p>
                                </div>
                            }
                            
                            <div className='absolute inset-0'>
                                <svg viewBox="0 0 1432 946" fill="none" xmlns="http://www.w3.org/2000/svg" className='relative w-full h-[70vh]'>

                                    {/* Bibliothèque gauche */}   
                                    <Link to={"/bibliography"} className='block group transition-all duration-[750ms]'>
                                        <path d="M579.5 382.5L801.5 398.5V144H548V357.5V364.5" stroke="transparent" fill="transparent" fillOpacity={0.1}  strokeWidth="2" className='transition-all duration-[750ms] group-hover:fill-[#6EDFFB] group-hover:stroke-[#6EDFFB]'/> 
                                        <circle cx="674" cy="298" r="11" fill="#6EDFFB" className='animate-pulseBig group' style={{ transformOrigin: '674px 298px' }}/>
                                        <circle cx="674" cy="298" r="6" fill="white" className='animate-pulseSmall' style={{ transformOrigin: '674px 298px' }}/>
                                        <text x="580" y="268" r="11" fill="transparent" className='transition-all duration-[750ms] text-[36px] group-hover:opacity-1 group-hover:fill-[#6EDFFB] uppercase'>{ t('menuItems.bibliography')}</text> 
                                    </Link>

                                    {/* Livre Bureau */} 
                                    <Link to={"/sources"} className='block group transition-all duration-[750ms]'>
                                        <path d="M408 634.5C403.5 634.5 331.5 644.5 331.5 644.5C331.5 644.5 303 646.5 290 648.5C277 650.5 270.5 654.5 262 656.5C253.5 658.5 254 661 253.5 664C253 667 240.5 755.5 238.5 769C236.5 782.5 238 782 240.5 784C243 786 240 792 240.5 800.5C241 809 250.5 820 257.5 826C264.5 832 266.5 831.5 270.5 831C273.7 830.6 293.5 827.5 303 826L363 815.5C380 812.833 418.5 806.6 436.5 803C459 798.5 461 797.5 469.5 794C478 790.5 476.5 787.5 475.5 779C474.5 770.5 471 766 469.5 763C468 760 467.5 749.5 467.5 749.5L456.5 705.5C453.666 694 447.9 670.4 447.5 668C447 665 445 665.5 444 665.5H441L438 648.5C438 648.5 436 638.5 432.5 637C429 635.5 424.5 634.5 420.5 634.5H408Z" stroke="transparent" fill="transparent" fillOpacity={0.1}  strokeWidth="2" className='transition-all duration-[750ms] group-hover:fill-[#6EDFFB] group-hover:stroke-[#6EDFFB]'/>
                                        <circle cx="344" cy="722" r="11" fill="#6EDFFB" className='animate-pulseBig' style={{ transformOrigin: '344px 722px' }}/>   
                                        <circle cx="344" cy="722" r="6" fill="white" className='animate-pulseSmall' style={{ transformOrigin: '344px 722px' }}/>   
                                        <text x="300" y="692" r="11" fill="transparent" className='transition-all duration-[750ms] text-[36px] group-hover:opacity-1 group-hover:fill-[#6EDFFB] uppercase'>{ t('menuItems.sources')}</text> 
                                    </Link>

                                    {/* Bibliothèque centre */} 
                                    <Link to={"/research-institutions"} className='block group transition-all duration-[750ms]'>
                                        <path d="M1159 551.5L1161.5 478L1099 439L1103.5 141.5L825 140L820 512L945 537V527.5L1081.5 544.5" stroke="transparent" fill="transparent" fillOpacity={0.1}  strokeWidth="2" className='transition-all duration-[750ms] group-hover:fill-[#6EDFFB] group-hover:stroke-[#6EDFFB]'/>
                                        <circle cx="959" cy="324" r="11" fill="#6EDFFB" className='animate-pulseBig' style={{ transformOrigin: '959px 324px' }}/>
                                        <circle cx="959" cy="324" r="6" fill="white" className='animate-pulseSmall' style={{ transformOrigin: '959px 324px' }}/>
                                        <text x="800" y="294" r="11" fill="transparent" className='transition-all duration-[750ms] text-[36px] group-hover:opacity-1 group-hover:fill-[#6EDFFB] uppercase'>{ t('menuItems.research_institutions')}</text> 
                                    </Link>
                                    
                                    {/* Bibliothèque droite */}
                                    <Link to={'/glossary'} className='block group transition-all duration-[750ms]'>
                                    <path d="M301 1V313L151.5 299L76.75 292L2 285L11 1H301Z" stroke="transparent" fill="transparent" fillOpacity={0.1} strokeWidth="2" className='transition-all duration-[750ms] group-hover:fill-[#6EDFFB] group-hover:stroke-[#6EDFFB]'/>   
                                    <circle cx="1347" cy="302" r="11" fill="#6EDFFB" className='animate-pulseBig' style={{ transformOrigin: '1347px 302px' }} />
                                    <circle cx="1347" cy="302" r="6" fill="white" className='animate-pulseSmall' style={{ transformOrigin: '1347px 302px' }} />
                                    <text x="1150" y="302" fill="transparent" className='transition-all duration-[750ms] text-[36px] group-hover:opacity-1 group-hover:fill-[#6EDFFB] uppercase'>{ t('menuItems.glossary')}</text> 
                                    </Link>
                                </svg>    
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className='2xl:hidden flex relative'>
                <div className='px-[20px] h-[calc(100dvh-120px)] sm:h-[calc(100vh-120px)] w-full overflow-scroll' style={{ backgroundImage: `url(${img8})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                    <div className="container mx-auto relative z-[2] flex items-center justify-center">
                    <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[60%]'>
                        <h1 className='text-[40px] font-abril text-blue pt-[40px] w-[80%] leading-none'>Atelier de l'historien</h1>
                        <p className='text-white text-[24px] pt-[15px]'>Le 10 septembre 1944, les résistants luxembourgeois se ruent à la Chambre des députés, jusqu’alors occupé par l’administration nazie, et cherchent à prendre possession des documents qui y sont conservés. Suivons leur parcours dans les archives immédiates de l’annexion, en consultant la bibliographie et les sources relatives au Luxembourg pendant la Seconde Guerre mondiale.</p>
                        <div className='py-[20px] text-white text-[38px]'>
                            <Link to={'/sources'} className='uppercase block pt-[10px]'>Sources</Link>
                            <Link to={'/research-institutions'} className='uppercase block pt-[10px]'>Institutions de recherche</Link>
                            <Link to={'/glossary'} className='uppercase block pt-[10px]'>Glossaire</Link>
                            <Link to={'/bibliography'} className='uppercase block pt-[10px]'>Bibliographie</Link>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='2xl:hidden absolute bg-gradient-to-t from-neutral-800 inset-0'></div>
            </div>
        </motion.div>
    )
}


