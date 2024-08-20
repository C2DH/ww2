import { motion } from 'framer-motion'
import texture from '../../assets/images/common/bg-black.jpg'

export default function Curtains() {
  return (
      <motion.div className='fixed inset-0 pointer-events-none bg-[#6EDFFB]'
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ease: 'linear', duration: 0.7 }}>
      </motion.div>
  )
}