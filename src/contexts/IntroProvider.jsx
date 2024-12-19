import { createContext, useContext, useState } from "react";

const IntroContext = createContext(null)

export function IntroProvider({ children }) {
    const [ displayVideo, setDisplayVideo ] = useState(true)

    return (
        <IntroContext.Provider value={{ displayVideo, setDisplayVideo}}>
            { children }
        </IntroContext.Provider>
    )
}

export function useIntroContext() {
    return useContext(IntroContext)
}

export default IntroContext
