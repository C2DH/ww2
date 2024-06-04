import patternBG from '../../assets/images/source/texture.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassMinus , faMagnifyingGlassPlus, faArrowLeftLongToLine } from '@fortawesome/pro-regular-svg-icons'
import { Link } from 'react-router-dom'


export default function Source() {
    return (
        <div className='flex h-[calc(100vh-120px)]'>

        <div style={{ backgroundImage: `url(${patternBG})`, backgroundSize: 'cover'}} className='w-full'>
            <div className="container mx-auto relative">
                <Link to={'/catalogue'} className='absolute top-[65px] -left-[80px] text-[30px] text-white'>
                    <FontAwesomeIcon icon={faArrowLeftLongToLine}  />
                </Link>

                <div className="grid grid-cols-12 pt-[40px]">
                    <div className="col-span-9 pt-[80px] border-t">
                        <div className="grid grid-cols-9">
                            <div className="col-span-8 pb-[70px]">
                                <img src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="" className='w-full max-h-[750px] object-cover' style={{ width: '100%'}}/>

                                <div className='flex justify-center pt-[20px]'>
                                    <div className="flex cursor-pointer">
                                        <div className='border border-w' style={{ borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px'}}>
                                            <FontAwesomeIcon icon={faMagnifyingGlassMinus} className='text-[18px] text-white px-[15px] py-[12px]'/>
                                        </div>
                                        <div className='uppercase text-[20px] text-white flex items-center border-t border-b border-white px-[12px]'>
                                            Reset
                                        </div>
                                        <div className='border border-w' style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px'}}>
                                            <FontAwesomeIcon icon={faMagnifyingGlassPlus} className='text-[18px] text-white px-[15px] py-[12px]' />
                                        </div>
                                    </div>
                                </div>

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