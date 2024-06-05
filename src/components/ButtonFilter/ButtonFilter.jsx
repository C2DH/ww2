export default function ButtonFilter({ title, number }) {
    return (
        <button className='btn-filter uppercase pl-[10px] pr-[20px] py-[5px] border border-black text-[24px] rounded-[4px] relative mr-[35px]'>
            {title}
            <span>{number}</span>
        </button>
    )
}