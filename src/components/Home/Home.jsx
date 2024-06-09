// COMPONENTS
import { useLocation } from "react-router-dom"
import Intro from "../Intro/Intro"
import { useEffect, useState } from "react"
import MapBox from "../MapBox/MapBox";

const apiKeyMapbox = import.meta.env.VITE_API_KEY_MAPBOX
const apiStyleMapbox = import.meta.env.VITE_API_STYLE_MAPBOX


export default function Home() {
    
    const [showIntro, setShowIntro] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false); 

    useEffect(() => {

        const lastVisited = localStorage.getItem('lastVisited')
        const datetime = new Date().getTime()

        // Si page non visité ou si page visitée plus de 12h
        if (!lastVisited || ((datetime - lastVisited) >= 12 * 60 * 60 * 1000)) {
            setShowIntro(true)
            localStorage.setItem('lastVisited', datetime.toString());
        } else {
            setShowIntro(false)
        }

        setIsLoaded(true)
    }, [])


    return isLoaded && (
        <>      
            { showIntro && <Intro /> }
            <MapBox token={ apiKeyMapbox } style={ apiStyleMapbox }/>
        </>
    )
}

            