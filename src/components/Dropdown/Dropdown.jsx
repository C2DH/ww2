import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/pro-light-svg-icons';
import classNames from "classnames"
import { useState } from 'react';

export default function Dropdown({ items, text }) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div onClick={() => setIsOpen(!isOpen) } className={classNames("absolute z-[6] overflow-hidden py-[5px] px-[10px] border border-black cursor-pointer w-full rounded-[4px] bg-[#EFEFED] transition-all duration-[750ms]", {
            'max-h-[40px]': !isOpen,
            'max-h-[50vh]': isOpen
            })}
        >
            <div className='flex justify-between items-center'>
                <span className='block uppercase text-[24px]'>{text}</span>
                <FontAwesomeIcon icon={ isOpen ? faAngleDown : faAngleUp } className='block text-[20px]'/>
            </div>

            <div className={classNames('text-[24px] transition-all duration-[750ms]',{ 'opacity-0': !isOpen })}>
                <hr className='border-black my-[10px]'/>

                { items?.map((item, index) => {
                    return (
                        <span key={index} className="block uppercase"># { item }</span>
                    )
                })}
            </div>
        </div>
    )
}