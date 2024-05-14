import React from 'react'
import ReactPlayer from 'react-player'
import "./Player.scss"

export default function Player({ url, className })  {
    return (
        <ReactPlayer url={ url } width={ '100%' } height={ '100%' } className={ className } />
    )
}