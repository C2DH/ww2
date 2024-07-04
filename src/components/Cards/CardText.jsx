import { truncateText } from "../../lib/truncate";

export default function CardText({title, text}) {
    return (
        <div className="col-span-12 border border-black rounded-[5px] p-[35px] h-[185px] hover:bg-[#0e4b5a]/[0.15] transition-all duration-[750ms] boxShadow cursor-pointer">
            <h2 className='text-[24px] abril leading-none'>{ title }</h2>
            <p className='text-[20px] pt-[14px] sm:text-[24px] pb-0'>{ truncateText(text, 450) }</p>
        </div>
    )
}