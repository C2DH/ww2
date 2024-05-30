import { motion } from 'framer-motion'

export default function HistorianWorkshop() {
    return (

        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transition: {duration: 1}}}>
            <h1 className="text-center text-[60px] mt-[100px]">Atelier de l'historien</h1>
        </motion.div>
    )
}