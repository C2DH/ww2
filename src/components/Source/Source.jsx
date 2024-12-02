/* eslint-disable react/no-unknown-property */
import patternBG from '../../assets/images/source/squarePattern.png'
import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next'
import classNames from "classnames"
import { useLanguageContext } from '../../contexts/LanguageProvider'
import Player from '../Player/Player'
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css'
import { pdfjs } from 'react-pdf'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import imageDefault from '../../assets/images/common/default.png'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useBounds, Bounds, useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import { Link, useLocation } from 'react-router-dom'
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString()  


export default function Source({ data, handleSourcePopup }) {

    const { t } = useTranslation()
    const rootPath = import.meta.env.VITE_ROOT
    const { language } = useLanguageContext()
    const [numPages, setNumPages] = useState()
    const [pageNumber, setPageNumber] = useState(1)
    const [pageWidth, setPageWidth] = useState(window.innerWidth * 0.9)
    const [modelHeight, setModelHeight] = useState('500px')
    const { pathname } = useLocation()


    console.log('source popup', data)

    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    }

    const nextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1)
        }
    }

    const prevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width > 1280) {
                setPageWidth(500)
                setModelHeight('calc(100vh - 400px)')
            } else if (width > 768) {
                setPageWidth(420)
                setModelHeight('500px')
            } else if (width > 400) {
                setPageWidth(380)
                setModelHeight('400px')
            } else {
                setPageWidth(300)
                setModelHeight('300px')
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div style={{ backgroundImage: `url(${patternBG})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} className={classNames('w-full h-full lg:relative lg:top-0 absolute', {
            "-top-[120px]": !pathname === 'spatiotemporal-map',
        })}>
            <div className={classNames('hidden lg:block absolute top-[40px] left-[40px] text-[30px] text-white z-[100]', {
                'top-[80px]': pathname === '/spatiotemporal-map'
            })}>
                <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer' onClick={ handleSourcePopup } >
                    <path d="M23.875 9.625C24.3125 9.625 24.75 10.0625 24.75 10.5C24.75 10.9922 24.3125 11.375 23.875 11.375H7.57812L13.9766 17.7734C14.3047 18.1016 14.3047 18.7031 13.9766 19.0312C13.6484 19.3594 13.0469 19.3594 12.7188 19.0312L4.84375 11.1562C4.67969 10.9922 4.625 10.7734 4.625 10.5C4.625 10.2812 4.67969 10.0625 4.84375 9.89844L12.7188 2.02344C13.0469 1.69531 13.6484 1.69531 13.9766 2.02344C14.3047 2.35156 14.3047 2.95312 13.9766 3.28125L7.57812 9.625H23.875ZM1.125 0C1.5625 0 2 0.4375 2 0.875V20.125C2 20.6172 1.5625 21 1.125 21C0.632812 21 0.25 20.6172 0.25 20.125V0.875C0.25 0.4375 0.632812 0 1.125 0Z" fill="white"/>
                </svg>  
            </div>

            <div className='h-[120px] lg:hidden flex justify-center items-center border-b border-white relative z-[100] bg-[rgba(0,0,0,0.9)]'>
                <span className='text-white uppercase text-[24px] cursor-pointer' onClick={ handleSourcePopup }>{ t('close') }</span>
            </div>

            <div className={classNames("container mx-auto relative px-[20px]", {
                "h-[calc(100dvh-120px)] sm:h-[calc(100vh-120px)]": pathname !== '/spatiotemporal-map',
                "h-[calc(100dvh-120px)] sm:h-[calc(100vh-80px)]": pathname === '/spatiotemporal-map'
            })}>
                <div className="grid grid-cols-12 pt-[20px] lg:pt-[40px] h-auto md:h-full">
                    <div className="col-span-12 lg:col-span-7 lg:col-start-2">
                        
                        <div className="pb-[20px] pt-[20px] 2xl:pb-[40px] 2xl:pt-[80px] relative">
                        
                            {/** IMAGE */}
                            {data.covers?.map(item => {
                                if (item.type === 'glossary') {
                                    return (
                                        <ImageZoom key={item.id} image={ item.attachment ? rootPath + item.attachment : imageDefault }/>
                                    )
                                }
                            })}

                            { (data.type === 'image' && data.data?.resolutions?.preview?.url && data.attachment.split('.')[1] !== "pdf") &&                        
                                <ImageZoom image={ rootPath + data.attachment } alt={data.title}/>
                            }

                            { (data.type === 'image' && data.data?.resolutions?.preview?.url && data.attachment.split('.')[1] === "pdf") &&                        
                                <>
                                    {pageNumber > 1 &&
                                        <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute -top-[10px] left-[20px] transform -translate-x-1/2 space-x-4 cursor-pointer text-white text-[20px]' onClick={prevPage} >
                                            <path d="M23.875 9.625C24.3125 9.625 24.75 10.0625 24.75 10.5C24.75 10.9922 24.3125 11.375 23.875 11.375H7.57812L13.9766 17.7734C14.3047 18.1016 14.3047 18.7031 13.9766 19.0312C13.6484 19.3594 13.0469 19.3594 12.7188 19.0312L4.84375 11.1562C4.67969 10.9922 4.625 10.7734 4.625 10.5C4.625 10.2812 4.67969 10.0625 4.84375 9.89844L12.7188 2.02344C13.0469 1.69531 13.6484 1.69531 13.9766 2.02344C14.3047 2.35156 14.3047 2.95312 13.9766 3.28125L7.57812 9.625H23.875ZM1.125 0C1.5625 0 2 0.4375 2 0.875V20.125C2 20.6172 1.5625 21 1.125 21C0.632812 21 0.25 20.6172 0.25 20.125V0.875C0.25 0.4375 0.632812 0 1.125 0Z" fill="white"/>
                                        </svg>  
                                    }

                                    {pageNumber < numPages &&
                                        <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg" className='rotate-180 absolute -top-[10px] left-[50px] transform -translate-x-1/2 space-x-4 cursor-pointer text-white text-[20px] ml-[20px]' onClick={nextPage} >
                                            <path d="M23.875 9.625C24.3125 9.625 24.75 10.0625 24.75 10.5C24.75 10.9922 24.3125 11.375 23.875 11.375H7.57812L13.9766 17.7734C14.3047 18.1016 14.3047 18.7031 13.9766 19.0312C13.6484 19.3594 13.0469 19.3594 12.7188 19.0312L4.84375 11.1562C4.67969 10.9922 4.625 10.7734 4.625 10.5C4.625 10.2812 4.67969 10.0625 4.84375 9.89844L12.7188 2.02344C13.0469 1.69531 13.6484 1.69531 13.9766 2.02344C14.3047 2.35156 14.3047 2.95312 13.9766 3.28125L7.57812 9.625H23.875ZM1.125 0C1.5625 0 2 0.4375 2 0.875V20.125C2 20.6172 1.5625 21 1.125 21C0.632812 21 0.25 20.6172 0.25 20.125V0.875C0.25 0.4375 0.632812 0 1.125 0Z" fill="white"/>
                                        </svg>  
                                    }
                                    
                                    <Document file={ data.attachment } onLoadSuccess={onDocumentLoadSuccess}>
                                        <Page pageNumber={pageNumber} size="A4" width={pageWidth} className="relative"/>
                                    </Document>
                                </>
                            }

                            { (data.type === 'image' && !data.data?.resolutions?.preview?.url) &&                        
                                <>
                                    {pageNumber > 1 &&
                                        <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute -top-[10px] left-[20px] transform -translate-x-1/2 space-x-4 cursor-pointer text-white text-[20px]' onClick={prevPage} >
                                            <path d="M23.875 9.625C24.3125 9.625 24.75 10.0625 24.75 10.5C24.75 10.9922 24.3125 11.375 23.875 11.375H7.57812L13.9766 17.7734C14.3047 18.1016 14.3047 18.7031 13.9766 19.0312C13.6484 19.3594 13.0469 19.3594 12.7188 19.0312L4.84375 11.1562C4.67969 10.9922 4.625 10.7734 4.625 10.5C4.625 10.2812 4.67969 10.0625 4.84375 9.89844L12.7188 2.02344C13.0469 1.69531 13.6484 1.69531 13.9766 2.02344C14.3047 2.35156 14.3047 2.95312 13.9766 3.28125L7.57812 9.625H23.875ZM1.125 0C1.5625 0 2 0.4375 2 0.875V20.125C2 20.6172 1.5625 21 1.125 21C0.632812 21 0.25 20.6172 0.25 20.125V0.875C0.25 0.4375 0.632812 0 1.125 0Z" fill="white"/>
                                        </svg>  
                                    }

                                    {pageNumber < numPages &&
                                        <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg" className='rotate-180 absolute -top-[10px] left-[50px] transform -translate-x-1/2 space-x-4 cursor-pointer text-white text-[20px] ml-[20px]' onClick={nextPage} >
                                            <path d="M23.875 9.625C24.3125 9.625 24.75 10.0625 24.75 10.5C24.75 10.9922 24.3125 11.375 23.875 11.375H7.57812L13.9766 17.7734C14.3047 18.1016 14.3047 18.7031 13.9766 19.0312C13.6484 19.3594 13.0469 19.3594 12.7188 19.0312L4.84375 11.1562C4.67969 10.9922 4.625 10.7734 4.625 10.5C4.625 10.2812 4.67969 10.0625 4.84375 9.89844L12.7188 2.02344C13.0469 1.69531 13.6484 1.69531 13.9766 2.02344C14.3047 2.35156 14.3047 2.95312 13.9766 3.28125L7.57812 9.625H23.875ZM1.125 0C1.5625 0 2 0.4375 2 0.875V20.125C2 20.6172 1.5625 21 1.125 21C0.632812 21 0.25 20.6172 0.25 20.125V0.875C0.25 0.4375 0.632812 0 1.125 0Z" fill="white"/>
                                        </svg>  
                                    }
                                    
                                    <Document file={ rootPath + data.attachment } onLoadSuccess={onDocumentLoadSuccess}>
                                        <Page pageNumber={pageNumber} size="A4" width={pageWidth} className="relative"/>
                                    </Document>
                                </>
                            }

                            {/** VIDEO */}
                            { (data.type === 'video' && data.data?.videoResolutions?.hsl?.url) &&
                                <Player url={ data.data.videoResolutions.hsl.url } controls={true} status={'video'}/>
                            }

                            { data.type === 'video' && data.attachment &&
                                <Player url={ data.attachment } controls={true} status={'video'}/>
                            }

                            {/** PDF */}
                            { data.type === 'pdf' &&
                                <>
                                    {pageNumber > 1 &&
                                        <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute -top-[10px] left-[20px] transform -translate-x-1/2 space-x-4 cursor-pointer text-white text-[20px]' onClick={prevPage} >
                                            <path d="M23.875 9.625C24.3125 9.625 24.75 10.0625 24.75 10.5C24.75 10.9922 24.3125 11.375 23.875 11.375H7.57812L13.9766 17.7734C14.3047 18.1016 14.3047 18.7031 13.9766 19.0312C13.6484 19.3594 13.0469 19.3594 12.7188 19.0312L4.84375 11.1562C4.67969 10.9922 4.625 10.7734 4.625 10.5C4.625 10.2812 4.67969 10.0625 4.84375 9.89844L12.7188 2.02344C13.0469 1.69531 13.6484 1.69531 13.9766 2.02344C14.3047 2.35156 14.3047 2.95312 13.9766 3.28125L7.57812 9.625H23.875ZM1.125 0C1.5625 0 2 0.4375 2 0.875V20.125C2 20.6172 1.5625 21 1.125 21C0.632812 21 0.25 20.6172 0.25 20.125V0.875C0.25 0.4375 0.632812 0 1.125 0Z" fill="white"/>
                                        </svg>  
                                    }

                                    {pageNumber < numPages &&
                                        <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg" className='rotate-180 absolute -top-[10px] left-[50px] transform -translate-x-1/2 space-x-4 cursor-pointer text-white text-[20px] ml-[20px]' onClick={nextPage} >
                                            <path d="M23.875 9.625C24.3125 9.625 24.75 10.0625 24.75 10.5C24.75 10.9922 24.3125 11.375 23.875 11.375H7.57812L13.9766 17.7734C14.3047 18.1016 14.3047 18.7031 13.9766 19.0312C13.6484 19.3594 13.0469 19.3594 12.7188 19.0312L4.84375 11.1562C4.67969 10.9922 4.625 10.7734 4.625 10.5C4.625 10.2812 4.67969 10.0625 4.84375 9.89844L12.7188 2.02344C13.0469 1.69531 13.6484 1.69531 13.9766 2.02344C14.3047 2.35156 14.3047 2.95312 13.9766 3.28125L7.57812 9.625H23.875ZM1.125 0C1.5625 0 2 0.4375 2 0.875V20.125C2 20.6172 1.5625 21 1.125 21C0.632812 21 0.25 20.6172 0.25 20.125V0.875C0.25 0.4375 0.632812 0 1.125 0Z" fill="white"/>
                                        </svg>  
                                    }
                                    
                                    <Document file={ data.attachment } onLoadSuccess={onDocumentLoadSuccess}>
                                        <Page pageNumber={pageNumber} size="A4" width={pageWidth} className="relative"/>
                                    </Document>
                                </>
                            }
                            

                            {/** AUDIO */}
                            { (data.type === 'audio' && data.attachment) &&
                                <>
                                    <img src={imageDefault } alt={ "default image"}/>
                                    <Player url={ rootPath + data.attachment } controls={true} status={'audio'} />     
                                </>
                            }

                            {/** GALLERY */}
                            { data.type === 'gallery' &&
                                <Swiper modules={[Pagination, Navigation]} spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }} loop={true} grabCursor={true}>
                                    <SwiperSlide><img src={ imageDefault } alt="" className='w-full'/></SwiperSlide>
                                    <SwiperSlide><img src={ imageDefault } alt="" className='w-full'/></SwiperSlide>
                                    <SwiperSlide><img src={ imageDefault } alt="" className='w-full'/></SwiperSlide>
                                    <SwiperSlide><img src={ imageDefault } alt="" className='w-full'/></SwiperSlide>
                                </Swiper>
                            }

                            {/** BOOK */}
                            { (data.type === 'book' || data.type === "reference") &&
                                <img src={ imageDefault } alt="" className='w-full' />
                            }

                            {/** 3D */}
                            { data.type === '3d' &&
                                <ModelViewer model="/assets/images/3D/avatar_1.glb" height={modelHeight} />  
                            }
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:border-l text-white overflow-scroll lg:pr-[30px]">
                        
                        {data.covers?.map(item => {
                            if (item.type === 'glossary') {
                                return (
                                    <div key={item.id}>
                                        <h1 className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>{ item.data.title[language] }</h1>
                                        <hr className='w-1/2'/>
                                        <p className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>{ item.data?.description[language] }</p>
                                    </div>
                                )    
                            }    
                        })}

                        { (data.type === "book" || data.type === "reference") &&
                            <>
                                <h1 className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>{ data.data.zotero.title }</h1>
                                <hr className='w-1/2'/>
                                <span className='block lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Publisher : { data.data.zotero.publisher ? data.data.zotero.publisher : "NC" }</span>
                                <hr className='w-1/2'/>
                                <Link to={data.data.zotero.url} target="_blank" className='block lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Lien : <span className='hover:text-blue transition-all duration-500'>{ data.data.zotero.url ? data.data.zotero.url : "NC" }</span></Link>
                            </>
                        }

                        { data.type === "image" &&
                            <>
                                <h1 className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>{ data.data.title[language] }</h1>
                                <hr className='w-1/2'/>
                                <p className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>{data.data.description[language]}</p>
                                <hr className='w-1/2'/>
                                <span className='block lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Source : {data.data.provenance ? data.data.provenance : "NC"}</span>
                                <hr className='w-1/2'/>
                                <span className='block lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Copyrights : {data.data.copyrights ? data.data.copyrights : "NC" }</span>
                            </>
                        }

                        { data.type === "audio" &&
                            <>
                                <h1 className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>{ data.data.title[language] }</h1>
                                <hr className='w-1/2'/>
                                <p className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>{data.data.description[language]}</p>
                                <hr className='w-1/2'/>
                                <span className='block lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Source : {data.data.provenance ? data.data.provenance : "NC"}</span>
                                <hr className='w-1/2'/>
                                <span className='block lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Copyrights : {data.data.copyrights ? data.data.copyrights : "NC" }</span>
                            </>
                        }


                        { data.type === "video" &&
                            <>
                                <h1 className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>{ data.data.title[language] }</h1>
                                <hr className='w-1/2'/>
                                <p className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>{data.data.description[language]}</p>
                                <hr className='w-1/2'/>
                                <span className='block lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Source : {data.data.provenance ? data.data.provenance : "NC"}</span>
                                <hr className='w-1/2'/>
                                <span className='block lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Copyrights : {data.data.copyrights ? data.data.copyrights : "NC" }</span>
                            </>
                        }

                        { data.type === "pdf" &&
                            <>
                                <h1 className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>{ data.data.title[language] }</h1>
                                <hr className='w-1/2'/>
                                <p className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>{data.data.description[language]}</p>
                                <hr className='w-1/2'/>
                                <span className='block lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Source : {data.data.provenance ? data.data.provenance : "NC"}</span>
                                <hr className='w-1/2'/>
                                <span className='block lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Copyrights : {data.data.copyrights ? data.data.copyrights : "NC" }</span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


const ImageZoom = ({ image, alt }) => {
    const [stateZoom, setStateZoom] = useState(null)

    function handleTransform(e){
        setStateZoom(e.instance.transformState.scale)
    }

    return (
        <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0} onTransformed={(e) => handleTransform(e)}>
            {() => (
                <>
                    <TransformComponent>
                        <img src={ image } alt={ alt } className='w-full max-h-[400px] 2xl:max-h-[750px] object-cover'/>
                    </TransformComponent>
                    <Controls zoom={stateZoom}/>
                </>
            )}
        </TransformWrapper>
    )
}

const Controls = ({zoom}) => {
    const { zoomIn, zoomOut, resetTransform } = useControls()
    return (
        <div className='flex justify-center pt-[20px] lg:pt-[40px] 2xl:pt-[80px]'>
            <div className="flex cursor-pointer">
                <div className='border border-w' style={{ borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px'}} onClick={() => zoomOut() }>
                    <MagnifyingGlassMinusIcon style={{width: '50px'}} className={classNames('text-white px-[15px] py-[6px] lg:py-[12px]', { "pointer-events-none opacity-20": zoom === null || zoom === 1 })} />
                </div>
                <div className='uppercase text-[15px] lg:text-[20px] text-white flex items-center border-t border-b border-white px-[12px]' onClick={() => resetTransform()}>
                    <span className={classNames({"pointer-events-none opacity-20": zoom === null || zoom === 1})}>Reset</span>
                </div>
                <div className='border border-w' style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px'}} onClick={() => zoomIn()}>
                    <MagnifyingGlassPlusIcon style={{width: '50px'}} className={classNames('text-white px-[15px] py-[6px] lg:py-[12px]', { "pointer-events-none opacity-20": zoom === 8 })}/>
                </div>
            </div>
        </div>
    )
}

const Model3D = ({ model }) => {
    const { scene } = useGLTF(model)
    const api = useBounds()
  
    useEffect(() => {
        if (api) {
            api.refresh(scene).fit()
            const box = new THREE.Box3().setFromObject(scene)
            const center = box.getCenter(new THREE.Vector3())
            const size = box.getSize(new THREE.Vector3())
            scene.position.y -= center.y
            scene.position.z = -size.z / 2
        }    
    }, [scene, api])
  
    return (
        <group position={[0, 0, 0]}>
            <primitive object={scene} />
        </group>
    )
}
  
const ModelViewer = ({ model, height }) => {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ width: '100%', height: height }} >
            
            {/* Éclairage */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            
            {/* Modèle */}
            <Suspense fallback={null}>
                <Bounds fit clip observe margin={1}>
                    <Model3D model={model}/>   
                </Bounds>
            </Suspense>
  
            {/* Contrôles */}
            <OrbitControls enablePan enableZoom enableRotate />
        </Canvas>
    )
}
