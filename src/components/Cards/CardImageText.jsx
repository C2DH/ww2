   import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from "@fortawesome/pro-thin-svg-icons" 
import { cleanText } from "../../lib/utils"

export default function CardImageText({ img, title = "", type = "", myRef }) {

    return (
        <div className="col-span-12 md:col-span-6 xl:col-span-4 border border-black rounded-[5px] p-[10px] hover:bg-[#0e4b5a]/[0.15] transition-all duration-[750ms] boxShadow h-[130px] overflow-hidden cursor-pointer" ref={myRef}>
            <div className="grid grid-cols-4 gap-x-[20px]">
                
                <div className="col-span-4 lg:col-span-1">
                    { (type === "book" || type === "manuscript") &&
                        <div className="bg-gray-200 lg:h-[110px] flex items-center justify-center rounded-[2px]">
                            <FontAwesomeIcon icon={ faBook} style={{ fontSize: '50px' }}/>
                        </div>
                    }

                    { type === "video" &&
                        <img src={ img } alt="" className='rounded-[2px] w-full h-[150px] lg:h-[110px] object-cover' />
                    } 
                </div>

                <div className="col-span-4 lg:col-span-3">
                    { title &&  
                        <h2 className='text-[22px] leading-none'>{ cleanText(title)} </h2>
                    }
                </div>
            </div>
        </div>
    )
}


