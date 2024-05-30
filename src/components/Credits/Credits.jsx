import { motion } from 'framer-motion'

export default function Credits() {
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transition: {duration: 1}}}>
            <h1 className="text-center text-[60px] mt-[100px]">Générique</h1>
        </motion.div>
    )
}