
import bgPaper from '../../assets/images/common/bg-paper.png'

export default function LayoutHistorianWorkshop({ children, pageTitle }) {
    return (
        <div style={{ backgroundImage: `url(${bgPaper})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} className='w-full'>
            <div className="container mx-auto lg:h-[calc(100vh-120px)] flex flex-col px-[20px] xl:px-0">
                
                <div className='lg:hidden pt-[30px]'>
                    <h1 className='text-[40px] abril leading-none'>{pageTitle}</h1>
                </div>

                { children }
            </div>
        </div>
    )
}