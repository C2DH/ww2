import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolume } from '@fortawesome/pro-light-svg-icons'

export default function Sound() {
    return (
        <div>
            <span className="text-[20px]">SOUND ON</span>
            <FontAwesomeIcon 
                icon={ faVolume } 
                style={{ fontSize: '26px', marginLeft: '10px', cursor: 'pointer' }}
                onClick={() => console.log('click')}    
            />
        </div>
    )
}