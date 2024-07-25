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


    const handlePopup = ({id, theme}) => {
        const params = {
            noteId: id,
            theme: parseInt(theme) + 1
        }

        localStorage.setItem('params', JSON.stringify(params))

        navigate(`/note/${id}`)
    } 

    return (    
            <div className='h-full'>
                {items.map((item, index) => (
                    <div key={ index }>
                        <div className={classNames("flex justify-between border-t border-black w-full hover:bg-[#0e4b5a]/[0.15] transition-all duration-[750ms] cursor-pointer", {
                            'border-b': index === currentTheme
                        })} onClick={() => toggleAccordion(index)} >
                            <div className="pt-[10px]">
                                <div>
                                    <span className="text-[24px] uppercase theme pr-[15px]">Thème {index + 1}</span>
                                    <span className="lg:hidden pl-[80px] abril text-[24px] leading-none">{item.count}</span>
                                    <span className="lg:hidden pl-[10px] text-[24px] uppercase">Notes</span>
                                </div>
                                <h2 className="abril text-[30px] lg:text-[60px] uppercase pb-[35px]">{item.title}</h2> 
                            </div>
                            <div className="hidden lg:flex flex-col justify-center items-center pr-[50px]">
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
                                    <h4 key={ index } className="text-[24px] lg:text-[40px] abril uppercase pb-[20px] cursor-pointer" onClick={() => handlePopup({id: note.id, theme: currentTheme})}>
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
