import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import "./Player.scss"
import { useMediaQuery } from 'react-responsive'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import sound_1 from '../../assets/sounds/sound-1.mp3'
import sound_2 from '../../assets/sounds/sound-2.mp3'
import { useMenuSoundContext } from '../../contexts/MenuProvider'
import { ForwardIcon, PlayIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'


export default function Player({ url, className, controls, status, onEnded, loop = false })  {
    const { isMenuSoundPlay, setIsMenuSoundPlay } = useMenuSoundContext()
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const [sound, setSound] = useState(sound_1)
    const isMobile = useMediaQuery({ query: '(max-width: 640px)'})
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [skipVideo, setSkipVideo] = useState(false)
    const playerRef = useRef(null)
    const playerMenuRef = useRef(null)
    const playerAudioRef = useRef(null)
    const playerTrailerRef = useRef(null)

    const handleEnded = () => {
        if (playerRef.current) {    
            playerRef.current.seekTo(0)
            playerRef.current.getInternalPlayer().play()
        }
        if (playerMenuRef.current) {        
            playerMenuRef.current.seekTo(0)
            playerMenuRef.current.getInternalPlayer().play()
        }
        if (playerTrailerRef.current) {
            onEnded()
        }
    }

    const handleMediaPlay = () => {
        setIsPlaying(true);
        setIsMenuSoundPlay(false) // Stopper la musique de fond
    }

    const handleMediaPause = () => {
        setIsPlaying(false);
        // setIsMenuSoundPlay(true) // Reprendre la musique de fond
    }

    useEffect(() => {
        if (pathname === "/") {
            setSound(sound_1)
        } else {
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
                        <PlayIcon style={{ width: isMobile ? '20px': '40px', color: '#6EDFFB' }} />
                    </div>
                }
            </div>
        )
    } else if (status === 'menu') {
        return (
            <div>
                <div className='flex items-center'>
                    <span className='text-[20px] sm:text-[24px] uppercase whitespace-nowrap me-3'>{ isPlaying ? t('sound_on') : t('sound_off') }</span>
                    <ReactPlayer url={ sound } width={ '' } height={ '' } className={ className } playing={isMenuSoundPlay} ref={playerMenuRef} onEnded={ handleEnded } />

                    { isMenuSoundPlay ? (
                        <SpeakerWaveIcon style={{ width: '30px', color: 'white'}} className='cursor-pointer' onClick={() => setIsMenuSoundPlay(!isMenuSoundPlay)}/>
                    ) : (
                        <SpeakerXMarkIcon style={{ width: '30px', color: 'white'}} className='cursor-pointer' onClick={() => setIsMenuSoundPlay(!isMenuSoundPlay)}/>
                    )}

                </div>
            </div>
        )
    }  else if (status === 'trailer' && !skipVideo) {
        return (
            <div className="relative w-full max-w-screen-2xl">
                <div className="relative w-full pt-[56.25%]">
                    <ReactPlayer url={ url } width={ '100%' } height={ '100%' } autoPlay controls={controls} loop={loop} className={ "absolute top-0 left-0" } playing={true} muted={isMuted} ref={playerTrailerRef} onEnded={ handleEnded } />

                    <div className="absolute bottom-5 right-5 cursor-pointer bg-black bg-opacity-50 p-2 rounded-full"
                        onClick={() => setIsMuted(!isMuted)}
                    >
                        {isMuted ? (
                            <SpeakerXMarkIcon style={{ width: "30px", color: "white" }} />
                        ) : (
                            <SpeakerWaveIcon style={{ width: "30px", color: "white" }} />
                        )}
                    </div>
                </div>      
            </div>      
        )
    }  else if (status === 'audio') {
        return (
            <ReactPlayer url={ url } width={ '100%' } height={ '50px' } controls={controls} className={ className } ref={playerAudioRef} />
        )
    }
}   