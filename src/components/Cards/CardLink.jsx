import { Link } from "react-router-dom";
import { truncateText } from "../../lib/utils";
import { useLanguageContext } from "../../contexts/LanguageProvider";

export default function CardLink({ data }) {

    const { language } = useLanguageContext()

    return (
        <Link target="_blank" to={ data.url } className="block col-span-12 md:col-span-6 border border-black rounded-[5px] p-[10px] h-auto hover:bg-[#0e4b5a]/[0.15] transition-all duration-[750ms] boxShadow cursor-pointer">
            <div className="col-span-6 lg:col-span-4">
                <h2 className='text-[24px] lg:text-[30px] pt-[10px] md:pt-0'>{ data.data.title[language] }</h2>
                <hr className="border-black"/>
                {/* <p className='text-[20px] pt-[10px] md:text-[24px] pb-0'>{ truncateText( data.data.description[language], 160) }</p> */}
                <p className='text-[20px] pt-[10px] md:text-[24px] pb-0'>{ data.data.description[language] }</p>
            </div>
        </Link>
    )
}