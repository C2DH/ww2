import CardLink from '../Cards/CardLink';
import HeaderHistorianWorkshop from '../HeaderHistorianWorkshop/HeaderHistorianWorkshop'
import LayoutHistorianWorkshop from '../LayoutHistorianWorkshop/LayoutHistorianWorkshop';

export default function ResearchInstitutions() {
    return (
        
        <LayoutHistorianWorkshop pageTitle={'Institutions de recherche'}>

            <HeaderHistorianWorkshop />
            
            {/** Content */}
            <div className="lg:overflow-scroll">
                <div className="grid grid-cols-12 gap-[20px] pt-[40px] pb-[100px] lg:pb-[40px]">
                    { [...Array(60)].map((item, index) => {
                        return (
                            <CardLink key={index} link={ 'https://google.fr' }/>
                        )
                    })}
                </div>
            </div>
            
        </LayoutHistorianWorkshop>
    )
}



