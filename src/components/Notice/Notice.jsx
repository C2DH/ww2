// REACT 
import { Link, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';

// COMPONENTS
import Player from '../Player/Player'
import IconMapBack from '../IconMapBack/IconMapBack';

// FRAMER
import { motion } from "framer-motion"

// ASSETS 
import '../../assets/scss/app.scss'
import next from '../../assets/images/notices/next.png'
import prev from '../../assets/images/notices/prev.png'
import { useSharedState } from '../../contexts/SharedStateProvider';
import { useTranslation } from 'react-i18next';
import siteConfig from '../../../site.config'

export default function Notice() {

    const { t } = useTranslation()
    const { slug } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [results, setResults] = useState(null)
    const [image, setImage] = useState()
    const [sharedState, setSharedState] = useSharedState()

    useEffect(() => {
        fetch(`https://ww2-lu.netlify.app/api/story/${ slug }`, {
            method: "GET",
            headers: {}
        })
        .then((response) => response.json())
        .then((data) => {
            setResults(data)
            setIsLoaded(true)
        })
        .catch((error) => console.log(error))
    }, [isLoaded])


    // useEffect(() => {
    //     setTimeout(() => {
    //         setSharedState({ ...sharedState, showClouds: false })
    //     }, 5000)
    // })

    useEffect(() => {
        console.log('hideClouds');
        setSharedState({ ...sharedState, showClouds: false })
    }, []);
    
    if (isLoaded) {
        return (
            <motion.div className='mask overflow-hidden relative' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0.999, transition: {duration: siteConfig.cloudsTransitionDuration}}} >
                {/* <div className='h-full relative' style={{ background: `url(${}) 50% / cover no-repeat` }}> */}
                <div className='h-full relative' style={{ background: `url(${'https://images.unsplash.com/photo-1571840615922-50fb24649d4b?q=80&w=4515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}) 50% / cover no-repeat` }}>
                    <div className='notice-filter absolute inset-0'></div>

                    <div className="container mx-auto relative px-[30px] lg:px-0">
                        <div className='pt-[30px] lg:pt-[55px] flex flex-col items-center'>
                            <Link to={'/'} className='lg:hidden block text-[20px] lg:text-[24px] text-white uppercase mb-[15px]'>
                                { t('back') }
                            </Link>
                            <span className='text-[27px] abril blue underline underline-offset-[8px] decoration-1 block'>{ results.documents[0].data.geojson.geometry.properties.city.fr_FR}</span>
                            <div className='relative text-center'>
                                <h1 className='text-[34px] lg:text-[48px] blue abril pt-[12px] leading-none'>{ results.data.title.fr_FR }</h1>
                                <Link to={""} className='hidden lg:block absolute top-[50%] -translate-[50%] -left-[100px]'>
                                    <img src={ prev } alt="previous" />
                                </Link>
                                <Link to={""} className='hidden lg:block absolute top-[50%] -translate-[50%] -right-[100px]'>
                                    <img src={ next } alt="next" /> 
                                </Link>
                            </div>
                            <p className='text-[18px] lg:text-[24px] text-center sofia uppercase text-white border border-white px-[15px] py-[5px] mt-[30px] sm:mt-[10px]'>{ results.documents[0].data.description.fr_FR}</p>
                        </div>

                        <Link to={'/'} className='hidden lg:block absolute top-[70px] left-0' state={{ from: location.pathname }}>
                            <IconMapBack />
                        </Link>

                        <div className="grid grid-cols-12 mt-[30px] lg:mt-[70px] lg:gap-x-[40px]">
                            <div className="col-span-12 lg:col-span-2 pt-[20px] order-3 lg:order-1">
                                { results.stories.map((note, index) => {
                                    return (
                                        <Link key={ index } to={ `/note/${note.slug}` } className='block mb-[20px] lg:mb-[30px] transition-all duration-[750ms] border-[0.5px] border-transparent py-[8px] px-[10px] rounded-[5px] border-white lg:border-transparent lg:hover:border-white hover:bg-[#000000]/[0.2]'>
                                            <h3 className='abril text-[22px] text-white uppercase'>{ note.title }</h3>
                                        </Link>
                                    )
                                })}
                            </div>

                            <div className="col-span-12 lg:col-span-6 lg:col-start-4 order-1 lg:order-2">
                                <Player url={ results.covers[0].data.videoResolutions.sd360p.url} controls={ true }/>
                            </div>

                            <div className="col-span-12 lg:col-span-2 lg:col-start-11 pt-[30px] lg:pt-[20px] order-2 lg:order-3">
                                <Link to={'/sources'} className='block uppercase abril text-[22px] text-white'>{ t('sources') }</Link>
                                <Link to={'/historical-index'} className='block uppercase abril text-[22px] text-white pt-[22px]'>{ t('historical-index')}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        )

    }

}