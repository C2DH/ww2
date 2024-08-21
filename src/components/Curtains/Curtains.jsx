import { motion } from 'framer-motion'
import siteConfig from '../../../site.config'

export default function Curtains() {
  return (

	<>
		<motion.div
			className='fixed inset-0 bg-gray-100 z-[10]'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: siteConfig.cloudsTransitionDuration * 0.5, duration: siteConfig.cloudsTransitionDuration * 0.5 } }}
			exit={{ opacity: 0, transition: {duration: 0.8, delay: 0.8} } }
			transition={{ ease: 'easeInOut', duration: siteConfig.cloudsTransitionDuration }}
		/>

		<motion.div className='fixed inset-0 pointer-events-none bg-green z-[10]'
			initial={{ y: '100%' }}
			animate={{ y: '0%' }}
			exit={{ y: '-100%' }}
			transition={{ ease: 'easeInOut', duration: siteConfig.curtainsTransitionDuration }}
		/>
	</>

  )
}