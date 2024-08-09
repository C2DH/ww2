import { createContext, useContext, useState } from "react";

const IntroContext = createContext(null)

export function IntroProvider({ children }) {
    const [ isVisible, setIsVisible ] = useState(true)

    return (
        <IntroContext.Provider value={{ isVisible, setIsVisible}}>
            { children }
        </IntroContext.Provider>
    )
}

export function useIntroContext() {
    return useContext(IntroContext)
}

export default IntroContext