import { motion } from 'framer-motion'
import siteConfig from '../../../site.config'

export default function Curtains() {
  return (

	<>
		<motion.div
			className='fixed inset-0 bg-gray-100'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: siteConfig.cloudsTransitionDuration * 0.5, duration: siteConfig.cloudsTransitionDuration * 0.5 } }}
			exit={{ opacity: 0, transition: {duration: 1, delay: 1} } }
			transition={{ ease: 'easeInOut', duration: siteConfig.cloudsTransitionDuration }}
		/>

		<motion.div className='fixed inset-0 pointer-events-none bg-green'
			initial={{ y: '100%' }}
			animate={{ y: '0%' }}
			exit={{ y: '-100%' }}
			transition={{ ease: 'easeInOut', duration: siteConfig.curtainsTransitionDuration }}
		/>
	</>

  )
}