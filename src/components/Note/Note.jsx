import bgPaper from '../../assets/images/common/bg-paper.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLongToLine } from '@fortawesome/pro-regular-svg-icons'
import { Link } from 'react-router-dom'
import Source from '../Source/Source'
import { AnimatePresence, motion } from "framer-motion"
import { useState } from 'react'


export default function Note() {

    const [ sourcePopup, setSourcePopup ] = useState({ open: false, src: null })

    const handleSourcePopup = () => {
        if (!sourcePopup.open) {
            setSourcePopup(prevSource => ({
                ...prevSource, 
                open: true, 
                src: "https://images.unsplash.com/photo-1692981226516-f76bcc8945b3?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }))
        } else {
            setSourcePopup(prevSource => ({
                ...prevSource, 
                open: false, 
                src: null
            }))
        }
    }

    return (
        <>
            <div style={{ backgroundImage: `url(${bgPaper})`, backgroundSize: 'cover'}}>
                <div className="container mx-auto relative lg:h-[calc(100vh-120px)] flex flex-col">

                    <Link to={'/catalogue'} className='absolute top-[65px] -left-[80px] text-[30px]'>
                        <FontAwesomeIcon icon={faArrowLeftLongToLine}  />
                    </Link>

                    <div className="flex justify-between border-b border-black pt-[60px]">
                        <div className="uppercase">
                            <span className="text-[38px] border-r border-black pr-[10px] font-thin">N01</span>
                            <span className="text-[40px] abril pl-[10px]">Entering the war</span>
                        </div>

                        <div className='text-[24px] uppercase flex items-end leading-[48px] cursor-pointer'>   
                            <span className='border-r border-black pr-[20px]' onClick={() => console.log('previous')}>Précèdente</span>
                            <span className='pl-[20px]' onClick={() => console.log('next')}>Suivante</span>
                        </div>
                    </div>

                    <div className="flex flex-grow overflow-scroll" id="text">
                        <div className="w-1/2 py-[40px] font-light border-r border-black pr-[60px] overflow-y-auto flex-grow">   
                            <div className='text-[28px]'>
                                <p>With the outbreak of the Second World War, Luxembourg found itself in a precarious political position. Although the Grand Duchy’s Government was quick to reiterate its traditional policy of strict “disarmed neutrality”, it harboured no illusions about the latter’s viability. Diplomatically isolated and landlocked between Nazi Germany and France, the country risked being overrun by the war-waging powers in the first hours of the conflict – just like in 1914.</p>
                                <p>This time, however, the Government was poised to act within the narrow frames of neutrality. On 25 August 1939, Luxembourg’s volunteer army of 700 men was deployed to the borders to guard the newly built defensive “Schuster Line” consisting of 62 road barriers. Meanwhile, in January 1940, the Government and grand ducal family secretly decided to leave the country in the event of an invasion. These precautionary measures apart, civilian society was not directly affected by the conflict until May 1940. Yet the threat of war remained a daily presence: air raid shelters were opened, the border populations near Schengen were evacuated, and the canons of the Franco-German frontlines could be heard as far as Luxembourg City.</p>
                                <p>On 10 May 1940, Nazi Germany violated Luxembourg’s neutrality and invaded the country in its “Blitzkrieg” against France. As the Luxembourg Army surrendered right away, the German invaders rapidly bypassed the “Schuster Line” and overran the country within a few hours.</p>
                                <p>Félix Streicher (Maastricht University)</p>
                            </div>

                            <div className='ml-[20px] border-b border-black mt-[30px] pb-[10px]'>
                                <span className='uppercase abril text-[20px]'>Réferences :</span>
                                <div className='text-[24px]'>
                                    <p>With the outbreak of the Second World War, Luxembourg found itself in a precarious political position. Although the Grand Duchy’s Government was quick to reiterate its traditional policy of strict “disarmed neutrality”, it harboured no illusions about the latter’s viability. Diplomatically isolated and landlocked between Nazi Germany and France, the country risked being overrun by the war-waging powers in the first hours of the conflict – just like in 1914.</p>
                                    <p>This time, however, the Government was poised to act within the narrow frames of neutrality. On 25 August 1939, Luxembourg’s volunteer army of 700 men was deployed to the borders to guard the newly built defensive “Schuster Line” consisting of 62 road barriers. Meanwhile, in January 1940, the Government and grand ducal family secretly decided to leave the country in the event of an invasion. These precautionary measures apart, civilian society was not directly affected by the conflict until May 1940. Yet the threat of war remained a daily presence: air raid shelters were opened, the border populations near Schengen were evacuated, and the canons of the Franco-German frontlines could be heard as far as Luxembourg City. On 10 May 1940, Nazi Germany violated Luxembourg’s neutrality and invaded the country in its “Blitzkrieg” against France. As the Luxembourg Army surrendered right away, the German invaders rapidly bypassed the “Schuster Line” and overran the country within a few hours.</p>
                                    <p>Félix Streicher (Maastricht University)</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/2 ml-[50px] py-[40px] overflow-y-auto flex-grow">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="grid gap-6">
                                    <div>
                                        <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="" onClick={() => handleSourcePopup() }/>
                                    </div>
                                    <div>
                                        <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt=""/>
                                    </div>
                                    <div>
                                        <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt=""/>
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <div>
                                        <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt=""/>
                                    </div>
                                    <div>
                                        <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt=""/>
                                    </div>
                                    <div>
                                        <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt=""/>
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <div>
                                        <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt=""/>
                                    </div>
                                    <div>
                                        <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt=""/>
                                    </div>
                                    <div>
                                        <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt=""/>
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <div>
                                        <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt=""/>
                                    </div>
                                    <div>
                                        <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt=""/>
                                    </div>
                                    <div>
                                        <img className="h-auto max-w-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                { sourcePopup.open && 
                    <motion.div 
                        initial={{ y: 0}}
                        animate={{ y: '-100%' }}
                        exit={{ y: 0}}
                        transition={{ duration: 0.8, ease: 'easeInOut'}}
                    >
                        <Source src={ sourcePopup.src } handleSourcePopup={ handleSourcePopup }/>
                    </motion.div>
                    }
            </AnimatePresence>
        </>
    )
}