// HOOKS
import { useEffect, useState } from 'react'

// ASSETS
import bgBlack from '../../assets/images/common/bg-black.jpg'
import logo from '../../assets/images/common/logo.png'

// FRAMER
export default function Intro() {

    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState(null)
    
    useEffect(() => {
        fetch("https://ww2-lu.netlify.app/api/story/home", {
            method: "GET",
            headers: {}
        })
        .then((response) => response.json())
        .then((data) => {
            setResults(data)
            setIsLoading(true)
        })
        .catch((error) => console.log(error))
    }, [isLoading])


    return (
        <>
            { isLoading && 
                <div className='h-[100vh] absolute inset-0' style={{ background: `url(${bgBlack}) 50% / cover no-repeat` }}>
                    <div className='flex flex-col items-center pt-[40px]'>
                        <img src={ logo } alt="Logo World War 2" className='w-[45%]' />
                        <div className='text-center text-white uppercase font-antonio w-[50%]'>
                            <h1 className='text-[43px] mt-[45px]'>{ results.data.title.fr_FR }</h1>
                            <h2 className='text-[28px]'>{ results.data.subtitle.fr_FR }</h2>
                            <p className='pt-[35px]'>{ results.data.abstract.fr_FR }</p>
                        </div>
                    </div>
                </div>
            }
        </>
        

    )
}   



            // <AnimatePresence>
            //     { isVisible && 
            //         <div className='h-[100vh] absolute inset-0'
            //         initial={{ opacity: 1 }}
            //         animate={{ opacity: 0 }}
            //         exit={{ opacity: 0 }}
            //         ransition={{ duration: 1, delay: 3, ease: 'easeInOut' }}
            //         style={{ background: `url(${bgBlack}) 50% / cover no-repeat` }} >
            //             <div className='flex flex-col items-center pt-[40px]'>
            //                 <motion.img initial={{ opacity: 1}} animate={{ opacity: 0 }} transition={{ duration: 1, delay: 4 }} src={ logo } alt="Logo World War 2" className='w-[45%]' />
            //                 <img src={ logo } alt="Logo World War 2" className='w-[45%]' />
            //                 <div className='text-center text-white uppercase font-antonio w-[50%]'>
            //                     <h1 className='text-[43px] mt-[45px]'>{ data.abstract }</h1>
            //                     <h2 className='text-[28px]'>sur la seconde guerre mondiale au luxembourg</h2>
            //                     <p className='pt-[35px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.</p>
            //                 </div>
            //             </div>
            //         </div>
            //     } 
            // </AnimatePresence>