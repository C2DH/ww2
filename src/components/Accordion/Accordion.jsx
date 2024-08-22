import classNames from 'classnames'
import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom'
import { useLanguageContext } from '../../contexts/LanguageProvider';

export default function Accordion({ items }) {

    const { t } = useTranslation()
    const { language } = useLanguageContext()

    const [currentTheme, setCurrentTheme] = useState(-1)
    const contentRefs = useRef([])

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
                                <span className="text-[24px] uppercase theme pr-[15px]">{ item.title.split('-')[0] }</span>
                                <span className="lg:hidden pl-[80px] font-abril text-[24px] leading-none">{item.stories.length}</span>
                                <span className="lg:hidden pl-[10px] text-[24px] uppercase">{ t('notes') }</span>
                            </div>
                            <h2 className="font-abril text-[30px] leading-none lg:text-[36px] 2xl:text-[60px] uppercase pb-[35px] pt-[10px]">{item.title.split('-')[1]}</h2> 
                        </div>
                        <div className="hidden lg:flex flex-col justify-center items-center pr-[50px]">
                            <span className="font-abril text-[40px] 2xl:text-[60px] leading-none block">{item.stories.length}</span>
                            <span className="text-[24px] uppercase">{ t('notes') }</span>
                        </div>
                    </div>

                    <div
                        ref={(element) => (contentRefs.current[index] = element)}
                        className={`accordion-content ${currentTheme === index ? 'open' : ''}`}
                        style={{
                            height: currentTheme === index ? getContentHeight(index) : '0px',
                        }}
                    >
                        <div className={`accordion-content-inner ${currentTheme === index ? 'open' : ''} mb-[50px]`}>
                            {item.stories.map((note, index) => (        
                                <Link to={ `/note/${note.slug}` } key={ index } className="block text-[24px] lg:text-[28px] 2xl:text-[40px] uppercase pb-[20px] cursor-pointer" onClick={() => handlePopup({id: note.id, theme: currentTheme})}>
                                    <span className='text-[28px] 2xl:text-[38px] font-light'>N{index < 10 ? '0' + (index + 1) : index }</span>
                                    <span className='font-abril'> { note.data.title[language]?.split('(')[0] }</span> 
                                </Link>      
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
