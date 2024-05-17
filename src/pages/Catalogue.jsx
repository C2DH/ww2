import bgPaper from '../assets/images/common/paper.png'
import Menu from '../components/Menu/Menu'

export default function Catalogue() {
    return (
        <>
        <Menu />
        <div style={{ background: `url(${ bgPaper }) 50% / cover no-repeat`}} className='h-[calc(100vh-120px)] absolute top-[120px] inset-0'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-12'>
                    <div className="col-span-8">
                        <h1 className='abril text-[70px]'>Catalogue</h1>
                        <p className='pt-[15px] text-[28px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.</p>
                    </div>

                    <div className="col-span-4">
                        curseur
                    </div>
                </div>
            </div>
        </div>
        </>
        
    )
}