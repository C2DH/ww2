import { motion } from 'framer-motion'
import bgBlack from '../../assets/images/common/bg-black.jpg'

// Assets
import img1 from '../../assets/images/historianWorkshop/img-1.png'
import img2 from '../../assets/images/historianWorkshop/img-2.png'
import img3 from '../../assets/images/historianWorkshop/img-3.png'
import img4 from '../../assets/images/historianWorkshop/img-4.png'
import img5 from '../../assets/images/historianWorkshop/img-5.png'
import img6 from '../../assets/images/historianWorkshop/img-6.png'
import img7 from '../../assets/images/historianWorkshop/img-7.png'
import img8 from '../../assets/images/historianWorkshop/img-8.png'

export default function HistorianWorkshop() {
    return (

        // <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transition: {duration: 1}}}>
            <div style={{ backgroundImage: `url(${bgBlack})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} className='w-full h-screen'>
                <div className="container mx-auto">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <motion.div className='absolute' initial={{ y: '150%'}} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 1 }}>
                                <img src={img1} alt="" />
                            </motion.div>

                            <motion.div className="absolute" initial={{ y: '150%'}} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 2 }}>
                                <img src={img2} alt="" />
                            </motion.div>

                            <motion.div className="absolute" initial={{ x: '150%' }} animate={{ x: 0 }} transition={{ duration: 0.75, delay: 3 }}>
                                <img src={img3} alt="" />
                            </motion.div>

                            <motion.div className="absolute" initial={{ x: '-150%' }} animate={{ x: 0 }} transition={{ duration: 0.75, delay: 4 }}>
                                <img src={img4} alt="" />
                            </motion.div>

                            <motion.div className="absolute" initial={{ x: '-150%', y: '150%' }} animate={{ x: 0, y: 0 }} transition={{ duration: 0.75, delay: 5 }}>
                                <img src={img5} alt="" />
                            </motion.div>

                            <motion.div className="absolute" initial={{ x: '150%', y: '150%' }} animate={{ x: 0, y: 0 }} transition={{ duration: 0.75, delay: 6 }}>
                                <img src={img6} alt="" />
                            </motion.div>

                            <motion.div className="absolute" initial={{ x: '-150%', y: '150%' }} animate={{ x: 0, y: 0 }} transition={{ duration: 0.75, delay: 7 }}>
                                <img src={img7} alt="" />
                            </motion.div>

                            <motion.div className="absolute" initial={{ x: '150%', y: '150%' }} animate={{ x: 0, y: 0 }} transition={{ duration: 0.75, delay: 8 }}>
                                <img src={img8} alt="" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        // </motion.div>
    )
}