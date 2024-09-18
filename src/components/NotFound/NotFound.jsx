import bg from '../../assets/images/common/bg-black.jpg'

export default function NotFound() {
    return (
        <div style={{ background: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className='h-[calc(100dvh-120px)] sm:h-[calc(100vh-120px)] w-full flex flex-col items-center justify-center'>
            <h1 className='abril text-blue text-[300px]'>404</h1>
            <span className='text-white abril text-[100px]'>Page not found</span>
        </div>
    )
}