import patternBG from '../../assets/images/source/squarePattern.png'
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import classNames from "classnames"
import { useLanguageContext } from '../../contexts/LanguageProvider'
import Player from '../Player/Player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLongToLine, faArrowRightLongToLine } from '@fortawesome/pro-regular-svg-icons'
import { faMagnifyingGlassMinus , faMagnifyingGlassPlus } from '@fortawesome/pro-regular-svg-icons'
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css'

import { pdfjs } from 'react-pdf'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString()

import test from '../../assets/images/common/test.pdf'
import sound from '../../assets/sounds/test-2.mp3'
import imageDefault from '../../assets/images/common/default.png'

export default function Source({ data, handleSourcePopup }) {

    const { t } = useTranslation()
    const rootPath = import.meta.env.VITE_ROOT
    const { language } = useLanguageContext()
    const [numPages, setNumPages] = useState()
    const [pageNumber, setPageNumber] = useState(1)
  
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


    console.log('data', data)

    return (
        <div style={{ backgroundImage: `url(${patternBG})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} className='w-full lg:relative lg:top-0 absolute -top-[120px]'>
            <div className='hidden lg:block absolute top-[40px] left-[40px] text-[30px] text-white z-[100]'>
                <FontAwesomeIcon icon={faArrowLeftLongToLine} onClick={ handleSourcePopup } className='cursor-pointer'/>
            </div>

            <div className='h-[120px] lg:hidden flex justify-center items-center border-b border-white relative z-[100] bg-[rgba(0,0,0,0.9)]'>
                <span className='text-white uppercase text-[24px] cursor-pointer' onClick={ handleSourcePopup }>{ t('close') }</span>
            </div>

            <div className="container mx-auto relative h-[calc(100dvh-120px)] sm:h-[calc(100vh-120px)] px-[20px]">
                <div className="grid grid-cols-12 pt-[20px] lg:pt-[40px] h-full">
                    {/* <div className="col-span-12 lg:col-span-7 lg:col-start-2 2xl:col-span-8 2xl:col-start-1"> */}
                    <div className="col-span-12 lg:col-span-7 lg:col-start-2">
                        
                        {/** IMAGE */}
                        { data.type === 'picture' &&                            
                            <div className="pb-[20px] 2xl:pb-[40px] ipad:pt-[80px] 2xl:pt-[80px]">
                                <ImageZoom image={ rootPath + data.data.resolutions.preview.url }/>
                            </div>
                        }

                        {/** VIDEO */}
                        { data.type === 'video' && data.data.videoResolutions.sd360p.url &&
                            <div className="pb-[20px] 2xl:pb-[40px] ipad:pt-[80px] 2xl:pt-[80px]">
                                <Player url={ data.data.videoResolutions.sd360p.url } controls={true} status={'video'}/>
                            </div>
                        }

                        {/** PDF */}
                        { data.type === 'pdf' &&
                            <div className="pb-[20px] relative 2xl:pb-[40px] ipad:pt-[80px] 2xl:pt-[80px]">
                                <Document file={test} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pageNumber}/>
                                </Document>

                                <div className='flex justify-center'>
                                    { pageNumber > 1 &&
                                        <FontAwesomeIcon icon={faArrowLeftLongToLine} onClick={ prevPage } className='absolute bottom-0 left-[45%] cursor-pointer text-white text-[20px]'/>
                                    }

                                    { pageNumber < numPages &&
                                        <FontAwesomeIcon icon={faArrowRightLongToLine} onClick={ nextPage } className='absolute bottom-0 right-[45%] cursor-pointer text-white text-[20px] ml-[20px]'/>
                                    }
                                </div>
                            </div>
                        }

                        {/** AUDIO */}
                        { data.type === 'audio' &&
                            <div className="pb-[20px] 2xl:pb-[40px] ipad:pt-[80px] 2xl:pt-[80px]">
                                <img src={ imageDefault } alt="" />
                                <Player url={ sound } controls={true} status={'audio'} />
                            </div>
                        }

                        {/** GALLERY */}
                        { data.type === 'gallery' &&
                            <div className="pb-[20px] 2xl:pb-[40px] ipad:pt-[80px] 2xl:pt-[80px]">
                                <Swiper modules={[Pagination, Navigation]} spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }} loop={true} grabCursor={true}>
                                    <SwiperSlide><img src={ imageDefault } alt="" className='w-full'/></SwiperSlide>
                                    <SwiperSlide><img src={ imageDefault } alt="" className='w-full'/></SwiperSlide>
                                    <SwiperSlide><img src={ imageDefault } alt="" className='w-full'/></SwiperSlide>
                                    <SwiperSlide><img src={ imageDefault } alt="" className='w-full'/></SwiperSlide>
                                </Swiper>
                            </div>
                        }

                        {/** BOOK */}
                        {/* { data.type === 'book' &&
                            <div className="pb-[20px]">
                            </div>
                        } */}

                        {/** 3D */}
                        {/* { data.type === 'book' &&
                            <div className="pb-[20px]">
                            </div>
                        } */}

          
                    </div>

                    <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:border-l text-white overflow-scroll lg:pr-[30px]">
                        <p className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>{ data.data.description[language] }</p>
                        <hr className='w-1/2'/>
                    </div>
                </div>
            </div>
        </div>
    )
}


const ImageZoom = ({ image }) => {
    const [stateZoom, setStateZoom] = useState(null)

    function handleTransform(e){
        setStateZoom(e.instance.transformState.scale)
    }

    return (
        <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0} onTransformed={(e) => handleTransform(e)}
>
            {() => (
                <>
                    <TransformComponent>
                        <img src={ image } alt="test" className='w-full max-h-[400px] 2xl:max-h-[750px] object-cover'/>
                    </TransformComponent>
                    <Controls zoom={stateZoom}/>
                </>
            )}
        </TransformWrapper>
    )
}


const Controls = ({zoom}) => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
        <div className='flex justify-center pt-[20px] lg:pt-[40px] 2xl:pt-[80px]'>
            <div className="flex cursor-pointer">
                <div className='border border-w' style={{ borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px'}} onClick={() => zoomOut() }>
                    <FontAwesomeIcon icon={faMagnifyingGlassMinus} className={classNames('text-[14px] lg:text-[18px] text-white px-[15px] py-[6px] lg:py-[12px]', { "pointer-events-none opacity-20": zoom === null || zoom === 1 })}/>
                </div>
                <div className='uppercase text-[15px] lg:text-[20px] text-white flex items-center border-t border-b border-white px-[12px]' onClick={() => resetTransform()}>
                    <span className={classNames({"pointer-events-none opacity-20": zoom === null || zoom === 1})}>Reset</span>
                </div>
                <div className='border border-w' style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px'}} onClick={() => zoomIn()}>
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} className='text-[14px] lg:text-[18px] text-white px-[15px] py-[6px] lg:py-[12px]' />
                </div>
            </div>
        </div>
    )
}

