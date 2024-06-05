import CardLink from '../Cards/CardLink';
import HeaderHistorianWorkshop from '../HeaderHistorianWorkshop/HeaderHistorianWorkshop'
import LayoutHistorianWorkshop from '../LayoutHistorianWorkshop/LayoutHistorianWorkshop';

export default function ResearchInstitutions() {
    return (
        
        <LayoutHistorianWorkshop pageTitle={'Institutions de recherche'}>

            <HeaderHistorianWorkshop />
            
            {/** Content */}
            <div className="lg:flex flex-grow lg:overflow-scroll lg:my-[40px] pb-[30px] lg:pb-0">
                <div className="grid grid-cols-12 gap-[20px]">
                    <CardLink />
                    <CardLink />
                    <CardLink />
                    <CardLink />
                    <CardLink />
                    <CardLink />
                    <CardLink />
                    <CardLink />
                    <CardLink />
                    <CardLink />
                    <CardLink />
                    <CardLink />
                    <CardLink />
                    <CardLink />
                    <CardLink />
                </div>
            </div>
            
        </LayoutHistorianWorkshop>
    )
}



