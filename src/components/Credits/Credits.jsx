import { motion } from 'framer-motion'
import { useSharedState } from '../../contexts/SharedStateProvider'
import { useEffect, useRef, useState } from 'react'
import siteConfig from '../../../site.config'
import { useTranslation } from 'react-i18next'
import bgBlack from '../../assets/images/common/bg-black.jpg'
import { convertToHtml, fetchData } from '../../lib/utils'
import { useLanguageContext } from '../../contexts/LanguageProvider'
import { Link, useNavigate } from 'react-router-dom'
import logoGouv from '../../assets/images/menu/logo-gouv.svg'
import logoUni from '../../assets/images/menu/logo-uni.svg'
import Player from '../Player/Player'
import { ArrowUturnLeftIcon, ForwardIcon } from "@heroicons/react/24/outline";
const video = import.meta.env.VITE_VIDEO_TRAILER_HOME


export default function Credits() {

    const { t } = useTranslation()
    const [sharedState, setSharedState] = useSharedState()
    const [credits, setCredits] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const {language} = useLanguageContext()
    const [animationEnded, setAnimationEnded] = useState(false)
    const [skipVideo, setSkipVideo] = useState(false)
    const navigate = useNavigate()
    const [animationDuration, setAnimationDuration] = useState(20); // Valeur par défaut de la durée de l'animation
    const { width } = useWindowSize();

    useEffect(() => {
        if (width <= 768) {
          setAnimationDuration(width / 10)
        } else {
          setAnimationDuration(width / 100)
        }
      }, [width]);

    const handleAnimationEnd = () => {
        setAnimationEnded(true)
    }

    const getData = async () => {
        const data = await fetchData(`/story/credits`)    
        setCredits(data)
        setIsLoaded(true)
    }

    const handleSkipVideo = () => {
        navigate('/')
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        setSharedState({ ...sharedState, showCurtains: false })
    }, [])

    
    if (isLoaded) {
        return (
            <>
                <motion.div
                    style={{ background: `url(${bgBlack}) center / cover no-repeat` }}
                    className="px-[20px] sm:px-0"
                    exit={{ opacity: 0.999, transition: { duration: 1 } }}
                    id="credits"
                >
                    <div className="container mx-auto h-[calc(100dvh-120px)] sm:h-[calc(100vh-120px)] flex flex-col overflow-hidden relative">
                        <div
                            className={`credits-animation absolute w-full ${animationEnded ? 'stopped' : ''}`} onAnimationEnd={handleAnimationEnd}
                            style={{ animation: `scrollCredits ${animationDuration}s linear`}}
                        >
                            <div className="credits-content">
                                <h1 className="text-center mt-[100px] text-[32px] md:text-[40px] leading-none text-blue font-abril">{t('credits')}</h1>
                
                            <div className="grid grid-cols-12">
                                <div className="col-span-8 col-start-3 mt-[100px]">
                                    <div dangerouslySetInnerHTML={{ __html: convertToHtml(credits.data.abstract[language]) }} className="text-[30px] leading-none text-white text-center" /></div>
                                </div>
                
                                <div className="flex justify-center items-center py-[60px]">
                                    <div>
                                        <Link to="https://www.c2dh.uni.lu/" target="_blank">
                                            <img src={logoUni} alt="Logo Université" />
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="https://mcult.gouvernement.lu/fr.html" target="_blank">
                                            <img src={logoGouv} alt="Logo Gouvernement" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                { animationEnded &&
                    <motion.div
                        className="h-[100vh] absolute inset-0 z-[201] flex items-center justify-center bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }} // Durée de l'animation de fade-in
                    >
                        <Player url={video} status={"trailer"} loop={true} />
                        <div onClick={handleSkipVideo} className="absolute top-[50%] -translate-y-[50%] right-[50px] cursor-pointer bg-black bg-opacity-50 p-2 rounded-full" >
                            <ForwardIcon style={{ width: '50px', color: 'white' }} />
                        </div>
                    </motion.div>
                }
            </>
        )
    }

    

        
    
}



const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Ajoutez l'écouteur d'événement pour la redimensionnement de la fenêtre
      window.addEventListener('resize', handleResize);

      // Initialiser la taille de la fenêtre lors du premier rendu
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
  };