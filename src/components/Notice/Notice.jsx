// REACT 
import { Link, useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLanguageContext } from '../../contexts/LanguageProvider';
import { useSharedState } from '../../contexts/SharedStateProvider';
import { useTranslation } from 'react-i18next'
import siteConfig from '../../../site.config'
import classNames from 'classnames';

// COMPONENTS
import Player from '../Player/Player'

// FRAMER
import { motion } from "framer-motion"

// ASSETS 
import '../../assets/scss/app.scss'
import next from '../../assets/images/notices/next.png'
import prev from '../../assets/images/notices/prev.png'
import { fetchData } from '../../lib/utils'
import defaultImage from '../../assets/images/common/default.png'
const rootPath = import.meta.env.VITE_ROOT



export default function Notice() {
    
    const { t } = useTranslation()
    const { language } = useLanguageContext()
    const { slug } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [results, setResults] = useState(null)
    const [capsules, setCapsules] = useState([])
    const [sharedState, setSharedState] = useSharedState()
    const [imgBg, setImgBg] = useState()
    const navigate = useNavigate()


    // DETAILS CAPSULE
    useEffect(() => {
        const getData = async () => {
            const data = await fetchData(`story/${slug}`)            
            if (data) {
                setResults(data)
                const photoItem = data.covers.find(item => item.type === 'photo')            
                if (photoItem) {
                    setImgBg(rootPath + photoItem.attachment)
                } else {
                    setImgBg(defaultImage)
                }
                setIsLoaded(true)
            }
        }
        getData()
    }, [slug])


    // ALL CAPSULES
    useEffect(() => {
        const getAllCapsules = async () => {
            const allCapsules = await fetchData('story', {
                mentioned_to__slug: 'journeys',
                covers__data__type: 'place'
            }, 100)
            
            if (allCapsules) {
                setCapsules(allCapsules.results)
            }
        }
        getAllCapsules()
    }, [])

    useEffect(() => {
        setSharedState({ ...sharedState, showCurtains: false, showClouds:false })
    }, [slug])


    const navigateCapsule = (direction) => {
        if (capsules.length === 0 || !results) return
        const capsuleIndex = capsules.findIndex(capsule => capsule.slug === results.slug)
        let newIndex = capsuleIndex + direction

        if (newIndex < 0) {
          newIndex = capsules.length - 1
        } else if (newIndex >= capsules.length) {
          newIndex = 0
        }  
        navigate(`/notice/${capsules[newIndex].slug}`)
    }
    
    if (isLoaded) {
        return (
            <motion.div className='mask overflow-hidden relative' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0.999, transition: {duration: siteConfig.cloudsTransitionDuration}}} >
                <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1, transition: { duration: 1, delay: 2 } }} exit={{ scale: 1, transition: { duration: 1 } }} className='h-full relative flex' style={{ background: `url(${ imgBg }) 50% / cover no-repeat` }}>
                    <div className='notice-filter absolute inset-0'></div>
                </motion.div>
                <div className="container mx-auto absolute inset-0 px-[30px] overflow-scroll">
                    <div className='pt-[30px] xl:pt-[40px] 2xl:pt-[55px] flex flex-col items-center'>
                        <Link to={'/'} className='xl:hidden block text-[20px] xl:text-[24px] text-white uppercase mb-[15px]'>
                            { t('back') }
                        </Link>
                        <span className='text-[27px] font-abril text-blue underline underline-offset-[8px] decoration-1 block'>{ results.covers[0].data.geojson.properties.city[language]}</span>
                        <div className='relative text-center max-w-screen-sm'>
                            <h1 className='text-[34px] xl:text-[48px] text-blue font-abril pt-[12px] leading-none'>{ results.covers[0].data.title[language] }</h1>
                            <div className='hidden xl:block absolute top-[50%] -translate-[50%] -left-[100px] cursor-pointer' onClick={() => navigateCapsule(-1)}>
                                <img src={ prev } alt="previous" />
                            </div>
                            <div className='hidden xl:block absolute top-[50%] -translate-[50%] -right-[100px] cursor-pointer' onClick={() => navigateCapsule(+1)}>
                                <img src={ next } alt="next" /> 
                            </div>
                        </div>
                        <p className='text-[18px] xl:text-[24px] text-center font-sofia uppercase text-white border border-white px-[15px] py-[5px] mt-[30px] sm:mt-[10px]'>{ results.data.abstract[language]}</p>
                    </div>

                    <Link to={'/'} className='hidden xl:block absolute top-[70px] left-0' state={{ from: location.pathname }}>
                        <IconMapBack />
                    </Link>

                    <div className="grid grid-cols-12 mt-[30px] xl:mt-[50px] 2xl:mt-[70px]">
                        <div className="col-span-12 2xl:col-span-2 pt-[20px] order-3 2xl:order-1">
                            { results.stories.length > 0 && (
                                <>
                                    <span className='block uppercase font-abril text-[22px] text-white mb-[20px] xl:mb-[30px]'>
                                        { results.stories.length > 1 ? t('related_notes') : t('related_note') }
                                    </span>

                                    {results.stories.map((note, index) => (
                                        <Link key={ index } to={ `/note/${note.slug}` } className='block mb-[20px] xl:mb-[30px] transition-all duration-[750ms] border-[0.5px] border-transparent py-[8px] px-[10px] rounded-[5px] border-white xl:border-transparent xl:hover:border-white hover:bg-[#000000]/[0.2]'>
                                            <h3 className='font-abril text-[22px] text-white uppercase'>{ note.data.title[language].replace(/^Note \d+\s*-?\s*/, '') }</h3>
                                        </Link>
                                    ))}
                                </>
                            )}
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, y: '100%' }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 2, duration: 1.5 } }}
                            exit={{ transition: {duration: 0.8, delay: 0.8} } } 
                            className="col-span-12 2xl:col-span-6 2xl:col-start-4 order-1 2xl:order-2 rounded-[6px] 2xl:h-[500px]">
                            { results.covers.map(cover => {
                                if (cover.type === "video") {   
                                    return (
                                        <Player key={cover.id} status={'video'} url={ cover.data.videoResolutions.hsl.alternate[language] } controls={ true } className={'rounded-[6px]'}/>
                                    )
                                }
                            })}
                        </motion.div>

                        <div className="col-span-12 2xl:col-span-2 2xl:col-start-11 pt-[30px] xl:pt-[20px] order-2 2xl:order-3">

                            <Link to={`/sources?filters=${encodeURIComponent(JSON.stringify({ stories__slug: slug }))}`} className="block mb-[20px] xl:mb-[30px] transition-all duration-[750ms] border-[0.5px] border-transparent py-[8px] px-[10px] rounded-[5px] border-white xl:border-transparent xl:hover:border-white hover:bg-[#000000]/[0.2] uppercase font-abril text-[22px] text-white">
                                {t('about')}
                            </Link>
         
                            <Link to={`/glossary?filters=${encodeURIComponent(JSON.stringify({ stories__slug: slug }))}`} className='block mb-[20px] xl:mb-[30px] transition-all duration-[750ms] border-[0.5px] border-transparent py-[8px] px-[10px] rounded-[5px] border-white xl:border-transparent xl:hover:border-white hover:bg-[#000000]/[0.2] uppercase font-abril text-[22px] text-white'>{ t('menuItems.glossary')}</Link>
                        </div>
                    </div>
                </div>
                
            </motion.div>
        )
    }
}


const IconMapBack = () => {
    const [isHover, setIsHover] = useState(false)
    const { t } = useTranslation()

    return (
        <div className="relative iconMapBack" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <svg width="97" height="140" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)" clipRule="evenodd" stroke={isHover ? '#6EDFFB' : '#fff'} strokeWidth=".5" strokeLinecap="round" strokeLinejoin="round"><path d="m40.078 67.644.48.57.166.165.178.137.099.04.105.026.106-.013.098-.033.086-.046.158-.131.145-.164.12-.19.157-.348.343.334.244.256.218.276.132.197.092.204.04.118.098.597.066.23.106.203.145.177.178.145.099.059.31.15.48.283.212.086.35.085.368-.27.198-.104.23-.06.575-.104.217-.086.191-.118.264-.23.23-.262.192-.282.138-.322.119-.19.145-.171.185-.131.099-.053.23-.066.824-.052.231-.04.112-.039.205-.098.369-.263.494.046.356.072.218.086.389.23.204.091.686.19.376.165.184.059.093.006.19-.046.172-.105.508-.387.197-.092.113-.026.112-.013.23.02.594.196-.086.644-.033.57v.559l.046.407.073.243.244.518.184.447.172.282.29.4.877.965.27.27.198.144.105.059.238.085.237.04.244.02.244-.007.244-.033.224-.06.105-.045.488-.243.112-.033.231-.033h.237l.12.013.23.08.099.058.092.072.152.171.112.21.04.118.039.25.006.25-.046.912.501.026.06.348.079.216.06.092.15.177.185.132.224.085.238.04.857.045.362.046.231.073.112.059.106.072.198.17.257.29.198.328.085.236.126.722.039.118.105.23.146.216.164.204.442.492-.046.512-.073.368-.079.216-.19.388-.06.223-.013.118v.118l.033.223.204.703-.185.131-.257.217-.606.577-.752-.551-.25-.118-.264-.066-.692-.066-2.394-.085-.085.348-.093.223-.21.296-.33.354-1.075 1.037-.461.407-.29.204-.416.183-.19.112-.172.144-.073.08-.118.19-.04.111-.158.703-.086.223-.198.289-.237.256-.178.144-.198.125-.105.046-.238.052-.369-.006-.204-.033-.41-.092-.19.67-.073.393-.04.696-.02 1.543-.039.394-.059.242-.112.204-.073.072-.534.374-.27.25-.165.19-.204.315-.08.23-.059.23.35.308.191.125.112.046.356.092.488.039.494-.007.356-.052.218-.079.495-.236.23-.053.363-.032.244.006.237.033.237.059.112.046.218.138.198.17.527.519.627-.236.257-.046.395-.027 3.91.145.389.033.376.085.217.118.086.066.158.164.125.19.185.427.125.23.238.328.507.65.277.453.211.794.08.23.184.334.441.624.106.23.04.125.04.269.026 1.083.052.394.04.131.099.21.257.381.316.492.185.427.105.203.145.177.172.151.21.105.231.053.35.013.428-.033.238.643.138.467.159.426.125.407-.211.131-.547.394-.185.105-.429.184-.19.118-.185.138-.25.243-.225.263-.125.19-.211.413-.06.092-.151.164-.165.138-.092.053-.304.131-.19.105-.172.138-.073.085-.125.191-.046.111-.033.118-.04.25-.006.256.013.256.04.236.065.328.356.014.238.032.23.066.205.098.376.23.31.158.19.131.245.236.29.401-.303.433-.317.354-.257.217-.185.112-.105.032-.231.027-.224-.046-.185-.092-.27-.164-.204-.092-.231-.053-.237-.019-.238.019-.224.066-.488.249-.415.184-.185.125-.158.151-.132.164-.217.341-.205.197-.118.151-.258.584-.151.46-.837.19-.97.066-.23.033-.218.065-.501.224-.455.105-.02 1.116-.033.407-.046.262-.086.25-.059.111-.488.657-.092.196-.02.105.007.197.112.388.046.249.073 1.096.033.276.098.387.482.663.626 2.567.21 2.717-.098.086-2.3-.361-.034.597-4.582-.046-.547-.315-2.275 1.116.073 1.497.02.334-.257.164-.567.368-.772.492-.685-.236-1.167-.407-.046.164-.877 2.987-1.8.558-.936.906.092 2.31.007.171.006.144-.171-.052-.211-.066-.699-.21-.719-.217-1.621-1.601-.159-.151-1.912-.072-.487.919-1.154 2.192-.093.177-.02.04-.329-.086-.323-.078-.007-.007-.606-.158-.58-.151-.106-.341-.086-.262-.817-.105-1.365-.171-.659-.085-.185-.02-.013-.007-2.195.801-.152.053-.244-.407-.092-.158.785-1.037-.666-.61-.594-.545-.151-.145-.08-.676-.125-1.129-.033-.328-.04-.348-.026-.223-.197-1.799-1.833-.59-1.227-1.195-.857-.046-.283-.013-1.213.223-1.8-.538-.705.275-.825.322-.744.295-3.627-.82-1.087-1.116-2.367-2.429-.099-1.247.712-.381.389-.21-.442-1.037-.547-1.26-1.048.407-1.292.499-.337-.499-.494-.742.442-.197.151-.065-.026-.046.06-.046 1.404-1.228.013-.052.132-.125.698.302 1.187-.972.89-.722.824-1.011 1.28-1.142.059-.052.013-.013.31-.368.468-.558-.02-.945-.013-1.024-.712.164.013-.105-.758-.276-1.28-.472.106-.558.132-.729.982-.794.528-.368.606-.42-.033-.61-.046-.827.02-.06.527-1.214.831-1.201-.033-.302-.079-.748-.013-.099.448-1.155 1.609-.099.191-.006 1.022-.059.099-1.405-.119-1.451.152-.866.534-1.34-1.424-.813-.673-.282-.659-.283-1.384-.84-.831-1.227-.08-1.26.31-1.596.904-1.057.685-.67.007-.012.613-.25.93-.492.422-.105h.224l.435.118.343.236.672.828.488.44.402.216.666.203.495.545.718-.715.468-.427.29-.21.211-.105.317-.138.296-.19.37-.329.982-.951.191-.151.198-.132.224-.091.574-.105.224-.06.494-.223.106-.04.23-.052.244-.02h.37l.356.033.527.086.204-.755.093-.486.06-.236.045-.112.112-.203.29-.355-.046-.295-.046-.19-.085-.21-.205-.414-.138-.361-.093-.19-.125-.197-.428-.565-.126-.197-.099-.19-.138-.361-.112-.197-.488-.663-.211-.308-.06-.48-.006-.262.007-.256.033-.243.033-.125.105-.21.145-.177.172-.138.197-.105.429-.177.296-.204.258-.25.125-.19.04-.105.02-.118-.02-.111-.034-.105-.118-.197-.29-.374-.139-.21-.099-.23-.059-.374-.006-.256.013-.256.072-.368.046-.118.119-.204.297-.347.237-.04.224-.059.495-.243.21-.085.633-.197.337-.066-.08-.676v-.518l.04-.381.073-.236.06-.119.138-.203.164-.19.264-.263.283-.256.297-.23.205-.124.408-.171.185-.099.145-.137.053-.08.04-.091.02-.105-.008-.105-.032-.099-.1-.17-.336-.427-.125-.19-.092-.224-.04-.249v-.25l.014-.124.065-.243.152-.289.31-.446.712-.387.58.091.356.033.356.007.237-.026.112-.027.113-.033.197-.111.178-.138.436-.367.19-.125.1-.053.23-.059.126-.013.237.007.237.052.119.046.204.138.27.263Z"/><path d="m79.292 66.009.376.637.197.335.613.873.284.715.962.696 1.253.335 1.187.203.883.368 1.398.046.554.36.257-.026.31-.36 1.008-1.189 1.405-.138.745.637.02.25.026.453.745.636 1.404-.138.745.637.046.703.699-.066.046.702.402-.472.1.242.639-.472.527-.762.31-.643.013.033.468.834-.448 1.148-.844 1.156-.817.393-.521.82.712.533.62.413-.475.998.171 1.326.31.768.04.098.092.893-.462.886-.659.5-.666.472-.296 1.037.164 1.175.416.965.481.426-.33.04H93.17l.006.092.547.46 1.74 1.463-.553.072-.02-.02-.587-.722-.79-.242-.278.4-.164.243.356 1.044.131.275.264.558-.171.19-.613.683-.897 1.444-.943.703-.712.374-.389.453-.679.066-.738.072.026.407.02.295-.284.026-.316.598-.079.15-.376.683-.481.716-.89.722-.158.124-.066.066-.132.086-1.233.76-.66.769.093 1.405 1.41-.132.014.197.08 1.208-1.893 3.715.086 1.346.006.066-.072.078-.336.67-.244.249.033.473-.66.768-.705.072-.343.394-.046.079-.29.663-.277.341-.323.768-.666.768-1.404.118-.31.827.442.906.02.086.151.669-.125.578.079 1.162-.725.059-.712.052-.047-.696-.303.073-.395.551.375.926.475.748.092.151.6.479.41.617-.06 1.004-.139.322.04.696-.35-.007h-.487l.013.617v.073l-.191.164-.627.774-.5.814-.126.617-.046.217.118.971.858-.262.64 3.367-.937.44.31 1.851-.106 1.484-.197 1.398-.02.866.178 1.687-.745.565-.066.046-.6.032-.442-.387-.514.19-.455-.446-1.114.269-.08.013-.158-.183-.995-1.116-.013-.013-.053-.06-.495-.557-2.412-.703-.35-.105-.23-.065.118-.335.323-.893-1.206.236-1.095-1.365-.099-.315-.164-.525-.086-.289-.198-.643-4.041-1.602-.093-.039-.771.695-.211-2.717-.626-2.567-.482-.663-.098-.387-.033-.276-.073-1.096-.046-.249-.112-.388-.007-.197.02-.105.092-.196.488-.657.06-.111.085-.25.046-.262.033-.407.02-1.116.455-.105.501-.224.218-.065.23-.033.97-.066.837-.19.151-.46.258-.584.118-.151.205-.197.217-.341.132-.164.158-.151.185-.125.415-.184.488-.249.224-.066.238-.019.237.019.23.053.205.092.27.164.185.092.224.046.23-.027.106-.032.185-.112.257-.217.317-.354.303-.433-.29-.401-.244-.236-.191-.131-.31-.158-.376-.23-.204-.098-.231-.066-.238-.032-.356-.014-.066-.328-.04-.236-.012-.256.006-.256.04-.25.033-.118.046-.111.125-.191.073-.085.171-.138.191-.105.304-.131.092-.053.165-.138.151-.164.06-.092.21-.413.126-.19.224-.263.25-.243.185-.138.191-.118.429-.184.185-.105.547-.394.21-.131-.124-.407-.159-.426-.138-.467-.237-.643-.429.033-.35-.013-.23-.053-.211-.105-.172-.151-.145-.177-.105-.203-.185-.427-.316-.492-.257-.381-.1-.21-.039-.131-.052-.394-.027-1.083-.04-.269-.039-.125-.106-.23-.441-.624-.185-.334-.079-.23-.21-.794-.278-.453-.507-.65-.238-.328-.125-.23-.185-.427-.125-.19-.158-.164-.086-.066-.217-.118-.376-.085-.39-.033-3.909-.145-.395.027-.257.046-.627.236-.527-.519-.198-.17-.217-.138-.113-.046-.237-.06-.237-.032-.244-.007-.363.033-.23.053-.495.236-.218.079-.355.052-.495.007-.488-.04-.356-.091-.112-.046-.191-.125-.35-.308.06-.23.079-.23.204-.315.165-.19.27-.25.534-.374.073-.072.112-.204.06-.242.039-.394.02-1.543.04-.696.072-.394.191-.67.409.093.204.033.37.006.237-.052.105-.046.198-.125.178-.144.237-.256.198-.29.086-.222.158-.703.04-.111.118-.19.073-.08.171-.144.191-.112.416-.183.29-.204.461-.407 1.075-1.037.33-.354.21-.296.093-.223.085-.348 2.394.085.692.066.264.066.25.118.752.551.606-.577.257-.217.185-.131-.204-.703-.033-.223v-.118l.013-.118.06-.223.19-.388.08-.216.072-.368.046-.512-.442-.492-.164-.204-.145-.216-.106-.23-.04-.118-.125-.722-.085-.237-.198-.328-.257-.289-.198-.17-.106-.072-.112-.06-.23-.072-.363-.046-.857-.046-.237-.039-.225-.085-.184-.132-.152-.177-.06-.092-.078-.216-.06-.348.29-.361.113-.204.079-.23.105-.479.066-.23.099-.203.218-.394.145-.328.112-.21.138-.184.455-.532.132-.183.27-.525.139-.204.244-.282.698-.716.218-.302.06-.105.078-.236.112-.696-1.041-1.162-.172-.249-.072-.184-.013-.098.013-.099.033-.098.105-.177.416-.512.112-.19.079-.204.119-.532.066-.21.098-.203.225-.394.19-.44.113-.184.132-.177.712.269.263.066.27.046.561.046 1.55.085.408-.013.264-.046.125-.046.191-.118.159-.158.065-.092.106-.203.178-.69.033-.078.119.098.02.276.026.433-.693.761.1 1.418 2.208-.17-.046-.71.27-.301.211-.013.211-.007.303-.932.172-.256.389-.59 1.107-.296 1.438-.263.969.256.606.663.719 1.313.488 1.011Z"/><path d="m34.955.84.6 2.31.527.296.877.486.139.079.54.203 1.306.44.197.066 1.286.203.83-.322.403-2.75 2.565.309.679.426 1.648 1.03.468 1.806.138.532-.046.105-.356.715-.132.453-.56 1.26-.013.04.732.328.698.315.244.092.073 1.378-.732.723-.765.013.106 2.113.771-.013-.732.722.033.703.772-.014.04.71-1.543.026.033.709.81.689-1.542.026.145 2.823-.772.013.033.709.811.682-.04-.702.74-.715.072 1.404-.739.722.026.453.014.25-.772.013-.013-.197-.567-.125-.204.151.046.893.804.69-.033-.703.772-.013.085 1.595.027.512.804.689.04.702.81.69-.777.02.072 1.404.85 1.391.772-.013.033.703-.771.02.04.702-.779.013 1.622 1.378.771-.02.04.71-.739.715.034.71-.772.012.033.703 1.55-.033.032.702.811.69 1.583.675-.772.014.06 1.122.04.755.118 2.343.771-.02.073 1.412 1.549-.033-.073-1.405-.77.014-.04-.703.276-.006.159.282.85.637.264-.749.323-.899.837-.44.574.794.06 1.221.335.893.6.263.7.02.507.006.764.551.429 1.169.376.952-.007 1.161-.165.946.014 1.227.131.053.778.315.31.728-.197.775-.238.709.336.912.653 1.103-.191.295-.297.276.218-.007.04.703.25-.007.508-.006.039.702.804.683.04.702.752-.02.04.703.75-.02.779.676.698-.026.633-.046.066.702.62-.052.119 1.418.652-.053.66-.761.738-.06.785.657.046.709-.739.053.047.702.738-.053.046.71.666.55-.033.08-.178.689-.106.203-.066.092-.158.158-.19.118-.126.046-.264.046-.409.013-1.549-.085-.56-.047-.27-.045-.264-.066-.712-.27-.132.178-.112.184-.192.44-.224.394-.099.203-.066.21-.118.532-.08.203-.111.19-.416.513-.105.177-.033.098-.013.099.013.098.072.184.172.25 1.041 1.161-.112.696-.079.236-.06.105-.217.302-.698.716-.244.282-.139.204-.27.525-.132.183-.455.532-.138.184-.112.21-.145.328-.218.394-.099.204-.066.23-.105.478-.08.23-.111.204-.29.36-.502-.025.046-.913-.006-.25-.04-.249-.04-.118-.111-.21-.152-.17-.092-.073-.1-.059-.23-.079-.119-.013h-.237l-.23.033-.113.033-.488.243-.105.046-.224.059-.244.033-.244.006-.244-.02-.237-.039-.238-.085-.105-.06-.198-.144-.27-.269-.877-.965-.29-.4-.172-.282-.184-.447-.244-.518-.073-.243-.046-.407v-.558l.033-.571.086-.644-.593-.197-.231-.02-.112.014-.112.026-.198.092-.508.387-.171.105-.191.046-.093-.006-.184-.06-.376-.163-.686-.19-.204-.093-.39-.23-.217-.085-.356-.072-.494-.046-.37.263-.204.098-.112.04-.23.039-.825.052-.23.066-.1.053-.184.13-.145.171-.119.19-.138.322-.191.283-.231.262-.264.23-.19.118-.218.086-.574.105-.23.059-.199.105-.369.269-.35-.085-.21-.086-.481-.282-.31-.151-.1-.06-.177-.144-.145-.177-.106-.203-.066-.23-.099-.597-.04-.118-.091-.204-.132-.197-.218-.276-.244-.256-.343-.334-.158.347-.118.19-.146.165-.158.131-.086.046-.098.033-.106.013-.105-.026-.1-.04-.177-.137-.165-.165-.481-.57-.27-.263-.205-.138-.119-.046-.237-.052-.237-.007-.126.013-.23.06-.1.052-.19.124-.436.368-.178.138-.197.111-.112.033-.113.027-.237.026-.356-.007-.356-.033-.58-.091-.712.387-.31.446-.152.289-.066.243-.013.125v.249l.04.25.092.223.125.19.337.427.099.17.033.099.006.105-.02.105-.04.092-.052.079-.145.137-.185.099-.408.17-.205.125-.296.23-.284.256-.264.263-.164.19-.139.203-.06.119-.072.236-.04.38v.52l.08.675-.336.066-.633.197-.211.085-.495.243-.224.06-.237.039-.297.347-.119.204-.046.118-.072.368-.014.256.007.256.06.374.098.23.139.21.29.374.119.197.032.105.02.111-.02.118-.039.106-.125.19-.257.25-.297.203-.429.177-.197.105-.172.138-.145.177-.105.21-.033.125-.033.243-.007.256.007.262.06.48.21.308.488.663.112.197.138.36.1.191.125.197.428.565.125.197.093.19.138.361.204.414.086.21.046.19.047.295-.29.355-.113.203-.046.112-.06.236-.091.486-.205.755-.527-.086-.356-.032h-.37l-.243.02-.231.052-.106.04-.494.222-.224.06-.574.105-.224.091-.198.132-.19.15-.983.953-.37.328-.296.19-.317.138-.21.105-.29.21-.469.427-.718.715-.495-.545-.666-.203-.402-.217-.488-.44-.672-.827-.343-.236-.435-.118h-.224l-.422.105-.93.492-.613.25.323-.309-.864-1.142-.712-1.149-.962-.965-1.068-.15-1.042.373-.435.158-2.044-.111v-.105l.014-.362-.58-3.23-.08-.17L6.27 75.12l-.244-.23-1.167-1.083-.046-.04-1.721-.012-1.206-.007h-.132l-.007-.243-.066-1.313-.336-1.62-.132-.172-.461-.57-.218-.276.138-.335.324-.748L.77 67.02l-.184-.558-.257-.781.5-.361.047-.985.336.02v-.532l.007-.978-.403-.256.403-.059.263-.033.277-.04.224-.59-.164-.69-.014-.052-.105-1.076.105-.23 1.227.052.672.027.191.006.205-.157.712-1.195.04-.052-.053-.033-.047-.21.416.085h.125l.264.23-.053-.23-.02-.092-.217-.978L3.75 56.19l-1.892-.925-.303-.171-1.358-.788-.06-.433-.04-.276-.019-.092.27-.38.91-1.287.765-.177.837-1.45.086-.296.185-.617.448-1.47.699-1.17.145-1.141-.112-1.162.072-.407.25-1.346 1.3-.144.468-.729.349.072.402.08.02.012 1.147.473.587-.748.072-.788.06-.696 1.292-.276.033-.006 1.18-.282.791-.847-.007-.643-.006-.723-.52-.741-.476-.676-.923-.946-.092-.689-.092-.689.217-1.24.732-.467 1.464-.925 1.193-1.917.772-3.04-.258-2.375-.026-.283-.033-.288.6-1.116 1.351-1.221.27-.118.785-.329.785-.393.217-1.523.014-.105.316-1.464.64-1.13.059-.34.184-1.176.12-.295.382-.289 2.465-1.844 1.385-1.03 1.852-1.386.31-.236 1.668-6.925.264-.092 2.248-.814.237.013 1.523-.204L34.236.27l.521-.19.198.761Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h97v140H0z"/></clipPath></defs></svg>
            
            <span className={classNames("uppercase absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] text-[24px] transition-all duration-[750ms]", { 
                'text-white': !isHover,
                'text-[#6EDFFB]': isHover
            })}>{ t('back') }</span>
        </div>
    )
}