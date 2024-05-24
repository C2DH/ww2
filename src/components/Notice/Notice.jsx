// REACT-ROUTER-DOM
import {useLocation, Link} from 'react-router-dom';

// COMPONENTS
import Player from '../Player/Player'
import IconMapBack from '../IconMapBack/IconMapBack';

// ASSETS 
import '../../assets/scss/app.scss'



export default function Notice() {

    const { state } = useLocation()

    return (
        <>
            <div className='relative inset-0 h-[calc(100vh-70px)] mask'>
                <div className='h-full relative' style={{ background: `url(${state.data.properties.image}) 50% / cover no-repeat` }}>
                    <div className='notice-filter absolute inset-0'></div>

                    <div className="container mx-auto relative">
                        
                        <div className='pt-[55px] flex flex-col items-center'>
                            <span className='text-[20px] abril blue underline underline-offset-4 block'>{ state.data.properties.city }</span>
                            <h1 className='text-[48px] blue abril pt-[12px]'>{ state.data.properties.location }</h1>
                            <p className='text-[24px] sofia uppercase text-white border border-white p-2 mt-[10px]'>{ state.data.properties.description }</p>
                        </div>
                        <Link to={'/'} className='absolute top-[70px] left-0'>
                            <IconMapBack text={'Retour Carte'}/>
                        </Link>

                        <div className="grid grid-cols-12 mt-[70px] gap-x-[40px]">
                            <div className="col-span-2 pt-[20px]">
                                { state.data.notes_related.map((note, index) => {
                                    return (
                                        <Link key={ index } to={'/'} className='block mb-[30px] transition-all duration-[750ms] border-[0.5px] border-transparent py-[8px] px-[10px] rounded-[5px] hover:border-white hover:bg-[#000000]/[0.2]'>
                                            <h3 className='abril text-[22px] text-white uppercase'>{ note.title }</h3>
                                        </Link>
                                    )
                                })}
                            </div>

                            <div className="col-span-6 col-start-4">
                                <Player url={ `/src/assets/videos/${state.data.properties.media }`}/>
                            </div>

                            <div className="col-span-2 col-start-11 pt-[20px]">
                                <Link to={'/historian-workshop'} className='block uppercase abril text-[22px] text-white'>sources</Link>
                                <Link to={'/historian-workshop'} className='block uppercase abril text-[22px] text-white pt-[22px]'>index historique</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}