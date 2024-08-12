import { motion } from 'framer-motion'
import bgBlack from '../../assets/images/common/bg-black.jpg'
import bgHistorian from '../../assets/images/historianWorkshop/bg-historian.png'

// Assets
import img1 from '../../assets/images/historianWorkshop/img-1.png'
import img2 from '../../assets/images/historianWorkshop/img-2.png'
import img3 from '../../assets/images/historianWorkshop/img-3.png'
import img4 from '../../assets/images/historianWorkshop/img-4.png'
import img5 from '../../assets/images/historianWorkshop/img-5.png'
import img6 from '../../assets/images/historianWorkshop/img-6.png'
import img7 from '../../assets/images/historianWorkshop/img-7.png'
import img8 from '../../assets/images/historianWorkshop/img-8.png'
import { Link } from 'react-router-dom'

export default function HistorianWorkshop() {
    return (
        // <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transition: {duration: 1}}}>
        <>
            <div style={{ backgroundImage: `url(${bgBlack})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} className='hidden lg:block w-full h-[calc(100vh-120px)] overflow-hidden'>
                <div className="container mx-auto flex justify-center">
                    <motion.div className='absolute' initial={{ y: '150%'}} animate={{ y: '-3%' }} transition={{ duration: 0.75, delay: 1 }}>
                        <img src={img1} alt="" className=''/>
                    </motion.div>

                    <motion.div className="absolute" initial={{ y: '150%'}} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 2 }}>
                        <img src={img2} alt="" className=''/>
                    </motion.div>

                    <motion.div className="absolute" initial={{ x: '150%' }} animate={{ x: '5%' }} transition={{ duration: 0.75, delay: 3 }}>
                        <img src={img3} alt="" className=''/>
                    </motion.div>

                    <motion.div className="absolute" initial={{ x: '-150%' }} animate={{ x: '3%' }} transition={{ duration: 0.75, delay: 4 }}>
                        <img src={img4} alt="" className=''/>
                    </motion.div>

                    <motion.div className="absolute" initial={{ x: '-150%', y: '150%' }} animate={{ x: '-4%', y: 0 }} transition={{ duration: 0.75, delay: 5 }}>
                        <img src={img5} alt="" className=''/>
                    </motion.div>

                    <motion.div className="absolute" initial={{ x: '150%', y: '150%' }} animate={{ x: '-3%', y: '5%' }} transition={{ duration: 0.75, delay: 6 }}>
                        <img src={img6} alt="" className=''/>
                    </motion.div>

                    <motion.div className="absolute" initial={{ x: '-150%', y: '150%' }} animate={{ x: 0, y: 0 }} transition={{ duration: 0.75, delay: 7 }}>
                        <img src={img7} alt="" className=''/>
                    </motion.div>

                    <motion.div className="absolute" initial={{ x: '150%', y: '150%' }} animate={{ x: 0, y: 0 }} transition={{ duration: 0.75, delay: 8 }}>
                        <div className='relative'>
                            <img src={img8} alt=""/>
                            
                            <div className='absolute inset-0'>
                                <svg viewBox="0 0 1432 946" fill="none" xmlns="http://www.w3.org/2000/svg" className='relative'>

                                    {/* Livre Bureau */}   
                                    <Link to={"/historical-index"} className='block group transition-all duration-[750ms]'>
                                        <path d="M579.5 382.5L801.5 398.5V144H548V357.5V364.5" stroke="transparent" fill="transparent" fillOpacity={0.1}  stroke-width="2" className='transition-all duration-[750ms] group-hover:fill-[#6EDFFB] group-hover:stroke-[#6EDFFB]'/> 
                                        <circle cx="674" cy="298" r="11" fill="#6EDFFB" className='animate-pulseBig group' style={{ transformOrigin: '674px 298px' }}/>
                                        <circle cx="674" cy="298" r="6" fill="white" className='animate-pulseSmall' style={{ transformOrigin: '674px 298px' }}/>
                                        <text x="580" y="268" r="11" fill="transparent" className='transition-all duration-[750ms] text-[36px] sofia  group-hover:opacity-1 group-hover:fill-[#6EDFFB] uppercase'>Index historique</text> 
                                    </Link>

                                    {/* Bibliothèque gauche */} 
                                    <Link to={"/sources"} className='block group transition-all duration-[750ms]'>
                                        <path d="M408 634.5C403.5 634.5 331.5 644.5 331.5 644.5C331.5 644.5 303 646.5 290 648.5C277 650.5 270.5 654.5 262 656.5C253.5 658.5 254 661 253.5 664C253 667 240.5 755.5 238.5 769C236.5 782.5 238 782 240.5 784C243 786 240 792 240.5 800.5C241 809 250.5 820 257.5 826C264.5 832 266.5 831.5 270.5 831C273.7 830.6 293.5 827.5 303 826L363 815.5C380 812.833 418.5 806.6 436.5 803C459 798.5 461 797.5 469.5 794C478 790.5 476.5 787.5 475.5 779C474.5 770.5 471 766 469.5 763C468 760 467.5 749.5 467.5 749.5L456.5 705.5C453.666 694 447.9 670.4 447.5 668C447 665 445 665.5 444 665.5H441L438 648.5C438 648.5 436 638.5 432.5 637C429 635.5 424.5 634.5 420.5 634.5H408Z" stroke="transparent" fill="transparent" fillOpacity={0.1}  stroke-width="2" className='transition-all duration-[750ms] group-hover:fill-[#6EDFFB] group-hover:stroke-[#6EDFFB]'/>
                                        <circle cx="344" cy="722" r="11" fill="#6EDFFB" className='animate-pulseBig' style={{ transformOrigin: '344px 722px' }}/>   
                                        <circle cx="344" cy="722" r="6" fill="white" className='animate-pulseSmall' style={{ transformOrigin: '344px 722px' }}/>   
                                        <text x="300" y="692" r="11" fill="transparent" className='transition-all duration-[750ms] text-[36px] sofia  group-hover:opacity-1 group-hover:fill-[#6EDFFB] uppercase'>Sources</text> 
                                    </Link>


                                    {/* Bibliothèque centre */} 
                                    <Link to={"/research-institutions"} className='block group transition-all duration-[750ms]'>
                                        <path d="M1159 551.5L1161.5 478L1099 439L1103.5 141.5L825 140L820 512L945 537V527.5L1081.5 544.5" stroke="transparent" fill="transparent" fillOpacity={0.1}  stroke-width="2" className='transition-all duration-[750ms] group-hover:fill-[#6EDFFB] group-hover:stroke-[#6EDFFB]'/>
                                        <circle cx="959" cy="324" r="11" fill="#6EDFFB" className='animate-pulseBig' style={{ transformOrigin: '959px 324px' }}/>
                                        <circle cx="959" cy="324" r="6" fill="white" className='animate-pulseSmall' style={{ transformOrigin: '959px 324px' }}/>
                                        <text x="800" y="294" r="11" fill="transparent" className='transition-all duration-[750ms] text-[36px] sofia  group-hover:opacity-1 group-hover:fill-[#6EDFFB] uppercase'>Institutions de recherche</text> 
                                    </Link>


                                    {/* Bibliothèque droite haut */} 
                                    <Link to={"/glossary"} className='block group transition-all duration-[750ms]'>
                                        <path d="M1137.95 145H1426V237L1133 230L1137.95 145Z" stroke="transparent" fill="transparent" fillOpacity={0.1}  stroke-width="2" className='transition-all duration-[750ms] group-hover:fill-[#6EDFFB] group-hover:stroke-[#6EDFFB]'/>
                                        <circle cx="1365" cy="200" r="11" fill="#6EDFFB" className='animate-pulseBig' style={{ transformOrigin: '1365px 200px' }}/>
                                        <circle cx="1365" cy="200" r="6" fill="white" className='animate-pulseSmall' style={{ transformOrigin: '1365px 200px' }}/>
                                        <text x="1210" y="200" r="11" fill="transparent" className='transition-all duration-[750ms] text-[36px] sofia  group-hover:opacity-1 group-hover:fill-[#6EDFFB] uppercase'>GLossaire</text> 
                                    </Link>


                                    {/* Bibliothèque droite bas */} 
                                    <Link to={'/bibliography'} className='block group transition-all duration-[750ms]'>
                                        <path d="M1426 348L1127.5 331.5L1133 237L1426 245V348Z" stroke="transparent" fill="transparent" fillOpacity={0.1}  stroke-width="2" className='transition-all duration-[750ms] group-hover:fill-[#6EDFFB] group-hover:stroke-[#6EDFFB]'/>
                                        <circle cx="1347" cy="302" r="11" fill="#6EDFFB" className='animate-pulseBig' style={{ transformOrigin: '1347px 302px' }} />
                                        <circle cx="1347" cy="302" r="6" fill="white" className='animate-pulseSmall' style={{ transformOrigin: '1347px 302px' }} />
                                        <text x="1150" y="302" fill="transparent" className='transition-all duration-[750ms] text-[36px] sofia  group-hover:opacity-1 group-hover:fill-[#6EDFFB] uppercase'>Bibliographie</text> 
                                    </Link>
                                </svg>
                            </div>

                            <div className='absolute bottom-[40px] xl:bottom-[100px] right-[60px] xl:right-[100px] w-1/3'>
                                <h2 className='blue abril text-[40px] leading-none'>Atelier de l'historien</h2>
                                <p className='text-white pt-[10px]'>Le 10 septembre 1944, les résistants luxembourgeois se ruent à la Chambre des députés, jusqu’alors occupé par l’administration nazie, et cherchent à prendre possession des documents qui y sont conservés. Suivons leur parcours dans les archives immédiates de l’annexion, en consultant la bibliographie et les sources relatives au Luxembourg pendant la Seconde Guerre mondiale.</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            <div className='flex min-h-[calc(100vh-120px)] lg:min-h-0 relative'>
                <div className='lg:hidden px-[20px] sm:px-0 flex-grow' style={{ backgroundImage: `url(${img8})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                    <div className="container mx-auto relative z-[2]">
                        <h1 className='text-[40px] abril blue pt-[40px] w-[80%] leading-none'>Atelier de l'historien</h1>
                        <p className='text-white text-[24px] pt-[15px]'>Le 10 septembre 1944, les résistants luxembourgeois se ruent à la Chambre des députés, jusqu’alors occupé par l’administration nazie, et cherchent à prendre possession des documents qui y sont conservés. Suivons leur parcours dans les archives immédiates de l’annexion, en consultant la bibliographie et les sources relatives au Luxembourg pendant la Seconde Guerre mondiale.</p>
                        <div className='pt-[20px] pb-[80px] text-white text-[38px]'>
                            <Link to={'/historical-index'} className='uppercase block pt-[10px]'>Index historique</Link>
                            <Link to={'/sources'} className='uppercase block pt-[10px]'>Sources</Link>
                            <Link to={'/research-institutions'} className='uppercase block pt-[10px]'>Institutions de recherche</Link>
                            <Link to={'/glossary'} className='uppercase block pt-[10px]'>Glossaire</Link>
                            <Link to={'/bibliography'} className='uppercase block pt-[10px]'>Bibliographie</Link>
                        </div>
                    </div>
                </div>
                <div className='lg:hidden absolute bg-gradient-to-t from-neutral-900 inset-0'></div>
            </div>
        </>
        // </motion.div>
    )
}