import { ChevronDownIcon, ChevronUpIcon, XCircleIcon } from '@heroicons/react/24/outline'
import classNames from "classnames"
import { useState } from 'react';
import { useLanguageContext } from '../../contexts/LanguageProvider'

export default function Dropdown({ items, text, theme, onChange}) {
    
    const [isOpen, setIsOpen] = useState(false)
    const {language} = useLanguageContext()
    const [author, setAuthor] = useState()

    const handleItemClick = (item) => {
        onChange(item)
        setIsOpen(false)
        setAuthor(item)

        const dropdownContainer = document.querySelector('#dropdown-container');
        if (dropdownContainer) {
            dropdownContainer.scrollTop = 0;
        }
    }

    const handleRemoveAuthor = () => {
        setAuthor(null)
        onChange("")
    }

    return (
        <div onClick={() => setIsOpen(!isOpen) } className={classNames("absolute z-[6] overflow-hidden py-[5px] px-[10px] border border-black cursor-pointer w-full rounded-[4px] bg-[#EFEFED] transition-all duration-[750ms]", {
            'max-h-[40px]': !isOpen,
            'max-h-[50vh] overflow-scroll': isOpen
            })} id="dropdown-container"
        >
            <div className='flex justify-between items-center'>
                <div className='relative block uppercase text-[24px]'>
                    { author &&
                        <>
                            <span className='mr-5'>{ author }</span>
                            <XCircleIcon style={{ width: '15px' }} onClick={(e) => { e.stopPropagation(); handleRemoveAuthor(); }} className="absolute top-0 right-0 hover:text-red-500" />
                        </>
                    }

                    {!author &&
                        <span className='mr-5'>{ text }</span>
                    }
                </div>
                { isOpen ? <ChevronDownIcon style={{ width: '10px', height: '30px' }} /> : <ChevronUpIcon style={{ width: '30px', height: '30px' }} /> }
            </div>

            <div className={classNames('text-[24px] transition-all duration-[750ms]',{ 'opacity-0': !isOpen })}>
                <hr className='border-black my-[10px]'/>    

                { items?.map((item, index) => {
                    if (theme === "authors") {
                        return (
                            <span key={index} className="block uppercase" onClick={() => handleItemClick(item)}># { item }</span>
                        )
                    } else if (theme === 'notes') {
                        return (
                            <span key={index} className="block uppercase"   ># { item.data.title[language] }</span>
                        )
                    }
                })}
            </div>
        </div>
    )
}