import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolume } from '@fortawesome/pro-light-svg-icons'

export default function Sound() {
    return (
        <div className='hidden md:block'>
            <span className="text-[20px]">SOUND ON</span>
            <FontAwesomeIcon 
                icon={ faVolume } 
                style={{ fontSize: '26px', marginLeft: '10px', cursor: 'pointer' }}
            />
        </div>
    )
}