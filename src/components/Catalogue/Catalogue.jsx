import { useState } from 'react'
import bgPaper from '../../assets/images/common/bg-paper.png'
import Accordion from '../Accordion/Accordion'
import { motion } from 'framer-motion'

export default function Catalogue() {

    const [lastRead, setLastRead] = useState('')

    const [readTheme1, setReadTheme1] = useState(60/100)
    const [readTheme2, setReadTheme2] = useState(20/100)
    const [readTheme3, setReadTheme3] = useState(50/100)
    const [readTheme4, setReadTheme4] = useState(85/100)



    const storedParams = localStorage.getItem('params')
    console.log(storedParams)

    // Stocker un json dans le local storage pour gérer les progress bar
    // Quand j'ouvre la popup de la note je sette le localstorage

    const items = [
        {
            title: 'Vivre sous l\'annexion',
            content: 'Contenu du premier panneau.',
            count: 4,
            notes: [
                {
                    'id': 1,
                    'code': 'N01',
                    'title': 'L\'entrée en guerre'
                },
                {
                    'id': 2,
                    'code': 'N02',
                    'title': 'L\'invasion du Luxembourg'
                },
                {
                    'id': 3,
                    'code': 'N03',
                    'title': 'Occupation ou annexion ?'
                },
                {
                    'id': 4,
                    'code': 'N04',
                    'title': 'Survivre sous l\'annexion'
                },
            ]
        },
        {
            title: 'Réagir à l\'annexion',
            content: 'Contenu du deuxième panneau.',
            count: 4,
            notes: [
                {
                    'id': 25,
                    'code': 'N25',
                    'title': 'La commission administrative'
                },
                {
                    'id': 26,
                    'code': 'N26',
                    'title': 'Les bourgmestres face à l\'annexion'
                },
                {
                    'id': 27,
                    'code': 'N27',
                    'title': 'L\'administration locale'
                },
                {
                    'id': 28,
                    'code': 'N28',
                    'title': 'La collaboration'
                },
            ]
        },
        {
            title: 'Subir l\'annexion',
            content: 'Contenu du troisième panneau.',
            count: 3,
            notes: [
                {
                    'id': 30,
                    'code': 'N30',
                    'title': 'La persécution anti-juive'
                },
                {
                    'id': 31,
                    'code': 'N31',
                    'title': 'Les victimes oubliées'
                },
                {
                    'id': 32,
                    'code': 'N32',
                    'title': 'Les origines grand-ducales de la politique nazie au Luxembourg'
                },
            ]
        },
        {
            title: 'Au-delà de l\'annexion',
            content: 'Contenu du troisième panneau.',
            count: 2,
            notes: [
                {
                    'id': 41,
                    'code': 'N41',
                    'title': 'La bataille des Ardennes'
                },
                {
                    'id': 42,
                    'code': 'N42',
                    'title': 'La sortie de guerre'
                },
            ]
        },
    ];

    const [theme1, setTheme1] = useState({
        total: items[0].notes.length
    })

    const [theme2, setTheme2] = useState({
        total: items[1].notes.length
    })

    const [theme3, setTheme3] = useState({
        total: items[2].notes.length
    })

    const [theme4, setTheme4] = useState({
        total: items[3].notes.length
    })

    

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
                    <Accordion items={ items } />
                </div>
            </div>
        </div>
    )
}




const ProgressBar = ({ progress }) => {
    return (
        <div className="progress-container">
            <motion.div className='progress-bar' initial={{ width: 0 }} animate={{ width: `${progress * 100}%` }} transition={{ duration: 1, delay: 1 }}></motion.div>
        </div>
    )
}