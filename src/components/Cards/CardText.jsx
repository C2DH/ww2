import { useMediaQuery } from 'react-responsive'
import { truncateText } from "../../lib/truncate";
import { useEffect, useState } from 'react';

export default function CardText({title, text}) {
    
    const [sizeText, setSizeText ] = useState(120)
    const isMobile= useMediaQuery({ query: '(min-width: 640px)'})
    const isMedium= useMediaQuery({ query: '(min-width: 768px)'})

    useEffect(() => {
        console.log('isMobile',isMobile)
        console.log('isMedium',isMedium)
        if (isMobile) {
            setSizeText(120)
        } 
        if (isMedium) {
            setSizeText(380)
        } 
    }, [isMobile, isMedium])

    return (
        <div className="col-span-12 border border-black rounded-[5px] p-[10px] lg:p-[35px] md:h-[150px] lg:h-[180px] hover:bg-[#0e4b5a]/[0.15] transition-all duration-[750ms] boxShadow cursor-pointer overflow-hidden">
            <h2 className='text-[20px] lg:text-[24px] abril leading-none'>{ title }</h2>
            <p className='text-[20px] pt-[14px] lg:text-[24px] pb-0'>{ truncateText(text, sizeText) }</p>
        </div>
    )
}