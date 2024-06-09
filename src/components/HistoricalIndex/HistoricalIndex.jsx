import HeaderHistorianWorkshop from '../HeaderHistorianWorkshop/HeaderHistorianWorkshop'
import CardImageText from '../Cards/CardImageText';
import Dropdown from '../Dropdown/Dropdown';
import ButtonFilter from '../ButtonFilter/ButtonFilter';
import LayoutHistorianWorkshop from '../LayoutHistorianWorkshop/LayoutHistorianWorkshop';

export default function HistoricalIndex() {

    const tags = ['Dolor', 'Sit', 'Amet', 'Test', 'Abeas', 'Corpus']

    return (
            
            <LayoutHistorianWorkshop pageTitle={'Index historique'}>
    
                <HeaderHistorianWorkshop />

                {/** Filters */}
                <div className="hidden lg:block mt-[40px]">
                    <div className="grid grid-cols-12 gap-5 border-b border-black">
                        <div className="col-span-5 relative">
                            <Dropdown items={tags} text={'Recherche par #tag'} />
                        </div>

                        <div className="col-span-7 pb-[40px]">
                            <ButtonFilter title={'Évènements'} number={7} />
                            <ButtonFilter title={'Personnes'} number={25} />
                            <ButtonFilter title={'Lieux'} number={14} />
                            <ButtonFilter title={'Bâtiments'} number={6} />
                        </div>
                    </div>
                </div>
                
                {/** Content */}
                <div className="lg:flex flex-grow lg:overflow-scroll lg:mb-[40px] pb-[30px] lg:pb-0">
                    <div className="grid grid-cols-12 gap-[20px] pt-[40px]">
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                        <CardImageText 
                            img={'https://source.unsplash.com/random'} 
                            tag={'aliquam ispsips'}
                            title={'Lorem ipsum dolor sit amet'}
                            text={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.'}
                        />
                    </div>
                </div>

        </LayoutHistorianWorkshop>
    )
}

