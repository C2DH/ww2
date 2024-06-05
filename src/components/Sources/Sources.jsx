import bgPaper from '../../assets/images/common/bg-paper.png'
import HeaderHistorianWorkshop from "../HeaderHistorianWorkshop/HeaderHistorianWorkshop";
import CardImageText from '../Cards/CardImageText';
import Dropdown from '../Dropdown/Dropdown';
import ButtonFilter from '../ButtonFilter/ButtonFilter';
import LayoutHistorianWorkshop from '../LayoutHistorianWorkshop/LayoutHistorianWorkshop';


export default function Source() {

    const tags = ['Dolor', 'Sit', 'Amet', 'Test', 'Abeas', 'Corpus']

    return (
        <LayoutHistorianWorkshop pageTitle={'Sources'}>

            <HeaderHistorianWorkshop />

            {/** Filters */}
            <div className="hidden lg:block mt-[40px]">
                <div className="grid grid-cols-12 gap-5 border-b border-black pb-[40px]">
                    <div className="col-span-5 relative">
                        <Dropdown items={tags} text={'Recherche par #tag'}/>
                    </div>

                    <div className="col-span-7">
                        <ButtonFilter title={'Audio'} number={7} />
                        <ButtonFilter title={'Video'} number={74} />
                        <ButtonFilter title={'Photo'} number={18} />
                        <ButtonFilter title={'Livre'} number={21} />
                        <ButtonFilter title={'Document manuscrit'} number={53} />
                    </div>
                </div>
            </div>
            
            {/** Content */}
            <div className="lg:flex flex-grow lg:overflow-scroll lg:my-[40px] pb-[30px] lg:pb-0">
                <div className="grid grid-cols-12 gap-[20px]">

                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                    <CardImageText 
                        img={"https://source.unsplash.com/random"}
                        text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.'}
                        truncate={180}
                    />
                </div>
            </div>
        </LayoutHistorianWorkshop>       
    )
}