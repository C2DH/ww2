import classNames from "classnames"

export default function ButtonFilter({ title, number, type, handleClick, selected }) {
    return (
        <button 
            className={classNames('btn-filter uppercase pl-[10px] pr-[20px] py-[5px] border border-black text-[16px] xl:text-[24px] rounded-[4px] relative mr-[25px] xl:mr-[35px]', {
                // 'bg-black text-white': selected.includes(title)
            })} 
            onClick={() => handleClick() }>
            {title}
            <span>{number}</span>
        </button>
    )
}