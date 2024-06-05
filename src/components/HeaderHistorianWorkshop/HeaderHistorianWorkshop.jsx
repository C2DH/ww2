import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

export default function HeaderHistorianWorkshop() {
    
    const [currentPage, setCurrentPage] = useState('')
    const { pathname } = useLocation()


    useEffect(() => {
        setCurrentPage(pathname)
    })
    return (
       <>
            <div className="grid grid-cols-12 lg:pt-[50px]">
                <div className="hidden lg:block col-span-12 xl:col-span-9">
                    <h1 className='text-[70px] abril leading-none pb-[20px] xl:pb-[50px]'>L'atelier de l'historien</h1>
                </div>

                <div className="col-span-12 xl:col-span-3 text-[20px] pt-[20px]">
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.</p>
                </div>
            </div>

            <nav className='hidden lg:block'>
                <ul className='text-[28px] xl:text-[38px] font-semibold uppercase flex gap-[20px]'>
                    <li>
                        <Link to={'/historical-index'} className={classNames('navbar-title', {'active' : currentPage === '/historical-index'})}>Index historique</Link>
                    </li>
                    <li>
                        <Link to={'/sources'} className={classNames('navbar-title', {'active' : currentPage === '/sources'})}>Sources</Link>
                    </li>
                    <li>
                        <Link to={'/research-institutions'} className={classNames('navbar-title', {'active' : currentPage === '/research-institutions'})}>Institutions de recherche</Link>
                    </li>
                    <li>
                        <Link to={'/glossary'} className={classNames('navbar-title', {'active' : currentPage === '/glossary'})}>Glossaire</Link>
                    </li>
                    <li>
                        <Link to={'/bibliography'} className={classNames('navbar-title', {'active' : currentPage === '/bibliography'})}>Bibliographie</Link>
                    </li>
                </ul>
            </nav>
       </>
       
    )
}