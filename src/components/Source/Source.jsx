import patternBG from '../../assets/images/source/texture.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLongToLine } from '@fortawesome/pro-regular-svg-icons'
import { Link } from 'react-router-dom'

import ImageZoom from '../ImageZoom/ImageZoom'


export default function Source({ src, handleSourcePopup }) {

    return (
            <div style={{ backgroundImage: `url(${patternBG})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} className='w-full relative'>
                <div className='absolute top-[40px] left-[40px] text-[30px] text-white'>
                    <FontAwesomeIcon icon={faArrowLeftLongToLine} onClick={ handleSourcePopup } className='cursor-pointer'/>
                </div>

                <div className="container mx-auto relative flex h-[calc(100vh-120px)]">
                    <div className="grid grid-cols-12 pt-[40px] ">
                        <div className="col-span-9 pt-[80px] overflow-scroll">
                            <div className="grid grid-cols-9">
                                <div className="col-span-8 pb-[40px]">
                                    <ImageZoom image={ src }/>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 col-start-10 border-l text-white overflow-scroll pr-[30px]">
                            <p className='pl-[25px] sofia text-[30px] font-semibold pt-[30px] pb-[30px]'>Private vehicle passing a roadblock of the “Schuster Line” between Echternach and Lauterborn.</p>
                            <hr className='w-1/2'/>
                            <p className='pl-[25px] sofia text-[28px] pt-[30px] pb-[30px]'>A private vehicle passes a roadblock of the “Schuster line” between Echternachand Lauterborn, guarded by a Luxembourg customs officer posing. A lever is used to close the barrier.</p>
                            <hr className='w-1/2'/>
                            <p className='pl-[25px] sofia text-[20px] pt-[30px] pb-[30px]'>Photograph by Tony Krier, black and white, April 1940. ©Photothèque de la Ville de Luxembourg. Tony Krier 1940-0021-12.</p>
                            <p className='pl-[25px] sofia text-[30px] font-semibold pt-[30px] pb-[30px]'>Private vehicle passing a roadblock of the “Schuster Line” between Echternach and Lauterborn.</p>
                            <hr className='w-1/2'/>
                            <p className='pl-[25px] sofia text-[28px] pt-[30px] pb-[30px]'>A private vehicle passes a roadblock of the “Schuster line” between Echternachand Lauterborn, guarded by a Luxembourg customs officer posing. A lever is used to close the barrier.</p>
                            <hr className='w-1/2'/>
                            <p className='pl-[25px] sofia text-[20px] pt-[30px] pb-[30px]'>Photograph by Tony Krier, black and white, April 1940. ©Photothèque de la Ville de Luxembourg. Tony Krier 1940-0021-12.</p>
                            <p className='pl-[25px] sofia text-[30px] font-semibold pt-[30px] pb-[30px]'>Private vehicle passing a roadblock of the “Schuster Line” between Echternach and Lauterborn.</p>
                            <hr className='w-1/2'/>
                            <p className='pl-[25px] sofia text-[28px] pt-[30px] pb-[30px]'>A private vehicle passes a roadblock of the “Schuster line” between Echternachand Lauterborn, guarded by a Luxembourg customs officer posing. A lever is used to close the barrier.</p>
                            <hr className='w-1/2'/>
                            <p className='pl-[25px] sofia text-[20px] pt-[30px] pb-[30px]'>Photograph by Tony Krier, black and white, April 1940. ©Photothèque de la Ville de Luxembourg. Tony Krier 1940-0021-12.</p>
                            <p className='pl-[25px] sofia text-[30px] font-semibold pt-[30px] pb-[30px]'>Private vehicle passing a roadblock of the “Schuster Line” between Echternach and Lauterborn.</p>
                            <hr className='w-1/2'/>
                            <p className='pl-[25px] sofia text-[28px] pt-[30px] pb-[30px]'>A private vehicle passes a roadblock of the “Schuster line” between Echternachand Lauterborn, guarded by a Luxembourg customs officer posing. A lever is used to close the barrier.</p>
                            <hr className='w-1/2'/>
                            <p className='pl-[25px] sofia text-[20px] pt-[30px] pb-[30px]'>Photograph by Tony Krier, black and white, April 1940. ©Photothèque de la Ville de Luxembourg. Tony Krier 1940-0021-12.</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}