import bgPaper from '../../assets/images/common/bg-paper.png'
import HeaderHistorianWorkshop from "../HeaderHistorianWorkshop/HeaderHistorianWorkshop";
import CardImageText from '../Cards/CardImageText';
import Dropdown from '../Dropdown/Dropdown';
import ButtonFilter from '../ButtonFilter/ButtonFilter';
import LayoutHistorianWorkshop from '../LayoutHistorianWorkshop/LayoutHistorianWorkshop';
import { useEffect, useState } from 'react';


export default function Sources() {

    const tags = ['Dolor', 'Sit', 'Amet', 'Test', 'Abeas', 'Corpus']
    const types = ['Audio', 'Video', 'Photo', 'Livre', 'Document manuscrit']

    const [ filters, setFilters ] = useState({
        types: [], tags: []
    })


    // CONTENT (API)
    const generateContent = () => {
        const arrayContent = []
        for(let i = 0; i < 70; i++) {
            arrayContent.push({
                img: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1839&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                tag: tags[Math.floor(Math.random() * tags.length)],
                title: 'Lorem ipsum dolor sit amet',
                text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.',
                type: types[Math.floor(Math.random() * types.length)]
            })
        }
        return arrayContent
    }

    const items = generateContent()


    const filteredItems = items.filter(item => {
            if (filters.types.length === 0) {
                return items
            } else {
                return filters.types.includes(item.type)
            }
        }
    )


    const clickButton = (type) => {
        if (!filters.types.includes(type)) {
            setFilters(prevFilters => ({
                ...prevFilters,
                types: [...prevFilters.types, type]
            }));
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                types: prevFilters.types.filter(t => t !== type)
            }))
        }
    }


    useEffect(() => {
        console.log(filters)
    }, [filters]) 

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
                        <ButtonFilter title={'Audio'} number={7} handleClick={() => clickButton('Audio')} selected={filters.types}/>
                        <ButtonFilter title={'Video'} number={74} handleClick={() => clickButton('Video')} selected={filters.types}/>
                        <ButtonFilter title={'Photo'} number={18} handleClick={() => clickButton('Photo')} selected={filters.types}/>
                        <ButtonFilter title={'Livre'} number={21} handleClick={() => clickButton('Livre')} selected={filters.types}/>
                        <ButtonFilter title={'Document manuscrit'} number={53} handleClick={() => clickButton('Document manuscrit')} selected={filters.types}/>
                    </div>
                </div>
            </div>
                
            {/** Content */}   
            <div className='lg:overflow-scroll'>
                <div className="grid grid-cols-12 gap-[20px] pt-[40px] pb-[100px] lg:pb-[40px]">
                    { filteredItems.map((item, index) => {
                        return (
                            <CardImageText 
                                key={index}
                                img={item.img} 
                                tag={item.tag}
                                title={item.title}
                                text={item.text}
                                type={item.type}
                            />
                        )
                    })}
                </div>
            </div>

        </LayoutHistorianWorkshop>       
    )
}