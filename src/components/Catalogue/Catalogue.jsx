import { useState } from 'react'
import bgPaper from '../../assets/images/common/paper.png'
import Menu from '../Menu/Menu'
import Accordion from '../Accordion/Accordion'

export default function Catalogue() {

    const [lastRead, setLastRead] = useState('')

    const [readTheme1, setReadTheme1] = useState(60/100)
    const [readTheme2, setReadTheme2] = useState(30/100)
    const [readTheme3, setReadTheme3] = useState(50/100)
    const [readTheme4, setReadTheme4] = useState(85/100)

    // Stocker un json dans le local storage pour gérer les progress bar
    // Quand j'ouvre la popup de la note je sette le localstorage

    const items = [
        {
            title: 'Vivre sous l\'annexion',
            content: 'Contenu du premier panneau.',
            count: 21,
            notes: [
                {
                    'id': 'N01',
                    'title': 'L\'entrée en guerre'
                },
                {
                    'id': 'N02',
                    'title': 'L\'invasion du Luxembourg'
                },
                {
                    'id': 'N03',
                    'title': 'Occupation ou annexion ?'
                },
                {
                    'id': 'N04',
                    'title': 'Survivre sous l\'annexion'
                },
            ]
        },
        {
            title: 'Réagir à l\'annexion',
            content: 'Contenu du deuxième panneau.',
            count: 7,
            notes: [
                {
                    'id': 'N25',
                    'title': 'La commission administrative'
                },
                {
                    'id': 'N26',
                    'title': 'Les bourgmestres face à l\'annexion'
                },
                {
                    'id': 'N27',
                    'title': 'L\'administration locale'
                },
                {
                    'id': 'N28',
                    'title': 'La collaboration'
                },
            ]
        },
        {
            title: 'Subir l\'annexion',
            content: 'Contenu du troisième panneau.',
            count: 11,
            notes: [
                {
                    'id': 'N30',
                    'title': 'La persécution anti-juive'
                },
                {
                    'id': 'N31',
                    'title': 'Les victimes oubliées'
                },
                {
                    'id': 'N32',
                    'title': 'Les origines grand-ducales de la politique nazie au Luxembourg'
                },
            ]
        },
        {
            title: 'Au-delà de l\'annexion',
            content: 'Contenu du troisième panneau.',
            count: 9,
            notes: [
                {
                    'id': 'N41',
                    'title': 'La bataille des Ardennes'
                },
                {
                    'id': 'N41',
                    'title': 'La sortie de guerre'
                },
            ]
        },
    ];


    return (
        <>
            <div style={{ background: `url(${ bgPaper }) 50% / cover no-repeat`}} className='h-full absolute top-[120px] inset-0'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-12 pt-[20px]'>
                        <div className="col-span-8 pt-[15px]">
                            <h1 className='abril text-[70px]'>Catalogue</h1>
                            <p className='pt-[15px] text-[28px] mb-[20px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque.</p>                    
                        </div>

                        <div className="col-span-4 border-l border-black mt-[70px] mb-[45px] pl-[20px] flex flex-col justify-between">
                            <div className='flex items-center'>
                                <span className='text-[24px] uppercase pr-[10px] text-nowrap'>Thème 1</span>   
                                <progress value={readTheme1} />
                            </div>

                            <div className='flex items-center'>
                                <span className='text-[24px] uppercase pr-[10px] text-nowrap'>Thème 2</span>   
                                <progress value={readTheme2} />
                            </div>

                            <div className='flex items-center'> 
                                <span className='text-[24px] uppercase pr-[10px] text-nowrap'>Thème 3</span>   
                                <progress value={readTheme3} />
                            </div>
                            <div className='flex items-center'>
                                <span className='text-[24px] uppercase pr-[10px] text-nowrap'>Thème 4</span>   
                                <progress value={readTheme4} />
                            </div>
                        </div>
                    </div>

                    
                    <Accordion items={items}/>

                </div>
            </div>
        </>
        
    )
}