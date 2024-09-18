import bg from '../../assets/images/common/bg-black.jpg'

export default function Error () {
    return (
        <div style={{ background: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className='h-[calc(100dvh-120px)] sm:h-[calc(100vh-120px)] w-full flex flex-col items-center justify-center'>
            <h1 className='abril text-blue text-[300px]'>Erreur</h1>
            <span className='block text-white abril text-[80px] leading-none text-center'>Un problème est survenu lors de la récupération des données</span>
        </div>
    )
}