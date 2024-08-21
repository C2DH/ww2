import patternBG from '../../assets/images/source/squarePattern.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLongToLine } from '@fortawesome/pro-regular-svg-icons'
import { faMagnifyingGlassMinus , faMagnifyingGlassPlus } from '@fortawesome/pro-regular-svg-icons'
import { Link } from 'react-router-dom'
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { useState } from "react";
import classNames from "classnames";


export default function Source({ src, handleSourcePopup }) {

    return (
        <div style={{ backgroundImage: `url(${patternBG})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} className='w-full lg:relative lg:top-0 absolute -top-[120px]'>
            <div className='hidden lg:block absolute top-[40px] left-[40px] text-[30px] text-white'>
                <FontAwesomeIcon icon={faArrowLeftLongToLine} onClick={ handleSourcePopup } className='cursor-pointer'/>
            </div>

            <div className='h-[120px] lg:hidden pt-[80px] pb-[10px] flex justify-center border-b border-white'>
                <span className='text-white uppercase text-[24px] cursor-pointer' onClick={ handleSourcePopup }>FERMER</span>
            </div>

            <div className="container mx-auto relative flex h-[calc(100vh-120px)] px-[20px]">
                <div className="grid grid-cols-12 pt-[40px]">
                    <div className="col-span-12 lg:col-span-9 lg:pt-[80px]">
                        <div className="grid grid-cols-9">

                            {/** IMAGE ZOOM DESKTOP */}
                            <div className="hidden lg:block col-span-8 pb-[40px]">
                                <ImageZoom image={ src }/>
                            </div>

                            {/** SLIDER MOBILE */}
                            <div className="lg:hidden col-span-9 pb-[20px]">
                                <img src={ src }/>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:border-l text-white overflow-scroll lg:pr-[30px]">
                        <p className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Private vehicle passing a roadblock of the “Schuster Line” between Echternach and Lauterborn.</p>
                        <hr className='w-1/2'/>
                        <p className='lg:pl-[25px] text-[28px] pt-[30px] pb-[30px]'>A private vehicle passes a roadblock of the “Schuster line” between Echternachand Lauterborn, guarded by a Luxembourg customs officer posing. A lever is used to close the barrier.</p>
                        <hr className='w-1/2'/>
                        <p className='lg:pl-[25px] text-[20px] pt-[30px] pb-[30px]'>Photograph by Tony Krier, black and white, April 1940. ©Photothèque de la Ville de Luxembourg. Tony Krier 1940-0021-12.</p>
                        <p className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Private vehicle passing a roadblock of the “Schuster Line” between Echternach and Lauterborn.</p>
                        <hr className='w-1/2'/>
                        <p className='lg:pl-[25px] text-[28px] pt-[30px] pb-[30px]'>A private vehicle passes a roadblock of the “Schuster line” between Echternachand Lauterborn, guarded by a Luxembourg customs officer posing. A lever is used to close the barrier.</p>
                        <hr className='w-1/2'/>
                        <p className='lg:pl-[25px] text-[20px] pt-[30px] pb-[30px]'>Photograph by Tony Krier, black and white, April 1940. ©Photothèque de la Ville de Luxembourg. Tony Krier 1940-0021-12.</p>
                        <p className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Private vehicle passing a roadblock of the “Schuster Line” between Echternach and Lauterborn.</p>
                        <hr className='w-1/2'/>
                        <p className='lg:pl-[25px] text-[28px] pt-[30px] pb-[30px]'>A private vehicle passes a roadblock of the “Schuster line” between Echternachand Lauterborn, guarded by a Luxembourg customs officer posing. A lever is used to close the barrier.</p>
                        <hr className='w-1/2'/>
                        <p className='lg:pl-[25px] text-[20px] pt-[30px] pb-[30px]'>Photograph by Tony Krier, black and white, April 1940. ©Photothèque de la Ville de Luxembourg. Tony Krier 1940-0021-12.</p>
                        <p className='lg:pl-[25px] text-[30px] font-semibold pt-[30px] pb-[30px]'>Private vehicle passing a roadblock of the “Schuster Line” between Echternach and Lauterborn.</p>
                        <hr className='w-1/2'/>
                        <p className='lg:pl-[25px] text-[28px] pt-[30px] pb-[30px]'>A private vehicle passes a roadblock of the “Schuster line” between Echternachand Lauterborn, guarded by a Luxembourg customs officer posing. A lever is used to close the barrier.</p>
                        <hr className='w-1/2'/>
                        <p className='lg:pl-[25px] text-[20px] pt-[30px] pb-[30px]'>Photograph by Tony Krier, black and white, April 1940. ©Photothèque de la Ville de Luxembourg. Tony Krier 1940-0021-12.</p>
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
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                    <TransformComponent>
                        <img src={ image } alt="test" className='w-full max-h-[750px] object-cover'/>
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
        <div className='flex justify-center pt-[80px]'>
            <div className="flex cursor-pointer">
                <div className='border border-w' style={{ borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px'}} onClick={() => zoomOut() }>
                    <FontAwesomeIcon icon={faMagnifyingGlassMinus} className={classNames('text-[18px] text-white px-[15px] py-[12px]', { "pointer-events-none opacity-20": zoom === null || zoom === 1 })}/>
                </div>
                <div className='uppercase text-[20px] text-white flex items-center border-t border-b border-white px-[12px]' onClick={() => resetTransform()}>
                    <span className={classNames({"pointer-events-none opacity-20": zoom === null || zoom === 1})}>Reset</span>
                </div>
                <div className='border border-w' style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px'}} onClick={() => zoomIn()}>
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} className='text-[18px] text-white px-[15px] py-[12px]' />
                </div>
            </div>
        </div>
    )
}