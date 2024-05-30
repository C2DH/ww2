import { motion } from 'framer-motion';

export default function Curtains() {
  return (
    <motion.div className='fixed inset-0 bg-red-100 pointer-events-none opacity-50'
      initial={{ y: '100%' }}
      animate={{ y: '0%' }}
      exit={{ y: '-100%' }}
      transition={{ease: 'linear'}}>
    </motion.div>
  );
}