import { useEffect, useState } from 'react'
import bgPaper from '../../assets/images/common/bg-paper.png'
import Accordion from '../Accordion/Accordion'
import { motion } from 'framer-motion'

export default function Catalogue() {

    // Stocker un json dans le local storage pour gérer les progress bar
    // Quand j'ouvre la popup de la note je sette le localstorage

    const [lastRead, setLastRead] = useState('')
    const storedParams = localStorage.getItem('params')

    const [readTheme1, setReadTheme1] = useState(60/100)
    const [readTheme2, setReadTheme2] = useState(20/100)
    const [readTheme3, setReadTheme3] = useState(50/100)
    const [readTheme4, setReadTheme4] = useState(85/100)
    const [isLoaded, setIsLoaded] = useState(false)
    const [theme, setTheme] = useState([])


    useEffect(() => {
        // Utiliser async/await pour une gestion plus propre des appels API
        const fetchThemes = async () => {
            try {
                const response1 = await fetch(`https://ww2-lu.netlify.app/api/story/theme-01-vivre-sous-lannexion`)
                const data1 = await response1.json()

                const response2 = await fetch(`https://ww2-lu.netlify.app/api/story/theme-02-reagir-a-lannexion`)
                const data2 = await response2.json()

                // Mettre à jour l'état avec les deux thèmes
                setTheme([data1, data2])
                setIsLoaded(true)
            } catch (error) {
                console.log(error)
            }
        }

        fetchThemes()
    }, [])


    if (isLoaded) {
        return (
            <div style={{ background: `url(${ bgPaper }) center / cover no-repeat`}} className="px-[20px] sm:px-0">
                <div className='container mx-auto h-[calc(100vh-120px)] flex flex-col overflow-scroll'>
    
                     {/** Headers */}
                    <div className='grid grid-cols-12 pt-[20px]'>
                        <div className="col-span-12 lg:col-span-8 pt-[15px]">
                            <h1 className='abril text-[40px] sm:text-[70px]'>Catalogue</h1>
                            <p className='pt-[15px] pr-[15px] text-[28px] mb-[20px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.</p>                    
                        </div>
    
                        <div className="hidden lg:flex col-span-4 border-l border-black mt-[70px] mb-[45px] pl-[20px] flex-col justify-between">
                            <div className='flex items-center'>
                                <span className='text-[24px] uppercase pr-[10px] text-nowrap'>Thème 1</span>  
                                <ProgressBar progress={readTheme1}/>
    
                                {/* <div className='resume-reading'>
    
                                </div> */}
                            </div>
    
                            <div className='flex items-center'>
                                <span className='text-[24px] uppercase pr-[10px] text-nowrap'>Thème 2</span>   
                                <ProgressBar progress={readTheme2} />
                            </div>
    
                            <div className='flex items-center'> 
                                <span className='text-[24px] uppercase pr-[10px] text-nowrap'>Thème 3</span>   
                                <ProgressBar progress={readTheme3} />   
                            </div>
                            <div className='flex items-center'>
                                <span className='text-[24px] uppercase pr-[10px] text-nowrap'>Thème 4</span>   
                                <ProgressBar progress={readTheme4} />
                            </div>
                        </div>
                    </div>
                    
                    <div className='lg:flex flex-grow flex-col lg:overflow-scroll'>
                        <Accordion items={ theme } />
                    </div>
                </div>
            </div>
        )
    }
    

}




const ProgressBar = ({ progress }) => {
    return (
        <div className="progress-container">
            <motion.div className='progress-bar' initial={{ width: 0 }} animate={{ width: `${progress * 100}%` }} transition={{ duration: 1, delay: 1 }}></motion.div>
        </div>
    )
}