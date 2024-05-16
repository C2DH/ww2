import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import "./Player.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

export default function Player({ url, className })  {

    const [isPlaying, setIsPlaying] = useState(false)
    const playerRef = useRef(null);

    const handleEnded = () => {
        setIsPlaying(false);
        playerRef.current.seekTo(0); // Redémarre la vidéo
    }

    return (
        <div className="relative">
            <ReactPlayer url={ url } width={ '100%' } height={ '100%' } controls={true} className={ className } playing={isPlaying} onPlay={() => setIsPlaying(true)} onEnded={ handleEnded }/>
            
            { !isPlaying &&
                <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border border-[#6EDFFB] w-[100px] h-[100px] rounded-full flex justify-center items-center'>
                    <FontAwesomeIcon 
                        icon={faPlay} 
                        style={{ fontSize: '40px', color: '#6EDFFB', cursor: 'pointer' }}
                        onClick={() => setIsPlaying(true)}
                    />
                </div>
            }
        </div>
    )
}