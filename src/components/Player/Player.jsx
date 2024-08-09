import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import "./Player.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive'
import classNames from 'classnames'


export default function Player({ url, className, controls })  {

    const isMobile = useMediaQuery({
        query: '(max-width: 640px)'
    })

    const [isPlaying, setIsPlaying] = useState(false)
    const playerRef = useRef(null);

    const handleEnded = () => {
        playerRef.current.seekTo(0); // Redémarre la vidéo
    }

    const handleVideo = () => {
        setIsPlaying(playerRef.current.player.isPlaying)
    }

    return (
        <div className="relative">
            <ReactPlayer url={ url } width={ '100%' } height={ '100%' } controls={controls} className={ className } playing={isPlaying} onPause={ handleVideo } onPlay={ handleVideo } onEnded={ handleEnded } ref={playerRef}/>
            
            { !isPlaying &&
                <div className={classNames('absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border border-[#6EDFFB]  rounded-full flex justify-center items-center', {
                    "w-[100px] h-[100px]": !isMobile,
                    "w-[50px] h-[50px]": isMobile,
                })}>
                    <FontAwesomeIcon 
                        icon={faPlay} 
                        style={{ fontSize: isMobile ? '20px': '40px', color: '#6EDFFB', cursor: 'pointer' }}
                        onClick={() => setIsPlaying(true)}
                    />
                </div>
            }
        </div>
    )
}