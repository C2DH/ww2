import { motion } from 'framer-motion'
import MapBox from '../MapBox/MapBox'
import map1 from '../../assets/images/spaceTimeMap/map-1.png'
import map2 from '../../assets/images/spaceTimeMap/map-2.png'

const token = import.meta.env.VITE_API_KEY_MAPBOX_YOANN
const style = import.meta.env.VITE_API_STYLE_MAPBOX_YOANN

export default function SpaceTimeMap() {
    return (
        // <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transition: {duration: 1}}}>
        //     <h1 className="text-center text-[60px] mt-[100px]">Carte Spatio-temporelle</h1>
        // </motion.div>
        <div className='absolute top-[70px] inset-0'>
       
            <MapBox token={ token } style={ style } />
            

            {/** Filtre chronologique */}
            <div className="container mx-auto fixed bottom-[50px] left-0 right-0">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className='h-[10px] border'></div>
                    </div>
                </div>
            </div>

            {/** Changement Map style */}
            <div className='absolute top-[40px] right-[80px]'>
                <div className='flex gap-5'>
                    <div className='w-[60px] h-[60px] border border-white rounded-[4px] cursor-pointer'>
                        <img src={map1} alt="" />
                    </div>
                    <div className='w-[60px] h-[60px] border border-white rounded-[4px] cursor-pointer'>
                        <img src={map2} alt="" />
                    </div>
                </div>
            </div>

        </div>
    )
}