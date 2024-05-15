// FRAMER
import { motion} from "framer-motion"

// ASSETS
import mask from '../../assets/images/common/masq.svg'
import './Map.scss'

export default function Map() {
    return (
        <motion.div     
            className="w-full h-[calc(100vh-120px)] map"
            initial={{ y: "95vh" }}
            animate={{ y: "120px" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 4 }}
        >    
            <h1 className="text-[50px] pt-[100px] text-center">MAP</h1>
        </motion.div>
    )
}