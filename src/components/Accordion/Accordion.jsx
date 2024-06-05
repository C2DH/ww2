import classNames from 'classnames'
import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Accordion({ items }) {
    const [currentTheme, setCurrentTheme] = useState(-1)
    const contentRefs = useRef([])
    const navigate = useNavigate()

    const toggleAccordion = (index) => {
        if (currentTheme === index) {
            setCurrentTheme(-1)
        } else {
            setCurrentTheme(index)
        }
    }

    // Calculer la taille du bloc
    const getContentHeight = (index) => {
        return contentRefs.current[index] ? contentRefs.current[index].scrollHeight : '0px'
    }


    const handlePopup = (id) => {
        navigate(`/note/${id}`)
    } 

    return (
        <div className="themes">
            {items.map((item, index) => (
                <div key={ index }>
                    <div className={classNames("flex justify-between border-t border-black w-full hover:bg-[#0e4b5a]/[0.15] transition-all duration-[750ms] cursor-pointer", {
                        'border-b': index === currentTheme
                    })} onClick={() => toggleAccordion(index)} >
                        <div className="pt-[10px]">
                            <span className="text-[24px] uppercase">Thème {index + 1}</span>
                            <h2 className="abril text-[60px] uppercase pb-[35px]">{item.title}</h2> 
                        </div>
                        <div className="flex flex-col justify-center items-center pr-[50px]">
                            <span className="abril text-[60px] leading-none block">{item.count}</span>
                            <span className="text-[24px] uppercase">Notes</span>
                        </div>
                    </div>

                    {/** Notes */}
                    <div
                        ref={(element) => (contentRefs.current[index] = element)}
                        className={`accordion-content ${currentTheme === index ? 'open' : ''}`}
                        style={{
                            height: currentTheme === index ? getContentHeight(index) : '0px',
                        }}
                    >
                        <div className={`accordion-content-inner ${currentTheme === index ? 'open' : ''} mb-[50px]`}>
                            {item.notes.map((note, index) => (        
                                <h4 key={ index } className="text-[40px] abril uppercase pb-[20px] cursor-pointer" onClick={() => handlePopup(note.id)}>
                                    { note.code } { note.title }
                                </h4>      
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
