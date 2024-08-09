import HeaderHistorianWorkshop from '../HeaderHistorianWorkshop/HeaderHistorianWorkshop'
import CardImageText from '../Cards/CardImageText';
import Dropdown from '../Dropdown/Dropdown';
import ButtonFilter from '../ButtonFilter/ButtonFilter';
import LayoutHistorianWorkshop from '../LayoutHistorianWorkshop/LayoutHistorianWorkshop';
import { useEffect, useState } from 'react';

export default function HistoricalIndex() {

    const tags = ['Dolor', 'Sit', 'Amet', 'Test', 'Abeas', 'Corpus', 'Test', 'Bunker', 'ww2']
    const types = [
        {
            category: "Évènements",
            number: 7
        },
        {
            category: "Personnes",
            number: 25
        },
        {
            category: "Lieux",
            number: 14
        },
        {
            category: "Bâtiments",
            number: 6
        }
    ]

    const [ filters, setFilters ] = useState({
        types: [], tags: []
    })


    // CONTENT (API)
    const generateContent = () => {
        const arrayContent = []
        for(let i = 0; i < 50; i++) {
            arrayContent.push({
                img: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1839&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                tag: tags[Math.floor(Math.random() * tags.length)],
                title: 'Lorem ipsum dolor sit amet',
                text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.',
                type: types[Math.floor(Math.random() * types.length)].category
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

    console.log(filters)

    return (
            
        <LayoutHistorianWorkshop pageTitle={'Index historique'}>

            <HeaderHistorianWorkshop filters={types} />
            
            {/** Filters */}
            <div className="hidden lg:block mt-[40px]">
                <div className="grid grid-cols-12 gap-5 border-b border-black">
                    <div className="col-span-5 relative">
                        <Dropdown items={tags} text={'Recherche par #tag'} />
                    </div>

                    <div className="col-span-7 pb-[40px]">
                        <ButtonFilter title={'Évènements'} number={7} handleClick={() => clickButton('Évènements')} selected={filters.types}/>
                        <ButtonFilter title={'Personnes'} number={25} handleClick={() => clickButton('Personnes')} selected={filters.types}/>
                        <ButtonFilter title={'Lieux'} number={14} handleClick={() => clickButton('Lieux')} selected={filters.types}/>
                        <ButtonFilter title={'Bâtiments'} number={6} handleClick={() => clickButton('Bâtiments')} selected={filters.types}/>
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

