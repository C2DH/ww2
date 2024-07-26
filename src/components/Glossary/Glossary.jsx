
import { useEffect, useState } from "react";
import CardText from "../Cards/CardText";
import Dropdown from "../Dropdown/Dropdown";
import HeaderHistorianWorkshop from "../HeaderHistorianWorkshop/HeaderHistorianWorkshop";
import LayoutHistorianWorkshop from "../LayoutHistorianWorkshop/LayoutHistorianWorkshop";
import classNames from "classnames";

export default function Glossary() {
    const [filter, setFilter] = useState('')
    const [filteredTerms, setFilteredTerms] = useState([])
    let allFirstLetters = []
    let selectedLetters = []
    const tags = ['Dolor', 'Sit', 'Amet', 'Test', 'Abeas', 'Corpus']
    const terms = [
        {
            title : 'Aorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amets'
        },
        {
            title : 'Borem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Corem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Dorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor '
        },
        {
            title : 'Eorem ipsum dolor sit amet consectetur',
            text : ''
        },
        {
            title : 'Forem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Horem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Lorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Lorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Lorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Jorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Lorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Jorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Jorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Porem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Aorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Aorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Aorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Borem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Vorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Xorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Lorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Yorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Zorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },
        {
            title : 'Lorem ipsum dolor sit amet consectetur',
            text : 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.'
        },

    ]
    terms.map(term => {
        allFirstLetters.push(term.title.substring(0, 1))
        selectedLetters = [...new Set(allFirstLetters)]
    })


    useEffect(() => {
        if (filter) {
            const selectedTerms = terms.filter(term => term.title[0] == filter)
            setFilteredTerms(selectedTerms)
        } else {
            setFilteredTerms(terms)
        }
    },[filter])

    return (
        <LayoutHistorianWorkshop pageTitle={'Glossaire'}>

            <HeaderHistorianWorkshop/>

            {/** Filters */}
            <div className="hidden lg:block mt-[40px]">
                <div className="border-b border-black pb-[40px] w-full flex flex-wrap gap-y-[20px]">
                    <div className="w-[40%] relative h-[40px] me-5">
                        <Dropdown items={tags} text={'Lister des termes'} />
                    </div>

                    <LetterFilters itemsSelected={selectedLetters} filter={filter} handleClick={(letter) => setFilter(filter !== letter ? letter : '')} />
                </div>
            </div>
            
            {/** Content */}
            <div className="overflow-scroll">
                <div className="grid grid-cols-12 gap-y-[30px] pt-[40px] pb-[100px] lg:pb-[40px]">
                    { filteredTerms.map((term, index) => {
                        return <CardText key={index} title={term.title} text={term.text} />
                    })}
                </div>
            </div>

        </LayoutHistorianWorkshop>
    )
}



const LetterFilters = ({itemsSelected, filter, handleClick}) => {

    const alphabet = [];
    for (let i = 65; i <= 90; i++) {
        alphabet.push(String.fromCharCode(i));
    }

    return (
        alphabet.map((letter, index) => {
            if (itemsSelected.includes(letter)) {
                return (
                    <div key={index} className={classNames("border border-black px-[22px] py-[7px] h-[40px] me-5 cursor-pointer group hover:bg-black transition-all duration-500", {
                        'bg-black': letter === filter
                    })}
                        onClick={() => { handleClick(letter) }}
                    >
                        <span className={classNames("text-[24px] leading-none group-hover:text-white transition-all duration-500", {
                            "text-white": letter === filter
                        })}>{letter}</span>
                    </div>
                )
            } else {
                return (
                    <div key={index} className="border border-black opacity-20 px-[22px] py-[7px] h-[40px] me-5 pointer-events-none">
                        <span className="text-[24px] leading-none">{letter}</span>
                    </div>
                )
            }
        })
    )
}


