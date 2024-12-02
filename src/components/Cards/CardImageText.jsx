import { BookOpenIcon, VideoCameraIcon, PhotoIcon, MusicalNoteIcon } from '@heroicons/react/24/outline'

import { cleanText } from "../../lib/utils"
import { AnimatePresence, motion } from 'framer-motion';
import Source from '../Source/Source';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
const rootPath = import.meta.env.VITE_ROOT


export default function CardImageText({ title = "", myRef, data, onClick }) {

    const [openSource, setOpenSource] = useState(false)
    const [setSelectedData] = useState({})
    const isSmall = useMediaQuery({ query: '(max-width: 768px)'})

    return (
        <>
            <div 
                className="col-span-12 md:col-span-6 xl:col-span-4 border border-black rounded-[5px] p-[10px] hover:bg-[#0e4b5a]/[0.15] transition-all duration-[750ms] boxShadow h-[130px] overflow-hidden cursor-pointer" 
                ref={myRef} 
                onClick={onClick}
            >
                <div className="grid grid-cols-12 gap-x-[20px]">
                    
                    <div className="col-span-4">
                        { (data.type === "book" || data.type === "manuscript") &&
                            <div className="bg-gray-200 h-[110px] flex items-center justify-center rounded-[2px]">
                                <BookOpenIcon style={{ width: '30px', height: '30px' }} />
                            </div>
                        }

                        {data.type === "video" && (
                            data.data.resolutions.medium.url ? (
                                <img src={data.data.resolutions.medium.url} alt="" className="rounded-[2px] w-full h-[110px] object-cover" />
                            ) : (
                                <div className="bg-gray-200 h-[110px] flex items-center justify-center rounded-[2px]">
                                    <VideoCameraIcon style={{ width: '30px', height: '30px' }} />
                                </div>
                            )
                        )}

                        {data.type === "picture" && (
                            data.attachment ? (
                                <img src={rootPath + data.attachment} alt="" className="rounded-[2px] w-full h-[110px] object-cover" />
                            ) : (
                                <div className="bg-gray-200 h-[110px] flex items-center justify-center rounded-[2px]">
                                    <PhotoIcon style={{ width: '30px', height: '30px' }} />
                                </div>
                            )
                        )}

                        {data.type === "audio" && (
                    
                                <div className="bg-gray-200 h-[110px] flex items-center justify-center rounded-[2px]">
                                    <MusicalNoteIcon style={{ width: '30px', height: '30px' }} />
                                </div>
                            
                        )}    
                    </div>

                    <div className="col-span-8">
                        { title &&  
                            <h2 className='text-[22px] leading-none'>{ cleanText(title)} </h2>
                        }
                    </div>
                </div>

            </div>



            <AnimatePresence>
                {openSource &&
                    <motion.div
                        className='fixed inset-0 w-full h-full z-[10000]'
                        initial={{ top: '100%' }}
                        animate={{ top: isSmall ? 0 : '120px' }}
                        exit={{ top: '100%'}}
                        transition={{ duration: 0.8, ease: 'easeInOut'}}
                    >
                        <Source data={ data } handleSourcePopup={() => setOpenSource(false)}/>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}


