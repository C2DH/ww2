import patternBG from '../../assets/images/source/texture.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassMinus , faMagnifyingGlassPlus, faArrowLeftLongToLine } from '@fortawesome/pro-regular-svg-icons'
import { Link } from 'react-router-dom'

import ImageZoom from '../ImageZoom/ImageZoom'


export default function Source() {
    return (
        <div className='flex h-[calc(100vh-120px)]'>

        <div style={{ backgroundImage: `url(${patternBG})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} className='w-full'>
            <div className="container mx-auto relative">
                <Link to={'/catalogue'} className='absolute top-[65px] -left-[80px] text-[30px] text-white'>
                    <FontAwesomeIcon icon={faArrowLeftLongToLine}  />
                </Link>

                <div className="grid grid-cols-12 pt-[40px]">
                    <div className="col-span-9 pt-[80px] border-t">
                        <div className="grid grid-cols-9">
                            <div className="col-span-8 pb-[70px]">
                                <ImageZoom image={'https://images.unsplash.com/photo-1535262412227-85541e910204?q=80&w=4169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}/>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3 col-start-10 border-l text-white h-full">
                        <hr className='w-1/2'/>
                        <p className='pl-[25px] sofia text-[30px] font-semibold pt-[30px] pb-[30px]'>Private vehicle passing a roadblock of the “Schuster Line” between Echternach and Lauterborn.</p>
                        <hr className='w-1/2'/>
                        <p className='pl-[25px] sofia text-[28px] pt-[30px] pb-[30px]'>A private vehicle passes a roadblock of the “Schuster line” between Echternachand Lauterborn, guarded by a Luxembourg customs officer posing. A lever is used to close the barrier.</p>
                        <hr className='w-1/2'/>
                        <p className='pl-[25px] sofia text-[20px] pt-[30px] pb-[30px]'>Photograph by Tony Krier, black and white, April 1940. ©Photothèque de la Ville de Luxembourg. Tony Krier 1940-0021-12.</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}