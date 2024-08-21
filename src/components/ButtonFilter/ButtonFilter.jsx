import classNames from "classnames"

export default function ButtonFilter({ title, number, types, handleClick }) {

    return (
        <button 
            className={classNames('hover:bg-black hover:text-white transition-all uppercase pl-[10px] pr-[20px] py-[5px] border border-black text-[16px] xl:text-[24px] rounded-[4px] relative mr-[25px] xl:mr-[35px] mb-[12px]', {
                'bg-black text-white': types?.includes(title)
            })} 
            onClick={() => handleClick() }>
            {title}
            <span className="text-[20px] flex justify-center items-center absolute top-1/2 transform -translate-y-1/2 right-[-15px] border border-black bg-white w-[27px] h-[27px] rounded-full text-black">{number}</span>
        </button>
    )
}