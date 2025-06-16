import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export default function HeaderHistorianWorkshop({ items }) {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const itemsWithTranslationLabel = items?.map((item) => ({
    ...item,
    title: t(`menuItems.${item.link.split('-').join('_').replace('/', '')}`),
  }))

  return (
    <>
      <div className='hidden lg:grid grid-cols-12 lg:pt-[20px] 2xl:pt-[50px]'>
        <div className='col-span-12 lg:col-span-7 2xl:col-span-9'>
          <h1 className='text-[50px] 2xl:text-[70px] font-abril leading-none pb-[20px] 2xl:pb-[50px]'>
            {t('menuItems.historian_workshop')}
          </h1>
        </div>

        <div className='col-span-12 lg:col-span-5 2xl:col-span-3 text-[20px]'>
          <p></p>
        </div>
      </div>

      <nav className='hidden lg:block'>
        <ul className='text-[28px] 2xl:text-[38px] font-semibold uppercase flex gap-[20px] pb-[20px]'>
          {itemsWithTranslationLabel.map((item, index) => (
            <li key={index}>
              <Link
                key={index}
                to={item.link}
                className={classNames('navbar-title', {
                  active: pathname === `${item.link}`,
                })}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
