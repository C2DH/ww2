import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import "./Player.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faVolume, faVolumeXmark } from '@fortawesome/sharp-thin-svg-icons'
import { useMediaQuery } from 'react-responsive'
import classNames from 'classnames'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import sound_1 from '../../assets/sounds/sound-1.mp3'
import sound_2 from '../../assets/sounds/test-2.mp3'



export default function Player({ url, className, controls })  {

    const { t } = useTranslation()
    const { pathname } = useLocation()
    const [sound, setSound] = useState(sound_1)
    const isMobile = useMediaQuery({ query: '(max-width: 640px)'})
    const [isPlaying, setIsPlaying] = useState(false)
    const playerRef = useRef(null);

    const handleEnded = () => {
        playerRef.current.seekTo(0); // Redémarre la vidéo
    }

    const handleMedia = () => {
        setIsPlaying(playerRef.current.player.isPlaying)
    }

    useEffect(() => {
        if (pathname === "/") {
            setSound(sound_1)
        } else if (pathname === '/catalogue') {
            setSound(sound_2)
        }
    }, [pathname])


    if (url) {
        return (
            <div className="relative">
                <ReactPlayer url={ url } width={ '100%' } height={ '100%' } controls={controls} className={ className } playing={isPlaying} onPause={ handleMedia } onPlay={ handleMedia } onEnded={ handleEnded } ref={playerRef} />
                {!isPlaying &&
                    <div className={classNames('absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border border-[#6EDFFB]  rounded-full flex justify-center items-center', {
                        "w-[100px] h-[100px]": !isMobile,
                        "w-[50px] h-[50px]": isMobile,
                    })}>
                        <FontAwesomeIcon icon={faPlay} style={{ fontSize: isMobile ? '20px': '40px', color: '#6EDFFB', cursor: 'pointer' }} onClick={() => setIsPlaying(true)} />
                    </div>
                }
            </div>
        )
    } else {
        return (
            <div>
                <div className='flex items-center'>
                    <span className='text-[20px] sm:text-[24px] uppercase whitespace-nowrap me-3'>{ isPlaying ? t('sound_on') : t('sound_off') }</span>
                    <ReactPlayer url={ sound } width={ '100%' } height={ '100%' } controls={controls} className={ className } playing={isPlaying} ref={playerRef} />
                    <FontAwesomeIcon icon={isPlaying ? faVolume : faVolumeXmark} className='text-[22px] sm:text-[24px] cursor-pointer' onClick={() => setIsPlaying(!isPlaying)} />
                </div>
            </div>
        )
    }
}