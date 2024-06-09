import { Link } from "react-router-dom";
import { truncateText } from "../../lib/truncate";

export default function CardLink() {
    return (
        <div className="col-span-12 md:col-span-6 border border-black rounded-[5px] p-[10px] h-[240px] lg:h-[140px] hover:bg-[#0e4b5a]/[0.15] transition-all duration-[750ms] boxShadow">
            <div className="grid grid-cols-6 gap-x-[20px]">
                <div className="col-span-6 lg:col-span-2">
                    <img src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1839&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='rounded-[2px] object-cover h-[120px] w-full' />
                </div>

                <div className="col-span-6 lg:col-span-4">
                    <Link target="_blank"><h2 className='text-[24px] md:text-[30px] pt-[10px] md:pt-0'>www.loremipsum.com</h2></Link>
                    <hr className="border-black"/>
                    <p className='text-[20px] pt-[10px] sm:text-[24px] pb-0'>{ truncateText('Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. sit amet consectetur adipiscingsit amet consectetur adipiscingsit amet consectetur adipiscingsit amet consectetur adipiscingsit amet consectetur adipiscing Pellentesque sit amet sapien.', 80) }</p>
                </div>
            </div>
        </div>
    )
}