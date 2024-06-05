import { Link } from "react-router-dom";
import { truncateText } from "../../lib/truncate";

export default function CardImageText({ img, tag = "", title = "", text, truncate = 80 }) {
    return (
        <Link className="col-span-12 md:col-span-6 xl:col-span-4 border border-black rounded-[5px] p-[10px] lg:h-[160px] hover:bg-[#0e4b5a]/[0.15] transition-all duration-[750ms]">
            <div className="grid grid-cols-4 gap-x-[20px]">
                <div className="col-span-4 lg:col-span-1">
                    <img src={ img } alt="" className='rounded-[2px] w-full h-[150px] lg:h-[110px] object-cover' />
                </div>
                <div className="col-span-4 lg:col-span-3">
                    { tag &&
                        <span className='block text-[20px] pt-[20px] lg:pt-0 font-light'># { tag }</span>
                    }

                    { title &&
                        <h2 className='uppercase py-[10px] abril text-[18px]'>{ title }</h2>
                    }
                    <p className='text-[20px] sm:text-[24px] pb-0'>{ truncateText(text, truncate) }</p>
                </div>
            </div>
        </Link>
    )
}