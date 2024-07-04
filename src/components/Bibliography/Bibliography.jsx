import CardLink from "../Cards/CardLink";
import Dropdown from "../Dropdown/Dropdown";
import HeaderHistorianWorkshop from "../HeaderHistorianWorkshop/HeaderHistorianWorkshop";
import LayoutHistorianWorkshop from "../LayoutHistorianWorkshop/LayoutHistorianWorkshop";

export default function Bibliography() {

    const authors = ['a', 'b', 'c', 'd', 'e'] 
    const notes = ['a', 'b', 'c', 'd', 'e'] 

    return (
        <LayoutHistorianWorkshop  pageTitle={'Bibliographie'}>
        
            <HeaderHistorianWorkshop />

            {/** Filters */}
            <div className="hidden lg:block mt-[40px]">
                <div className="grid grid-cols-12 gap-5 border-b border-black pb-[80px]">
                    <div className="col-span-5 relative">
                        <Dropdown items={authors} text={'Auteur'} />
                    </div>
                    <div className="col-span-5 relative">
                        <Dropdown items={notes} text={'Notes'} />
                    </div>
                </div>
            </div>


            {/** Content */}
            <div className="lg:flex flex-grow lg:overflow-scroll lg:mb-[40px] pb-[30px] lg:pb-0">
                <div className="grid grid-cols-12 gap-[20px] pt-[40px]">
                    {[...Array(50)].map((item, index) => {
                        return (
                            <CardLink key={index}/>
                        )
                    })}
                </div>
            </div>

        </LayoutHistorianWorkshop>
    )
}