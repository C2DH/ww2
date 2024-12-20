import classNames from "classnames"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export default function ButtonFilter({ title, number, types, handleClick }) {

    const { t } = useTranslation()
    const [titleBtn, setTitleBtn] = useState()

    useEffect(() => {
        if (title === "book") {
            setTitleBtn(t('book'))
        } else if (title === "manuscript")  {
            setTitleBtn(t('manuscript'))
        } else {
            setTitleBtn(title)
        }
    }, [t])

    return (
        <button 
            className={classNames('transition-all uppercase pl-[10px] pr-[20px] py-[5px] border border-black text-[16px] xl:text-[24px] rounded-[4px] relative mr-[25px] xl:mr-[35px] mb-[12px]', {
                'bg-black text-white': types?.includes(title), 
                // 'bg-transparent text-black': !types?.includes(title)
            })} 
            onClick={() => handleClick() }>
            {titleBtn}
            <span className="text-[20px] flex justify-center items-center absolute top-1/2 transform -translate-y-1/2 right-[-20px] border border-black bg-white w-[27px] h-[27px] rounded-full text-black p-4">{number}</span>
        </button>
    )
}