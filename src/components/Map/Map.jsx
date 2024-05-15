// FRAMER
import { motion} from "framer-motion"

export default function Map() {
    return (
        <motion.div     
            className="w-full h-[calc(100vh-120px)] bg-slate-100"
            initial={{ y: "100vh" }}
            animate={{ y: "120px" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 4 }}
        >    
            <h1 className="text-[50px] pt-[100px] text-center">MAP</h1>
        </motion.div>
    )
}