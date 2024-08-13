import { motion } from 'framer-motion'
import { useSharedState } from '../../contexts/SharedStateProvider'
import { useEffect } from 'react'

export default function Credits() {

    const [sharedState, setSharedState] = useSharedState()

    useEffect(() => {
        setSharedState({ ...sharedState, showCurtains: false })
    })

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transition: {duration: 1}}}>
            <h1 className="text-center text-[60px] mt-[100px]">Générique</h1>
        </motion.div>
    )
}