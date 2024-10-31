import { useEffect, useRef, useState } from 'react'
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
import sample from '../../assets/sounds/sample-15s.mp3'
import { useMenuSoundContext } from '../../contexts/MenuProvider'


export default function Player({ url, className, controls, status })  {

    const { isMenuSoundPlay, setIsMenuSoundPlay } = useMenuSoundContext()
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const [sound, setSound] = useState(sample)
    const isMobile = useMediaQuery({ query: '(max-width: 640px)'})
    const [isPlaying, setIsPlaying] = useState(false)
    const playerRef = useRef(null);
    const playerMenuRef = useRef(null);
    const playerAudioRef = useRef(null);

    const handleEnded = () => {
        if (playerRef.current) {    
            playerRef.current.seekTo(0)
            playerRef.current.getInternalPlayer().play()
        }
        if (playerMenuRef.current) {    
            playerMenuRef.current.seekTo(0)
            playerMenuRef.current.getInternalPlayer().play()
        }
    }

    const handleMediaPlay = () => {
        setIsPlaying(true);
        setIsMenuSoundPlay(false) // Stopper la musique de fond
    };

    const handleMediaPause = () => {
        setIsPlaying(false);
        // setIsMenuSoundPlay(true) // Reprendre la musique de fond
    };

    useEffect(() => {
        if (pathname === "/") {
            setSound(sound_1)
        } else if (pathname === '/catalogue') {
            setSound(sound_2)
        }
    }, [pathname])


    if (status === 'video') {
        return (
            <div className="relative">
                <ReactPlayer url={ url } width={ '100%' } height={ '100%' } controls={controls} className={ className } playing={isPlaying} onPause={ handleMediaPause } onPlay={ handleMediaPlay } onEnded={ handleEnded } ref={playerRef} />
                {!isPlaying &&
                    <div onClick={() => setIsPlaying(true)} className={classNames('cursor-pointer absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border border-[#6EDFFB] rounded-full flex justify-center items-center', {
                        "w-[100px] h-[100px]": !isMobile,
                        "w-[50px] h-[50px]": isMobile,
                    })}>
                        <FontAwesomeIcon icon={faPlay} style={{ fontSize: isMobile ? '20px': '40px', color: '#6EDFFB' }} />
                    </div>
                }
            </div>
        )
    } else if (status === 'menu') {
        return (
            <div>
                <div className='flex items-center'>
                    <span className='text-[20px] sm:text-[24px] uppercase whitespace-nowrap me-3'>{ isPlaying ? t('sound_on') : t('sound_off') }</span>
                    <ReactPlayer url={ sound } width={ '100%' } height={ '100%' } className={ className } playing={isMenuSoundPlay} ref={playerMenuRef } onEnded={ handleEnded } />
                    <FontAwesomeIcon icon={isMenuSoundPlay ? faVolume : faVolumeXmark} className='text-[22px] sm:text-[24px] cursor-pointer' 
                        onClick={() => setIsMenuSoundPlay(!isMenuSoundPlay)}
                    />
                </div>
            </div>
        )
    } else if (status === 'audio') {
        return (
            <ReactPlayer url={ url } width={ '100%' } height={ '50px' } controls={controls} className={ className } ref={playerAudioRef} />
        )
    }
}   